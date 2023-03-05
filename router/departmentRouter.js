const router = require("express").Router();
const { DepartmentEscalatedTasks,getDepartmentYearlyData } = require("../control/taskController");
const isDepAuth = require("../util/isDep-Auth");
const requestController = require("../control/departmentRequest");
const { isDepartment } = require("../util/Authorization");
const {EditDepartmentProfile} = require("../control/userController")

router.get("/escalated", isDepAuth, isDepartment, DepartmentEscalatedTasks);
router.get("/getannualrequest",isDepAuth,isDepartment,getDepartmentYearlyData);
router.get("/edit",isDepAuth,isDepartment, EditDepartmentProfile);

module.exports = router;
