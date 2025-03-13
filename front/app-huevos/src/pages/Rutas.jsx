import React, { useEffect, useState } from 'react';

// Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Paper } from '@mui/material';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MultipleSelectCheckmarks from '../components/MultipleSelectCheckmarks'

// Redux Store
import { useSelector } from "react-redux";

// Request
import { getRutas } from '../request/getRutas';
import { addRuta } from '../request/addRuta';
import { deleteRuta } from '../request/deleteRuta';


const Rutas = (props) => {

    const logged = useSelector(state => state.loggedStore.value)

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
        width: props?.inner ? '80%' : '50%',
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

    const [rutas, setRutas] = useState([])
    const [message, setMessage] = useState({ state: false })
    const [valueSlider, setValueSlider] = useState({ state: [] })
    const [newRuta, setNewRuta] = useState({ barrio: '', dias: [] })

    const dias = [
        'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
    ];

    useEffect(() => {
        (async function aux() {
            const rutas = await getRutas()

            if (rutas.length > 0) {
                setRutas(rutas);
                setValueSlider({ state: rutas.map(() => 0) })
            } else {
                setMessage({ state: true })
            }
        })()
    }, [])

    const handleChangeSlider = (n, id) => {
        valueSlider.state[id] = n
        setValueSlider({ ...valueSlider })
    }
    const handleCommitSlider = async (n, id) => {

        if (n >= 98) {
            console.log(rutas[id].barrio);
            const resp = await deleteRuta({ barrio: rutas[id].barrio })

            if (resp && resp.rowCount > 0) {
                delete rutas[id]
                delete valueSlider.state[id]

                setValueSlider({ state: valueSlider.state.filter(n => n) })
                setRutas(rutas.filter(n => n))
            }
        }
    }

    const handleChangeSelect = (dias) => {
        newRuta.dias = dias
        setNewRuta({ ...newRuta })
    }
    const handleBlurText = (e) => {
        newRuta.barrio = e.target.value
        setNewRuta({ ...newRuta })
    }
    const handleClick = () => {
        console.log(newRuta);
        setRutas([...rutas, newRuta])
        addRuta(newRuta)
    }

    return (
        <Box sx={styleBox}>
            <Paper elevation={3} sx={stylePaper}>
                <Grid
                    container
                    direction="column"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "start",
                        height: '75vh'
                    }}
                >
                    <Grid
                        size={12}
                        container
                        direction="rom"
                        sx={{
                            justifyContent: "flex-center",
                            alignItems: "start",
                            overflow: 'scroll',
                            maxHeight: logged.state ? '67vh' : '79vh'
                        }}
                    >
                        {
                            [
                                ['Barrio', 'Día'],
                                ...rutas.map(obj => [obj.barrio, obj.dias.join(' - ')]),
                            ].map((arr, idArr) =>
                                <Grid
                                    key={idArr}
                                    size={12}
                                    container
                                    spacing={2}
                                    direction="row"
                                    sx={{
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        ...styleRenglon(idArr)
                                    }}
                                >
                                    <Grid size={props?.inner ? 4 : 3} >
                                        <Box sx={styleLabel(idArr === 0)}>
                                            {arr[0]}
                                        </Box>
                                    </Grid>
                                    <Grid size={logged.state ? 7 : 8} >
                                        <Box sx={styleLabel(idArr === 0)}>
                                            {arr[1]}
                                        </Box>
                                    </Grid>
                                    {
                                        logged.state && !props.inner && idArr != 0
                                        &&
                                        <Grid size={2} >
                                            <Box sx={{ width: '5vw' }}>
                                                <Slider
                                                    id={`slider_${idArr}`}
                                                    aria-label="Volume"
                                                    value={valueSlider.state[idArr - 1] ? valueSlider.state[idArr - 1] : 0}
                                                    color="alert"
                                                    onChange={(_, n) => handleChangeSlider(n, idArr - 1)}
                                                    onChangeCommitted={(_, n) => handleCommitSlider(n, idArr - 1)}
                                                />
                                            </Box>
                                        </Grid>
                                    }
                                </Grid>
                            )
                        }
                    </Grid>
                    {
                        logged.state && !props.inner
                        &&
                        <Grid
                            size={12}
                            container
                            direction="row"
                            spacing={1}
                            sx={{
                                justifyContent: "flex-center",
                                alignItems: "center",
                            }}
                        >
                            <Grid size={3} >
                                <TextField size="small" label="Barrio" variant="outlined" onBlur={handleBlurText} />
                            </Grid>
                            <Grid size={7} >
                                {/* <TextField size="small" label="Barrio" variant="outlined" /> */}
                                <MultipleSelectCheckmarks extFunc={handleChangeSelect} names={dias} labelExt={'Días'} />
                            </Grid>
                            <Grid size={2} >
                                <Button variant="outlined" onClick={handleClick}>Agregar</Button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                {
                    message.state
                    &&
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        Sin conexión
                    </Box>
                }
            </Paper>
        </Box >
    )
}

export default Rutas
