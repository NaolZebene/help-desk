const router = require('express').Router();
const taskController = require('../control/taskController');
const { isLoggedIn } = require('../util/Auth');

router.get('/', isLoggedIn, taskController.GetTask);
router.post('/post', isLoggedIn, taskController.CreateTask);
router.put('/:id', isLoggedIn, taskController.UpdateTask);
router.get('/:taskId/:userId', isLoggedIn, taskController.AssignTask);
router.get('/:taskId/decline', isLoggedIn, taskController.DeclineTask);



module.exports = router;