const router = require('express').Router();
const employeeController = require('../control/employeeControl');


router.get('/escalate/:taskId', employeeController.EscalateTask);


module.exports = router;