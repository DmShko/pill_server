const Joi = require("joi");

const descriptionSchema = Joi.object({_id: Joi.string().required(), descriptionName: Joi.string().required(), description: Joi.string().required(), selected: Joi.boolean().required(), });

module.exports = {descriptionSchema};