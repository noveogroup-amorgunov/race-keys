class PermissionDeniedException extends Error {
    constructor(msg = 'Permission denied') {
        super(msg);
        this.status = 403;
        this.message = msg;
    }
    toJSON() {
        return {
            error: this.message
        };
    }
}
PermissionDeniedException.prototype.name = PermissionDeniedException.name;
module.exports = PermissionDeniedException;