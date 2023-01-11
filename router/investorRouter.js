const router = require('express').Router();
const { addReportValidation } = require('../util/joiValidation')
const reportController = require('../control/reportController');

router.post('/post', addReportValidation, reportController.SubmitReport)

module.exports = router;