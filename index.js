'use strict';
const Express = require('express');
const BP = require('body-parser');

const Joi = require('joi');
const Celebrate = require('celebrate');

const DB = require('./db.js');

const app = Express();

app.use(BP.json());

app.get('/posts', (req, res, next) => {

    console.log('GET /posts');
    DB.all('SELECT * FROM POSTS', (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

app.get('/posts/:id', (req, res, next) => {

    DB.get('SELECT * FROM POSTS WHERE ID = ?', [req.params.id], (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

app.post('/posts', Celebrate.celebrate(
    {
        body: Joi.object().keys({
            title: Joi.string().required(),
            content: Joi.string().required()
        })
    }
    ),
    (req, res, next) => {

        console.log('INSERT new post ' + req.body.title);
        DB.run('INSERT INTO POSTS (TITLE, CONTENT) VALUES (?, ?)', [req.body.title, req.body.content], (err) => {

            if (err) {
                return next(err);
            }
            res.status(201);
            res.end();
        });
    });

app.patch('/posts/:id', (req, res, next) => {

    DB.run('UPDATE POSTS SET TITLE=?, CONTENT=? WHERE ID = ?', [req.body.title, req.body.content, req.params.id], (err) =>{

        if (err) {
            return next(err);
        }
        res.end();
    });
});

app.delete('/posts/:id', (req, res, next) => {

    DB.run('DELETE FROM POSTS WHERE ID = ?', [req.params.id], (err) => {

        if (err) {
            return next(err);
        }
        return res.end();
    });
});

app.listen(8080, (err) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log('app listening on port 8080');
    }
});

