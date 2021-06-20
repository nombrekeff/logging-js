/**
* @jest-environment node
*/

const { throwIfNotString } = require('../../../src/lib/utils/type-checks');

describe('throwIfNotString', () => {
    it(`should throw if null`, () => {
        expect(() => throwIfNotString(null, 'prop')).toThrow('"prop" must be a string got: object');
    });
    it(`should throw if number`, () => {
        expect(() => throwIfNotString(1, 'prop')).toThrow('"prop" must be a string got: number');
    });
    it(`should not throw if string`, () => {
        expect(() => throwIfNotString('test', 'prop')).not.toThrow();
    });
});