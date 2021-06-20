const loggin = require('../../src/index');

describe('loggin.Logger strict', () => {
    it(`.strict(true) should work`, () => {
        const debug = loggin.severity('debug');
        const info = loggin.severity('info');

        const logger =
            loggin
                .logger('console')
                .level(debug)
                .strict();

        expect(logger.canLog(debug)).toBe(true);
        expect(logger.canLog(info)).toBe(false);
    });

    it(`.strict(false) should work`, () => {
        const debug = loggin.severity('debug');
        const info = loggin.severity('info');

        const logger =
            loggin
                .logger('console')
                .level(debug);

        expect(logger.canLog(debug)).toBe(true);
        expect(logger.canLog(info)).toBe(true);
    });
});
