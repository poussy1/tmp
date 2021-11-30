const router = require("express").Router();
const Cart = require("../models/Cart");
const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("./validateToken");


//aanmaken van een cart 
router.post("/", async (req,res) =>{
    const cart = new Cart(req.body)
    
    try{
        const savedCart = await cart.save();
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
});


//verwerken van user
router.put("/:id",validateTokenAuthorisation, async (req, res) => {

    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Cart verwijderen
router.delete("/:id",validateTokenAuthorisation, async (req, res) => {

    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart is deleted");
    }catch(err){
        res.status(500).json(err)
    }
});


//cart halen
router.get("/find/:idUser", validateTokenAuthorisation, async (req, res) => {

    try{
        
        const cart = await Product.findOne({_id: req.params.idUser});
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
});


//alle producten halen
router.get("/", validateTokenAdmin,async (req, res) => {
    try{
        const getAllCarts = await Cart.find();
        res.status(200).json(getAllCarts)
    }catch(err){
        res.status(500).json(err)
    }
});


module.exports = router;