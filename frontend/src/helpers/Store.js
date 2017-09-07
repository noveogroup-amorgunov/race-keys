/* eslint no-underscore-dangle: 0 */
import assign from 'lodash.assign';

let instance = null;

/**
 * Storage is singelton for caching data by key
 */
const Store = function Store() {
    if (instance instanceof Store) {
        return instance;
    }
    instance = this;

    // memory storage init once (when running the app)
    this._storage = {};
};

assign(Store.prototype, {
    _serialize(value) {
        return JSON.stringify(value);
    },
    _deserialize(value) {
        if (typeof value !== 'string') { return value; }
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },
    put(key, value, { serialize = true } = {}) {
        this._storage[key] = serialize ? this._serialize(value) : value;
        return this;
    },
    has(key) {
        return typeof this._storage[key] !== 'undefined';
    },
    find(key) {
        return this._deserialize(this._storage[key]);
    },
    remove(key) {
        const value = this._storage[key];
        delete this._storage[key];
        return typeof value !== 'undefined';
    },
    clear() {
        this._storage = {};
        return this;
    }
});

export default Store;
export { Store };
