const userFormatter = require('../formatters/userFormatter');

module.exports = {
    async me(ctx) {
        ctx.body = { user: userFormatter.get(ctx.state.user) };
    },
};
