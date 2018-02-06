'use strict';
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab  = module.exports.lab = Lab.script();

const after = lab.after;
const before = lab.before;
const describe = lab.describe;
const it = lab.it;

describe('math', () => {

    before(() => {});

    after(() => {});

    it('returns true when 1 + 1 equals 2', () => {

        expect(1 + 1).to.equal(2);
    });
});

