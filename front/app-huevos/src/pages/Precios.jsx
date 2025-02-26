import React from 'react';

// Mui
import Box from '@mui/material/Box';

const Precios = () => {

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
                Pagina Precios
            </h3>
        </Box>
    )
}

export default Precios