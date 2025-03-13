
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';

const filter = createFilterOptions();


export default function SelectOrText({ options, labelExt, extSet, extChange }) {

    const [value, setValue] = React.useState(null);


    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onBlur={(event, newValue) => extSet({ Barrio: event.target.value })}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue(newValue);
                    }
                    extChange(newValue.title)
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Agregar "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                options={options}
                getOptionLabel={(option) => {
                    // for example value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                }}
                selectOnFocus
                // clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;

                    return (
                        <li key={`${key}_${optionProps.id}`} {...optionProps}>
                            {option.title}
                        </li>
                    );
                }}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label={labelExt} />}
            />
        </React.Fragment>
    );
}

// 