'use strict';
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab  = module.exports.lab = Lab.script();

const Supertest = require('supertest');
const Express = require('express');
const PostRouter = require('../../routes/posts.js').router;
const DB = require('../../db.js');

const describe = lab.describe;
const it = lab.it;

describe('posts', () => {

    describe('list', () => {

        it('should return the list of posts in database', (done) => {

            DB.initAll();
            const app = Express();
            app.use('/posts', PostRouter);
            Supertest(app)
                .get('/posts')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    expect(body).to.be.an.array();
                    expect(body).to.have.length(2);
                    done();
                });
        });
    });
});

