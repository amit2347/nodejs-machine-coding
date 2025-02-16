const express = require('express');
const verifyToken = require('../middlewares/authMiddlewares')
const userControllor = require('../controllors/userControllor')
const userValidationSchema = require('../validators/user.validationschema')
const {
    validateRequest,
  } = require("../middlewares/schemaValidationMiddleware");
const router = express.Router();


router.get('/schedule', validateRequest(userValidationSchema.statusCheckSchema) , verifyToken  ,userControllor.getScheduleDetails);

module.exports = router;
