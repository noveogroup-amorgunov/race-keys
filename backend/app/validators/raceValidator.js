const Joi = require('joi');

module.exports = {
    getRace() {
        return {
            params: Joi.object().keys({
                id: Joi.objectId().required(),
            }),
        };
    },
};
