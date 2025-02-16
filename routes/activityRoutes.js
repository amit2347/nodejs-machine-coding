const express = require('express');
const obj = require('../controllors/activityControllor')
const verifyToken = require('../middlewares/authMiddlewares');
const {
    validateRequest,
  } = require("../middlewares/schemaValidationMiddleware");
  const activityValidationSchdema = require("../validators/activity.validationschema");
const router = express.Router();

router.post('/status/:id',validateRequest(activityValidationSchdema.statusSchema), verifyToken,obj.updateStatusOfActivity);

module.exports = router;
