
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ names, labelExt, extFunc = () => { }, extChange }) {

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        const value = event.target.value
        setValue(value);
        extFunc(value);
        extChange(value)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">{labelExt}</InputLabel>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={labelExt}
                    onChange={handleChange}
                    size={'small'}
                >
                    {
                        names.map((label, id) =>
                            <MenuItem value={label} key={id}>
                                {label}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
