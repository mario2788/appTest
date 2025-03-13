

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


class ServerClass {

    constructor() {

        // Servidor
        this.app = express()
        this.port = process.env.SERVER_port

        // path base
        this.basePath = '/api/app'

        // Rutas generales
        this.testPath = '/test'
        this.logout = '/logout'
        this.precios = '/precios'
        this.rutas = '/rutas'
        this.updatePrecios = '/updatePrecios'
        this.direcciones = '/direcciones'

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()
    }

    middlewares() {

        // CORS
        this.app.use(
            cors({
                origin: ['localhost:3000'],
                methods: process.env.NODE_ENV === 'development'
                    ? ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
                    : ['OPTIONS', 'HEAD', 'GET'],
                allowedHeaders: [
                    'Content-Type',
                    'Authorization',
                    'Pragma',
                ],
            })
        );

        // Lectura y parseo del body
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(`${this.basePath}${this.testPath}`, require('../routes/test_route'))
        this.app.use(`${this.basePath}${this.logout}`, require('../routes/logout_route'))
        this.app.use(`${this.basePath}${this.precios}`, require('../routes/precios_huevos_route'))
        this.app.use(`${this.basePath}${this.updatePrecios}`, require('../routes/update_precios_route'))
        this.app.use(`${this.basePath}${this.rutas}`, require('../routes/rutas_route'))
        this.app.use(`${this.basePath}${this.direcciones}`, require('../routes/direcciones_route'))
    }

    listen() {

        this.app.listen(this.port, () => {

            console.clear()

            console.log(
                "\n\n   Logs - server",
                "\n\n   Puerto: ", this.port,
                "\n\n"
            );
        });
    }
}

module.exports = ServerClass
