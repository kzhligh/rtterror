import * as React from 'react';
import {Divider, Grid} from '@mui/material';
import styled from '../../styles/service.module.css';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';
import ServiceEmployeeTable from './serviceEmployeeTable';
import TextField from '@mui/material/TextField';
import ServiceEmployeeDialog from './serviceEmployeeDialog';
import DurationPrice from './durationPrice';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import _cloneDeep from "lodash/cloneDeep";
import {InputTextField} from "../form/formComponent";
import {v4 as uuidv4} from 'uuid';

const ServiceDetailsCard = (props) => {
    const {item, serviceEmployeeList, employeeList, editHandle} = props;
    const [addEmployeeCheckList, setAddEmployeeCheckList] = useState([]);
    const [deleteEmployeeCheckList, setDeleteEmployeeCheckList] = useState([]);
    const [serviceEmployeeDialog, setServiceEmployeeDialog] = useState(false);
    const [remainEmployeeList, setRemainEmployeeList] = useState([]);
    const [serviceEmployList, setServiceEmployList] =
        useState(serviceEmployeeList);
    const [durationPriceList, setDurationPriceList] = useState(item.durations_prices);
    const [reload, setReload] = useState(false);
    const [serviceValue, setServiceValue] = useState(_cloneDeep(item));
    const [errorMessage, setErrorMessage] = useState({});

    useEffect(() => {
    }, [durationPriceList, reload]);

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
        setServiceEmployeeDialog(true);
        setRemainEmployeeList(
            employeeList.filter(
                ({id: val1}) =>
                    !serviceEmployList.some(({id: val2}) => val2 === val1)
            )
        );
    };

    const handleAddSelected = () => {
        setServiceEmployList([...serviceEmployList, ...addEmployeeCheckList]);
        setServiceEmployeeDialog(false);
        setAddEmployeeCheckList([]);
    };

    const handleDeleteEmployee = () => {
        setServiceEmployList(
            serviceEmployList.filter(
                ({id: val1}) =>
                    !deleteEmployeeCheckList.some(({id: val2}) => val2 === val1)
            )
        );
        setDeleteEmployeeCheckList([]);
    };
    const handleSaveService = () => {
        serviceValue.service_code = serviceValue.service_code + "-" + uuidv4().substring(0, 8);
        serviceValue.employee_ids = serviceEmployList.map(emp => emp.id);
        serviceValue.durations_prices = durationPriceList.map(d => (
            Object.assign({}, d, {duration: d.duration * 3600000})));
        delete serviceValue.employees;
        editHandle(serviceValue);
    };

    const handleAddDurationPrice = () => {
        setDurationPriceList([...durationPriceList, {price: 50, duration: 0.5}]);
    };
    const handleRemoveDurationPrice = (index) => {
        setDurationPriceList([
            ...durationPriceList.slice(0, index),
            ...durationPriceList.slice(index + 1),
        ]);
    };
    const handleSetServiceValue = (obj) => {
        const {name, value} = obj.target;
        setServiceValue({...serviceValue, [name]: value});
    };

    return (
        <Box>
            <Card>
                <CardContent>
                    <h1>Service name</h1>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <h3>{serviceValue.name}
                            <span>&nbsp;&nbsp;Created On</span>{new Date(serviceValue.createdAt).toDateString()}</h3>

                        <InputTextField
                            label='Service Code'
                            name='service_code'
                            value={serviceValue.service_code.split("-")[0]}
                            onChange={handleSetServiceValue}
                            error={errorMessage.service_code}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <InputTextField
                            label='Description'
                            name='description'
                            value={serviceValue.description}
                            onChange={handleSetServiceValue}
                            rows={4}
                        />
                    </Grid>
                    <Divider/>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{xs: 1, sm: 2, md: 3}}
                    >
                        <Grid item xs={6}>
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
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={3}>
                                    <IconButton onClick={handleAddDurationPrice}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <h1>
                                Employee table
                                <ServiceEmployeeTable
                                    displayEmployeeList={serviceEmployList}
                                    handleEmployeeCheck={handleDeleteEmployeeCheck}
                                    employeeCheckList={deleteEmployeeCheckList}
                                />
                            </h1>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{xs: 1, sm: 2, md: 3}}
                            >
                                <Grid item xs={6}>
                                    <Button
                                        className={styled.addRightButton}
                                        variant="outlined"
                                        onClick={handleAddEmployee}
                                    >
                                        Add Employee
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className={styled.addRightButton}
                                        variant="outlined"
                                        onClick={() => handleDeleteEmployee()}
                                    >
                                        Delete Employee
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <ServiceEmployeeDialog
                        serviceEmployeeDialog={serviceEmployeeDialog}
                        setServiceEmployeeDialog={setServiceEmployeeDialog}
                        handleAddSelected={handleAddSelected}
                        displayEmployeeList={remainEmployeeList}
                        handleEmployeeCheck={handleAddEmployeeCheck}
                        employeeCheckList={addEmployeeCheckList}
                    />
                </CardContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button
                        className={styled.addRightButton}
                        variant="outlined"
                        onClick={handleSaveService}
                    >
                        Save
                    </Button>
                </Grid>
            </Card>
        </Box>
    );
};
export default ServiceDetailsCard;
