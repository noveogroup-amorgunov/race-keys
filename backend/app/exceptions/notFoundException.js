class NotFoundException extends Error {
    constructor(msg = 'Not Found') {
        super(msg);
        this.status = 404;
        this.message = msg;
    }
    toJSON() {
        return {
            error: this.message
        };
    }
}
NotFoundException.prototype.name = NotFoundException.name;
module.exports = NotFoundException;
