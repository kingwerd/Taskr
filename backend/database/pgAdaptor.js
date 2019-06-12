const pgPromise = require('pg-promise');
const pgp = pgPromise({});

const connectionString = 'postgres://postgres:root@localhost:5432/taskr';

db.conn = pgp(connectionString);

exports.db = db;
