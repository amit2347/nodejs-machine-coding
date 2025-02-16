const express = require("express");
const authControllor = require("../controllors/authControllor");
const {
  validateRequest,
} = require("../middlewares/schemaValidationMiddleware");
const authValidationSchema = require("../validators/auth.validationschema");
require("dotenv").config();

const router = express.Router();
router.post(
  "/signUp",
  validateRequest(authValidationSchema.signUpSchema),
  authControllor.signUp
);
router.post(
  "/login",
  validateRequest(authValidationSchema.loginSchema),
  authControllor.login
);

module.exports = router;
