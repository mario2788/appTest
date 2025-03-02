
export const authKeycloak = async (data) => {

    const { username, password } = data;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", process.env.REACT_APP_CLIENT_ID);
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    const url = `${process.env.REACT_APP_URL}/realms/${process.env.REACT_APP_REALM}/protocol/openid-connect/token/`

    try {

        const resp = await fetch(url, requestOptions)

        if (resp.status === 401) {
            console.log("No autorizado");
            return false
        }

        resp.data = await resp.json();
        return resp.data.access_token

    } catch (error) {
        console.log("authKeycloak: error", error);

    }
}