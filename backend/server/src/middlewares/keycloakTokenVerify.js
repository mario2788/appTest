
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('qs');


const { getTokenAdmin } = require('../api_keycloak/getTokenAdmin');
const { getInfoUserByID } = require('../api_keycloak/getInfoUserByID');


const keycloakTokenVerify = (emailService) => {

    return async (req, res, next) => {

        if (req.headers?.authorization) {

            const { iss, sub, preferred_username } = jwt.decode(req.headers.authorization.substr(7))
            const urlBase = iss.split('auth')[0]

            let validate = eval(process.env.SERVER_loginFlag);

            if (!validate) {
                const token = await getTokenAdmin(urlBase)
                const infoUser = await getInfoUserByID(sub, token, urlBase)
                validate = await validateToken(req, iss, sub, preferred_username)
            }

            if (validate) {
                next()
            } else {
                sendAlert(req, emailService, "Token no valido")
                res.status(401).json({
                    status: false,
                    text: 'Access no valid'
                })
            }
        } else {

            sendAlert(req, emailService, "Token no presente")
            res.status(401).json({
                status: false,
                text: 'Access no valid'
            })
        }
    }
}

const sendAlert = (req, emailService, label) => {

    console.log("Deteccion: token keycloak invalido o no presente");

    emailService.sendAlertEmail({
        subject: 'Alerta en SERVER-LOGS',
        message: label,
        recipients: ['mario.cuellar@cysce.com'],
        additionalDetails: {
            metodo: req.method,
            Fecha: new Date().toLocaleString().split(',')[0],
        }
    });
}

const validateToken = async (req, iss, sub, name) => {

    const config = {
        url: `${iss}/protocol/openid-connect/userinfo`,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Authorization': req.headers.authorization
        }
    }

    try {
        const resp = await axios.request(config)
        return resp.data.sub === sub && resp.data.preferred_username === name

    } catch (err) {
        console.log("validateToken: Error \n", err?.response?.statusText);
        return false
    }

}

module.exports = {
    keycloakTokenVerify
}