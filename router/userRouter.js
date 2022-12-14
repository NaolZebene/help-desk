const router = require('express').Router();
const userController = require('../control/userController');
const { isLoggedIn } = require('../util/Auth');

router.post('/post', userController.CreateUser);
router.put('/:userId', userController.EditUser);
router.post('/:userId', userController.DeleteUser);
router.get('/', userController.getAllUsers);

module.exports = router;