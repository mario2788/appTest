
// require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const csrf = require('csrf');
const cookieParser = require('cookie-parser');

// middlewares
const { keycloakTokenVerify } = require('../middlewares/keycloakTokenVerify');
const { makeCookieCSRF } = require('../middlewares/makeCookieCSRF');
const { csrfTokenVerify } = require('../middlewares/csrfTokenVerify');
const { timeMonitor } = require('../middlewares/timeMonitor');
const AnomalyDetector = require('../middlewares/AnomalyDetector');
const EmailService = require('../middlewares/EmailService');


// Instancias
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 200, // máximo solicitudes por IP
    message: 'Too many requests from this IP, please try again later.',
});
const csrfProtection = new csrf();
const anomalyDetector = new AnomalyDetector();
const emailService = new EmailService(process.env.MAILERSEND_api_key);


class ServerClass {

    constructor() {

        // Servidor
        this.app = express()
        this.port = process.env.SERVER_port

        // path base
        this.basePath = '/api/logs'

        // Rutas generales
        this.testPath = '/test'
        this.activitiesPath = '/activities'
        this.getUsers = '/users'
        // this.csrfToken = '/tkn'

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()
    }

    middlewares() {

        // CORS
        this.app.use(
            cors({
                origin: ['https://cysceuci.com', 'http://localhost:8292', 'http://localhost:8393'],
                methods: process.env.NODE_ENV === 'development'
                    ? ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
                    : ['OPTIONS', 'HEAD', 'GET'],
                allowedHeaders: [
                    'Content-Type',
                    'Authorization',
                    'Pragma',
                    'x-csrf-token'
                ],
                credentials: true
            })
        );

        // Lectura y parseo del body
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json());

        // Parseo cookies
        this.app.use(cookieParser());

        // // Generar  tokens CSRF
        this.app.use(makeCookieCSRF(csrfProtection));

        // // Verificar token de  keycloak
        this.app.use(keycloakTokenVerify(emailService))

        // // Verificar el token CSRF en solicitudes de creacion o modificaión
        this.app.use(csrfTokenVerify(emailService, csrfProtection));

        // // Middleware para monitoreo de requests
        this.app.use(timeMonitor(anomalyDetector, emailService));

        // mitigar ataques DDOS
        this.app.use(limiter);

    }

    routes() {

        this.app.use(`${this.basePath}${this.testPath}`, require('../routes/test_route'))
        this.app.use(`${this.basePath}${this.activitiesPath}`, require('../routes/activities_route'))
        this.app.use(`${this.basePath}${this.getUsers}`, require('../routes/getUsers_route'))
        this.app.use(`${this.basePath}${this.csrfToken}`, require('../routes/csrf_route'));

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
