const Joi = require("joi");

const statisticSchema = Joi.object({_id: Joi.string(), pillName: Joi.string(), 
  dateNumber: Joi.string(),
  month: Joi.string(),
  done: Joi.number(),
  status: Joi.boolean(),
  reschedule: Joi.boolean(),});

  const patchStatisticSchema = Joi.object({
    
    key: Joi.string(),
    value: Joi.number(),

  });

module.exports = {statisticSchema, patchStatisticSchema};