const router = require('express').Router();
const authControl = require('../control/authController')
const investorAuthContoller = require('../control/investorAuthContoller');
const departmentAuthController = require('../control/departmentAuthController')

//*user login//
router.post('/login', authControl.Login);
router.post('/investor/login', investorAuthContoller.Login);
router.post('/department/login', departmentAuthController.Login);
router.post('/verifyusertoken', authControl.VerifyUserToken);





module.exports = router;