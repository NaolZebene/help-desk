const router = require('express').Router();
const departmentController = require("../control/departmentAuthController");
const { isLoggedIn } = require('../util/Auth');

router.get('/', departmentController.GetDepartments);
router.post('/post', departmentController.CreateDepartment);
router.put('/:id', departmentController.EditDepartment);
router.post('/:id', departmentController.DeleteDepartment);


module.exports = router;