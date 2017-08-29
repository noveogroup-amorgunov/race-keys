class SocketException extends Error {
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
SocketException.prototype.name = SocketException.name;
module.exports = SocketException;
