/**
* @jest-environment node
*/

const loggin = require('../../src');
const SeverityRegistry = require('../../src/lib/registry/severity-registry');

describe('severityRegistry', () => {
    const severityRegistry = new SeverityRegistry();

    beforeEach(() => {
        severityRegistry.clear();
    })

    it(`should be defined`, () => {
        expect(severityRegistry).toBeDefined();
    });

    it(`should add`, () => {
        const severity = new loggin.Severity(0, 'test');
        severityRegistry.add('test-add', severity);
        expect(severityRegistry.search('test-add')).toEqual(severity);
    });

    it(`should register correctly`, () => {
        const registry = severityRegistry;

        registry.register(1, 'test');

        const registrySeverity = registry.get('test');

        expect(registrySeverity).toBeDefined();
        expect(registrySeverity).toBeInstanceOf(loggin.Severity);
    });

    it(`should get correctly with string`, () => {
        const registry = severityRegistry;
        registry.register(1, 'test');

        const registrySeverity = registry.get('test');

        expect(registrySeverity).toBeDefined();
        expect(registrySeverity).toBeInstanceOf(loggin.Severity);
    });

    it(`should throw with bad args`, () => {
        const registry = severityRegistry;
        expect(() => registry.get(true, null)).toThrow();
    });

    it(`should fail with incorrect notifier`, () => {
        const registry = severityRegistry;
        expect(() => registry.get('buba')).toThrow('found');
    });
});
