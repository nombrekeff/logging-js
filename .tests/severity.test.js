/**
* @jest-environment node
*/
let loggin = require('../src/index');

describe('loggin.Severity', () => {
    it(`Class should be defined`, () => {
        expect(loggin.Severity).toBeDefined();
    });

    it(`.severity debug severity works`, () => {
        expect(loggin.severity('debug')).toBeTruthy();
    });

    it(`test severity filtering`, () => {
        let debug = loggin.severity('debug');
        let info = loggin.severity('info');
        expect(debug.canLog(info)).toBe(true);
        expect(info.canLog(debug)).toBe(false);
    });

    it(`test severity filtering (strict))`, () => {
        const debug = loggin.severity('debug', { strict: true });
        const info = loggin.severity('info', { strict: true });

        expect(debug.canLog(debug)).toBe(true);
        expect(debug.canLog(info)).toBe(false);
        expect(info.canLog(debug)).toBe(false);
    });


    it(`.getInt works`, () => {
        const info = loggin.severity('info');
        const debug = loggin.severity('debug');
        expect(info.toInt()).toBe(6);
        expect(debug.toInt()).toBe(7);
    });

    it(`.valueOf works`, () => {
        const info = loggin.severity('info');
        const debug = loggin.severity('debug');
        expect(info.valueOf()).toBe(6);
        expect(debug.valueOf()).toBe(7);
    });
});