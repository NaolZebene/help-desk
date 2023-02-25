const mongoose = require("mongoose");
const {Schema, model} = mongoose

const gallarySchema = new Schema({
    path:{
        type:String, 
        required:true
    }
})

const Gallary = model("Gallary", gallarySchema);
module.exports = Gallary