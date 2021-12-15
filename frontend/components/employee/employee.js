import {Checkbox, Chip, FormControl, FormControlLabel, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useState} from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";


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
           />
    );
}

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
                items.map(item => (
                    <>
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    id={item.id}
                                    value={item.name}
                                    color="primary"
                                    checked={value == item.name}
                                    onChange={e => onChange(convertToTargetObject('gender',e.target.value,e.target.checked))}
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
// Date Picker

const EmployeeForm = (props)=>{

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
    ];


    const initValues = {
        id: 0,
        firstname: '',
        lastname:'',
        address:'',
        phone: '',
        email: '',
        gender: 'na',
        startdate: new Date(),
        services:[]
    };
    const handleSetEmployeeValue = (obj)=>{
        const {name, value} = obj.target;
        setEmployeeValue({...employeeValue, [name]:value});
    };

    const genderList = [
        { id: '0' , name: 'male', title: 'Male' },
        { id: '1' , name:  'female', title: 'Female' },
        { id: '2' , name: 'na', title: 'N/A' },
    ];

    const [employeeValue, setEmployeeValue] = useState(initValues);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const {open , handleClose} =props;
    //(date: Date)=>handleSetEmployeeValue({name:'startdate',value:new Date(event.target.value)})
    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12}>
                    <InputTextField
                        label='First Name'
                        name='firstname'
                        value={employeeValue.firstname}
                        onChange={handleSetEmployeeValue}
                    />
                    <InputTextField
                        label='Last Name'
                        name='lastname'
                        value={employeeValue.lastname}
                        onChange={handleSetEmployeeValue}
                    />
                    <InputTextField
                        label='Address'
                        name='address'
                        value={employeeValue.address}
                        onChange={handleSetEmployeeValue}
                    />
                    <InputTextField
                        label='Phone'
                        name='phone'
                        value={employeeValue.phone}
                        onChange={handleSetEmployeeValue}
                    />
                    <InputTextField
                        label='email'
                        name='email'
                        value={employeeValue.email}
                        onChange={handleSetEmployeeValue}
                    />
                    <CustomCheckBox
                        name="gender"
                        label="Gender"
                        value={employeeValue.gender}
                        onChange={handleSetEmployeeValue}
                        items={genderList}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Basic example"
                            value={employeeValue.startdate}
                            onChange={(newValue) => {
                                handleSetEmployeeValue({target: {name:'startdate', value: new Date(newValue)}})
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>


                    <Autocomplete
                        multiple
                        label='Services'
                        name='services'
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[top100Films[13],top100Films[10]]}
                        filterSelectedOptions
                        autoHighlight
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Service"
                                placeholder="Services"
                            />
                        )}
                        onChange={(event, value)=>console.log(value)}
                    />
                </Grid>
            </Grid>

        </div>
    );
}
export default EmployeeForm;