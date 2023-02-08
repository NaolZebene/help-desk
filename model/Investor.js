const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const investorSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact_person: {
        type: String,
        required: true
    },
    contact_phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Investor"
    },
    email: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Investor = model('Investor', investorSchema);
module.exports = Investor
