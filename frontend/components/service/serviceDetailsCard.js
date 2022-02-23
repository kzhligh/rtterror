import * as React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Button, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { capitalize } from '@material-ui/core';
import _cloneDeep from "lodash/cloneDeep";
import ServiceEmployeeTable from './serviceEmployeeTable';
import ServiceEmployeeDialog from './serviceEmployeeDialog';
import DurationPriceDisplay from './durationPriceDisplay';
import { InputTextField } from "../form/formComponent";
import cssStyled from '../../styles/service.module.css';


const ServiceDetailsCard = (props) => {
    const { item, serviceEmployeeList, employeeList, editHandle } = props;
    const [addEmployeeCheckList, setAddEmployeeCheckList] = useState([]);
    const [deleteEmployeeCheckList, setDeleteEmployeeCheckList] = useState([]);
    const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false);
    const [remainEmployeeList, setRemainEmployeeList] = useState([]);
    const [serviceEmployList, setServiceEmployList] = useState(serviceEmployeeList);
    const [durationPriceList, setDurationPriceList] = useState(item.durations_prices);
    const [reload, setReload] = useState(false);
    const [serviceValue, setServiceValue] = useState(_cloneDeep(item));

    // useEffect(() => { }, [durationPriceList, reload]);

    const handleAddEmployeeCheck = (val, employee) => {
        if (val) {
            setAddEmployeeCheckList([...addEmployeeCheckList, employee]);
        } else {
            setAddEmployeeCheckList(
                addEmployeeCheckList.filter(
                    (emp) => emp.id != employee.id
                )
            );
        }
    };

    const handleDeleteEmployeeCheck = (val, employee) => {
        if (val) {
            setDeleteEmployeeCheckList([...deleteEmployeeCheckList, employee]);
        } else {
            setDeleteEmployeeCheckList(
                deleteEmployeeCheckList.filter(
                    (emp) => emp.id != employee.id
                )
            );
        }
    };
    const handleAddEmployee = () => {
        setOpenEmployeeDialog(true);
        setRemainEmployeeList(
            employeeList.filter(
                ({ id: val1 }) =>
                    !serviceEmployList.some(({ id: val2 }) => val2 === val1)
            )
        );
    };

    const handleAddSelected = () => {
        setServiceEmployList([...serviceEmployList, ...addEmployeeCheckList]);
        setOpenEmployeeDialog(false);
        setAddEmployeeCheckList([]);
    };

    const handleDeleteEmployee = () => {
        setServiceEmployList(
            serviceEmployList.filter(
                ({ id: val1 }) =>
                    !deleteEmployeeCheckList.some(({ id: val2 }) => val2 === val1)
            )
        );
        setDeleteEmployeeCheckList([]);
    };
    const handleSaveService = () => {
        serviceValue.service_code = serviceValue.service_code + "-" + uuidv4().substring(0, 8);
        serviceValue.employee_ids = serviceEmployList.map(emp => emp.id);
        serviceValue.durations_prices = durationPriceList.map(d => (
            Object.assign({}, d, { duration: d.duration * 60000 })));
        delete serviceValue.employees;
        editHandle(serviceValue);
    };

    const handleSetServiceValue = (obj) => {
        const { name, value } = obj.target;
        setServiceValue({ ...serviceValue, [name]: value });
    };

    return (
        <Card>
            <CardHeader title={capitalize(serviceValue.name)} />
            <CardContent>
                <Grid container spacing={1} >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center"                        >
                        <Typography>Created on {new Date(serviceValue.createdAt).toDateString()}</Typography>
                        <Grid direction="row">
                            <Button
                                className={cssStyled.buttonContainer}
                                variant="outlined"
                                onClick={() => { handleSaveService(); }}
                                color='success'
                            >
                                Save
                            </Button>
                            <Button
                                className={cssStyled.buttonContainer}
                                variant="outlined"
                                color="inherit"
                                href='/service'
                                sx={{ color: 'text.secondary', borderColor: 'text.secondary' }}
                            >
                                Back
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <InputTextField
                            label='Service Code'
                            name='service_code'
                            value={serviceValue.service_code.split("-", 1)[0]}
                            onChange={handleSetServiceValue}
                        />

                        <InputTextField
                            label='Description'
                            name='description'
                            value={serviceValue.description}
                            onChange={handleSetServiceValue}
                            rows={4}
                        />
                        <Grid item>
                            <ServiceEmployeeTable
                                displayEmployeeList={serviceEmployList}
                                handleEmployeeCheck={handleDeleteEmployeeCheck}
                                employeeCheckList={deleteEmployeeCheckList}
                            />
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        onClick={handleAddEmployee}
                                        fullWidth
                                    >
                                        Assign Employee
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteEmployee()}
                                        fullWidth
                                    >
                                        Unassign Employee
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{ minHeight: '100%' }}>
                        <DurationPriceDisplay durationPriceList={durationPriceList} setDurationPriceList={setDurationPriceList} reload={reload} setReload={setReload} />
                    </Grid>
                </Grid>
                <ServiceEmployeeDialog
                    serviceEmployeeDialog={openEmployeeDialog}
                    setServiceEmployeeDialog={setOpenEmployeeDialog}
                    handleAddSelected={handleAddSelected}
                    displayEmployeeList={remainEmployeeList}
                    handleEmployeeCheck={handleAddEmployeeCheck}
                    employeeCheckList={addEmployeeCheckList}
                />
            </CardContent>
        </Card>
    );
};
export default ServiceDetailsCard;
