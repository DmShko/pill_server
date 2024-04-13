const {
  checkRegister,
  emailSchema,
  checkLogin,
} = require("./auth");

const prescriptionSchema = require('./prescription');

module.exports = {
    checkRegister,
    emailSchema,
    checkLogin,
    prescriptionSchema,
};