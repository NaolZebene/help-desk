const { model, Schema } = require('mongoose');

const departmentSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})


const Departments = model("Departments", departmentSchema);

module.exports = Departments;