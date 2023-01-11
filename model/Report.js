const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const reportSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    total_number_of_workers: [{
        male: {
            type: Number,
        },
        female: {
            type: Number,
        },
        expected: {
            type: Number
        },
    }],
    cumulative_new_jobs_created: {
        type: Number,
        required: true
    },
    average_worker_per_month: {
        type: Number,
        required: true
    },
    number_of_workers_resigned: [{
        male: {
            type: Number,
        },
        female: {
            type: Number,
        },
        expected: {
            type: Number
        }
    }],
    number_of_workers_hired: [{
        male: {
            type: Number,
        },
        female: {
            type: Number,
        },
        expected: {
            type: Number
        }
    }],
    turn_over_rate: {
        type: Number,
        required: true
    },
    job_creation: {
        type: Number,
        required: true
    },
    planned_monthly_report: {
        type: Number,
        required: true
    },
    amount_of_export: {
        type: Number,
        required: true
    },
    monthly_import_substitute: {
        type: Number,
        required: true
    },
    amount_import_substitute: {
        type: Number,
        required: true
    },
    certificate_type: {
        type: String,
        required: true
    },
    number_of_trainee: {
        type: Number,
        required: true
    },
    duration_of_training: {
        type: String,
        required: true
    }

})

const Report = model('Report', reportSchema);
module.exports = Report;