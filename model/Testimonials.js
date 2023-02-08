const mongoose = require('mongoose');
const {model, Schema} = mongoose

const testimonialSchema = new Schema({
    description :{
        type:String
    }, 
    author:{
        type:String
    }, 
    company :{
        type:String
    }, 
    isDeleted:{
        type:Boolean, 
        default:false
    }
})

const Testimonial = new model('Testimonial', testimonialSchema); 
module.exports = Testimonial;