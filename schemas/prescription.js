const Joi = require("joi");

const prescriptionSchema = Joi.object({
  doctor: Joi.object({name: Joi.string(), phone: Joi.string(), workTime: Joi.string(),}),
  clinic: Joi.object({name: Joi.string(), phone: Joi.string(), workTime: Joi.string(),}),
  status: Joi.array().items(Joi.string()).required(),
  pills: Joi.array().items(Joi.string()).required(),
});

module.exports = prescriptionSchema;