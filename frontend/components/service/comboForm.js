import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import {Close} from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import styled from '../../styles/service.module.css';
import AddIcon from '@mui/icons-material/Add';
import {Checkbox, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import * as React from 'react';
import Card from '@mui/material/Card';
import {useEffect, useState} from 'react';
import {http} from "../../utils/http";
import {InputTextField} from "../form/formComponent";
import _isEmpty from "lodash/isEmpty"
import _findIndex from "lodash/findIndex"
import _pullAt from "lodash/pullAt"
import {useRouter} from 'next/router';

const ComboItem = (props) => {
    const {item, handleServiceCheck, removeService, isEdit, serviceCheckList, changeDurationOfService} =
        props;

    return (
        <Card>
            <div className={styled.flexAlignContainer}>
                <div>
                    <Grid container>
                        <Grid item xs={8}>
                            <h4>{item.name}</h4>
                        </Grid>
                        <Grid item xs={8}>
                            <h4>{item.service_code}</h4>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <div className={styled.flexAlignContainer}>
                        <FormControl
                            sx={{
                                marginX: '10px',
                            }}
                        >
                            <Select
                                data-cy="patientSort"
                                value={0}
                                defaultValue=""
                                sx={{
                                    minWidth: '100px',
                                }}
                            >
                                {!_isEmpty(item.durations_prices) ? item.durations_prices.map((durationPrice, index) => (
                                    <MenuItem value={index} key={index}
                                              onClick={() => changeDurationOfService(item.service_code, durationPrice, serviceCheckList)}>
                                        H {durationPrice.duration} - ${durationPrice.price}
                                    </MenuItem>
                                )) : null}
                            </Select>
                        </FormControl>
                        {isEdit ? (
                            <Checkbox
                                key={item.id}
                                value={item}
                                checked={
                                    serviceCheckList ? serviceCheckList.includes(item) : false
                                }
                                onChange={(event) => {
                                    handleServiceCheck(event.target.checked, item);
                                }}
                            />
                        ) : (
                            <IconButton onClick={() => removeService(item)}>
                                <Close/>
                            </IconButton>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};
const EditCombo = (props) => {
    const {
        editDialog,
        setEditDialog,
        handleServiceCheck,
        removeService,
        handleSave, extractAddServiceEdit, serviceListAddable
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
                    <AddIcon/>
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
                        <Close/>
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
    const router = useRouter();
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
        serviceListData
    } = props;
    const initValue = {
        service_code: '',
        name: '',
        total_duration: '',
        total_price: '',
        service_ids: [],
    };

    const [editDialog, setEditDialog] = useState(false);
    const [comboValue, setComboValue] = useState(!_isEmpty(comboDetail) ? comboDetail : initValue);
    const [errorMessage, setErrorMessage] = useState({});
    const [serviceListAddable, setServiceListAddable] = useState([]);

    const isEdit = () => type == 'edit';
    const handleSave = (serviceToAdd) => {
        setServiceCheckList(serviceToAdd.concat(serviceCheckList));
    };
    const changeDurationOfService = (serviceCode, durationPrice, serviceCheckList) => {
        let index = _findIndex(serviceCheckList, ['service_code', serviceCode])
        let services = serviceCheckList[index];
        let durationsPriceList = services.durations_prices;
        let durationsPriceIndex = _findIndex(durationsPriceList, ['id', durationPrice.id]);
        _pullAt(durationsPriceList, [durationsPriceIndex]);
        durationsPriceList.splice(0, 0, durationPrice);
        services.durations_prices = durationsPriceList;
        serviceCheckList.splice(index, 1, services);
        setServiceCheckList([...serviceCheckList]);
    }

    useEffect(() => {
        let name = '';
        let price = 0;
        let duration = 0;
        for (let serviceItem of serviceCheckList) {
            name += serviceItem.name + ' + ';
            price += serviceItem.durations_prices[0].price * 1;
            duration += serviceItem.durations_prices[0].duration * 1;
        }
        if (!_isEmpty(comboValue.name) && _isEmpty(comboDetail)) {
            name = comboValue.name;
        } else {
            name = name.slice(0, -2);
        }
        setComboValue({...comboValue, name: name, total_price: price, total_duration: duration})
    }, [serviceCheckList]);


    const closeClearValue = () => {
        setComboValue(initValue);
        handleCloseComboDialog();
        setServiceCheckList([]);
    };

    const handleSetValue = (obj) => {
        const {name, value} = obj.target;
        setComboValue({...comboValue, [name]: value});
    };
    const removeService = (item) => {
        handleServiceCheck(false, item);
        if (serviceCheckList.length == 1) {
            // the update of component is kind of late
            closeClearValue();
        }
    };

    const handleCreateCombo = () => {
        let serviceId = serviceCheckList.map((service) => service.durations_prices[0].id);
        comboValue.service_ids = serviceId;
        comboValue.service_code = comboValue.name;
        comboValue.total_duration = comboValue.total_duration * 3600000;
        const result = http('/api/v1/combos', {
            method: 'POST',
            body: comboValue,
        }).then(() => {
        });
        closeClearValue();
        setRefresh(!refresh);
    };
    const handleEditSubmit = () => {
        let serviceId = serviceCheckList.map((service) => service.durations_prices[0].id);
        comboValue.service_ids = serviceId;
        comboValue.service_code = comboValue.name;
        comboValue.total_duration = comboValue.total_duration * 3600000;
        const result = http('/api/v1/combos', {
            method: 'PUT',
            body: comboValue,
        }).then(() => {
        });
        closeClearValue();
        setRefresh(!refresh);
    };
    const validate = () => {
        let error = {}
        setErrorMessage(error);
        return Object.values(temp).every(x => x == "")
    }
    const extractAddServiceEdit = () => {
        let serviceCode = serviceCheckList.map((service) => service.service_code);
        let addableList = serviceListData.filter((item) => !serviceCode.includes(item.service_code) && !item.hasOwnProperty('services'));
        setServiceListAddable(addableList);
        setEditDialog(true)
    }

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
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <InputTextField
                            label='Name'
                            name='name'
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
                            <label>Total Duration (H): </label>
                            <InputTextField
                                label='Total Duration'
                                name='total_duration'
                                value={comboValue.total_duration}
                                onChange={handleSetValue}
                                error={errorMessage.total_duration}
                            />
                        </div>

                        <div className={styled.flexAlignContainer}>
                            <label>Total Price ($): </label>
                            <InputTextField
                                label='Total Price'
                                name='total_duration'
                                value={comboValue.total_price}
                                onChange={handleSetValue}
                                error={errorMessage.total_price}
                            />
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <div className={styled.flexSpaceBetween}>
                        <Button onClick={isEdit() ? handleEditSubmit : handleCreateCombo}>
                            Submit
                        </Button>
                        <Button onClick={closeClearValue}>Cancel</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ComboForm;
