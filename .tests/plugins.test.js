/**
* @jest-environment node
*/

const { Notifier, Logger, Formatter, Severity } = require('../src/index');

const AdditionalNotifiers = ['Console', 'File', 'Http', 'Memory'];
const AdditionalLoggers = AdditionalNotifiers.map(el => el.toLocaleLowerCase());
const AdditionalFormatters = ['SHORT', 'MEDIUM', 'LONG', 'DETAILED', 'MINIMAL', 'JSON'];
const AdditionalSeverities = ['EMERGENCY', 'ALERT', 'CRITICAL', 'ERROR', 'WARNING', 'NOTICE', 'INFO', 'DEBUG', 'SILLY',];

describe('AdditionalNotifiers', () => {
    it(`should be registered`, () => {
        for (let notifName of AdditionalNotifiers) {
            expect(Notifier.registry.has(notifName)).toBeDefined();
        }
    });
});

describe('AdditionalLoggers', () => {
    it(`should be registered`, () => {
        for (let loggerName of AdditionalLoggers) {
            expect(Logger.registry.has(loggerName)).toBeDefined();
        }
    });
});

describe('AdditionalFormatters', () => {
    it(`should be registered`, () => {
        for (let formatterName of AdditionalFormatters) {
            expect(Formatter.registry.has(formatterName)).toBeDefined();
        }
    });
});

describe('AdditionalSeverities', () => {
    it(`should be registered`, () => {
        for (let severityName of AdditionalSeverities) {
            expect(Severity.registry.has(severityName)).toBeDefined();
        }
    });
});
