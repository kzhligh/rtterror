import TextField from "@mui/material/TextField";
import * as React from "react";
import {Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {DatePicker, TimePicker} from "@mui/lab";
import {useEffect} from "react";

const InputTextField = (props) => {

    return (
        <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            label={props.label}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            {...(props.error && {error: true, helperText: props.error})}
            {...(props.rows ? {multiline: true, rows: props.rows} : "")}
            {...(props.InputProps ? {
                InputProps: {
                    endAdornment: (
                        <InputAdornment position="end">{props.InputProps}</InputAdornment>
                    ),
                }
            } : "")}
        />
    );
}
export {InputTextField};

const CustomCheckBox = (props) => {
    const { value, onChange, item, key} = props;
    const convertToTargetObject = (name, value, checked) => {

        if (checked) {
            return {
                target: {
                    name: name, value: value
                }
            }
        } else {
            return {
                target: {
                    name: name, value: 'na'
                }
            }
        }

    }
    return (
        <>
            <FormControlLabel
                key={key}
                control={
                    <Checkbox
                        id={key}
                        value={item.name}
                        color="primary"
                        checked={value == item.name}
                        onChange={e => onChange(convertToTargetObject(props.name, e.target.value, e.target.checked))}
                    />
                }
                label={item.title}
            />
        </>
    );
}
export {CustomCheckBox};

const CustomAutoComplete = (props) => {
    useEffect(() => {
        props.onChange({target: {name: props.name, value: [...props.defaultValue]}})
    }, [])
    return (<Autocomplete
        multiple
        label={props.label}
        name={props.name}
        options={props.value}
        getOptionLabel={(option) => `${option.name} - ${option.service_code.split("-")[0]}`}
        defaultValue={props.defaultValue}
        filterSelectedOptions
        autoHighlight
        renderInput={(params) => (
            <TextField
                {...params}
                label="Service"
                placeholder="Services"
            />
        )}
        onChange={(event, newValue) => props.onChange({target: {name: props.name, value: newValue}})}
    />);
}
export {CustomAutoComplete};

const CustomDatePicker = (props) => {
    return (
        <DatePicker
            label={props.label}
            value={props.value}
            renderInput={(params) => <TextField {...params} />}
            onChange={(newValue) =>
                props.onChange({target: {name: props.name, value: newValue}})

            }
        />

    );
}
export {CustomDatePicker};
const CustomTimePicker = (props) => {
    return (
        <TimePicker
            label={props.label}
            value={props.value}
            ampm={false}
            renderInput={(params) => <TextField {...params} />}
            onChange={(newValue) =>
                props.onChange({target: {name: props.name, value: newValue}})

            }
        />
    );
}
export {CustomTimePicker};
const DropDownList = (props) => {
    return (
        <FormControl
            sx={{
                marginX: '10px',
            }}
        >
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={(e) =>
                    props.onChange({target: {name: props.name, value: e.target.value}})}
                sx={{
                    minWidth: '100px',
                }}
            >
                {props.list.map((val) => (
                    <MenuItem key={val.id} value={val.value}>
                        {val.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export {DropDownList};