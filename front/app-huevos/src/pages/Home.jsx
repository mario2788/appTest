
import React from 'react';

// Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

// componentes
import Rutas from './Rutas';
import Precios from './Precios';

const Home = () => {

    const styleBox = {
        // height: '86vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 2
    }

    return (
        <Box sx={styleBox}>
            <Grid
                container
                direction="row"
            >
                <Grid size={5}>
                    <Precios inner />
                </Grid>
                <Grid size={7}>
                    <Rutas inner />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home