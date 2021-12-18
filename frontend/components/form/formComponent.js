import TextField from "@mui/material/TextField";
import * as React from "react";
import {Checkbox, FormControl, FormControlLabel} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {useEffect} from "react";

const InputTextField = (props)=>{
    // {...(error && {error:true,helperText:error})}

    return (
        <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            label={props.label}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            {...(props.error && {error:true,helperText:props.error})}
        />
    );
}
export {InputTextField};

const CustomCheckBox =(props)=>{
    const { name, label, value, onChange, items } = props;
    const convertToTargetObject = (name, value, checked) => {

        if(checked){
            return { target :{
                    name: name, value: value
                }}
        }
        else{
            return { target :{
                    name: name, value: 'na'
                }}
        }

    }
    //onChange(convertToTargetObject('gender', e.target.checked))
    // console.log(e.target.value)
    return (
        <FormControl>

            {
                items.map((item,index) => (
                        <>
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        id={item.id}
                                        value={item.name}
                                        color="primary"
                                        checked={value == item.name}
                                        onChange={e => onChange(convertToTargetObject(item.name,e.target.value,e.target.checked))}
                                    />
                                }
                                label={item.title}
                            />
                        </>
                    )
                )
            }
        </FormControl>
    );
}
export {CustomCheckBox};

const CustomAutoComplete =(props)=>{
    useEffect(()=>{
        props.onChange({target: {name:props.name, value: [...props.defaultValue]}})
    },[])
    return ( <Autocomplete
        multiple
        label={props.label}
        name={props.name}
        options={props.value}
        getOptionLabel={(option) => option.title}
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
        onChange={(event, newValue)=>props.onChange({target: {name:props.name, value: newValue}})}
    />);
}
export {CustomAutoComplete};

const CustomDatePicker =(props)=>{
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={props.label}
                value={props.value}
                onChange={newValue => props.onChange({target: {name:props.name, value: new Date(newValue)}})}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
export {CustomDatePicker};
