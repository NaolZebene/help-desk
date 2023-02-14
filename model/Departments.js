const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const departmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  email:{
    type:String, 
    required:true
  },
  services: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Services",
    },
  ],
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Department",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  depType: {
    type: String,
    enum: ["investor", "service"],
    default: "service",
  },
});

const Departments = model("Departments", departmentSchema);

module.exports = Departments;
