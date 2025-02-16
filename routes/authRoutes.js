const express = require('express');
const authControllor = require('../controllors/authControllor')
require('dotenv').config();

const router = express.Router();

router.post('/signUp', authControllor.signUp);
router.post('/login', authControllor.login);

module.exports = router;
