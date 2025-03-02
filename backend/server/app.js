
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${environment}` });

console.log('\n Enviroment cargado ::', `${environment}`);


const ServerClass = require('./src/server_class/serverClass');
const pool = require('./src/api_postgres/create_pool');
const { create_tables } = require('./src/create_tables');

const server = new ServerClass();
server.listen();

create_tables()

process.on('exit', () => {
    pool.end(() => {
        console.log('Pool de conexiones cerrado');
    });
});