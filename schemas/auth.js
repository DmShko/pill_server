const Joi = require("joi");

const checkRegister = Joi.object({
    
    name: Joi.string().required(),
    email: Joi.string().pattern(/\w{0}[0-9a-zA-Za-яА-Я]+@\w{0}[0-9a-zA-Za-яА-Я]+\.\w{0}[0-9a-zA-Za-яА-Я]/).required(),
    password: Joi.string().min(8).required(),

});

// for reverificate email
const emailSchema = Joi.object({
    email: Joi.string().pattern(/\w{0}[0-9a-zA-Za-яА-Я]+@\w{0}[0-9a-zA-Za-яА-Я]+\.\w{0}[0-9a-zA-Za-яА-Я]/).required(),
});

const checkLogin = Joi.object({

    email: Joi.string().pattern(/\w{0}[0-9a-zA-Za-яА-Я]+@\w{0}[0-9a-zA-Za-яА-Я]+\.\w{0}[0-9a-zA-Za-яА-Я]/).required(),
    password: Joi.string().min(8).required(),

});

module.exports = {
    checkRegister,
    emailSchema,
    checkLogin,
};