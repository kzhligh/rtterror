import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import ServiceEmployeeTable from './serviceEmployeeTable';
import DurationPriceItem from './durationPriceItem';
import { Close } from '@mui/icons-material';
import styled from '../../styles/service.module.css';
import { v4 as uuidv4 } from 'uuid';
import { InputTextField } from "../form/formComponent";

const AddServiceForm = (props) => {
    const initValue = {
        service_code: '',
        name: '',
        description: '',
        treatment_type: '',
        barcode: '',
        sms_description: ''
    };
    const mshconvertion = 600000;
    const { addHandle, employeeList, open, closeDialog } = props;
    const [employeeCheckList, setEmployeeCheckList] = useState([]);
    const [durationPriceList, setDurationPriceList] = useState([{ price: 50, duration: 0.5 }]);
    const [reload, setReload] = useState(false);
    const [serviceValue, setServiceValue] = useState(initValue);
    const [errorMessage, setErrorMessage] = useState({});

    const handleSetServiceValue = (obj) => {
        const { name, value } = obj.target;
        setServiceValue({ ...serviceValue, [name]: value });
    };

    const validate = () => {
        let error = {};
        error.name = serviceValue.name ? "" : "This field is required.";
        error.durationprice = durationPriceList.length > 0 ? "" : "This field is required.";
        setErrorMessage(error);
        return Object.values(error).every(x => x == "");
    };

    const processAddService = () => {
        if (validate()) {
            serviceValue.service_code = serviceValue.service_code + "-" + uuidv4().substring(0, 4);
            serviceValue.employee_ids = employeeCheckList.map(emp => emp.id);
            serviceValue.durations_prices = durationPriceList.map(d => (
                Object.assign({}, d, { duration: d.duration * mshconvertion })));
            addHandle(serviceValue);
            closeAddDialog();
        }
    };

    const handleAddEmployeeCheck = (val, employee) => {
        if (val) {
            setEmployeeCheckList([...employeeCheckList, employee]);
        } else {
            setEmployeeCheckList(
                employeeCheckList.filter((emp) => emp.id != employee.id)
            );
        }
    };

    useEffect(() => {
    }, [employeeCheckList, durationPriceList, reload]);


    const handleAddDurationPrice = () => {
        setDurationPriceList([...durationPriceList, { price: 50, duration: 0.5 }]);
    };
    const handleRemoveDurationPrice = (index) => {
        setDurationPriceList([
            ...durationPriceList.slice(0, index),
            ...durationPriceList.slice(index + 1),
        ]);
    };
    const closeAddDialog = () => {
        setServiceValue(initValue);
        setEmployeeCheckList([]);
        setDurationPriceList([]);
        closeDialog();
    };

    return (
        <div>
            <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
                <DialogTitle>
                    New Service
                    <IconButton
                        aria-label="close"
                        onClick={closeDialog}
                        size="medium"
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="row" alignItems="stretch" spacing={3}>
                        <Grid item xs={6}>
                            <InputTextField
                                label='Name'
                                name='name'
                                value={serviceValue.name}
                                onChange={handleSetServiceValue}
                                error={errorMessage.name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputTextField
                                label='Service Code'
                                name='service_code'
                                value={serviceValue.service_code}
                                onChange={handleSetServiceValue}
                                error={errorMessage.service_code}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <InputTextField
                                label='Description'
                                name='description'
                                value={serviceValue.description}
                                onChange={handleSetServiceValue}
                                rows={4}
                            />
                            <ServiceEmployeeTable
                                displayEmployeeList={employeeList}
                                handleEmployeeCheck={handleAddEmployeeCheck}
                                employeeCheckList={employeeCheckList}
                            />
                        </Grid>

                        <Grid item xs={5} style={{ height: '100%' }}>
                            {durationPriceList.map((element, index) => (
                                <DurationPriceItem
                                    key={index}
                                    index={index}
                                    item={element}
                                    amILast={durationPriceList.length === 1}
                                    handleRemoveDurationPrice={handleRemoveDurationPrice}
                                    reload={reload}
                                    setReload={setReload}
                                />
                            ))}
                            {errorMessage.hasOwnProperty('durationprice') ?
                                <p className={styled.redText}>{errorMessage.durationprice}</p> : ''}
                            <Button onClick={handleAddDurationPrice} color="info" variant="contained" fullWidth>
                                <Typography variant="button">Add A New Option</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={processAddService} variant='contained'>Create Service</Button>
                    <Button onClick={closeAddDialog} color='inherit'>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddServiceForm;
