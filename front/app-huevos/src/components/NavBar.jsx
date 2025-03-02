
import React from 'react';
import { Link } from "react-router-dom";

// Mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SelectTheme } from './SelectTheme';
import Grid from '@mui/material/Grid2';

// Redux store
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


// helpers
import { logoutKeycloak } from '../sign-in/logoutKeycloak';
import { setLogged } from '../redux/slices/logged';



export const NavBar = ({ setTheme, theme }) => {

    const dispatch = useDispatch();
    const logged = useSelector(state => state.loggedStore.value)

    const styleBox = {
        fontFamily: 'Roboto',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 1,
    }

    const handleclick = () => {

        dispatch(setLogged({
            state: false,
            token: null
        }))
        localStorage.clear()

        logoutKeycloak(logged.token)
    }

    return (
        <Box sx={styleBox} >
            <Grid container >
                <Grid
                    size={9}
                    container
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    {

                        [['home', 'precios', 'rutas', 'login'],
                        ['home', 'precios', 'rutas',
                            'rutas en casas',
                            'rutas en tiendas'
                        ]
                        ][logged.state & 1].map((label, idx) =>
                            <Box key={idx}>
                                <Link to={`/${label.replace(/\s+/g, "")}`} >
                                    <Button variant="contained">
                                        {label}
                                    </Button>
                                </Link>
                            </Box>
                        )
                    }
                    {
                        logged.state
                        &&
                        <Box>
                            <Button
                                variant="contained"
                                onClick={handleclick}
                            >
                                Salir
                            </Button>
                        </Box>
                    }
                </Grid>
                <Grid
                    size={3}
                    container
                    direction="row"
                    sx={{ justifyContent: "flex-end" }}>
                    <Grid size={8}>
                        <SelectTheme setValue={setTheme} mode={theme} />
                    </Grid>
                </Grid>
            </Grid>
            <hr />
        </Box >
    )
}