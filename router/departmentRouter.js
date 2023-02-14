const router = require("express").Router();
const { DepartmentEscalatedTasks,getDepartmentYearlyData } = require("../control/taskController");
const isDepAuth = require("../util/isDep-Auth");
const requestController = require("../control/departmentRequest");
const { isDepartment } = require("../util/Authorization");

router.get("/escalated", isDepAuth, isDepartment, DepartmentEscalatedTasks);
router.get("/getannualrequest",isDepAuth,isDepartment,getDepartmentYearlyData);

module.exports = router;
