

export const deleteRuta = async (obj) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(obj)

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/rutas`, requestOptions)

        if (resp.ok) {
            resp.data = await resp.json()
            return resp.data.update
        }

    } catch (error) {
        console.log("updatePrecios :: error:", error);
        return false
    }
}