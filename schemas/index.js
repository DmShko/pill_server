const {
  checkRegister,
  checkSchemaSubscription,
  emailSchema,
  checkLogin,
} = require("./auth");

const prescriptionSchema = require('./prescription');

module.exports = {
    checkRegister,
    checkSchemaSubscription,
    emailSchema,
    checkLogin,
    prescriptionSchema,
};