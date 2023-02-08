const joi = require("@hapi/joi");

const schema = {
  task: joi.object({
    companyName: joi.string().required(),
    description: joi.string().required(),
    taskType: joi.string().required(),
    priority: joi.string().required(),
    requested_date: joi.string().required(),
    location: joi.string().required(),
    contact_person_phone: joi.string().required(),
    contact_person_name: joi.string().required(),
    department: joi.string().required(),
  }),

  user: joi.object({
    username: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required(),
    role: joi.string().required(),
    password: joi.string().required,
  }),
  investor: joi.object({
    companyName: joi.string().required(),
    location: joi.string().required(),
    email: joi.string().required(),
    contact_phone: joi.string(),
    contact_person: joi.string(),
  }),
  department: joi.object({
    title: joi.string().required(),
  }),
  report: joi.object({
    month: joi.string().required(),
    companyName: joi.string().required(),
    total_number_of_workers: joi.array().required(),
    cumulative_new_jobs_created: joi.number().required(),
    average_worker_per_month: joi.number().required(),
    number_of_workers_resigned: joi.array().required(),
    number_of_workers_hired: joi.array().required(),
    turn_over_rate: joi.number().required(),
    job_creation: joi.number().required(),
    planned_monthly_report: joi.number().required(),
    amount_of_export: joi.number().required(),
    monthly_import_substitute: joi.number().required(),
    amount_import_substitute: joi.number().required(),
    certificate_type: joi.string().required(),
    number_of_trainee: joi.number().required(),
    duration_of_training: joi.string().required(),
    additional_file: joi.string(),
    challenges: joi.string(),
    to: joi.string().required(),
    file: joi.string(),
  }),
  service: joi.object({
    companyName: joi.string().required(),
    description: joi.string(),
    department_name: joi.string(),
  }),
};

module.exports = schema;
