
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Keycloak from 'keycloak-js';

// Redux store
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { setLogged } from '../redux/slices/logged';

// Mui
import Box from '@mui/material/Box';

// Components
import SignIn from '../sign-in/SignIn';


const Login = ({ theme }) => {

    const styleBox = {
        height: '90vh',
        alignItems: 'start',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
    }

    return (
        <Box sx={styleBox}>
            <SignIn theme={theme} />
        </Box>
    )
}


export default Login