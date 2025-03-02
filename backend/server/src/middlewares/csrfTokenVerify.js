
const jwt = require('jsonwebtoken');


const csrfTokenVerify = (emailService, csrfProtection) => {

    return (req, res, next) => {

        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {

            const token = req.cookies[process.env.NAME_COOKIE];
            const headerToken = req.headers['x-csrf-token'];

            if (!csrfProtection.verify(process.env.CSRF_SECRET, token) || token !== headerToken) {

                const { preferred_username } = jwt.decode(req.headers.authorization.substr(7));

                emailService.sendAlertEmail({
                    subject: 'Alerta en SERVER-LOGS',
                    message: 'Solicitud con token CSRF invalido o no presente',
                    recipients: ['mario.cuellar@cysce.com'],
                    additionalDetails: {
                        metodo: req.method,
                        usuario: preferred_username,
                        Fecha: new Date().toLocaleString().split(',')[0]
                    }
                });
                return res.status(403).json({ error: 'Invalid CSRF token' });
            }
        }
        next();
    }

}


module.exports = {
    csrfTokenVerify
}
