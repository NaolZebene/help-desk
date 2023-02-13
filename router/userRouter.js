const router = require("express").Router();
const userController = require("../control/userController");
const reportController = require("../control/reportController");
const isDepAuth = require("../util/isDep-Auth");
const isLoggedIn = require("../util/isUser-Auth");
const taskController = require("../control/taskController");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "icon");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getMonth() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const service_icon = upload.single("icon");

const {
  addInvestorValidation,
  addDepartmentValidation,
  addServiceValidation,
} = require("../util/joiValidation");
const serviceController = require("../control/serviceController");
const { isAdmin, isDepartment } = require("../util/Authorization");

// Details
router.get(
  "/department/details/:depid",
  isLoggedIn,
  isAdmin,
  userController.getOneDepartment
);

router.get(
  "/investor/details/:invid",
  isLoggedIn,
  isAdmin,
  userController.getOneInvestor
);

/**Task */
router.post(
  "/task/cancel/:taskId",
  isLoggedIn,
  isAdmin,
  taskController.CancelRequestToInvestor
);

/**Report View */
router.get("/report/:companyName", isDepAuth, reportController.viewReports);

/**user account */
router.post("/post", isDepAuth, isDepartment, userController.CreateUser);
router.put("/:userId", userController.EditUser);
router.post("/:userId", userController.DeleteUser);
router.get("/", isDepAuth, isDepartment, userController.getAllUsers);

/**Investor account */
router.post(
  "/investor/post",
  // addInvestorValidation,
  userController.CreateInvestorAccount
);
router.get("/investor", userController.getAllInvestors);
router.put(
  "/investor/:investorId",
  // addInvestorValidation,
  userController.EditInvestorAccount
);
router.post("/investor/:investorId", userController.DeleteInvestor);

/**Department account */
router.post(
  "/department/post",
  // addDepartmentValidation,
  userController.CreateDepartment
);
router.get("/department", userController.GetDepartments);
router.put(
  "/department/:depId",
  // addServiceValidation,
  // addDepartmentValidation,
  userController.EditDepartment
);
router.post("/department/:depId", userController.DeleteDepartment);

/** Services Router*/

router.get("/services/:id", service_icon, serviceController.getOneService);
router.post("/services/post", service_icon, serviceController.CreateServices);
router.get("/services", serviceController.getAllServices);
router.put("/services/:id", service_icon, serviceController.EditServices);
router.delete("/services/:id", serviceController.DeleteService);

/** Task*/
router.get(
  "/declinetasks",
  isLoggedIn,
  isAdmin,
  userController.AdminDeclinedTasks
);
router.get(
  "/:taskId/:depId",
  isLoggedIn,
  isAdmin,
  userController.AssignToDepartment
);

module.exports = router;
