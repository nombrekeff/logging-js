const Formatter = require('../formatter');
const { throwIf } = require('../utils/type-checks');
const EmptyRegistry = require('./empty-registry');

class FormatterRegistry extends EmptyRegistry {
    constructor() {
        super();
    }

    add(name, instance) {
        this._registry[name] = instance;
    }

    register(name, template, options = {}) {
        throwIf.not.string(name, 'name');

        const formatter = Formatter.create(template, options);

        const nameUpper = name.toUpperCase();
        const nameLower = name.toLowerCase();

        this._registry[nameLower] = this._registry[nameUpper] = formatter;


        return this;
    }

    get(query) {
        if (query instanceof Formatter) return query;
        throwIf.not.string(query, 'query');
        return this.search(query);
    }

    search(query) {
        throwIf.not.in(query, this._registry, 'Formatter', { additionalMessage: '| Make sure it has been registered using, Formatter.registry' });

        return this._registry[query];
    }

    has(query) {
        return !!this._registry[query];
    }
}

module.exports = FormatterRegistry;