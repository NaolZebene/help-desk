const router = require('express').Router(); 
const authControl = require('../control/authController')
router.get('/',authControl.Login);

module.exports = router;