


import React from 'react';

// Mui
import Box from '@mui/material/Box';

const RutasTiendas = () => {

    const styleBox = {
        height: '86vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 2
    }

    return (
        <Box sx={styleBox}>
            <h2>
                Rutas en tiendas
            </h2>
        </Box>
    )
}

export default RutasTiendas