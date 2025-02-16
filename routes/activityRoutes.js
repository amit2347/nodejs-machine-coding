const express = require('express');
const obj = require('../controllors/activityControllor')
const verifyToken = require('../middlewares/authMiddlewares');

const router = express.Router();

console.log(obj)

router.post('/status/:id',verifyToken,obj.updateStatusOfActivity);

module.exports = router;
