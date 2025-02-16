const express = require('express');

const verifyToken = require('../middlewares/authMiddlewares');
const obj = require('../controllors/activityControllor')
const router = express.Router();
console.log(verifyToken)
console.log(obj)
console.log(router)

router.post('/status/:id',verifyToken,obj.updateStatusOfActivity);

module.exports = router;
