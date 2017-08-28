const Joi = require('joi');

module.exports = {
    login() {
        return {
            body: Joi.object().keys({
                login: Joi.string().required(),
                password: Joi.string().required()
            })
        };
    },
    signup() {
        return {
            body: Joi.object().keys({
                login: Joi.string().required(),
                password: Joi.string().required(),
                carImage: Joi.string().optional(),
            })
        };
    },
};
