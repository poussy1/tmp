const mongoose = require("mongoose");

const Order_schema = new mongoose.Schema({
    userId:{type:String, required:true,},
    products:
    [
        {
        productID:{type: String, required: true},
        }
    ],
    amount: {type: Number, required: true},
    invoiceAddress: {type: Object}
    
},
    {timestamps: true}
);

module.exports = mongoose.model("Order", Order_schema);