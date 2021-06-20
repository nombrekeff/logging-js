/**
* @jest-environment node
*/
const loggin = require('../../src/index');
const MockNotifier = require('../mocks/notifier.mock');

describe('loggin.Logger severity filtering (debug)', () => {
    const notifier = new MockNotifier();
    const logger = loggin.logger({
        notifiers: [notifier],
        level: loggin.severity('debug'),
    });

    it(`debug should output correctly`, () => {
        notifier.clear();
        logger.debug('hey', null, { time: 100000000, channel: 'test' });
        expect(notifier.logs.length).toEqual(1);
    });


    it(`info should output correctly`, () => {
        notifier.clear();
        logger.info('hey', null, { time: 100000000, channel: 'test' });
        expect(notifier.logs.length).toEqual(1);
    });
});

describe('loggin.Logger severity filtering (error)', () => {
    const notifier = new MockNotifier();
    const logger = loggin.logger({
        notifiers: [notifier],
        level: 'error',
    });

    it(`debug should not output`, () => {
        notifier.clear();
        logger.level('error');
        logger.debug('hey', null, { time: 100000000, channel: 'test' });
        expect(notifier.logs.length).toEqual(0);
    });

    it(`error should output correctly`, () => {
        notifier.clear();
        logger.error('hey', null, { time: 100000000, channel: 'test' });
        expect(notifier.logs.length).toEqual(1);
    });
});
