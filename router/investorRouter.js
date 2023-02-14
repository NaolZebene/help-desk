const router = require("express").Router();
const { addReportValidation } = require("../util/joiValidation");
const reportController = require("../control/reportController");
const taskController = require("../control/taskController");
const isLoggedIn = require("../util/isInv-Auth");
const { isInvestor } = require("../util/Authorization");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "reportFiles");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getMonth() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const additional_file = upload.single("file");

router.post("/getannualrequest", isLoggedIn,isInvestor,taskController.getInvestorYearlyData)

router.post(
  "/post",

  additional_file,
  reportController.SubmitReport
);
router.get(
  "/viewcompletedtask",
  isLoggedIn,
  isInvestor,
  taskController.ViewSentTask
);
router.post("/:taskId", isLoggedIn, isInvestor, taskController.CompleteTask);

module.exports = router;
