const router = require("express").Router();
const User = require("../models/User");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("./validateToken");

//verwerken van user
router.put("/:id", validateTokenAuthorisation, async (req, res) => {

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//user verwijderen
router.delete("/:id", validateTokenAuthorisation, async (req, res) => {

    try{
        const deletedUser = User.findById(req.params.id).username;
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user %s is deleted",deletedUser);
    }catch(err){
        res.status(500).json(err)
    }
});


//user halen
router.get("/find/:id", async (req, res) => {

    try{
        
        const getUser = await User.findById(req.params.id);
        const {password, ...info } = getUser._doc;
        res.status(200).json(info)
    }catch(err){
        res.status(500).json(err)
    }
});

//alle user halen
router.get("/", async (req, res) => {

    const query = req.query.new;
    const queryCategory = req.query.cat;
    try{
        if(query){
            const getAllProducts = await Product.find().sort({ _id: -1});
        }else if (queryCategory){
            const getAllProducts = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            });
        }else {
            const getAllProducts = await Product.find()
        }

        res.status(200).json(getAllProducts)
    }catch(err){
        res.status(500).json(err)
    }
});


//alle users halen
router.get("/find/", validateTokenAdmin, async (req, res) => {
    const query = req.query.new;
    try{
        const getAllUsers = query
        ? await User.find().sort({ _id: -1 }).limit(1)
        : await User.find();

        res.status(200).json(getAllUsers)
    }catch(err){
        res.status(500).json(err)
    }
});

//TODO
router.get("/stats", validateTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;