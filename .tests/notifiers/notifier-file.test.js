/**
* @jest-environment node
*/
const loggin = require('../../src/index');
const fs = require('fs');
const Pipe = require('../../src/plugins/pipe');
const filePath = './logs/test-file.log';
const fileErrorPath = './logs/error-file.log';

describe('loggin.Notifier.File tests', () => {
    it(`should be registered`, () => {
        expect(loggin.Notifier.registry.has('file')).toBeDefined();
    });

    it(`should construct notifier correctly`, () => {
        expect(() => {
            const notif = loggin.Notifier.registry.get('file', {});
        }).not.toThrow();
    });

    beforeEach(() => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    it(`should log correctly to file`, () => {
        const notif = loggin.notifier('file', {
            pipes: [new Pipe(loggin.severity('debug'), filePath)]
        });
        notif.pipe(loggin.severity('error'), fileErrorPath);

        const log = new loggin.Log('Test', null, loggin.severity('DEBUG'));
        notif.output(log.message, log);

        const fileData = fs.readFileSync(filePath).toString().trim();
        expect(fileData).toEqual('Test');
    });
});