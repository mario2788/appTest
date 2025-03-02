

export const getPrecios = async () => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {

        const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/precios`, requestOptions)

        if (resp.ok) {
            resp.data = await resp.json()
            return resp.data.precios
        }

    } catch (error) {
        console.log('precios :: error', error);

        return ({
            precios: []
        })
    }
}