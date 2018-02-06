const DB_NAME = 'tests-express-sqlite';
const Fs = require('fs');
const Path = require('path');
const Sqlite = require('sqlite3');

try {
    Fs.unlinkSync(`./${DB_NAME}`);
}
catch (_ign) {}

let DB;
const initAll = function (name) {

    DB = new Sqlite.Database(name || DB_NAME);

    const init = Fs.readFileSync(Path.join(process.cwd(), './database/init.sql'), 'utf-8');

    DB.exec(init);
};

initAll();

module.exports = DB;
module.exports.initAll = initAll;