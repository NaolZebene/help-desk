const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const eventSchema = new Schema({
    title:{
        type:String, 
        required:true
    }, 
    description:{
        type:String, 
        required:true
    }, 
    picture:{
            type:String
        }, 
    date:{
        type:String, 
        required:true
    }
})

module.exports = model("Event", eventSchema)