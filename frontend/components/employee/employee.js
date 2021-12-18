import {Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {CustomDatePicker, CustomAutoComplete, InputTextField, CustomCheckBox} from '../form/formComponent';
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";


const EmployeeForm = (props) => {

    const serviceList = [
        {title: 'The Shawshank Redemption', year: 1994},
        {title: 'The Godfather', year: 1972},
        {title: 'The Godfather: Part II', year: 1974},
        {title: 'The Dark Knight', year: 2008},
        {title: '12 Angry Men', year: 1957},
        {title: "Schindler's List", year: 1993},
        {title: 'Pulp Fiction', year: 1994},
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        {title: 'The Good, the Bad and the Ugly', year: 1966},
        {title: 'Fight Club', year: 1999},
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        {title: 'Forrest Gump', year: 1994},
        {title: 'Inception', year: 2010},
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        {title: "One Flew Over the Cuckoo's Nest", year: 1975},
        {title: 'Goodfellas', year: 1990},
        {title: 'The Matrix', year: 1999},
        {title: 'Seven Samurai', year: 1954},
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        {title: 'City of God', year: 2002},
        {title: 'Se7en', year: 1995},
        {title: 'The Silence of the Lambs', year: 1991},
        {title: "It's a Wonderful Life", year: 1946},
        {title: 'Life Is Beautiful', year: 1997},
        {title: 'The Usual Suspects', year: 1995},
        {title: 'Léon: The Professional', year: 1994},
        {title: 'Spirited Away', year: 2001},
        {title: 'Saving Private Ryan', year: 1998},
        {title: 'Once Upon a Time in the West', year: 1968},
        {title: 'American History X', year: 1998},
        {title: 'Interstellar', year: 2014},
    ];


    const addHandle =()=>{
        if(validate()){
            console.log(employeeValue);
            if(employeeValue.services){
                console.log("empty services")
            }
            saveEmployee(employeeValue);
            console.log('add employee')
        }
    };

    const handleSetEmployeeValue = (obj) => {
        const {name, value} = obj.target;
        setEmployeeValue({...employeeValue, [name]: value});
    };

    const genderList = [
        {id: '0', name: 'male', title: 'Male'},
        {id: '1', name: 'female', title: 'Female'},
        {id: '2', name: 'na', title: 'N/A'},
    ];
    const { handleClose , mode, initValues , saveEmployee} = props;
    const [employeeValue, setEmployeeValue] = useState(initValues);
    const [errorMessage, setErrorMessage] = useState({});

    const validate = () => {
        let temp = {}
        temp.firstname = employeeValue.firstname ? "" : "This field is required."
        temp.lastname = employeeValue.lastname ? "" : "This field is required."
        temp.email = (/$^|.+@.+..+/).test(employeeValue.email) ? "" : "Email is not valid."
        temp.phone = (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test(employeeValue.phone) ? "" : "Invalid Phone number."
        setErrorMessage(temp);
        return Object.values(temp).every(x => x == "")
    }

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
                        error={errorMessage.firstname}
                    />
                    <InputTextField
                        label='Last Name'
                        name='lastname'
                        value={employeeValue.lastname}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.lastname}
                    />
                    <InputTextField
                        label='Address'
                        name='address'
                        value={employeeValue.address}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.address}
                    />
                    <InputTextField
                        label='Phone'
                        name='phone'
                        value={employeeValue.phone}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.phone}
                    />
                    <InputTextField
                        label='email'
                        name='email'
                        value={employeeValue.email}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.email}
                    />
                    <CustomCheckBox
                        name="gender"
                        label="Gender"
                        value={employeeValue.gender}
                        onChange={handleSetEmployeeValue}
                        items={genderList}
                    />
                    <CustomDatePicker
                        name="startDate"
                        label="Start Date"
                        value={employeeValue.startDate}
                        onChange={handleSetEmployeeValue}
                    />
                    <CustomAutoComplete
                        name="services"
                        label="Services"
                        value={serviceList}
                        defaultValue = {[serviceList[13],serviceList[10]]}
                        onChange={handleSetEmployeeValue}
                    />
                </Grid>
            </Grid>
            {mode == 'add' && <DialogActions>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Button onClick={addHandle}>Add New Employee</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Grid>
            </DialogActions>}
        </div>
    );
}
export default EmployeeForm;