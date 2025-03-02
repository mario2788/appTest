
const axios = require('axios');
const { getTokenAdmin } = require('./getTokenAdmin')


const closeSessions = async (sessions) => {

    const token = await getTokenAdmin()

    const closes = []
    for (const session of sessions) {
        const flag = await closeSession(token, session.id)
        closes.push(flag)
    }

    return closes.reduce((acc, act) => acc = acc && act, true)
}


const closeSession = async (tokenAdmin, id_session) => {

    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.KEYCLOAK_serverUrl}/auth/admin/realms/app/sessions/${id_session}`,
        headers: {
            'Authorization': `Bearer ${tokenAdmin}`
        }
    };

    const flag = await axios.request(config)
        .then(response => {
            console.log("closeSession ::", response.status);
            return response.status === 204
        })
        .catch((error) => {
            console.log(
                "\ncloseSession ::", error?.response?.status,
                "\nid_session ::", id_session
            );
            return false
        });

    return flag
}


module.exports = {
    closeSessions
}

