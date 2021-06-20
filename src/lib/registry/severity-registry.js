const Severity = require('../severity');
const EmptyRegistry = require('./empty-registry');
const { throwIf } = require('../utils/type-checks');

class SeverityRegistry extends EmptyRegistry {
    constructor() {
        super();
    }

    add(name, instance) {
        throwIf.not.string(name, 'name');
        throwIf.not.instanceof(instance, Severity, 'instance', 'Severity');

        this._registry[name] = instance;
    }

    register(level, name) {
        throwIf.not.string(name, 'name');
        throwIf.not.number(level, 'level');

        const severity = new Severity(level, name);

        const nameUpper = name.toUpperCase();
        const nameLower = name.toLowerCase();

        this._registry[nameUpper] = severity;
        this._registry[nameLower] = severity;

        return this;
    }

    get(query) {
        if (query instanceof Severity) return query;
        return this.search(query);
    }

    search(query) {
        throwIf.not.in(query, this._registry, 'Severity', { additionalMessage: '| Make sure it has been registered using, Severity.registry' });
        return this._registry[query];
    }

    has(query) {
        return !!this._registry[query];
    }
}

module.exports = SeverityRegistry;