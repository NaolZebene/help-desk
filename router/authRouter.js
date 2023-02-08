const router = require("express").Router();
const authControl = require("../control/authController");
const investorAuthContoller = require("../control/investorAuthContoller");
const departmentAuthController = require("../control/departmentAuthController");

//*user login//
router.post("/login", authControl.Login);
router.post("/investor/login", investorAuthContoller.Login);
router.post("/investor/verifyToken", investorAuthContoller.VerifyInvestorToken);

router.post("/department/login", departmentAuthController.Login);
router.post("/verifyusertoken", authControl.VerifyUserToken);
router.post(
  "/department/verifyToken",
  departmentAuthController.VerifyDepartmentToken
);

router.post("/forgetpassword", authControl.resetPassword);
router.get("/passwordreset/:userId/:token", authControl.changeForgetPassword);
router.get("/department/passwordreset", departmentAuthController.resetPassword);
router.get(
  "/department/passwordreset/:userId/:token",
  departmentAuthController.changeForgetPassword
);

module.exports = router;
