const { UnprocessableEntityException } = require('../exceptions');

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            Object.values(err.errors).forEach((er) => {
                if (!errors[er.path]) {
                    errors[er.path] = [];
                }
                errors[er.path].push({
                    type: `any.${er.kind}`,
                    message: er.message
                });
            });
            throw new UnprocessableEntityException(errors);
        }
        throw err;
    }
};
