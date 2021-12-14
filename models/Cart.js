const mongoose = require("mongoose");

const Cart_schema = new mongoose.Schema({
    userId:{type:String, required:true,},
    products:
    [
        {
        productID:{type: String, required: true},
        quantity:{type: Number, default: 1, required: true},

        }
    ],

},
    {timestamps: true}
);

module.exports = mongoose.model("Cart", Cart_schema);