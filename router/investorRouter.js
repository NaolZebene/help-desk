const router = require('express').Router();
const { addReportValidation } = require('../util/joiValidation')
const reportController = require('../control/reportController');
const taskController = require('../control/taskController');
const isLoggedIn = require('../util/isInv-Auth');
const { isInvestor } = require('../util/Authorization')


router.post('/post', isLoggedIn, isInvestor, addReportValidation, reportController.SubmitReport)
router.get('/viewcompletedtask', isLoggedIn, isInvestor, taskController.ViewSentTask);
router.post('/:taskId', isLoggedIn, isInvestor, taskController.CompleteTask);



module.exports = router;