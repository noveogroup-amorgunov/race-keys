class ConflictException extends Error {
    constructor(msg) {
        super(msg);
        this.status = 409;
        this.message = msg;
    }
    toJSON() {
        return {
            error: this.message
        };
    }
}
ConflictException.prototype.name = ConflictException.name;
module.exports = ConflictException;
