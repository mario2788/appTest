
export const authKeycloak = async (data) => {

    const { username, password } = data;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", "appClient");
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    const url = "https://cysceuci.com/auth/realms/app/protocol/openid-connect/token/"
    
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