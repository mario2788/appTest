
import React from 'react';

// Mui
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

// Componente para seleccionar el tema
// https://m2.material.io/inline-tools/color/

export const SelectTheme = ({ setValue, mode }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                borderRadius: 1,
                fontFamily: 'Roboto'
            }}
        >
            <FormControl>
                {/* <FormLabel>Tema</FormLabel> */}
                <RadioGroup
                    name="theme-toggle"
                    row
                    value={mode}
                    onChange={(event) => setValue(event.target.value)}
                >
                    <FormControlLabel value="light" control={<Radio />} label="Claro" />
                    <FormControlLabel value="dark" control={<Radio />} label="Oscuro" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};