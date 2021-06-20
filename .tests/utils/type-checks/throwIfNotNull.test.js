/**
* @jest-environment node
*/

const { throwIfNull } = require('../../../src/lib/utils/type-checks');

describe('throwIfNull', () => {
    it(`should throw if null`, () => {
        expect(() => throwIfNull(123, 'prop')).not.toThrow();
    });
    it(`should throw if string`, () => {
        expect(() => throwIfNull('aa', 'prop')).not.toThrow();
    });
    it(`should not throw if number`, () => {
        expect(() => throwIfNull(null, 'prop')).toThrow('"prop" must not be null');
    });
});