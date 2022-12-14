const router = require('express').Router();
const taskController = require('../control/taskController');
const { isLoggedIn } = require('../util/Auth');

router.get('/', taskController.GetTask);
router.post('/post', taskController.CreateTask);
router.put('/:id', taskController.UpdateTask);
router.get('/view/:taskId', taskController.getOneTask);
router.get('/:taskId/:userId', taskController.AssignTask);
router.get('/:taskId/decline', taskController.DeclineTask);




module.exports = router;