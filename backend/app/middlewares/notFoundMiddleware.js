module.exports = (ctx) => {
    ctx.status = 404;
    ctx.body = {
        status: 404,
        error: `Unable to resolve the request '${ctx.path}'`
    };
};
