const router = require('express').Router();
const authControl = require('../control/authController')
router.post('/login', authControl.Login);

module.exports = router;