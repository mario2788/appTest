const axios = require('axios');
const qs = require('qs');
const { errorHandler } = require('axios-error-handler');

const getTokenAdmin = async () => {

    const data = qs.stringify({
        'grant_type': 'password',
        'client_id': 'admin-cli',
        'username': `${process.env.KEYCLOAK_admin_username}`,
        'password': `${process.env.KEYCLOAK_admin_password}`
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.KEYCLOAK_serverUrl}/auth/realms/master/protocol/openid-connect/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        },
        data: data
    };

    const resp = await axios.request(config)
        .then((resp) => resp.data.access_token)
        .catch((error) =>
            console.log("getTokenAdmin :: error:", error.message)
        );

    // console.log("getTokenAdmin", resp.access_token)
    return resp
}

module.exports = {
    getTokenAdmin
}