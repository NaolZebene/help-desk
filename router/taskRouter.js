const router = require("express").Router();
const taskController = require("../control/taskController");
const { isLoggedIn } = require("../util/Auth");
const { addTaskValidation } = require("../util/joiValidation");

const isInvAuth = require("../util/isInv-Auth");
const isDepAuth = require("../util/isDep-Auth");
const isUserAuth = require("../util/isUser-Auth");
const { isAdmin } = require("../util/Authorization");
const {
  isDepartment,
  isEmployee,
  isInvestor,
} = require("../util/Authorization");

router.get(
  "/canceldtasks",
  isInvAuth,
  taskController.CancledRequestsToInvestor
);
router.get("/", taskController.GetTask);
router.get("/allhistory", isDepAuth, taskController.AllHistory);
router.get("/completedtasks", isInvAuth, taskController.ViewCompletedTasks);
router.post("/post", isInvAuth, taskController.CreateTask);
router.get("/view/:taskId", taskController.getOneTask);
router.post(
  "/:taskId/decline",
  isDepAuth,
  isDepartment,
  taskController.DeclineTask
);
router.post(
  "/:taskId/:userId",
  isDepAuth,
  isDepartment,
  taskController.AssignTask
);

module.exports = router;
