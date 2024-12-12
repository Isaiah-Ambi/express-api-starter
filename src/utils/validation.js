const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.object()
            .min(3)
            .max(20)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.string()
            .valid('user', 'admin')
            .optional()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation
};