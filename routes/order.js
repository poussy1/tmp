const router = require("express").Router();
const Order = require("../models/Order");

const {
    validateToken,
    validateTokenAuthorisation,
    validateTokenAdmin
  } = require("./validateToken");


//aanmaken van een order 
router.post("/", async (req,res) =>{
    const order = new Order(req.body)
    
    try{
        const savedOrder = await order.save();
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
});


//verwerken van user
router.put("/:id", validateTokenAdmin, async (req, res) => {

    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Cart verwijderen
router.delete("/:id",validateTokenAuthorisation, async (req, res) => {

    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order is deleted");
    }catch(err){
        res.status(500).json(err)
    }
});


//cart halen
router.get("/find/:idUser", validateTokenAuthorisation, async (req, res) => {

    try{
        
        const orders = await Order.findOne({_id: req.params.idUser});
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
});


//alle producten halen
router.get("/", validateTokenAdmin,async (req, res) => {
    try{
        const getAllOrders = await Order.find();
        res.status(200).json(getAllOrders)
    }catch(err){
        res.status(500).json(err)
    }
});



module.exports = router;