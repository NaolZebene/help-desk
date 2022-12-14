const joi = require('@hapi/joi');

const schema = {
    task: joi.object({
        companyName: joi.string().required(),
        description: joi.string().required(),
        taskType: joi.string().required(),
        priority: joi.string().required(),
        requested_date: joi.string().required(),
        location: joi.string().required(),
        contact_person_phone: joi.string().required(),
        contact_person_name: joi.string().required()
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
        password: joi.string().required(),
        location: joi.string().required(),
        email: joi.string().required(),
        contact_phone: joi.string(),
        contact_person: joi.string()

    }),
    department: joi.object({
        title: joi.string().required(),
        password: joi.string().required(),
    })

}

module.exports = schema;