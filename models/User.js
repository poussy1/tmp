const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, unique:true},
    admin:{type:Boolean, default:false},
},
    {timestamps: true}
);

module.exports = mongoose.model("User", User_schema);