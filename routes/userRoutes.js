const express = require('express');
const verifyToken = require('../middlewares/authMiddlewares')
const userControllor = require('../controllors/userControllor')
const router = express.Router();


router.get('/schedule', verifyToken  ,userControllor.getScheduleDetails);

module.exports = router;
