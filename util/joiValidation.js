const { task, user, investor, department, report, service } = require('./joiValidationSchema');

module.exports = {
    addTaskValidation: async function (req, res, next) {
        const value = await task.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0].message
            }).status(403)
        }
        next();
    },
    addUserValidation: async function (req, res, next) {
        const value = await user.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0].message
            }).status(403)
        }
        next();
    },
    addDepartmentValidation: async function (req, res, next) {
        const value = await department.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0].message
            }).status(403)
        }
        next();

    },
    addInvestorValidation: async function (req, res, next) {
        const value = await investor.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0].message
            }).status(403)
        }
        next();
    },
    addReportValidation: async function (req, res, next) {
        const value = await report.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0]
            }).status(403)
        }
        next();
    },
    addServiceValidation: async function (req, res, next) {
        const value = await service.validate(req.body);
        if (value.error) {
            return res.json({
                msg: value.error.details[0].message
            }).status(403)
        }
        next();
    },

}