const Joi = require("joi");

const descriptionSchema = Joi.object({
  _id: Joi.string().required(),
  descriptionPillName: Joi.string().allow(''),
  descriptionName: Joi.string().required(),
  descriptionPer: Joi.string().allow(''),
  descriptionQuan: Joi.string().allow(''),
  descriptionDur: Joi.string().allow(''),
  description: Joi.string().allow(''),
  selected: Joi.boolean().required(),
});

module.exports = { descriptionSchema };
