const Joi = require("joi");

const statisticSchema = Joi.object({pillName: Joi.string(), day: Joi.object({position: Joi.string(),
  dateNumber: Joi.string(),
  month: Joi.string(),
  done: Joi.number(),
  status: Joi.boolean()}),});

module.exports = {statisticSchema};