
const { Router } = require('express');
const { response } = require('express');
const { getTokenAdmin } = require('../api_keycloak/getTokenAdmin');
const { getUsers } = require('../api_keycloak/getUsers');


const router = Router();

const users = async (req, res = response) => {

    const reaml = req.query

    const token = await getTokenAdmin()
    const users = await getUsers(token)

    res.json({
        resp: 'Logs Server -- Get users',
        users: reaml?.reaml
            ? users.filter(obj => obj.realm === reaml?.reaml).map(obj => obj.name)
            : users.map(obj => obj.name)
    });
}


router.get('/', users);

module.exports = router;