

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_user,
    host: process.env.POSTGRES_host,
    database: process.env.POSTGRES_database,
    password: process.env.POSTGRES_password,
    port: process.env.POSTGRES_port,
});

module.exports = pool;
