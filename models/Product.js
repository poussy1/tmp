const mongoose = require("mongoose");

const Product_schema = new mongoose.Schema({
    tile:{type:String, required:true,},
    userOwnership:{type: Boolean, required:true, default: false},
    desc:{type:String, required:true,},
    image:{type:String, required:true, unique:true},
    categories:{type:Array,},
    price:{type:Number, default:false},
},
    {timestamps: true}
);

module.exports = mongoose.model("Product", Product_schema);