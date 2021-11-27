const router = require("express").Router();
const User = require("../models/User");
const validateToken = require("./validateToken");
const validateTokenAuthorisation = require("./validateToken");


router.put("/:id", validateTokenAuthorisation, async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, process.env.PASSWORD_KEY).toString();
    }

    try{
        const newUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true });
        res.status(200).json(newUser);

    }catch (err){
        res.status(500).json(err);
    }
});


module.exports = router;