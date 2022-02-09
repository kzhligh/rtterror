import * as React from 'react';
import styled from '../../styles/service.module.css';
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
    Stack,
    Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ComboForm from './comboForm';
import { Box } from '@mui/system';

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
                        className={styled.buttonContainer}
                        variant="contained"
                        onClick={handleConfirm}
                        color="error"
                    >
                        {step === 0 ? "Yes" : "Delete"}

                    </Button>
                    <Button onClick={handleClose}
                        className={styled.buttonContainer}>Cancel</Button>
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
        <div className={styled.flexServiceCombo}>
            <Card
                className={styled.cardWrapper}
                style={{ backgroundColor: isBlock() ? 'gray' : 'white' }}
            >
                <CardHeader
                    action={
                        <Box>
                            {!isCombo() ? (
                                <Checkbox
                                    key={serviceItem.id}
                                    value={serviceItem}
                                    checked={serviceCheckList ? serviceCheckList.includes(serviceItem) : false}
                                    onChange={(event) => {
                                        handleServiceCheck(event.target.checked, serviceItem);
                                    }}
                                />
                            ) : null}
                        </Box>
                    }
                    style={{ textTransform: 'capitalize' }}
                    title={serviceItem.name}
                    subheader=""
                />
                <Collapse in={!isBlock()}>
                    <CardActionArea>
                        <CardContent onClick={!isBlock() ? () => { detailsPage(); } : undefined}>
                            <Grid>
                                <Typography sx={{ fontSize: 24 }} color="text.secondary">
                                    {isCombo() ? `Duration: ${serviceItem.total_duration}` : `Duration:  ${serviceItem.durations_prices.map((dur) => dur.duration).join(" - ")}  H`}
                                </Typography>
                                <Typography sx={{ fontSize: 24 }} color="text.secondary">
                                    Description : {serviceItem.description}
                                </Typography>
                                <Typography sx={{ fontSize: 24 }} color="text.secondary">
                                    {isCombo() ? 'Combo' : ''}
                                </Typography>
                            </Grid>
                            <div className={styled.separateVDiv} />
                            <div className={styled.dateContainer}>
                                <Typography sx={{ fontSize: 20 }}>
                                    Created On : {getCreateDate(serviceItem)}
                                </Typography>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Collapse>
            </Card>
            <Stack alignItems={"center"} spacing={1}>
                <Button
                    className={styled.buttonContainer}
                    variant={isBlock() ? 'contained' : 'outlined'}
                    onClick={() => toggleBlocked(serviceItem)}
                    color='warning'
                >
                    {isBlock() ? 'unblock' : 'block'}
                </Button>
                <Button
                    className={styled.buttonContainer}
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
