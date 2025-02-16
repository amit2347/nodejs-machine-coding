const Joi = require('joi');

const statusCheckSchema = {
    query : Joi.object({
        dayNo : Joi.number().positive().required()
    })
}
module.exports = {
    statusCheckSchema
}