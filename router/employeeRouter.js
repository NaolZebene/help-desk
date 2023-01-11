const router = require("express").Router();
const employeeController = require("../control/employeeControl");
const { isEmployee } = require("../util/Authorization");
const isUserAuth = require("../util/isUser-Auth");

router.get(
    "/escalate/:taskId",
    isUserAuth,
    isEmployee,
    employeeController.EscalateTask
);

router.get("/profile", isUserAuth, employeeController.ViewProfile);

router.get("/task", isUserAuth, isEmployee, employeeController.ViewTasks);

module.exports = router;