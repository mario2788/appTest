import React from 'react';

// Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Paper } from '@mui/material';


const Rutas = () => {

    const styleBox = {
        height: '86vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 2
    }

    const stylePaper = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '75vh',
        p: 2
    }

    return (
        <Box sx={styleBox}>
            <Paper elevation={3} sx={stylePaper}>
                <Grid
                    size={12}
                    container
                    direction="row"
                    sx={{
                        justifyContent: "flex-center",
                        alignItems: "center"
                    }}
                >

                </Grid>
            </Paper>
        </Box>
    )
}

export default Rutas