import * as React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Button, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { capitalize } from '@material-ui/core';
import _cloneDeep from "lodash/cloneDeep";
import ServiceEmployeeTable from './serviceEmployeeTable';
import ServiceEmployeeDialog from './serviceEmployeeDialog';
import DurationPriceItem from './durationPrice';
import { InputTextField } from "../form/formComponent";
import cssStyled from '../../styles/service.module.css';
import { styled } from '@mui/material/styles';

const ClassicButton = styled(Button)(({ theme }) => ({
    border: '1px solid',
    borderColor: "#BBBBBB",
    backgroundColor: "#EFEFEF",
    color: "#707070",

    '&:hover': {
        color: "#707070",
        backgroundColor: "white",
    },
}));

const ServiceDetailsCard = (props) => {
    const { item, serviceEmployeeList, employeeList, editHandle } = props;
    const [addEmployeeCheckList, setAddEmployeeCheckList] = useState([]);
    const [deleteEmployeeCheckList, setDeleteEmployeeCheckList] = useState([]);
    const [serviceEmployeeDialog, setServiceEmployeeDialog] = useState(false);
    const [remainEmployeeList, setRemainEmployeeList] = useState([]);
    const [serviceEmployList, setServiceEmployList] = useState(serviceEmployeeList);
    const [durationPriceList, setDurationPriceList] = useState(item.durations_prices);
    const [reload, setReload] = useState(false);
    const [serviceValue, setServiceValue] = useState(_cloneDeep(item));
    const [isEditingDurationPrice, setIsEditingDurationPrice] = useState(false);

    useEffect(() => { }, [durationPriceList, reload]);

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
                ({ id: val1 }) =>
                    !serviceEmployList.some(({ id: val2 }) => val2 === val1)
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
            Object.assign({}, d, { duration: d.duration * 3600000 })));
        delete serviceValue.employees;
        editHandle(serviceValue);
    };

    const handleAddDurationPrice = () => {
        setDurationPriceList([...durationPriceList, { price: 50, duration: 0.5 }]);
    };
    const handleRemoveDurationPrice = (index) => {
        setDurationPriceList([
            ...durationPriceList.slice(0, index),
            ...durationPriceList.slice(index + 1),
        ]);
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
                            <Typography>Employee table</Typography>
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
                                        className={cssStyled.buttonContainer}
                                        variant="outlined"
                                        onClick={handleAddEmployee}
                                    >
                                        Add Employee
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className={cssStyled.buttonContainer}
                                        variant="outlined"
                                        onClick={() => handleDeleteEmployee()}
                                    >
                                        Delete Employee
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{ minHeight: '100%' }}>
                        {isEditingDurationPrice ?
                            <>
                                <ClassicButton onClick={handleAddDurationPrice} variant="contained" fullWidth>
                                    <Typography variant="button">Add A New Option</Typography>
                                </ClassicButton>
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
                            </>
                            :
                            <>
                                <ClassicButton onClick={() => { setIsEditingDurationPrice(true); }} variant="contained" fullWidth>
                                    <Typography variant="button">Modify Options</Typography>
                                </ClassicButton>
                                <DataGrid
                                    columns={[
                                        { field: 'duration', headerName: 'Duration (hrs)', type: 'number', flex: 1 },
                                        { field: 'price', headerName: 'Price (CAD)', type: 'number', flex: 1 }]}
                                    rows={
                                        durationPriceList.map((element, index) => ({ id: index + 1, duration: element.duration, price: element.price }))
                                    }
                                />
                            </>
                        }
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                        </Grid>
                    </Grid>

                </Grid>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >


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
        </Card>
    );
};
export default ServiceDetailsCard;
