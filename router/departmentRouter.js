const router = require("express").Router();
const { DepartmentEscalatedTasks,getDepartmentYearlyData } = require("../control/taskController");
const isDepAuth = require("../util/isDep-Auth");
const requestController = require("../control/departmentRequest");
const { isDepartment } = require("../util/Authorization");
const {EditDepartmentProfile,ViewDepartmentProfile} = require("../control/userController")

router.get("/escalated", isDepAuth, isDepartment, DepartmentEscalatedTasks);
router.get("/getannualrequest",isDepAuth,isDepartment,getDepartmentYearlyData);
router.put("/edit",isDepAuth,isDepartment, EditDepartmentProfile);
router.get("/departmentprofile", isDepAuth,ViewDepartmentProfile)

module.exports = router;
