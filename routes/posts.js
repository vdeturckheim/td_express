'use strict';
const Express = require('express');

const router = Express.Router();

router.get('/posts', (req, res, next) => {

    console.log('GET /posts');
    DB.all('SELECT * FROM POSTS', (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

router.get('/posts/:id', (req, res, next) => {

    DB.get('SELECT * FROM POSTS WHERE ID = ?', [req.params.id], (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

router.post('/posts', Celebrate.celebrate(
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

router.patch('/posts/:id', (req, res, next) => {

    DB.run('UPDATE POSTS SET TITLE=?, CONTENT=? WHERE ID = ?', [req.body.title, req.body.content, req.params.id], (err) =>{

        if (err) {
            return next(err);
        }
        res.end();
    });
});

router.delete('/posts/:id', (req, res, next) => {

    DB.run('DELETE FROM POSTS WHERE ID = ?', [req.params.id], (err) => {

        if (err) {
            return next(err);
        }
        return res.end();
    });
});


module.exports.router = router;