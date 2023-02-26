const router = require("express").Router();
const authControl = require("../control/authController");
const investorAuthContoller = require("../control/investorAuthContoller");
const departmentAuthController = require("../control/departmentAuthController");

router.post("/changepassword",authControl.ChangePassword)
router.post("/login", authControl.Login);

router.post("/investor/changepassword",investorAuthContoller.ChangePassword)
router.post("/investor/login", investorAuthContoller.Login);
router.get("/investor/verifyToken", investorAuthContoller.VerifyInvestorToken);
router.post("/investor/forgetpassword", investorAuthContoller.resetPassword);
router.post("/investor/passwordreset/:userId/:token", investorAuthContoller.changeForgetPassword)

router.post("/department/changepassword",departmentAuthController.ChangePassword)
router.post("/department/login", departmentAuthController.Login);
router.post("/verifyusertoken", authControl.VerifyUserToken);
router.get(
  "/department/verifyToken",
  departmentAuthController.VerifyDepartmentToken
);

router.post("/forgetpassword", authControl.resetPassword);
router.post("/passwordreset/:userId/:token", authControl.changeForgetPassword);
router.post(
  "/department/passwordreset",
  departmentAuthController.resetPassword
);
router.post(
  "/department/passwordreset/:userId/:token",
  departmentAuthController.changeForgetPassword
);

module.exports = router;
