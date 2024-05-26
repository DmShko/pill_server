const {
  checkRegister,
  emailSchema,
  checkLogin,
} = require("./auth");

const { prescriptionSchema, patchSchema } = require('./prescription');
const { statisticSchema, patchStatisticSchema } = require('./statistic');
const { descriptionSchema } = require('./description');

module.exports = {
    checkRegister,
    emailSchema,
    checkLogin,
    prescriptionSchema,
    statisticSchema,
    patchSchema,
    patchStatisticSchema,
    descriptionSchema,
};