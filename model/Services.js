const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: 'Departments'
    }, 
    icon:{
        type:String,
        required:True
    }
})

const Services = model('Services', serviceSchema);

module.exports = Services;