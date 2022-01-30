import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Close} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import styled from '../../styles/service.module.css';
import {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import ServiceEmployeeTable from './serviceEmployeeTable';
import DurationPrice from './durationPrice';
import AddIcon from '@mui/icons-material/Add';
import {v4 as uuidv4} from 'uuid';
import {InputTextField} from "../form/formComponent";


const AddServiceForm = (props) => {
    const initValue = {
        service_code: '',
        name: '',
        description: '',
        treatment_type: '',
        barcode: '',
        sms_description: ''
    };
    const mshconvertion = 3600000;
    const {addHandle, employeeList, open, closeDialog} = props;
    const [employeeCheckList, setEmployeeCheckList] = useState([]);
    const [durationPriceList, setDurationPriceList] = useState([]);
    const [reload, setReload] = useState(false);
    const [serviceValue, setServiceValue] = useState(initValue);
    const [errorMessage, setErrorMessage] = useState({});

    const handleSetServiceValue = (obj) => {
        const {name, value} = obj.target;
        setServiceValue({...serviceValue, [name]: value});
    };

    const validate = () => {
        let temp = {}
        temp.name = serviceValue.name ? "" : "This field is required.";
        temp.durationprice = durationPriceList.length > 0 ? "" : "This field is required.";
        setErrorMessage(temp);
        return Object.values(temp).every(x => x == "")
    }

    const processAddService = () => {
        if (validate()) {
            //convert the duration to ms
            let durationTemp = durationPriceList.map(d => (
                Object.assign({}, d, {duration: d.duration * mshconvertion})));
            let employeeTemp = employeeCheckList.map(emp => emp.id);
            serviceValue.service_code = serviceValue.service_code + "-" + uuidv4().substring(0, 4);
            serviceValue.employee_ids = employeeTemp;
            serviceValue.durations_prices = durationTemp;
            console.log(serviceValue)
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
        setDurationPriceList([...durationPriceList, {price: 50, duration: 0.5}]);
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
    }

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
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" alignItems="stretch">
                        <InputTextField
                            label='Name'
                            name='name'
                            value={serviceValue.name}
                            onChange={handleSetServiceValue}
                            error={errorMessage.name}
                        />
                        <InputTextField
                            label='Service Code'
                            name='service_code'
                            value={serviceValue.service_code}
                            onChange={handleSetServiceValue}
                            error={errorMessage.service_code}
                        />
                        <Grid item xs={12}>
                            {durationPriceList.map((element, index) => (
                                <DurationPrice
                                    key={index}
                                    index={index}
                                    item={element}
                                    durationPriceList={durationPriceList}
                                    handleRemoveDurationPrice={handleRemoveDurationPrice}
                                    reload={reload}
                                    setReload={setReload}
                                />
                            ))}
                            {errorMessage.hasOwnProperty('durationprice') ?
                                <p className={styled.redText}>{errorMessage.durationprice}</p> : ''}
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item={3}>
                                    <IconButton onClick={handleAddDurationPrice}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <InputTextField
                                label='Description'
                                name='description'
                                value={serviceValue.description}
                                onChange={handleSetServiceValue}
                                rows={4}
                            />

                        </Grid>
                    </Grid>
                    <div className={styled.separateVDiv}></div>
                    <h1>Add Employee </h1>
                    <ServiceEmployeeTable
                        displayEmployeeList={employeeList}
                        handleEmployeeCheck={handleAddEmployeeCheck}
                        employeeCheckList={employeeCheckList}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={processAddService}>Create Service</Button>
                    <Button onClick={closeAddDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddServiceForm;
