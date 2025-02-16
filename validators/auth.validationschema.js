// validationSchemas.js
const Joi = require("joi");

const signUpSchema = {
  body: Joi.object({
    emailId: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("(?=.*[A-Z])")) // At least one uppercase letter
      .pattern(new RegExp("(?=.*[a-z])")) // At least one lowercase letter
      .pattern(new RegExp("(?=.*[0-9])")) // At least one number
      .pattern(new RegExp("(?=.*[!@#$%^&*])")) // At least one special character
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long.",
        "string.pattern.base":
          "Password must include an uppercase letter, a lowercase letter, a number, and a special character.",
        "string.empty": "Password is required.",
      }),
  }),
};

const loginSchema = {
  body: Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("(?=.*[A-Z])")) // At least one uppercase letter
      .pattern(new RegExp("(?=.*[a-z])")) // At least one lowercase letter
      .pattern(new RegExp("(?=.*[0-9])")) // At least one number
      .pattern(new RegExp("(?=.*[!@#$%^&*])")) // At least one special character
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long.",
        "string.pattern.base":
          "Password must include an uppercase letter, a lowercase letter, a number, and a special character.",
        "string.empty": "Password is required.",
      }),
  }),
};
module.exports = {
  signUpSchema,
  loginSchema,
};
