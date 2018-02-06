'use strict';
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab  = module.exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;

describe('math', () => {

    describe('add', () => {

        it('returns true when 1 + 1 equals 2', (done) => {

            expect(1 + 1).to.equal(2);
            done();
        });
    });

    it('should return 42', (done) => {

        expect(6 * 7).to.equal(42);
        done();
    });
});

