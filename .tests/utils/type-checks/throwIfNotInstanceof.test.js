/**
* @jest-environment node
*/

const { throwIfNotInstanceof } = require('../../../src/lib/utils/type-checks');

describe('throwIfNotInstanceof', () => {
    it(`should throw if null`, () => {
        expect(() => throwIfNotInstanceof(null, Number, 'prop', 'type')).toThrow('"prop" must be an instance of: type');
    });
    it(`should throw if string`, () => {
        expect(() => throwIfNotInstanceof('aa', Number, 'prop', 'type')).toThrow('"prop" must be an instance of: type');
    });
    it(`should not throw if number`, () => {
        class Test { }
        expect(() => throwIfNotInstanceof(new Test(1), Test, 'prop', 'type')).not.toThrow();
    });
});