
const axios = require('axios');
const { getTokenAdmin } = require('./getTokenAdmin');
const { getUsers } = require('./getUsers');

const getSessions = async (user_id) => {

    const token = await getTokenAdmin()

    const sessions = await getSession(token, user_id)

    return sessions
}




const getSession = async (token, userID) => {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.KEYCLOAK_serverUrl}/auth/admin/realms/${process.env.KEYCLOAK_realm}/users/${userID}/sessions`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const resp = await axios.request(config)
        .then((resp) => resp.data)
        .catch((error) => {
            console.log(
                "getSessions :: error:", error,
                "url:", `${process.env.KEYCLOAK_serverUrl}/auth/admin/realms/${process.env.KEYCLOAK_realm}/users/${userID}/sessions`
            )
            return false
        });

    return resp
}

module.exports = {
    getSessions
}

