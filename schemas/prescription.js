const Joi = require("joi");

const prescriptionSchema = Joi.object({
  _id: Joi.string().empty(''),
  courseName: Joi.string().empty(''),
  doctorName: Joi.string().empty(''),
  docContacts: Joi.string().empty(''),
  clinicName: Joi.string().empty(''),
  clinicContacts: Joi.string().empty(''),
  visitDate: Joi.string().empty(''),
  status: Joi.string().default('not done'),
  selected: Joi.boolean(),
  pills: Joi.array().items(Joi.object({id: Joi.string(),
    pillName: Joi.string().empty(''),
    perDay: Joi.string().empty(''),
    startMonth: Joi.string().empty(''),
    startDay: Joi.string().empty(''),
    quantity: Joi.string().empty(''),
    duration: Joi.string().empty(''),
    description: Joi.string().empty(''),
    selectedPill: Joi.boolean()})),
});
// clinic: Joi.object({name: Joi.string(), phone: Joi.string(), workTime: Joi.string(),}),

module.exports = prescriptionSchema;