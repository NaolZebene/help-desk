const router = require("express").Router();
const authControl = require("../control/authController");
const investorAuthContoller = require("../control/investorAuthContoller");
const departmentAuthController = require("../control/departmentAuthController");

//*user login//
router.post("/login", authControl.Login);
router.post("/investor/login", investorAuthContoller.Login);
router.get("/investor/verifyToken", investorAuthContoller.VerifyInvestorToken);

router.post("/department/login", departmentAuthController.Login);
router.post("/verifyusertoken", authControl.VerifyUserToken);
router.get(
  "/department/verifyToken",
  departmentAuthController.VerifyDepartmentToken
);

router.post("/forgetpassword", authControl.resetPassword);
router.post("/passwordreset/:userId/:token", authControl.changeForgetPassword);
router.get("/department/passwordreset", departmentAuthController.resetPassword);
router.get(
  "/department/passwordreset/:userId/:token",
  departmentAuthController.changeForgetPassword
);

module.exports = router;
