const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//account maken
router.post("/register", async (req,res) =>{
    const user = new User(
        {
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(
            req.body.password, process.env.PASSWORD_KEY).toString(),
        });

    try{
        const savedUser = await user.save();
        res.status(201).json(savedUser);

    } catch (err){
        res.status(500).json(err);
    }
    
});

//aanmelden
router.post("/signin", async  (req,res) =>{
    
    try{
       
        const user = await User.findOne({username: req.body.username});
        
        !user && res.status(401).
        json("Combinatie is niet Juist (Gebruiker niet gevonden)");

        const dbHash = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_KEY)
        .toString(CryptoJS.enc.Utf8);

        req.body.password !== dbHash && res.status(401).json("Combinatie is niet Juist");

        const token = jwt.sign(
            {
                id:user._id,
                admin:user.admin
            },
            process.env.JWT_KEY,
            {
                expiresIn:"1d"
            }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({others, token});
    }catch(err){
        res.status(500).json(err);
    }


});

module.exports = router;