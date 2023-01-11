const router = require('express').Router()
const { DepartmentEscalatedTasks } = require('../control/taskController');
const isDepAuth = require("../util/isDep-Auth");

const { isDepartment } = require("../util/Authorization");

router.get('/escalated/:id', isDepAuth, isDepartment, DepartmentEscalatedTasks)


module.exports = router;