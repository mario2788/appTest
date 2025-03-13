


export const getDirecciones = async () => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {

        const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/direcciones`, requestOptions)

        if (resp.ok) {
            resp.data = await resp.json()
            return resp.data.direcciones
        }

    } catch (error) {
        console.log('direcciones :: error', error);

        return ({
            direcciones: []
        })
    }
}