

const { Router } = require('express');
const { response } = require('express');
const { getSessions } = require('../api_keycloak/getSessions');
const { closeSessions } = require('../api_keycloak/closeSession');

const jwt = require('jsonwebtoken');
const router = Router();


const Post = async (req, res = response) => {

    const { sub } = jwt.decode(req.body.token)

    const sessions = await getSessions(sub)
    let closes = false

    if (sessions && sessions.length > 0)
        closes = await closeSessions(sessions);

    try {

        res.json({
            resp: 'Server app',
            success: true,
            data: {
                body: req.body.id,
                sessions,
                closes
            }
        });

    } catch (error) {

        res.status(500).json({
            resp: 'Server app',
            success: false,
            error: error
        });
    }

}

router.post('/', Post);

module.exports = router;