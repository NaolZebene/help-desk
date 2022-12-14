const router = require('express').Router();
const taskController = require('../control/taskController');
const { isLoggedIn } = require('../util/Auth');
const { addTaskValidation } = require("../util/joiValidation")


router.get('/', taskController.GetTask);
router.post('/post', addTaskValidation, taskController.CreateTask);
router.put('/:id', addTaskValidation, taskController.UpdateTask);
router.get('/view/:taskId', taskController.getOneTask);
router.get('/:taskId/:userId', taskController.AssignTask);
router.get('/:taskId/decline', taskController.DeclineTask);




module.exports = router;