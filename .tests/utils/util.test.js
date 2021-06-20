/**
* @jest-environment node
*/
const { isConstructor, getOsUsername } = require('../../src/lib/util');

class TestClass { }

describe('isConstructor', () => {
    it(`works with null`, () => {
        expect(isConstructor(null)).toEqual(false);
    });


    it(`works with invalid constructor`, () => {
        expect(isConstructor({ prototype: { constructor: null } })).toEqual(false);
    });


    it(`works with string`, () => {
        expect(isConstructor('asdads')).toEqual(false);
    });

    it(`works with number`, () => {
        expect(isConstructor(123)).toEqual(false);
    });
    it(`works with class`, () => {
        expect(isConstructor(TestClass)).toEqual(true);
    });
});


describe('getOsUsername', () => {
    it(`works with os.username`, () => {
        const fakeOs = {
            userInfo: () => ({ username: 'manolo' })
        };
        expect(getOsUsername(fakeOs)).toEqual('manolo');
    });
    it(`works without os.username`, () => {
        const fakeOs = {};
        expect(getOsUsername(fakeOs)).toEqual(null);
    });
});