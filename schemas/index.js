const {
  checkRegister,
  emailSchema,
  checkLogin,
} = require("./auth");

const { prescriptionSchema, patchSchema } = require('./prescription');
const { statisticSchema } = require('./statistic');

module.exports = {
    checkRegister,
    emailSchema,
    checkLogin,
    prescriptionSchema,
    statisticSchema,
    patchSchema,
};