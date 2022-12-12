const router = require('express').Router();
const userController = require('../control/userController');

router.post('/post', userController.CreateUser);

module.exports = router;