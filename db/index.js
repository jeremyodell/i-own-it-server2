'use strict';


// pg-promise initialization options:
const initOptions = {



};
const conString = "postgres://jeremy:Alicia12@localhost:5432/products";
// Database connection parameters:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'products',
    user: 'jeremy',
    password: 'Alicia12',
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')();

// Create the database instance:
const db = pgp(config);

// Load and initialize optional diagnostics:
// const diagnostics = require('./diagnostics');
// diagnostics.init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;