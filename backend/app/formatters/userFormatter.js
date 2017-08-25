module.exports = {
    get(user) {
        return {
            id: user._id,
            login: user.login,
        };
    },

    list(users) {
        return users.map(this.get);
    },
};
