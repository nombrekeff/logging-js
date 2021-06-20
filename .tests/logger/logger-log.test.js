/**
* @jest-environment node
*/
const loggin = require('../../src/index');
const MockNotifier = require('../mocks/notifier.mock');


describe('loggin.Logger logging tests', () => {
    let notifier = new MockNotifier();
    let logger = loggin.logger({
        notifiers: [notifier],
        level: loggin.severity('silly')
    });

    it(`should output correctly`, () => {
        logger.debug('hey', null, { time: 100000000, channel: 'test' });
        expect(notifier.logs.length).toEqual(1);
    });

    let severities = Object.keys(loggin.Severity.registry._registry)
        .map(s => String.prototype.toLowerCase.call(s));

    for (let severity of severities) {
        it(`logger.${severity} should output correctly`, () => {
            notifier.clear();
            logger[severity]('hey', null, { time: 100000000, channel: 'test', user: 'keff' });
            expect(notifier.logs.length).toEqual(1);
            expect(notifier.logs[0]).toMatchObject(
                loggin.Log.fromObject({ level: loggin.severity(severity), time: 100000000, channel: 'test', message: 'hey', data: null, user: 'keff' })
            );
        });
    }

    it(`hooks should work on log`, () => {
        let preNotify = jest.fn((v) => v);
        let ignore = jest.fn(() => false);
        let logger = loggin.logger({
            notifiers: [new MockNotifier()],
            preNotify,
            ignore,
            level: 'DEBUG'
        });

        logger.debug('hey hey');
        expect(preNotify).toHaveBeenCalled();
        expect(ignore).toHaveBeenCalled();
    });
});