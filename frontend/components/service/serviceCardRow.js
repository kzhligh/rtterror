import * as React from 'react';
import cssStyled from '../../styles/service.module.css';
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    Checkbox,
    Collapse,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Chip,
    Stack,
    Typography
} from '@mui/material';
import { RadioButtonUncheckedRounded, CheckCircleOutlineRounded } from '@mui/icons-material';
import { capitalize } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ComboForm from './comboForm';

import { styled } from "@mui/material/styles";

const CardHeaderReducedPadding;

const CardContentNoPadding = styled(CardContent)(`
  &:first-child {
    padding-top: 0;
  }
`);

const ConfirmDeleteDialog = (props) => {
    const { open, setOpen, item, step, setStep, deleteService } = props;
    const handleClose = () => {
        setStep(0);
        setOpen(false);
    };
    const handleConfirm = () => {
        if (step === 0 && !item.hasOwnProperty('services')) {
            setStep(1);
        } else {
            deleteService(item);
            handleClose();
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm" p={5}>

            <DialogTitle id="alert-dialog-title">
                Delete Service {item.name}?
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography>Attention: All Combos that include {item.name} will be deleted. Are you sure you want to continue?</Typography>

                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button
                        className={cssStyled.buttonContainer}
                        variant="contained"
                        onClick={handleConfirm}
                        color="error"
                    >
                        {step === 0 ? "Yes" : "Delete"}

                    </Button>
                    <Button onClick={handleClose}
                        className={cssStyled.buttonContainer}>Cancel</Button>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};


const ServiceCardRow = (props) => {
    const router = useRouter();
    const {
        item: serviceItem,
        toggleBlocked,
        deleteService,
        serviceCheckList,
        handleServiceCheck,
        setType,
        setComboDetail,
        extractServiceCheckList,
        setServiceCheckList,
        comboDetail,
        serviceListData,
        refresh,
        setRefresh
    } = props;
    const [editComboDialog, setEditComboDialog] = useState(false);
    const isBlock = () => serviceItem.blocked;
    const isCombo = () => serviceItem.hasOwnProperty('services');
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const detailsPage = () => {
        if (isCombo()) {
            setType('edit');
            setEditComboDialog(true);
            setComboDetail(serviceItem);
            extractServiceCheckList(serviceItem.services);
        } else {
            router.push({
                pathname: '/service/details',
                query: { servicecode: serviceItem.service_code }
            }, '/service/details');
        }
    };
    const handleCloseEditDialog = () => {
        setEditComboDialog(false);
        setType('');
        setServiceCheckList([]);
    };
    const getCreateDate = (item) => {
        return new Date(item['createdAt']).toDateString();
    };
    return (
        <div className={cssStyled.flexServiceCombo}>
            <Card
                className={cssStyled.cardWrapper}
                style={{ backgroundColor: isBlock() ? 'gray' : 'white' }}
            >
                <CardHeader
                    action={
                        <>{!isCombo() ? (
                            <Checkbox
                                key={serviceItem.id}
                                value={serviceItem}
                                checked={serviceCheckList ? serviceCheckList.includes(serviceItem) : false}
                                onChange={(event) => {
                                    handleServiceCheck(event.target.checked, serviceItem);
                                }}

                                icon={<RadioButtonUncheckedRounded />}
                                checkedIcon={<CheckCircleOutlineRounded />}
                            />
                        ) : null}</>
                    }
                    title={<><Chip label={isCombo() ? "Combo" : "Service"} variant="outlined" /> {capitalize(serviceItem.name)}</>}
                    subheader={<><Chip label="Service Code" size="small" /> {serviceItem.service_code}</>}
                />
                <Collapse in={!isBlock()}>
                    <CardActionArea>
                        <CardContentNoPadding onClick={() => detailsPage()} sx={{ fontSize: 12 }}>
                            <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                                <Chip label="Options" size="small" />
                                {isCombo() ?
                                    <Typography variant="body2">{serviceItem.total_duration} hrs</Typography>
                                    : <>
                                        {serviceItem.durations_prices.map(
                                            (dur) => <Chip label={`${dur.duration} HRS / ${dur.price} CAD`} size="small" variant="outlined" />)}
                                    </>
                                }
                            </Stack>
                            <Stack direction="row" spacing={3} justifyContent="flex-start" alignItems="center">
                                <Chip label="Description" size="small" /><Typography variant="body2">{serviceItem.description}</Typography>
                            </Stack>
                            <div className={cssStyled.separateVDiv} />
                            <div className={cssStyled.dateContainer}>
                                <Typography sx={{ fontSize: 12 }}>
                                    Created On : {getCreateDate(serviceItem)}
                                </Typography>
                            </div>
                        </CardContentNoPadding>
                    </CardActionArea>
                </Collapse>
            </Card>
            <Stack alignItems="center" alignContent="flex-end" spacing={1}>
                <Button
                    className={cssStyled.buttonContainer}
                    variant={isBlock() ? 'contained' : 'outlined'}
                    onClick={() => toggleBlocked(serviceItem)}
                    color='warning'
                >
                    {isBlock() ? 'unblock' : 'block'}
                </Button>
                <Button
                    className={cssStyled.buttonContainer}
                    variant="outlined"
                    color="error"
                    onClick={() => setOpen(true)}
                >
                    Delete
                </Button>
            </Stack>
            <ConfirmDeleteDialog
                open={open}
                setOpen={setOpen}
                item={serviceItem}
                step={step}
                setStep={setStep}
                deleteService={deleteService}
            />
            {
                isCombo() && editComboDialog ? (
                    <ComboForm
                        openDialog={editComboDialog}
                        handleCloseComboDialog={handleCloseEditDialog}
                        serviceCheckList={serviceCheckList}
                        handleServiceCheck={handleServiceCheck}
                        type="edit"
                        setServiceCheckList={setServiceCheckList}
                        comboDetail={comboDetail}
                        serviceListData={serviceListData}
                        setRefresh={setRefresh}
                        refresh={refresh}
                    ></ComboForm>
                ) : null
            }
        </div >
    );
};
export default ServiceCardRow;
