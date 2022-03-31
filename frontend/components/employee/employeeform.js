import { Box, Grid, IconButton, InputAdornment,TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { CustomDatePicker, CustomAutoComplete, InputTextField, DropDownList } from '../form/formComponent';
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { formatPhoneNumber } from "../../utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const EmployeeForm = (props) => {

    const genderList = [
        { id: '0', value: 'male', title: 'Male' },
        { id: '1', value: 'female', title: 'Female' },
        { id: '2', value: 'na', title: 'N/A' },
    ];
    const {
        setAddOpen,
        mode,
        initValues,
        tabValue,
        editEmployee,
        addEmployee,
        serviceList,
        validateEmployeeId
    } = props;
    const [employeeValue, setEmployeeValue] = useState(initValues);
    const [errorMessage, setErrorMessage] = useState({});
    const [sinToggle, setSinToggle] = useState(false);
    const toggleSinDisplay = () => {
        setSinToggle(!sinToggle);
    };

    const addNewEmployee = () => {
        if (validate()) {
            let service_ids = [];
            for (const service of employeeValue.services) {
                const idArray = service.durations_prices.map(durationprice => durationprice.id);
                service_ids = [...service_ids, ...idArray];
            }
            employeeValue.service_ids = service_ids;
            addEmployee(employeeValue);
            setAddOpen(false);
        }
    };
    const saveEditEmployee = () => {
        if (validate()) {
            let service_ids = [];
            for (const service of employeeValue.services) {
                const idArray = service.durations_prices.map(durationprice => durationprice.id);
                service_ids = [...service_ids, ...idArray];
            }
            employeeValue.service_ids = service_ids;
            editEmployee(employeeValue);
        }
    };
    const handleSetEmployeeValue = (obj) => {
        let { name, value } = obj.target;
        if (name == 'phone') {
            value = value.replace(/\D/g, '').substring(0, 10);
        }
        setEmployeeValue({ ...employeeValue, [name]: value });
    };


    const validate = () => {

        const error = {};
        if (initValues.id != employeeValue.id) {
            error.id = !validateEmployeeId(employeeValue.id) ? "" : "This id is already exist.";
        }
        error.first_name = employeeValue.first_name ? "" : "This field is required.";
        error.last_name = employeeValue.last_name ? "" : "This field is required.";
        error.sin = (employeeValue.sin.length == 9) ? "" : 'sin has to have 9 digits';
        setErrorMessage(error);
        return Object.values(error).every(x => x == "");
    };

    return (
        <Box>
            <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12}>
                    <InputTextField
                        label='Id'
                        name='id'
                        value={employeeValue.id}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.id}
                    />
                    <InputTextField
                        label='First Name'
                        name='first_name'
                        value={employeeValue.first_name}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.first_name}
                    />
                    <InputTextField
                        label='Last Name'
                        name='last_name'
                        value={employeeValue.last_name}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.last_name}
                    />
                    <InputTextField
                        label='Units'
                        name='unit'
                        value={employeeValue.unit}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.unit}
                    />
                    <InputTextField
                        label='Address'
                        name='address'
                        value={employeeValue.address}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.address}
                    />
                    <InputTextField
                        label='City'
                        name='city'
                        value={employeeValue.city}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.city}
                    />
                    <InputTextField
                        label='Province'
                        name='province'
                        value={employeeValue.province}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.province}
                    />
                    <InputTextField
                        label='Postal Code'
                        name='postal_code'
                        value={employeeValue.postal_code}
                        onChange={handleSetEmployeeValue}
                        error={errorMessage.postal_code}
                    />
                    <InputTextField
                        label='Phone'
                        name='phone'
                        value={formatPhoneNumber(employeeValue.phone)}
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
                    <TextField
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        label='SIN'
                        name='sin'
                        value={employeeValue.sin}
                        onChange={handleSetEmployeeValue}
                        {...(errorMessage.sin && { error: true, helperText: errorMessage.sin })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton
                                        onClick={() => toggleSinDisplay()}
                                    >
                                        {sinToggle ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        {...(sinToggle ? { type: "password" } : "")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputTextField
                        name="title"
                        label="Title"
                        value={employeeValue.title}
                        onChange={handleSetEmployeeValue}
                    />
                    <DropDownList
                        name="gender"
                        label="Gender"
                        value={employeeValue.gender}
                        onChange={handleSetEmployeeValue}
                        list={genderList}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomDatePicker
                        name="start_date"
                        label="Start Date"
                        value={employeeValue.start_date}
                        onChange={handleSetEmployeeValue}
                    />
                    <CustomDatePicker
                        name="dob"
                        label="Date of Birth"
                        value={employeeValue.dob}
                        onChange={handleSetEmployeeValue}
                    />

                </Grid>
                <Grid item xs={12}>
                    <CustomAutoComplete
                        name="services"
                        label="Services"
                        value={serviceList}
                        defaultValue={employeeValue.services}
                        onChange={handleSetEmployeeValue}
                    />
                </Grid>
            </Grid>
            <DialogActions>
                {mode == 'add' &&
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Button onClick={addNewEmployee}>Add New Employee</Button>
                        <Button onClick={() => setAddOpen(false)}>Close</Button>
                    </Grid>}
                {mode != 'add' && tabValue == 1 &&
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Button onClick={saveEditEmployee}>Save</Button>
                    </Grid>
                }
            </DialogActions>

        </Box>
    );
};
export default EmployeeForm;