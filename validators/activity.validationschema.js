const Joi = require('joi');

const statusSchema = {
    params : Joi.object({
        id : Joi.number().positive().required()
    })
}
module.exports = {
    statusSchema
}