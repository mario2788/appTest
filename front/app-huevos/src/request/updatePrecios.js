

export const updatePrecios = async (row) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(row)
    // const raw = JSON.stringify({
    //     "tipo_huevo": "AAA Blanco",
    //     "precio_venta": "22500",
    //     "valor_compra": "18000",
    //     "porcentaje": "20"
    // });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/updatePrecios`, requestOptions)

        if (resp.ok) {
            resp.data = await resp.json()
            return resp.data.update
        }

    } catch (error) {
        console.log("updatePrecios :: error:", error);
    }
}