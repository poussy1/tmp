const mongoose = require("mongoose");

const Product_schema = new mongoose.Schema({
    title: {type:String, required:true,},
    userOwnership: {type: Boolean, required:false, default: false},
    desc: {type:String, required:true,},
    image: {type:String, required:true},
    categories: {type:Array},
    platform: {type:Array},
    price:{type:Number, default:false},
},
    {timestamps: true}
);

module.exports = mongoose.model("Product", Product_schema);