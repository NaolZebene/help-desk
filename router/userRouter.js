const router = require('express').Router();
const userController = require('../control/userController');
const { isLoggedIn } = require('../util/Auth');
const { route } = require('./reportRouter');
const { addInvestorValidation, addDepartmentValidation } = require("../util/joiValidation");

router.post('/post', userController.CreateUser);
router.put('/:userId', userController.EditUser);
router.post('/:userId', userController.DeleteUser);
router.get('/', userController.getAllUsers);

/**Investor account */

router.post('/investor/post', addInvestorValidation, userController.CreateInvestorAccount);
router.get('/investor', userController.getAllInvestors);
router.put('/investor/:investorId', addInvestorValidation, userController.EditInvestorAccount);
router.post('/investor/:investorId', userController.DeleteInvestor);


/**Department account */

router.post('/department/post', addDepartmentValidation, userController.CreateDepartment);
router.get('/department', userController.GetDepartments);
router.put('/department/:depId', addDepartmentValidation, userController.EditDepartment);
router.post('/department/:depId', userController.DeleteDepartment);

module.exports = router;