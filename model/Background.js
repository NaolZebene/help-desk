const mongoose = require("mongoose");
const {Schema, model} = mongoose

const backgroundSchema = new Schema({
    path:{
        type:String, 
        required:true
    }
})

const Background = model("Background", backgroundSchema);
module.exports = Background