import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import {Close} from '@mui/icons-material';
import DialogContent from '@mui/material/DialogContent';
import styled from '../../styles/service.module.css';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import {Checkbox, Grid, InputAdornment, Stack} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import * as React from 'react';
import Card from '@mui/material/Card';
import {useEffect, useState} from 'react';
import request from 'superagent';
import BuildPath from '../pathBuilder';
import {InputTextField} from "../form/formComponent";

const ComboItem = (props) => {
    const {item, handleServiceCheck, removeService, isEdit, serviceCheckList} =
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
                            <h4>{item.barcode}</h4>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <div className={styled.flexAlignContainer}>
                        <h4>duration price</h4>
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
        serviceCheckListAddable,
        handleServiceCheck,
        removeService,
        handleSave,
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
        // console.log(serviceCheckList)
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
                <IconButton onClick={() => setEditDialog(true)}>
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Dialog open={editDialog} fullWidth={true} scroll="body">
                <DialogTitle>
                    Add Service
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
                        {serviceCheckListAddable &&
                            serviceCheckListAddable.map((item) => (
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
// remove the service from combo does not work
const ComboForm = (props) => {
    const {
        openDialog,
        handleCloseComboDialog,
        serviceCheckList,
        handleServiceCheck,
        type,
        setServiceCheckList,
    } = props;
    const initValue = {
        name: '',
        serviceCode: '',
        total_duration: '',
        total_price: '',
        service_ids: ['id', 'id'],
    };
    const [comboValue, setComboValue] = useState(initValue);
    const [editDialog, setEditDialog] = useState(false);
    const isEdit = () => type == 'edit';
    const handleSave = (serviceToAdd) => {
        setServiceCheckList(serviceToAdd.concat(serviceCheckList));
    };
    useEffect(() => {
        let name = '';
        let price = 0;
        let duration = 0;
        let code = '';
        let id = [];
        for (let serviceItem of serviceCheckList) {
            name += serviceItem.barcode + ' + ';
            price += serviceItem.price * 1;
            duration += serviceItem.duration;
            code += serviceItem.service_code;
            id.push(serviceItem.id);
        }
        setComboValue({
            name: name.slice(0, -2),
            serviceCode: code,
            total_duration: duration,
            total_price: price,
            service_ids: id
        });
    }, [serviceCheckList]);
    const handleSetComboValue = (obj) => {
        const {name, value} = obj.target;
        if(name == 'total_duration'){
            setComboValue({...comboValue, [name]: value*3600000});
        }
        else{
            setComboValue({...comboValue, [name]: value});
        }
    };

    const clearValue = () => {
        // setComboPrice(0);
        // setComboName('');
        // setComboDuration(0);
        setComboValue(initValue);
    };
    const closeClearValue = () => {
        clearValue();
        handleCloseComboDialog();
        setServiceCheckList([]);
    };

    const handleSetValue = (e) => {
        let label = e.target.id;
        let value = e.target.value;
        switch (label) {
            case 'comboName':
                setComboName(value);
                break;
            case 'comboPrice':
                if (isNaN(value)) {
                    return;
                }
                setComboPrice(value);
                break;
            case 'comboDuration':
                if (isNaN(value)) {
                    return;
                }
                setComboDuration(value * 3600000);
                break;
        }
    };
    const removeService = (item) => {
        handleServiceCheck(false, item);
        if (serviceCheckList.length == 1) {
            // the update of component is kind of late
            closeClearValue();
        }
    };

    const handleCreateCombo = () => {
        //no validate , since it would be used the default value of each service to create Combo
        request
            .post(BuildPath('services'))
            .send(comboValue)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            });
        closeClearValue();
    };
    const handleEditSubmit = () => {

        //if all the madatory is not empty
        // it should be combo code not service code
        // let data = {
        //     name: '',
        //     serviceCode: '',
        //     total_duration: '',
        //     total_price: '',
        //     service_ids: ['id', 'id'],
        // };
        request
            .post(BuildPath('services/combo/edit/id'))
            .send(comboValue)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            });
        closeClearValue();
    };
    // add new service to the combo, pass the display only the service not yet in the combo
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
                            onChange={handleSetComboValue}
                        />
                        {serviceCheckList &&
                            serviceCheckList.map((item) => (
                                <ComboItem
                                    key={item.id}
                                    item={item}
                                    handleServiceCheck={handleServiceCheck}
                                    removeService={removeService}
                                    isEdit={false}
                                />
                            ))}
                        {isEdit() ? (
                            <EditCombo
                                editDialog={editDialog}
                                setEditDialog={setEditDialog}
                                serviceCheckListAddable={serviceCheckList}
                                handleServiceCheck={handleServiceCheck}
                                removeService={removeService}
                                serviceCheckList={serviceCheckList}
                                handleSave={handleSave}
                            />
                        ) : null}

                        <div className={styled.flexAlignContainer}>
                            <label>Total Duration: </label>
                            <InputTextField
                                label='Combo Duration'
                                name='total_duration'
                                value={(comboValue.total_duration/ 3600000).toFixed(1)}
                                onChange={handleSetComboValue}
                                InputProps='H'
                            />
                        </div>

                        <div className={styled.flexAlignContainer}>
                            <InputTextField
                                label='Combo price'
                                name='total_price'
                                value={comboValue.total_price}
                                onChange={handleSetComboValue}
                                InputProps='$'
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
