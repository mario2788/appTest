import React, { useState, useEffect } from 'react';

//  Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';

//CSS
import '../overrideClasses.css';


export const BoxButton = ({ idx, value, extFuc, label, format }) => {

    const styleLabel = (title = false) => ({
        marginBlock: title ? '1rem' : '0.5rem',
        paddingInline: '0.5rem',
        fontSize: '25px',
        textAlign: 'center',
        fontWeight: title ? 'bold' : 'normal'
    })

    const [valueField, setValue] = useState(value[label])

    useEffect(() => {
        setValue(format(value[label]))
    }, [value[label]])

    const handleClick = (e, idx, label) => {
        e.preventDefault()

        const value = format(e.target.value)

        setValue(value)

        extFuc(value, idx, label)
    }

    return (
        <Grid size={2}>
            <Box
                sx={styleLabel(idx === 0)}
                onChange={(e) => handleClick(e, idx, label)}
            >
                {
                    idx === 0
                        ? value[label]
                        :
                        <TextField
                            label=""
                            variant="standard"
                            size="small"
                            value={format(valueField)}
                        />
                }
            </Box>
        </Grid>
    )
}