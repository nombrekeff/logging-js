/**
* @jest-environment node
*/

const loggin = require('../../src');
const NotifierRegistry = require('../../src/lib/registry/notifier-registry');

class TestNotifier extends loggin.Notifier {
    constructor(options) {
        super(options, 'test');
    }
    output(log) { }
}

describe('LoggerRegistry', () => {
    const notifierRegistry = new NotifierRegistry();

    beforeEach(() => {
        notifierRegistry.clear();
    })

    it(`should be defined`, () => {
        expect(notifierRegistry).toBeDefined();
    });

    it(`should add`, () => {
        notifierRegistry.add('test-add', TestNotifier);
        expect(notifierRegistry.search('test-add')).toEqual(TestNotifier);
    });

    it(`should register correctly`, () => {
        const registry = notifierRegistry;

        registry.register('test', TestNotifier);

        const registryNotifier = registry.get('test');

        expect(registryNotifier).toBeDefined();
        expect(registryNotifier).toBeInstanceOf(loggin.Notifier);
    });


    it(`should throw with bad args`, () => {
        const registry = notifierRegistry;
        expect(() => registry.get(true, null)).toThrow();
    });


    it(`should return notifier if arg instance of Notifier`, () => {
        const registry = notifierRegistry;
        expect(registry.get(new TestNotifier())).toBeInstanceOf(TestNotifier);
    });

    it(`should fail with incorrect notifier`, () => {
        const registry = notifierRegistry;
        expect(() => registry.get('buba')).toThrow('found');
    });
});
