const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const taskSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    ticketNumber: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Departments",
    },
    taskType: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      default: "None",
    },
    isAssigned: {
      type: String,
      enum: ["pending", "canceled", "accepted", "completed", "decline"],
      default: "pending",
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    requested_date: {
      type: String,
      required: true,
    },
    contact_person_name: {
      type: String,
    },
    contact_person_phone: {
      type: String,
    },
    isEscalated: {
      type: Boolean,
      default: false,
    },
    escalated_reason: {
      type: String,
    },
    cancled_reason: {
      type: String,
      // required:true
    },
  },

  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);
module.exports = Task;
