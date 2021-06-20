class EmptyRegistry {
    constructor() {
        this._registry = {};
    }

    /* istanbul ignore next */
    clear() {
        this._registry = {};
    }

    /* istanbul ignore next */
    add() {
        throw new Error('EmptyRegistry, this should not happen... yaiks!');
    }

    /* istanbul ignore next */
    register() {
        throw new Error('EmptyRegistry, this should not happen... yaiks!');
    }

    /* istanbul ignore next */
    get() {
        throw new Error('EmptyRegistry, this should not happen... yaiks!');
    }

    /* istanbul ignore next */
    search() {
        throw new Error('EmptyRegistry, this should not happen... yaiks!');
    }
}

module.exports = EmptyRegistry;