const Joi = require("joi");

const descriptionSchema = Joi.object({
  _id: Joi.string().required(),
  descriptionPillName: Joi.string().required(),
  descriptionName: Joi.string().required(),
  descriptionPer: Joi.string().required(),
  descriptionQuan: Joi.string().required(),
  descriptionDur: Joi.string().required(),
  description: Joi.string().allow(''),
  selected: Joi.boolean().required(),
});

module.exports = { descriptionSchema };
