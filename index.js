'use strict';
const Express = require('express');
const BP = require('body-parser');

const app = Express();

app.use(BP.json());

app.use('/posts', require('./routes/posts').router);
app.use(require('./routes/users').router);

app.listen(8080, (err) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log('app listening on port 8080');
    }
});

