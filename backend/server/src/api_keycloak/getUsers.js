
const axios = require('axios');

const getUsers = async (token) => {

    const users = [];
    const realmsArray = eval(process.env.KEYCLOAK_realms);

    for (const realm of realmsArray) {

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.KEYCLOAK_serverUrl}/auth/admin/realms/${realm}/users`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const resp = await axios.request(config)
            .then((resp) => resp.data)
            .catch((error) => {
                console.log("getUsers :: error:", error.response.status);
                return false
            });

        const usersByReaml = resp.length > 0
            ? resp.map(obj => ({ id: obj.id, realm, name: obj.username }))
            : [];


        users.push(...usersByReaml)
    }

    // console.log("getUsers :: resp", users.length, users)
    return users
}

module.exports = {
    getUsers
}