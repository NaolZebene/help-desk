const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reportSchema = new Schema({
  month: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  total_number_of_workers: {
    type: Array,
    required: true,
  },
  cumulative_new_jobs_created: {
    type: String,
    required: true,
  },
  average_worker_per_month: {
    type: String,
    required: true,
  },
  number_of_workers_resigned: {
    type: Array,
    required: true,
  },
  number_of_workers_hired: {
    type: Array,
    required: true,
  },
  turn_over_rate: {
    type: String,
    required: true,
  },
  job_creation: {
    type: String,
    required: true,
  },
  planned_monthly_report: {
    type: String,
    required: true,
  },
  amount_of_export: {
    type: String,
    required: true,
  },
  monthly_import_substitute: {
    type: String,
    required: true,
  },
  amount_import_substitute: {
    type: String,
    required: true,
  },
  certificate_type: {
    type: String,
    required: true,
  },
  number_of_trainee: {
    type: String,
    required: true,
  },
  duration_of_training: {
    type: String,
    required: true,
  },
  additional_file: {
    type: String,
    required: true,
  },
  challenges:{
    type:String, 
  }, 
  to:{
    type:String, 
    required:true
  }
});

const Report = model("Report", reportSchema);
module.exports = Report;
