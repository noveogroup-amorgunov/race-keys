const userFormatter = require('../formatters/user-formatter');

module.exports = {
    async me(ctx) {
        ctx.body = { user: userFormatter.get(ctx.state.user) };
    },
};
