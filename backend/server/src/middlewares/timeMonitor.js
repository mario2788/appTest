
const jwt = require('jsonwebtoken');


const timeMonitor = (anomalyDetector, emailService) => {

    return (req, res, next) => {
        const startTime = Date.now();

        // Monitorear tiempo de respuesta
        res.on('finish', async () => {
            const responseTime = Date.now() - startTime;
            if (anomalyDetector.checkResponseTime(responseTime)) {

                console.log("Deteccion: Excesivo tiempo de respuesta: ", responseTime, "sendAlertEmail");
                const { preferred_username } = jwt.decode(req.headers.authorization.substr(7));

                emailService.sendAlertEmail({
                    subject: 'Alerta en SERVER-LOGS',
                    message: 'Excesivo tiempo de respuesta',
                    recipients: ['mario.cuellar@cysce.com'],
                    additionalDetails: {
                        metodo: req.method,
                        usuario: preferred_username,
                        Fecha: new Date().toLocaleString().split(',')[0],
                        lapso: responseTime
                    }
                });
            }
        });

        next();
    }
}


module.exports = {
    timeMonitor
}