/**
* @jest-environment node
*/

const { throwIfNotNumber } = require('../../../src/lib/utils/type-checks');

describe('throwIfNotNumber', () => {
    it(`should throw if null`, () => {
        expect(() => throwIfNotNumber(null, 'prop')).toThrow('"prop" must be a number got: object');
    });
    it(`should throw if string`, () => {
        expect(() => throwIfNotNumber('aa', 'prop')).toThrow('"prop" must be a number got: string');
    });
    it(`should not throw if number`, () => {
        expect(() => throwIfNotNumber(123, 'prop')).not.toThrow();
    });
});