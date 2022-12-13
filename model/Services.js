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
    }
})

const Services = model('Services', serviceSchema);

module.exports = Services;