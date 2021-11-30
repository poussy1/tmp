const router = require("express").Router();
const Product = require("../models/Product");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("./validateToken");


//aanmaken van een product 
router.post("/",validateTokenAdmin, async (req,res) =>{
    const product = new Product(req.body)
    
    try{
        const savedPrd = await product.save();
        console.log("inside product creation")
        res.status(200).json(savedPrd)
    }catch(err){
        res.status(500).json(err)
    }
});


//verwerken van user
router.put("/:id", validateTokenAdmin, async (req, res) => {

    try {
      const updatedPrd = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPrd);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//user verwijderen
router.delete("/:id", validateTokenAdmin, async (req, res) => {

    try{
        const deletedPrd = Product.findById(req.params.id).title;
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product %s is deleted",deletedPrd);
    }catch(err){
        res.status(500).json(err)
    }
});


//product halen
router.get("/find/:id", validateTokenAdmin, async (req, res) => {

    try{
        
        const getUser = await Product.findById(req.params.id);
        res.status(200).json("Verwijderen van gebruiker is gelukt.")
    }catch(err){
        res.status(500).json(err)
    }
});


//alle producten halen
router.get("/", async (req, res) => {

    const query = req.query.new;
    const queryCategory = req.query.cat;
    try{
        let getAllProducts;

        if(query){
             getAllProducts = await Product.find().sort({ _id: -1});
        }else if (queryCategory){
             getAllProducts = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            });
        }else {
             getAllProducts = await Product.find()
        }

        res.status(200).json(getAllProducts)
    }catch(err){
        res.status(500).json(err)
    }
});


module.exports = router;