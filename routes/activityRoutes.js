const express = require('express');
const obj = require('../controllors/activityControllor')
const verifyToken = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/status/:id',verifyToken,obj.updateStatusOfActivity);

module.exports = router;
