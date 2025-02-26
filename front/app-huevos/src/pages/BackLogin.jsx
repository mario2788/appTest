
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Keycloak from 'keycloak-js';

// Redux store
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { setLogged } from '../redux/slices/logged';

// Mui
import Box from '@mui/material/Box';

export const Login = () => {

    // Keycloak
    const auth_keycloak = async () => {

        try {
            const keyData = {
                url: process.env.REACT_APP_URL,
                realm: process.env.REACT_APP_REALM,
                clientId: process.env.REACT_APP_CLIENT_ID,
                secretId: process.env.REACT_APP_CLIENT_SECRET
            }
            console.log("keyData:", keyData);

            const keycloak = new Keycloak({ ...keyData });
            window.kck = keycloak;

            const authenticationReady = await window.kck.init({
                onLoad: 'login-required',
            });

            dispatch(setLogged(authenticationReady));
            navigate('/home')

            return authenticationReady;

        } catch (error) {
            console.error('Failed to initialize adapter:', error.error);
            return false
        }
    }

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logged = useSelector(state => state.loggedStore.value)
    console.log("logged:", logged);


    useEffect(() => {
        (async function aux() {
            // Verificar si hay un fragmento en la URL
            if (window.location.hash) {
                navigate('/home/');
            }
            await auth_keycloak();
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
