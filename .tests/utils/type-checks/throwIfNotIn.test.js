/**
* @jest-environment node
*/

const { throwIfNotIn } = require('../../../src/lib/utils/type-checks');

describe('throwIfNotIn', () => {
    it(`should throw if null`, () => {
        expect(() => throwIfNotIn('test', {}, 'prop')).toThrow('prop with name "test" not found undefined');
    });
    it(`should not throw if string`, () => {
        expect(() => throwIfNotIn('test', { test: 'aaa' }, 'prop')).not.toThrow();
    });
});