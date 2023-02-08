const router = require("express").Router();
const { DepartmentEscalatedTasks } = require("../control/taskController");
const isDepAuth = require("../util/isDep-Auth");
const requestController = require("../control/departmentRequest");
const { isDepartment } = require("../util/Authorization");

router.get("/escalated", isDepAuth, isDepartment, DepartmentEscalatedTasks);

module.exports = router;
