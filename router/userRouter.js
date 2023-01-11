const router = require('express').Router();
const userController = require('../control/userController');

const isDepAuth = require('../util/isDep-Auth');

const { addInvestorValidation, addDepartmentValidation, addServiceValidation } = require("../util/joiValidation");
const serviceController = require('../control/serviceController');
const { isAdmin, isDepartment } = require('../util/Authorization');

/**user account */
router.post('/post', isDepAuth, isDepartment, userController.CreateUser);
router.put('/:userId', userController.EditUser);
router.post('/:userId', userController.DeleteUser);
router.get('/', isDepAuth, isDepartment, userController.getAllUsers);


/**Investor account */
router.post('/investor/post', addInvestorValidation, userController.CreateInvestorAccount);
router.get('/investor', userController.getAllInvestors);
router.put('/investor/:investorId', addInvestorValidation, userController.EditInvestorAccount);
router.post('/investor/:investorId', userController.DeleteInvestor);


/**Department account */
router.post('/department/post', addDepartmentValidation, userController.CreateDepartment);
router.get('/department', userController.GetDepartments);
router.put('/department/:depId', addServiceValidation, addDepartmentValidation, userController.EditDepartment);
router.post('/department/:depId', userController.DeleteDepartment);


/** Services Router*/

router.post('/services/post', serviceController.CreateServices);
router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getOneService);
router.put('/services/:id', serviceController.EditServices);
router.delete('/services/:id', serviceController.DeleteService);


/** Task*/
router.get('/declinetasks', isLoggedIn, isAdmin, userController.AdminDeclinedTasks);
router.post('/:taskId/assigndep', isLoggedIn, isAdmin, userController.AssignToDepartment);

module.exports = router;