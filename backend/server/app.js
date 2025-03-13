
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${environment}` });


const ServerClass = require('./src/server_class/serverClass');
const pool = require('./src/api_postgres/create_pool');
const { create_tables } = require('./src/api_postgres/create_tables');

const server = new ServerClass();
server.listen();

create_tables({ initTables: false })


process.on('exit', () => {
    pool.end(() => console.log('Pool de conexiones cerrado'));
});