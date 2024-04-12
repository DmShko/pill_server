const Joi = require("joi");

const checkRegister = Joi.object({

    email: Joi.string().pattern(/\w{0}[a-zA-Za-яА-Я]+\d{0}[0-9]+\@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/).required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),

});

const checkSchemaSubscription = Joi.object({
    subscription: Joi.boolean().valid("starter", "pro", "business").required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(/\w{0}[a-zA-Za-яА-Я]+\d{0}[0-9]+\@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/).required(),
});

const checkLogin = Joi.object({

    email: Joi.string().pattern(/\w{0}[a-zA-Za-яА-Я]+\d{0}[0-9]+\@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]/).required(),
    password: Joi.string().min(8).required(),

});

module.exports = {
    checkRegister,
    checkSchemaSubscription,
    emailSchema,
    checkLogin,
};