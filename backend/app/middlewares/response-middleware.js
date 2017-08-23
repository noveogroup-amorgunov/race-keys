module.exports = async (ctx, next) => {
    await next();
    if (ctx.status > 399) {
        return;
    }
    if (ctx.body && !ctx.state.ignoreBody) {
        ctx.body = { data: ctx.body };
        if (ctx.state.meta) {
            ctx.body.meta = ctx.state.meta;
        }
    }
};
