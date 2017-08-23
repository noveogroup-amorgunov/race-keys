class UnauthorizedException extends Error {
    constructor(msg = 'Unauthorized') {
        super(msg);
        this.status = 401;
        this.message = msg;
    }
    toJSON() {
        return {
            error: this.message
        };
    }
}
UnauthorizedException.prototype.name = UnauthorizedException.name;
module.exports = UnauthorizedException;