


import React, { useEffect, useState } from 'react';

// Mui
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//css
import '../overrideClasses.css'

//components
import NumericModal from '../components/NumericModal';
import BasicSelect from '../components/BasicSelect';
import SelectOrText from '../components/SelectOrText';
import DiasModal from '../components/DiasModal';

// request
import { getDirecciones } from '../request/getDirecciones';
import { getRutas } from '../request/getRutas';
import { getDate } from '../helpers/getDate';
import { getPrecios } from '../request/getPrecios';
import { validarDinero } from '../helpers/validarDinero';



const RutasCasas = () => {

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
        width: '75%',
        height: '75vh',
        p: 2
    }

    const styleRenglon = (idx) => ({
        bgcolor: idx % 2 ? 'background.overPaper' : 'background.default',
        color: idx % 2 ? 'text.secondary' : 'text.primary',
        borderRadius: '0.5rem',
        marginBlock: '0.5vh',
        paddingLeft: '3vh',
    })

    const styleLabel = (title = false) => ({
        // paddingInline: '1vh',
        marginBlock: title ? '2vh' : '0.75vh',
        fontSize: 'clamp(12px, 1.5vw, 25px)',
        textAlign: 'start',
        fontWeight: title ? 'bold' : 'normal'
    })

    const opciones = {
        'via': ['', 'Calle', 'Carrera', 'Transversal', 'Diagonal', 'Avenida'],
        'orient': ['', 'Sur', 'Este'],
        'tipo': [
            'AAA Blanco', 'AAA Rojo', 'AA Blanco', 'AA Rojo',
            'A Blanco', 'A Rojo', 'B Blanco', 'B Rojo', 'C Blanco', 'C Rojo'
        ]
    }

    //new Date("2025-03-04T20:22:44.760Z").toLocaleString("en-GB", {timeZone: "UTC"})
    const [newDirection, setNewDirection] = useState({})
    const [barrios, setBarrios] = useState([])
    const [direcciones, setDirecciones] = useState([{ title: '' }])
    const [preciosHuevos, setPreciosHuevos] = useState({})
    const [renglones, setRenglones] = useState([[]])
    const [visitas, setVisitas] = useState({ id: null, state: false, content: [] })
    const [message, setMessage] = useState({ state: false })
    const [openModal, setOpenModal] = useState({ state: false, value: '', field: '' })
    const [valBotons, setValBotons] = useState({ Cantidad: '', Tipo: '', Valor: '' })
    const [ventas, setVentas] = useState([])
    const [openModalDias, setOpenModalDias] = useState({ state: false, value: '' })


    const loadRenglones = (arr) => arr.map(obj => {

        const values = Object.values(obj);

        return [
            ...values.slice(0, 2),
            values.slice(2, 4).join(' '),
            `# ${values[4]}`,
            ' - ',
            values.slice(5, 7).join(' '),
            values[7]
        ]

    }).sort((b, a) => a[1] < b[1])
        .map((arr, id) => [id + 1, ...arr.slice(1)])

    const handleChangeFilter = (e, label) => {

        const filterIndex = {
            'Barrio': [1],
            'Tipo de via': [2],
            'Principal': [2],
            'No. 1': [3],
            'No. 2': [5],
            'Sub': [5],
            'Orientación': [6],
        }

        let temp1 = [...loadRenglones(direcciones)]

        const filters = Object.keys(filterIndex).map(key =>
            [key, key == label ? (e?.target ? e?.target.value : e) : newDirection[key]]//document.getElementById(key).getElementsByTagName('input')[0].value]
        )

        filters.forEach(([key, label]) => {
            temp1 = label ? temp1.filter(elem => elem[filterIndex[key]].indexOf(label) > -1) : temp1 // filterObj[key](temp1, label)
        });

        setVisitas({
            id: null,
            state: false,
            content: []
        })
        setRenglones(temp1.map((arr, id) => [id + 1, ...arr.slice(1)]));
    }

    const handleGo = () => {

        const flagNull = ["No. 1", "No. 2", "Principal", "Tipo de via"]
            .map(label => newDirection[label] != null && newDirection[label] != "")
            .reduce((acc, act) => acc = acc && act, true)

        if (flagNull) {
            console.log("newDirection :: ", newDirection, flagNull);

            const labels = ['Barrio', 'Tipo de via', 'Principal', 'No. 1', 'No. 2', 'Sub', 'Orientación']
            const objDirection = {};

            labels.forEach(label => {
                objDirection[label] = newDirection[label] ? newDirection[label] : null
            })


            const newRenglon = loadRenglones([{ id: renglones.length, ...objDirection }])
            const objJoin = newRenglon[0].slice(1).join('')
            const renglonesJoin = renglones.length > 0 ? renglones.map(arr => arr.slice(1).join('')) : []

            if (renglonesJoin.indexOf(objJoin) < 0) {
                setRenglones([...renglones, ...newRenglon])
                // setNewDirection({})
            }
        } else {
            alert("Formulario incompleto")
            console.log("newDirection", newDirection);
        }
    }

    const handleClick = (id) => {

        setOpenModalDias({ state: false, value: '' })

        if (id === visitas.id) {
            setVisitas({ id: null, state: false, content: [] })
            return
        }

        if (id != null && id > -1) {

            const tempVisitas = direcciones[id].ultima_interaccion.visitas
                .sort((b, a) => new Date(a.fecha_visita) > new Date(b.fecha_visita))
                .map((obj, idObj) => [
                    idObj + 1,
                    getDate(obj.fecha_visita),
                    obj.estado,
                    obj.responsable
                ]);

            setVisitas({
                id: id,
                state: true,
                content: [['Número', 'Interacciones', 'Estado', 'Responsable'], ...tempVisitas]
            })

        } else {
            setVisitas({
                id: null,
                state: true,
                content: [['Número', 'Interacciones', 'Estado', 'Responsable']]
            })
        }
    }

    useEffect(() => {

        if (openModal.field == 'Valor') {
            valBotons[openModal.field] = openModal.value
        }

        if (openModal.field == 'Tipo') {

            const value = valBotons.Cantidad != '' ? valBotons.Cantidad : '0 Panales'

            let precio = preciosHuevos.filter(obj => obj.tipo_huevo === valBotons.Tipo)
            precio = precio.length > 0 ? precio[0].precio_venta : 0;

            valBotons.Valor = value.indexOf('Panales') > -1
                ? precio * parseInt(value.split(' ')[0])
                : precio / 30 * parseInt(value.split(' ')[0]);
        }

        if (openModal.field == 'Cantidad') {

            const value = openModal.value
            valBotons[openModal.field] = value

            let precio = preciosHuevos.filter(obj => obj.tipo_huevo === valBotons.Tipo)
            precio = precio.length > 0 ? precio[0].precio_venta : 0;

            valBotons.Valor = value.indexOf('Panales') > -1
                ? precio * parseInt(value.split(' ')[0])
                : precio / 30 * parseInt(value.split(' ')[0]);

        }

        valBotons.Valor = validarDinero(valBotons.Valor)
        setValBotons({ ...valBotons })

    }, [openModal])

    useEffect(() => {
        (async function aux() {
            const direcciones = await getDirecciones()
            const rutas = await getRutas()
            const preciosData = await getPrecios()

            if (preciosData.length > 0) {
                setPreciosHuevos(preciosData);
            }

            if (direcciones.length > 0 && rutas.length > 0) {
                setBarrios(
                    [
                        ...rutas.map(arr => ({ title: arr.barrio.toLowerCase() })),
                        ...direcciones.map(obj => ({ title: obj.barrio.toLowerCase() }))
                    ].reduce((acc, act) =>
                        acc = acc.filter(obj => obj.title === act.title).length > 0 ? acc : [...acc, act], []
                    ).map(obj => ({ title: obj.title[0].toUpperCase() + obj.title.slice(1) }))
                );
                setDirecciones(
                    direcciones.sort((b, a) => a.barrio < b.barrio)
                        .map(obj => ({ ...obj, barrio: obj.barrio.toLowerCase() }))
                        .map(obj => ({ ...obj, barrio: obj.barrio[0].toUpperCase() + obj.barrio.slice(1) }))
                );
                setRenglones(loadRenglones(direcciones));
            } else {
                setMessage({ state: true })
            }
        })()
    }, [])


    return (
        <Box sx={styleBox}>
            <NumericModal openModal={openModal} setOpenModal={setOpenModal} />
            <DiasModal openModal={openModalDias} setOpenModal={setOpenModalDias}
                barrio={renglones[visitas.id] ? renglones[visitas.id][1] : ""}
            />
            <Paper elevation={3} sx={stylePaper}>
                <Grid
                    container
                    columns={20}
                    direction="row"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {
                        [
                            ['Barrio', 4, 'selectOrText'],
                            ['Tipo de via', 3, 'select', 'via'],
                            ['Principal', 2, 'text'],
                            ['No. 1', 2, 'text'],
                            ['No. 2', 2, 'text'],
                            ['Sub', 2, 'text'],
                            ['Orientación', 3, 'select', 'orient'],
                            ['Go', 2, 'button']
                        ].map((arr, idx) =>
                            <Grid
                                id={arr[0]}
                                key={idx}
                                size={arr[1]}
                                sx={{ paddingInline: '0.25vw' }}
                                onChange={(e) => handleChangeFilter(e, arr[0])}
                            >
                                {
                                    {
                                        'selectOrText': <SelectOrText labelExt={arr[0]} options={barrios}
                                            extSet={(arg) => setNewDirection({ ...newDirection, ...arg })}
                                            extChange={(title) => handleChangeFilter(title, arr[0])}
                                        />,
                                        'select': <BasicSelect names={opciones[arr[3]]} labelExt={arr[0]}
                                            extFunc={label => setNewDirection({ ...newDirection, [arr[0]]: label })}
                                            extChange={label => handleChangeFilter(label, arr[0])}
                                        />,
                                        'text': <TextField size="small" label={arr[0]} variant="outlined"
                                            onChange={e => setNewDirection({ ...newDirection, [arr[0]]: e.target.value })}
                                        />,
                                        'button': <Button type="submit" size="large"
                                            variant="outlined"
                                            onClick={handleGo}
                                        >
                                            {arr[0]}
                                        </Button>
                                    }[arr[2]]
                                }
                            </Grid>
                        )
                    }

                    <Grid
                        size={20}
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            marginTop: '3vh',
                            alignItems: "start",
                            maxHeight: visitas.state ? '10.5vh' : '65vh',
                            overflowY: 'scroll'
                        }}
                    >
                        {
                            [
                                visitas.id != null
                                    ? [renglones[visitas.id]]
                                    : [
                                        [
                                            0, 'Barrio', 'Principal',
                                            'No. 1', '', 'No. 2', 'Orientación'
                                        ],
                                        ...renglones
                                    ]
                            ].flat().map((arr, idArr) =>
                                <Grid
                                    key={idArr}
                                    size={idArr - 1 === visitas.id ? 18 : 17}
                                    container
                                    columns={16}
                                    direction="row"
                                    spacing={1}
                                    onClick={() => idArr !== 0 || visitas.id != null
                                        ? handleClick(arr[0] - 1)
                                        : {}
                                    }
                                    sx={{
                                        justifyContent: "start",
                                        alignItems: "center",
                                        ...styleRenglon(idArr),
                                        marginTop: '0.5vh',
                                        cursor: idArr !== 0 || visitas.id != null ? 'pointer' : '',
                                        paddingBlock: idArr - 1 === visitas.id ? '1vh' : '0vh',
                                    }}
                                >
                                    {
                                        arr.slice(1).map((label, idx) =>
                                            <Grid key={idx} size={[4, 4, 2, 1, 2, 3][idx]} >
                                                <Box sx={styleLabel(idArr === 0)}>
                                                    {label}
                                                </Box>
                                            </Grid>

                                        ).flat()
                                    }
                                </Grid>
                            )
                        }
                    </Grid>

                    {
                        (visitas.state && visitas.id != null) &&
                        <Grid size={18}> <hr /> </Grid>
                    }

                    {
                        (visitas.state && visitas.id != null) &&
                        <Grid
                            size={20}
                            container
                            direction="row"
                            spacing={1}
                            sx={{
                                justifyContent: "start",
                                marginTop: '1vh',
                                alignItems: "center",
                                maxHeight: '19.5vh',
                                overflowY: 'scroll'
                            }}
                        >
                            {
                                visitas.content.map((arr, idArr) =>
                                    arr.map((label, idLabel) =>
                                        <Grid
                                            key={`${idArr}_${idLabel}`}
                                            size={5}
                                        >
                                            <Box sx={{ ...styleLabel(idArr === 0), textAlign: idLabel === 0 ? 'center' : 'start' }}>
                                                {label}
                                            </Box>
                                        </Grid>
                                    )).flat()
                            }
                        </Grid>
                    }

                    {visitas.state
                        &&
                        <Grid size={18}> <hr /> </Grid>
                    }

                    {
                        visitas.state
                        &&
                        <Grid
                            size={16}
                            columns={20}
                            container
                            direction="row"
                            spacing={1}
                            sx={{
                                justifyContent: "start",
                                alignItems: "center",
                                overflowY: 'scroll',
                                maxHeight: '22vh',
                                marginTop: '1vh'
                            }}
                        >
                            {
                                [
                                    'Sin interacción', 'Entregó tarjeta',
                                    'Volver pasar', 'Sin agenda'
                                ].map((label, i) =>
                                    <Grid size={4} key={i} >
                                        <Box sx={styleLabel()}>
                                            <FormControlLabel
                                                value="bottom"
                                                control={<Checkbox />}
                                                label={label}
                                                labelPlacement="end"
                                            />
                                        </Box>
                                    </Grid>
                                )
                            }
                            <Grid size={4}>
                                <Box sx={styleLabel()}>
                                    <Button
                                        type="submit" size="large"
                                        variant="outlined" onClick={() => setOpenModalDias({ ...openModalDias, state: true })}
                                    >
                                        {
                                            openModalDias?.value !== ''
                                                ? `${openModalDias.value.label}`
                                                : 'Agendar'
                                        }
                                    </Button>

                                </Box>
                            </Grid>

                            <Grid size={16} sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
                                {
                                    [
                                        'Tipo', 'Cantidad', 'Valor'
                                    ].map((label, id) =>
                                        <Box key={id} sx={styleLabel()}>
                                            {
                                                label === 'Tipo'
                                                    ? <BasicSelect names={opciones.tipo} labelExt={label}
                                                        extChange={(v) => {
                                                            setValBotons({ ...valBotons, Tipo: v });
                                                            setOpenModal({ ...openModal, field: label })
                                                        }}
                                                    />
                                                    : <Button type="submit" size="large"
                                                        variant="outlined"
                                                        onClick={() => setOpenModal({ state: true, value: '', field: label, type: 'eggs' })}
                                                    >
                                                        {valBotons[label] == '' ? label : valBotons[label]}
                                                    </Button>
                                            }
                                        </Box>
                                    )
                                }
                            </Grid>
                            <Grid size={4}>
                                <Box sx={{ ...styleLabel(), }}>
                                    <Button
                                        type="submit" size="large"
                                        variant="outlined"
                                        onClick={() => {
                                            if (valBotons.Valor !== '') {
                                                setVentas([...ventas, valBotons])
                                                setValBotons({ Cantidad: '', Tipo: '', Valor: '' })
                                            }
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                </Box>
                            </Grid>
                            {
                                ventas.length > 0
                                &&
                                ventas.map((obj, idObj) =>
                                    ['icono', ...Object.keys(obj)].map((label, id) =>
                                        <Grid size={5} key={`${id}_${idObj}`} sx={{ textAlign: 'center' }}>
                                            {
                                                label === 'icono'
                                                    ? <span onClick={() => {
                                                        console.log(ventas, idObj);
                                                        ventas.splice(idObj, 1)
                                                        setVentas([...ventas])
                                                    }}
                                                        sx={{ ...styleLabel(), textAlign: 'center', cursor: 'pointer' }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon sx={{ cursor: 'pointer' }} color="alert" />
                                                    </span>
                                                    : <Box sx={{ ...styleLabel(), textAlign: 'center' }}>
                                                        {obj[label]}
                                                    </Box>
                                            }
                                        </Grid>
                                    )).flat()
                            }
                        </Grid>
                    }

                    {
                        visitas.state
                        &&
                        [
                            ['Enviar', 12],
                            [ventas, 4],
                        ].map((arr, id) =>
                            <Grid key={id} size={arr[1]} sx={{ marginTop: '2vh' }}>
                                <Box sx={{ ...styleLabel(id === 1), textAlign: 'center' }}>
                                    {
                                        id === 0
                                            ? <Button type="submit" size="large" variant="outlined" > {arr[0]} </Button>
                                            : arr[0].length > 0
                                                ? "Total: " + validarDinero(
                                                    ventas.map(obj => parseFloat(obj.Valor.replace(/[^0-9]/g, '')))
                                                        .reduce((acc, act) =>
                                                            acc = acc + act, 0
                                                        )
                                                )
                                                : ''
                                    }
                                </Box>
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

export default RutasCasas
