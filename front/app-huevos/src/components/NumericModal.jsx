
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Modal from '@mui/material/Modal';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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


export default function NumericModal({ openModal, setOpenModal }) {

    const [label, setLabel] = React.useState(openModal.value)

    const alfaNumeric = openModal.type === 'eggs' ? false : true

    const stylePad = (label) => ({
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: 'clamp(3vw, 5vw, 6vw)',
        border: label !== '' ? '1px black solid' : ''
    })

    const addChar = (char) => {
        return (
            char === 'P'
                ? label[label.length - 1] === '1'
                    ? ' Panal'
                    : ' Panales'
                : char === 'H'
                    ? label[label.length - 1] === '1'
                        ? ' Huevo'
                        : ' Huevos'
                    : char
        )
    }

    return (
        <div>
            <Modal
                open={openModal.state}
                onClose={() => {
                    setOpenModal({ ...openModal, value: label, state: false })
                    setLabel('')
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container columns={12} direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: '43vw'
                        }}
                    >

                        <Grid size={12}
                            sx={{ textAlign: 'center', fontSize: 'clamp(3vw, 5vw, 6vw)' }}
                        >
                            <Box sx={{ overflowX: 'scroll' }}>
                                {label}
                            </Box>
                        </Grid>
                        {
                            [
                                [
                                    '1', '2', '3', 'a',
                                    '4', '5', '6', 'b',
                                    '7', '8', '9', 'c',
                                    'd', '0', 'f'
                                ], [
                                    '1', '2', '3', 'P',
                                    '4', '5', '6', 'H',
                                    '7', '8', '9', '',
                                    '', '0',
                                ]
                            ][alfaNumeric ? 0 : 1].map((char, id) =>
                                <Grid
                                    key={id} size={3}
                                    onClick={() => setLabel(label + addChar(char))}
                                    sx={stylePad(char)}
                                >
                                    {char}
                                </Grid>
                            )
                        }

                        <Grid size={3} onClick={() => {
                            setLabel('')
                            setOpenModal({ ...openModal, value: label, state: false })
                        }}
                            sx={{ textAlign: 'center', cursor: 'pointer' }}
                        >
                            <CheckBoxIcon sx={{ fontSize: 'clamp(2vw, 4vw, 6vw)' }} />
                        </Grid>

                        <Grid size={3} onClick={() => setLabel(label.slice(0, label.length - 1))}
                            sx={{ textAlign: 'center', cursor: 'pointer' }}
                        >
                            <BackspaceIcon sx={{ fontSize: 'clamp(2vw, 4vw, 6vw)' }} />
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
