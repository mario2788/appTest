import React, { useEffect, useState } from 'react';

// Mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

// Request
import { getPrecios } from '../request/getPrecios';


const Precios = () => {

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
        height: '80vh',
        p: 2
    }

    const styleLabel = (title = false) => ({
        paddingInline: '1rem',
        paddingLeft: '5rem',
        marginBlock: title ? '1rem' : '0.5rem',
        fontSize: '25px',
        textAlign: 'start',
        fontWeight: title ? 'bold' : 'normal'
    })

    const styleRenglon = (idx) => ({
        // bgcolor: idx % 2 ? 'background.overPaper' : 'background.default',
        // color: idx % 2 ? 'text.secondary' : 'text.primary',
        borderRadius: '0.5rem',
        marginBlock: '0.25rem'
    })


    const [preciosHuevos, setPreciosHuevos] = useState([
        { tipo_huevo: 'Tipo huevo', precio_venta: 'Precio' }
    ])

    useEffect(() => {
        (async function aux() {
            const preciosData = await getPrecios()
            setPreciosHuevos([...preciosHuevos, ...preciosData])
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
                        alignItems: "center"
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
                                    alignItems: "center",
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