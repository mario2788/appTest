

export const logoutKeycloak = async (token) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ token });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, requestOptions)
        resp.data = await resp.json()

        return resp.data.data.closes

    } catch (error) {
        console.log("logoutKeycloak ::", error);
    }
}