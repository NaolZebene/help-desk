const router = require('express').Router();
const departmentController = require("../control/departmentController");
const { isLoggedIn } = require('../util/Auth');

router.get('/', isLoggedIn, departmentController.GetDepartments);
router.post('/post', isLoggedIn, departmentController.CreateDepartment);
router.put('/:id', isLoggedIn, departmentController.EditDepartment);
router.post('/:id', isLoggedIn, departmentController.DeleteDepartment);


module.exports = router;