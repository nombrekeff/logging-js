const Notifier = require('../notifier');
const { throwIf } = require('../utils/type-checks');

const EmptyRegistry = require('./empty-registry');

class NotifiersRegistry extends EmptyRegistry {
    constructor() {
        super();
    }

    add(name, instance) {
        throwIf.not.string(name, 'name');
        throwIf.not.constructor(instance, 'instance');
        this._registry[name] = instance;
    }

    register(name, ctor) {
        throwIf.not.string(name, 'name');
        throwIf.not.constructor(ctor, 'ctor');

        const nameUpper = name.toUpperCase();
        const nameLower = name.toLowerCase();

        this._registry[nameLower] = this._registry[nameUpper] = ctor;

        return this;
    }

    get(query, opts = {}) {
        if (query instanceof Notifier) return query;

        const Ctor = this.search(query);
        return new Ctor(opts);
    }

    search(query) {
        throwIf.not.in(query, this._registry, 'Notifier', { additionalMessage: '| Make sure it has been registered using, Notifier.registry' });
        return this._registry[query];
    }

    has(query) {
        return !!this._registry[query];
    }
}

module.exports = NotifiersRegistry;