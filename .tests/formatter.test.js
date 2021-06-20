/**
* @jest-environment node
*/
const loggin = require('../src/index');

describe('loggin.Formatter', () => {
    const log = new loggin.Log('message', null, loggin.severity('debug'), 'test');
    it(`Class should be defined`, () => {
        expect(loggin.Formatter).toBeDefined();
    });

    it(`construct formatter correctly`, () => {
        expect(() => {
            loggin.formatter('minimal');
        }).not.toThrow();
    });

    it(`should have methods`, () => {
        let formatter = loggin.formatter('minimal');
        expect(() => {
            ['formatLog'].forEach(fn => {
                if (typeof formatter[fn] !== 'function') {
                    throw new Error(fn + ' is not a method in formatter');
                }
            });
        }).not.toThrow();
    });

    it(`.formatLog should work correctly`, () => {
        let formatter = loggin.formatter('minimal');
        let formattedLog = formatter.formatLog(log);
        expect(formattedLog).toEqual("test - message");
    });

    it(`.formatLog should work correctly with color`, () => {
        let formatter = loggin.formatter('minimal');
        let formattedLog = formatter.formatLog(log, { color: true });
        expect(formattedLog).toEqual("test - message");
    });

    it(`.create errors with no template`, () => {
        expect(() => {
            loggin.Formatter.create();
        }).toThrow('"template" must be a string got: undefined');
    });

    it(`.register errors with no name`, () => {
        expect(() => {
            loggin.Formatter.registry.register();
        }).toThrow('"name" must be a string got: undefined');
    });


    it(`.format errors with no parameters`, () => {
        expect(() => {
            loggin.Formatter.format();
        }).toThrow('"log" and "formatter" parameters are required');
    });

    it(`.format errors with no formatter`, () => {
        expect(() => {
            loggin.Formatter.format(log);
        }).toThrow('"log" and "formatter" parameters are required');
    });

    it(`.format errors with incorrect formatter`, () => {
        expect(() => {
            loggin.Formatter.format(log, {});
        }).toThrow('"formatter" must be a Formatter instance');
    });

    it(`.format errors with incorrect formatter template`, () => {
        expect(() => {
            loggin.Formatter.format(log, new loggin.Formatter(null));
        }).toThrow('"formatter" should be type: "StrifTemplate", not: object');
    });
})