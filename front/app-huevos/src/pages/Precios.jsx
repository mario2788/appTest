import React, { useEffect, useState } from 'react';

// Mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

// Request
import { getPrecios } from '../request/getPrecios';


const Precios = (props) => {

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
        alignItems: 'start',
        justifyContent: 'center',
        width: props.inner ? '80%' : '50%',
        height: '75vh',
        p: 2
    }

    const styleLabel = (title = false) => ({
        marginBlock: title ? '2vh' : '0.75vh',
        fontSize: 'clamp(12px, 1.5vw, 25px)',
        textAlign: 'start',
        fontWeight: title ? 'bold' : 'normal'
    })

    const styleRenglon = (idx) => ({
        bgcolor: idx % 2 ? 'background.overPaper' : 'background.default',
        color: idx % 2 ? 'text.secondary' : 'text.primary',
        borderRadius: '0.5rem',
        marginBlock: '0.5vh',
        textAlign: 'start',
        paddingLeft: '3vh',
    })

    const [preciosHuevos, setPreciosHuevos] = useState([
        { tipo_huevo: 'Tipo huevo', precio_venta: 'Precio' }
    ])

    const [message, setMessage] = useState({ state: false })

    useEffect(() => {
        (async function aux() {
            const preciosData = await getPrecios()
            if (preciosData.length > 0) {
                setPreciosHuevos([...preciosHuevos, ...preciosData]);
            } else {
                setMessage({ state: true })
            }
        })()
    }, [])

    return (
        <Box sx={styleBox}>
            <Paper elevation={3} sx={stylePaper}>
                <Grid
                    size={12}
                    container
                    direction="row"
                    sx={{
                        justifyContent: "flex-center",
                        alignItems: "start"
                    }}
                >
                    {
                        preciosHuevos.map((objPrecio, idx) =>
                            <Grid
                                key={idx}
                                size={12}
                                container
                                spacing={2}
                                direction="row"
                                sx={{
                                    justifyContent: "flex-start",
                                    alignItems: "start",
                                    ...styleRenglon(idx)
                                }}
                            >
                                <Grid size={6}>
                                    <Box sx={styleLabel(idx === 0)}>
                                        {`${objPrecio.tipo_huevo}`}
                                    </Box>
                                </Grid>
                                <Grid size={6}>
                                    <Box sx={styleLabel(idx === 0)}>
                                        {
                                            idx === 0
                                                ? objPrecio.precio_venta
                                                : `$${pointMiles(objPrecio.precio_venta)}`
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        )
                    }
                    {
                        message.state
                        &&
                        <Box sx={{ textAlign: 'center', width: '100%' }}>
                            Sin conexión
                        </Box>
                    }
                </Grid>
            </Paper>
        </Box>
    )
}


const pointMiles = (num) => {
    const miles = parseInt(num / 1000)
    const numStr = String(num)

    return `${miles}.${numStr.slice(numStr.indexOf(miles) + String(miles).length)}`
}


export default Precios