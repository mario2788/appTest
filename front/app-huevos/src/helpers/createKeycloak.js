
import Keycloak from 'keycloak-js';


export const createKeycloak = () => {

    const keyData = {
        url: process.env.REACT_APP_URL,
        realm: process.env.REACT_APP_REALM,
        clientId: process.env.REACT_APP_CLIENT_ID,
        secretId: process.env.REACT_APP_CLIENT_SECRET
    }
    console.log("keyData:", keyData);

    const keycloak = new Keycloak({ ...keyData });
    window.kck_app = keycloak;

    console.log(
        window.kck_app
    );
}