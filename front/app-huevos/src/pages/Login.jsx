
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Keycloak from 'keycloak-js';

// Redux store
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { setLogged } from '../redux/slices/logged';

// Mui
import Box from '@mui/material/Box';

export const Login = () => {

    const dispatch = useDispatch()
    const [authenticated, setAuthenticated] = useState(false)

    // Keycloak
    const auth_keycloak = async () => {

        try {

            const keyData = {
                url: process.env.REACT_APP_URL,
                realm: process.env.REACT_APP_REALM,
                clientId: process.env.REACT_APP_CLIENT_ID
            }

            const keycloak = new Keycloak({ ...keyData });
            window.kck_sindro = keycloak;

            const authenticationReady = await keycloak.init({ onLoad: 'login-required' });

            setAuthenticated(authenticationReady)

        } catch (error) {
            console.error('Failed to initialize adapter:', error.error);
            return false
        }
    }

    useEffect(() => {
        (async function aux() {
            if (!authenticated) await auth_keycloak();
            dispatch(setLogged(true))

        })()
    }, [])


    const styleBox = {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3
    }

    return (
        <Box sx={styleBox}>
            <h3>
                Cargando Keycloak...
            </h3>
        </Box>
    )
}
