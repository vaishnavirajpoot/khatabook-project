const mongoose = require("mongoose");

const hisaabSchema = mongoose.Schema({

    title: { type: String, required: true,trim:true,minLength:1,maxLength:100 },
    description: { type: String, required: true,trim:true },
    user: { type: mongoose.Schema.Types.ObjectId,ref:"user", required: true }, 
    shareable: { type: Boolean, default: false }, 
    encrypted: { type: Boolean, default: false },       
    passcode: { type: String ,default:""}, 
    editpermissions: { type: Boolean, default: false } 

},{timestamps: true});


module.exports = mongoose.model("hisaab",hisaabSchema);