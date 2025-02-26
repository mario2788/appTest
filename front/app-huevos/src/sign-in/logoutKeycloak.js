


export const logOutKeycloak = () => { }


/**
 * Cierra la sesión en Keycloak
 * @param {string} token - El token de acceso obtenido previamente
 * @param {string} redirectUri - (Opcional) URI a la que redirigir después del logout
 * @returns {Promise<boolean>} - true si el logout fue exitoso, false en caso contrario
 */
export const logoutKeycloak = async(token, redirectUri = null) => {

    const myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "appClient");

    // Si se proporciona una URI de redirección, agregarla a los parámetros
    if (redirectUri) {
        urlencoded.append("redirect_uri", redirectUri);
    }

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
    };

    const baseUrl = "https://cysceuci.com/auth/realms/app/protocol/openid-connect/logout";

    try {
        const response = await fetch(baseUrl, requestOptions);

        if (response.ok) {
            // response.data = await response.json()
            console.log("Sesión cerrada exitosamente", response);
            return true;
        } else {
            console.log(`Error al cerrar sesión: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("logoutKeycloak: error", error);
        return false;
    }
}