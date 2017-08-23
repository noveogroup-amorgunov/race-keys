const _ = require('lodash');
const Joi = require('joi');
const { UnprocessableEntityException } = require('../exceptions');

module.exports = rules => async (ctx, next) => {
    const request = {};

    if (!(ctx.request.method === 'GET' || ctx.request.method === 'DELETE')) {
        request.body = ctx.request.body;
    }

    if (!_.isEmpty(ctx.params)) {
        request.params = ctx.params;
    }

    if (!_.isEmpty(ctx.query)) {
        request.query = ctx.query;
    }

    const result = Joi.validate(request, rules(), {
        abortEarly: false,
        stripUnknown: false
    });

    if (result.error) {
        const errors = {};
        result.error.details.forEach((e) => {
            if (!errors[e.path]) {
                errors[e.path] = [];
            }
            errors[e.path].push({
                type: e.type,
                message: e.message
            });
        });
        throw new UnprocessableEntityException(errors);
    }
    await next();
};
