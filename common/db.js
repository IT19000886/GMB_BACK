'user strict';

var dbConfig = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    requestTimeout: 500000,
    connectionTimeout: 150000,
    pool: {
        min: 5
    },
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};
module.exports = dbConfig;