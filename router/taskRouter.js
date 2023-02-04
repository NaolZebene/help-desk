const router = require("express").Router();
const taskController = require("../control/taskController");
const { isLoggedIn } = require("../util/Auth");
const { addTaskValidation } = require("../util/joiValidation");

const isInvAuth = require("../util/isInv-Auth");
const isDepAuth = require("../util/isDep-Auth");

const {
  isDepartment,
  isEmployee,
  isInvestor,
} = require("../util/Authorization");

router.get("/", taskController.GetTask);
router.get('/allhistory', isDepAuth, taskController.AllHistory)
router.get("/completedtasks", isInvAuth, taskController.ViewCompletedTasks);
router.post("/post", isInvAuth, addTaskValidation, taskController.CreateTask);
router.get("/view/:taskId", taskController.getOneTask);
router.get(
  "/:taskId/:userId",
  isDepAuth,
  isDepartment,
  taskController.AssignTask
);
router.post(
  "/:taskId/decline",
  isDepAuth,
  isDepartment,
  taskController.DeclineTask
);



module.exports = router;
