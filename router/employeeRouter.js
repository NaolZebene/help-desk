const router = require("express").Router();
const departmentRequestController = require("../control/departmentRequest");
const employeeController = require("../control/employeeControl");
const { isEmployee } = require("../util/Authorization");
const isUserAuth = require("../util/isUser-Auth");
const isInvAuth = require("../util/isInv-Auth");
const isDepAuth = require("../util/isDep-Auth");

router.post(
  "/escalate/:taskId",
  // isUserAuth,
  // isEmployee,
  employeeController.EscalateTask
);

router.get("/profile", isUserAuth, employeeController.ViewProfile);

router.get("/task", isUserAuth, isEmployee, employeeController.ViewTasks);

router.get("/:empId", isDepAuth, employeeController.DepartmentEmployees);

router.get(
  "/internalRequest",
  isUserAuth,
  departmentRequestController.CreateTask
);

module.exports = router;
