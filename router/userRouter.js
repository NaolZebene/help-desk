const router = require('express').Router();
const userController = require('../control/userController');
const { isLoggedIn } = require('../util/Auth');

router.post('/post', userController.CreateUser);

module.exports = router;