/**
* @jest-environment node
*/

const loggin = require('../../src');
const LoggerRegistry = require('../../src/lib/registry/logger-registry');
const NotifierRegistry = require('../../src/lib/registry/notifier-registry');

class TestNotifier extends loggin.Notifier {
    constructor(options) {
        super(options, 'test');
    }
    output(log) { }
}

describe('LoggerRegistry', () => {
    const notifierRegistry = new NotifierRegistry();
    const loggerRegistry = new LoggerRegistry(notifierRegistry);

    beforeEach(() => {
        loggerRegistry.clear();
        notifierRegistry.clear();
    })

    it(`should be defined`, () => {
        expect(loggerRegistry).toBeDefined();
    });

    it(`should add`, () => {
        loggerRegistry.add('test-add', 'test-notifier');
        expect(loggerRegistry.search('test-add')).toEqual('test-notifier');
    });

    it(`should register correctly`, () => {
        const registry = loggerRegistry;

        notifierRegistry.register('test', TestNotifier);

        registry.register('test', 'TestNotifier');

        const registryLogger = registry.get('test', {});

        expect(registryLogger).toBeDefined();
        expect(registryLogger).toBeInstanceOf(loggin.Logger);
    });

    it(`should get correctly`, () => {
        const registry = loggerRegistry;
        const registryLogger = registry.get({});

        expect(registryLogger).toBeDefined();
        expect(registryLogger).toBeInstanceOf(loggin.Logger);
    });


    it(`should throw with bad args`, () => {
        const registry = loggerRegistry;
        expect(() => registry.get(true, null)).toThrow();
    });

    it(`should fail with incorrect notifier`, () => {
        const registry = loggerRegistry;
        expect(() => registry.get('buba')).toThrow('found');
    });
});
