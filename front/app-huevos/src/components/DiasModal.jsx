

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Modal from '@mui/material/Modal';

// request
import { getRutas } from '../request/getRutas';
import { getDate } from '../helpers/getDate';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

const daysNames = {
    'Lunes': 'L',
    'Martes': 'M',
    'Miercoles': 'MM',
    'Jueves': 'J',
    'Viernes': 'V',
    'Sábado': 'S',
    'Domingo': 'D'
}


export default function DiasModal({ openModal, setOpenModal, barrio = "" }) {

    const [ruta, setRuta] = React.useState({})

    const days = (ruta) => [...Array(12)].map((_, i) => ({
        date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i),
        label: getDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i))
    })
    ).map(obj => ({
        ...obj,
        label: [obj.label.split(' - ')[0], obj.label.split(' - ').pop()]
    })).filter(obj =>
        ruta.dias.map(dia =>
            obj.label[0] === daysNames[dia]
        ).reduce((acc, act) => acc = acc || act, false)
    ).map(obj => ({
        ...obj,
        label: obj.label.join(' - ')
    }))


    React.useEffect(() => {
        (async function aux() {
            const rutas = await getRutas()
            if (rutas.length > 0)
                setRuta({
                    ...rutas.filter(obj =>
                        obj.barrio.toLowerCase() === barrio.toLowerCase())[0]
                })
        })()
    }, [barrio])


    const stylePad = (title = false) => ({
        textAlign: 'center',
        fontSize: 'clamp(1vw, 2vw, 4vw)',
        border: '1px black solid',
        paddingBlock: title ? '0.75vh' : '0.5vh'
    })


    return (
        <div>
            <Modal
                open={openModal.state}
                onClose={() => {
                    setOpenModal({ ...openModal, value: '', state: false })
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        ruta?.dias && ruta?.barrio
                            ?
                            <Grid
                                container
                                direction="row"
                            >
                                <Grid size={6}>
                                    <Box sx={stylePad(true)}>
                                        <strong> Barrio: </strong>
                                        {ruta.barrio}
                                    </Box>
                                </Grid>
                                <Grid size={6}>
                                    <Box sx={stylePad(true)}>
                                        <strong> Ruta: </strong>
                                        {ruta.dias.join(' - ')}
                                    </Box>
                                </Grid>
                                {
                                    days(ruta).map((obj, id) =>
                                        <Grid size={12} key={id} onClick={() => setOpenModal({ ...openModal, value: obj, state: false })}>
                                            <Box sx={{ ...stylePad(), cursor: 'pointer' }}>
                                                {obj.label}
                                            </Box>
                                        </Grid>
                                    )
                                }
                            </Grid>
                            : <Box sx={{ ...stylePad(), paddingInline: '1vw' }}>
                                <h3>
                                    Establecer ruta para: <strong>{barrio}</strong>
                                </h3>
                            </Box>
                    }
                </Box>
            </Modal>
        </div >
    );
}
