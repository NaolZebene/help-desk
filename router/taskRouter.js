const router = require('express').Router();
const taskController = require('../control/taskController');
const { isLoggedIn } = require('../util/Auth');
const { addTaskValidation } = require("../util/joiValidation")


const isInvAuth = require("../util/isInv-Auth");
const isDepAuth = require("../util/isDep-Auth");

const {
    isDepartment,
    isEmployee,
    isInvestor,
} = require("../util/Authorization");


router.get('/', taskController.GetTask);
router.post('/post', addTaskValidation, taskController.CreateTask);
// router.put('/:id', addTaskValidation, taskController.UpdateTask);
router.get('/view/:taskId', isDepAuth, isDepartment, taskController.getOneTask);
router.get('/:taskId/:userId', isDepAuth, isDepartment, taskController.AssignTask);
router.get('/:taskId/decline', isDepAuth, isDepartment, taskController.DeclineTask);






module.exports = router;