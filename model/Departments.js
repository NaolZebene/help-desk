const mongoose = require('mongoose');
const { model, Schema } = mongoose

const departmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    services: [{
        type: mongoose.Types.ObjectId,
        ref: 'Services'
    }],
    isDeleted: {
        type: Boolean,
        default: false  
    }
})


const Departments = model("Departments", departmentSchema);

module.exports = Departments;