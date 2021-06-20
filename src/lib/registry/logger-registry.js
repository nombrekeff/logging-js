const Logger = require('../logger');
const EmptyRegistry = require('./empty-registry');
const { throwIf } = require('../utils/type-checks');

class LoggerRegistry extends EmptyRegistry {
    constructor(notifierRegistry) {
        super();
        this.notifierRegistry = notifierRegistry;
    }

    add(name, notifierName) {
        throwIf.not.string(name, 'name');
        throwIf.not.string(notifierName, 'notifierName');

        this._registry[name] = notifierName;

        return this;
    }

    register(name, notifierName) {
        throwIf.not.string(name, 'name');
        throwIf.not.string(notifierName, 'notifierName');


        const nameUpper = name.toUpperCase();
        const nameLower = name.toLowerCase();

        this._registry[nameUpper] = notifierName;
        this._registry[nameLower] = notifierName;

        return this;
    }

    get(opts, args = {}) {
        const badArgs = typeof opts !== 'string' && typeof opts !== 'object';

        if (badArgs) throw new Error('Bad arguments for .logger');
        if (typeof opts === 'object') return new Logger(opts);

        const notifierExists = this.notifierRegistry.has(opts);
        if (!notifierExists) throw new Error(`Notifier ${opts} not found`);

        const notifier = this.notifierRegistry.get(opts, args);
        args.notifiers = [notifier];
        return new Logger(args);
    }

    search(query) {
        throwIf.not.in(query, this._registry, 'Logger', { additionalMessage: '| Make sure it has been registered using, Logger.registry' });
        return this._registry[query];
    }

    has(query) {
        return !!this._registry[query];
    }
}

module.exports = LoggerRegistry;