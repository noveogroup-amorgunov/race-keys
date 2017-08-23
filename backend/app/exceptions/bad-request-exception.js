class BadRequestException extends Error {
    constructor(msg) {
        super(msg);
        this.status = 400;
        this.message = msg;
    }
    toJSON() {
        return {
            error: this.message
        };
    }
}
BadRequestException.prototype.name = BadRequestException.name;
module.exports = BadRequestException;
