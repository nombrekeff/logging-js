/**
* @jest-environment node
*/

const { throwIfNotConstructor } = require('../../../src/lib/utils/type-checks');

describe('throwIfNotConstructor', () => {
    it(`should throw if null`, () => {
        expect(() => throwIfNotConstructor(null, 'prop')).toThrow('"prop" must be a constructor function got: object');
    });
    it(`should throw if string`, () => {
        expect(() => throwIfNotConstructor('aa', 'prop')).toThrow('"prop" must be a constructor function got: string');
    });
    it(`should not throw if number`, () => {
        expect(() => throwIfNotConstructor(class { }, 'prop')).not.toThrow();
    });
});