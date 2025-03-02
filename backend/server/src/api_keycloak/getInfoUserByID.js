

const getInfoUserByID = async (id, token, url) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${url}auth/admin/realms/${proces.env.KEYCLOAK_realm}/users/${id}`,
        headers: {
            'Accept-Encoding': 'gzip',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const resp = await axios.request(config)
        // console.log("getInfoUserByID: ",resp.data);
        return resp.data
    } catch (err) {
        console.log("getInfoUserByID :: error:", err);
        return false
    }

}


module.exports = {
    getInfoUserByID
}