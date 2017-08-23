class UnprocessableEntityException extends Error {
    constructor(msg = 'Unprocessable Entity') {
        super(msg);
        this.status = 422;
        this.message = msg;
    }
    toJSON() {
        return {
            errors: this.message
        };
    }
}
UnprocessableEntityException.prototype.name = UnprocessableEntityException.name;
module.exports = UnprocessableEntityException;