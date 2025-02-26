
import React from 'react';

// Mui
import Box from '@mui/material/Box';

const Home = () => {

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
                Pagina Home
            </h3>

            <p>
                Página de bienvenida
            </p>
        </Box>
    )
}

export default Home