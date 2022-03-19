import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import styled from '../../styles/service.module.css';
import { http } from '../../utils/http';
import { InputTextField } from '../form/formComponent';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';
import _pullAt from 'lodash/pullAt';

const ComboItem = (props) => {
    const {
        item: serviceItem,
        handleServiceCheck,
        removeService,
        isEdit,
        serviceCheckList,
        changeDurationOfService,
    } = props;

    return (
        <Card>
            <CardHeader
                action={
                    <>
                        {isEdit ? (
                            <Checkbox
                                key={serviceItem.id}
                                value={serviceItem}
                                checked={serviceCheckList.includes(serviceItem)}
                                onChange={(event) => {
                                    handleServiceCheck(event.target.checked, serviceItem);
                                }}
                            />
                        ) : (
                            <IconButton onClick={() => removeService(serviceItem)}>
                                <Close />
                            </IconButton>
                        )}
                    </>
                }
                title={<>{serviceItem.name}</>}
                subheader={
                    <>
                        <Chip label="Service Code" size="small" />{' '}
                        {serviceItem.service_code.split('-', 1)[0]}
                    </>
                }
            />
            <FormControl
                sx={{
                    marginX: '10px',
                }}
            >
                <FormLabel id="demo-row-radio-buttons-group-label">Options</FormLabel>
                <RadioGroup
                    row
                    data-cy="clientSort"
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={0}
                >
                    {!_isEmpty(serviceItem.durations_prices)
                        ? serviceItem.durations_prices.map((option, index) => (
                            <FormControlLabel
                                value={index}
                                key={index}
                                control={<Radio />}
                                onClick={() =>
                                    changeDurationOfService(
                                        serviceItem.service_code,
                                        option,
                                        serviceCheckList
                                    )
                                }
                                label={`${option.duration} MIN / ${option.price} CAD`}
                            />
                        ))
                        : null}
                </RadioGroup>
            </FormControl>
        </Card>
    );
};
const EditCombo = (props) => {
    const {
        editDialog,
        setEditDialog,
        removeService,
        handleSave,
        extractAddServiceEdit,
        serviceListAddable,
    } = props;
    const [serviceToAdd, setServiceToAdd] = useState([]);

    const handleAddRemoveService = (val, item) => {
        if (val) {
            setServiceToAdd([...serviceToAdd, item]);
        } else {
            setServiceToAdd(
                serviceToAdd.filter((itemService) => itemService.id != item.id)
            );
        }
        return serviceToAdd.length;
    };
    const SaveClose = () => {
        handleSave(serviceToAdd);
        handleClose();
    };
    const handleClose = () => {
        setEditDialog(false);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item={3}>
                <IconButton onClick={extractAddServiceEdit}>
                    <AddIcon />
                </IconButton>
            </Grid>
            <Dialog open={editDialog} fullWidth={true} scroll="body">
                <DialogTitle>
                    Edit Combo
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
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
                    <Stack spacing={2}>
                        {!_isEmpty(serviceListAddable) &&
                            serviceListAddable.map((item) => (
                                <ComboItem
                                    key={item.id}
                                    item={item}
                                    handleServiceCheck={handleAddRemoveService}
                                    removeService={removeService}
                                    isEdit={true}
                                    serviceCheckList={serviceToAdd}
                                />
                            ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <div className={styled.flexSpaceBetween}>
                        <Button onClick={SaveClose}>Save </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

const ComboForm = (props) => {
    const {
        openDialog,
        handleCloseComboDialog,
        serviceCheckList,
        handleServiceCheck,
        type,
        setServiceCheckList,
        comboDetail,
        refresh,
        setRefresh,
        serviceListData,
    } = props;
    const initValue = {
        service_code: '',
        name: '',
        total_duration: '',
        total_price: '',
        service_ids: [],
    };

    const [editDialog, setEditDialog] = useState(false);
    const [comboValue, setComboValue] = useState(
        !_isEmpty(comboDetail) ? comboDetail : initValue
    );
    const [autoPopulate,setAutoPopulate] = useState(false);
    const [comboPlacholderValue, setComboPlacholderValue] = useState();
    const [errorMessage, setErrorMessage] = useState({});
    const [serviceListAddable, setServiceListAddable] = useState([]);

    const isEdit = () => type == 'edit';
    const handleSave = (serviceToAdd) => {
        setServiceCheckList(serviceToAdd.concat(serviceCheckList));
    };
    const changeDurationOfService = (
        serviceCode,
        durationPrice,
        servCheckList
    ) => {
        console.log({serviceCode: serviceCode,durationPrice: durationPrice,servCheckList: serviceCheckList})
        let index = _findIndex(serviceCheckList, ['service_code', serviceCode]);
        console.log(index);
        let services = servCheckList[index];
        let durationsPriceList = services.durations_prices;
        let durationsPriceIndex = _findIndex(durationsPriceList, [
            'id',
            durationPrice.id,
        ]);
        _pullAt(durationsPriceList, [durationsPriceIndex]);
        durationsPriceList.splice(0, 0, durationPrice);
        services.durations_prices = durationsPriceList;
        servCheckList.splice(index, 1, services);
        setServiceCheckList([...servCheckList]);
        setAutoPopulate(true);
    };

    useEffect(() =>{
        let name = '';
        let price = 0;
        let duration = 0;
        for (let serviceItem of serviceCheckList) {
            name += serviceItem.service_code.split("-")[0] + ' + ';
            price += serviceItem.durations_prices[0].price * 1;
            duration += serviceItem.durations_prices[0].duration * 1;
        }
        let value = {...comboValue};
        value.name=name.slice(0, -2);
        value.total_price=price;
        value.total_duration=duration
        if(autoPopulate){
            setComboValue(value);
        }
    }, [serviceCheckList]);

    const closeClearValue = () => {
        setComboValue(initValue);
        handleCloseComboDialog();
        setServiceCheckList([]);
    };

    const handleSetValue = (obj) => {
        const { name, value } = obj.target;
        setComboValue({ ...comboValue, [name]: value });
    };
    const removeService = (item) => {
        handleServiceCheck(false, item);
        if (serviceCheckList.length === 1) {
            closeClearValue();
        }
    };

    const MS_H_CONVERSION_RATE = 600000;
    const handleCreateCombo = () => {
        if (validate()) {
            let serviceId = serviceCheckList.map(
                (service) => service.durations_prices[0].id
            );
            comboValue.service_ids = serviceId;
            comboValue.service_code = comboValue.name;
            comboValue.total_duration = comboValue.total_duration * MS_H_CONVERSION_RATE;
            http(`/api/v1/combos`, {
                method: 'POST',
                body: comboValue,
            }).then();
            closeClearValue();
            setRefresh(!refresh);
        }
    };
    const handleEditSubmit = () => {
        let serviceId = serviceCheckList.map(
            (service) => service.durations_prices[0].id
        );
        comboValue.service_ids = serviceId;
        comboValue.service_code = comboValue.name;
        comboValue.total_duration = comboValue.total_duration * MS_H_CONVERSION_RATE;
        http(`/api/v1/combos`, {
            method: 'PUT',
            body: comboValue,
        }).then();
        closeClearValue();
        setRefresh(!refresh);
    };
    const validate = () => {
        let error = {};
        setErrorMessage(error);
        return Object.values(error).every((x) => x == '');
    };
    const extractAddServiceEdit = () => {
        let serviceCode = serviceCheckList.map((service) => service.service_code);
        let addableList = serviceListData.filter(
            (item) =>
                !serviceCode.includes(item.service_code) &&
                !item.hasOwnProperty('services')
        );
        setServiceListAddable(addableList);
        setEditDialog(true);
    };

    return (
        <div>
            <Dialog open={openDialog} fullWidth={true} maxWidth="lg" scroll="body">
                <DialogTitle>
                    {isEdit() ? 'Edit Combo' : 'New Combo'}
                    <IconButton
                        aria-label="close"
                        onClick={closeClearValue}
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
                    <Stack spacing={2}>
                        <InputTextField
                            label="Name"
                            name="name"
                            value={comboValue.name}
                            onChange={handleSetValue}
                            error={errorMessage.name}
                        />
                        {serviceCheckList &&
                            serviceCheckList.map((item) => (
                                <ComboItem
                                    key={item.id}
                                    item={item}
                                    handleServiceCheck={handleServiceCheck}
                                    removeService={removeService}
                                    isEdit={false}
                                    changeDurationOfService={changeDurationOfService}
                                    serviceCheckList={serviceCheckList}
                                />
                            ))}
                        {isEdit() ? (
                            <EditCombo
                                editDialog={editDialog}
                                setEditDialog={setEditDialog}
                                handleServiceCheck={handleServiceCheck}
                                removeService={removeService}
                                serviceCheckList={serviceCheckList}
                                handleSave={handleSave}
                                serviceListData={serviceListData}
                                extractAddServiceEdit={extractAddServiceEdit}
                                serviceListAddable={serviceListAddable}
                            />
                        ) : null}

                        <div className={styled.flexAlignContainer}>
                            <label>Total Duration (MIN): </label>
                            <InputTextField
                                label="Total Duration"
                                name="total_duration"
                                value={comboValue.total_duration}
                                onChange={handleSetValue}
                                error={errorMessage.total_duration}
                            />
                        </div>

                        <div className={styled.flexAlignContainer}>
                            <label>Total Price ($): </label>
                            <InputTextField
                                label="Total Price"
                                name="total_price"
                                value={comboValue.total_price}
                                onChange={handleSetValue}
                                error={errorMessage.total_price}
                            />
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={isEdit() ? handleEditSubmit : handleCreateCombo}
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Button onClick={closeClearValue} color="inherit">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ComboForm;
