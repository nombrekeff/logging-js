/**
* @jest-environment node
*/
let loggin = require('../src/index');

describe('loggin.Log', () => {
    it(`Class should be defined`, () => {
        expect(loggin.Log).toBeDefined();
    });

    it(`error if no level passed`, () => {
        expect(() => {
            new loggin.Log('test');
        }).toThrow(`'level' must be an instance of Severity`);
    });

    it(`should have methods`, () => {
        let log = new loggin.Log("test", null, loggin.Severity.registry.get('debug'));
        expect(() => {
            ['format'].forEach(fn => {
                if (typeof log[fn] !== 'function') {
                    throw new Error(fn + ' is not a method in log');
                }
            });
        }).not.toThrow();
    });
});