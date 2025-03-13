import React, { useEffect, useState, useRef } from 'react';

// Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

// Request
import { getPrecios } from '../request/getPrecios';

//CSS
import '../overrideClasses.css';

// Helpers
import { pointMiles } from '../helpers/pointMiles';

// Cmponents
import { BoxButton } from '../components/BoxButton';
import { convertirStringANumero } from '../helpers/convertirStringANumero';
import { validarDinero } from '../helpers/validarDinero';
import { validarPorcentaje } from '../helpers/validarProcentaje';
import { updatePrecios } from '../request/updatePrecios';

const PreciosLogged = () => {

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
        width: '70%',
        height: '75vh',
        p: 2
    }

    const styleLabel = (title = false) => ({
        marginBlock: title ? '2vh' : '0.75vh',
        fontSize: 'clamp(12px, 1.5vw, 25px)',
        textAlign: 'start',
        fontWeight: title ? 'bold' : 'normal',
        paddingLeft: '3vh',
    })

    const styleRenglon = (idx) => ({
        paddingRight: '0.75rem',
        bgcolor: idx % 2 ? 'background.overPaper' : 'background.default',
        color: idx % 2 ? 'text.secondary' : 'text.primary',
        borderRadius: '0.5rem',
        marginBlock: '0.5vh'
    })

    const [preciosHuevos, setPreciosHuevos] = useState([{
        tipo_huevo: 'Tipo huevo',
        valor_compra: 'Vlr. compra',
        porcentaje: 'Porcentaje',
        precio_venta: 'Vlr. venta'
    }])

    const [updateIndex, setUpdateIndex] = useState([])

    const [message, setMessage] = useState({
        state: false,
        msn: ''
    })

    const updateValue = {
        'porcentaje': (i, n) => {
            preciosHuevos[i]['precio_venta'] = parseInt(preciosHuevos[i]['valor_compra'] / (1 - n / 100))
            preciosHuevos[i]['porcentaje'] = n
        },
        'precio_venta': (i, n) => {
            preciosHuevos[i]['porcentaje'] = parseInt((n - preciosHuevos[i]['valor_compra']) / n * 100)
            // preciosHuevos[i]['valor_compra'] = parseInt(preciosHuevos[i]['valor_compra'])
            preciosHuevos[i]['precio_venta'] = n
        },
        'valor_compra': (i, n) => {
            preciosHuevos[i]['precio_venta'] = parseInt(n / (1 - preciosHuevos[i]['porcentaje'] / 100))
            preciosHuevos[i]['valor_compra'] = n
        }
    }

    useEffect(() => {
        (async function aux() {
            const preciosData = await getPrecios()
            setPreciosHuevos([...preciosHuevos, ...preciosData])
        })()
    }, [])

    const updateIndexRef = useRef(updateIndex);
    const preciosHuevosRef = useRef(preciosHuevos);

    useEffect(() => {
        updateIndexRef.current = updateIndex;
        preciosHuevosRef.current = preciosHuevos;
    }, [updateIndex, preciosHuevos]);

    useEffect(() => {
        return async () => {
            const currentUpdateIndex = updateIndexRef.current;
            const currentPreciosHuevos = preciosHuevosRef.current;

            if (currentUpdateIndex.length > 0) {
                const resp = await updatePrecios(currentUpdateIndex.map((i) => currentPreciosHuevos[i]));
            }
        };

    }, []);

    const handleChange = async (str, i, label) => {

        if (str.length > 0) {

            updateValue[label](i, convertirStringANumero(str))

            setPreciosHuevos([...preciosHuevos])

            if (updateIndex.indexOf(i) === -1) {
                setUpdateIndex([...updateIndex, i])
            }
        }
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
                    {
                        preciosHuevos.map((objPrecio, idx) =>
                            <Grid
                                key={idx}
                                size={12}
                                container
                                direction="row"
                                sx={{
                                    justifyContent: "flex-center",
                                    alignItems: "center",
                                    ...styleRenglon(idx)
                                }}
                            >
                                <Grid size={3}>
                                    <Box sx={styleLabel(idx === 0)}>
                                        {objPrecio.tipo_huevo}
                                    </Box>
                                </Grid>
                                <Grid size={3}>
                                    <Box sx={styleLabel(idx === 0)}>
                                        {
                                            idx === 0
                                                ? objPrecio.precio_venta
                                                : `$${pointMiles(objPrecio.precio_venta)}`
                                        }
                                    </Box>
                                </Grid>

                                {
                                    [
                                        [idx, objPrecio, 'valor_compra', validarDinero],
                                        [idx, objPrecio, 'porcentaje', validarPorcentaje],
                                        [idx, objPrecio, 'precio_venta', validarDinero]
                                    ].map(([idx, obj, label, func], id) =>
                                        <BoxButton
                                            key={id}
                                            idx={idx}
                                            value={obj[label]}
                                            label={label}
                                            format={func}
                                            extFuc={handleChange}
                                        />
                                    )
                                }
                            </Grid>
                        )
                    }
                    {
                        message.state
                        &&
                        <Box sx={{ textAlign: 'center', width: '100%' }}>
                            {message.msn}
                        </Box>
                    }
                </Grid>
            </Paper>
        </Box>
    )
}


export default PreciosLogged