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
import { useRouter } from 'next/router';
import { useState } from 'react';
import ComboForm from './comboForm';

import { styled } from "@mui/material/styles";

const CardContentNoPadding = styled(CardContent)(`
  &:first-of-type {
    padding-top: 0;
  }
`);

const ConfirmDeleteDialog = (props) => {
    const { open, setOpen, item, deleteService } = props;
    const handleClose = () => { setOpen(false); };
    const handleConfirm = () => {
        deleteService(item);
        handleClose();
    };
    const isACombo = () => item.hasOwnProperty('services');

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm" p={5}>

            <DialogTitle id="alert-dialog-title">
                Delete {isACombo() ? "Combo" : "Service"} {item.name}?
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="body2">This action cannot be undone. </Typography>

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
                        Delete

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
    const isBlocked = () => serviceItem.blocked;
    const isACombo = () => serviceItem.hasOwnProperty('services');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const detailsPage = () => {
        if (isACombo()) {
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
                style={{ backgroundColor: isBlocked() ? 'gray' : 'white' }} sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <CardHeader
                    action={
                        <>{!isACombo() ? (
                            <Checkbox
                                key={serviceItem.id}
                                value={serviceItem}
                                checked={serviceCheckList.includes(serviceItem)}
                                onChange={(event) => {
                                    handleServiceCheck(event.target.checked, serviceItem);
                                }}

                                icon={<RadioButtonUncheckedRounded />}
                                checkedIcon={<CheckCircleOutlineRounded />}
                            />
                        ) : null}</>
                    }
                    title={<><Chip label={isACombo() ? "Combo" : "Service"} variant="outlined" /> {serviceItem.name}</>}
                    subheader={<><Chip label="Service Code" size="small" /> {serviceItem.service_code.split('-', 1)[0]}</>}
                />
                <Collapse in={!isBlocked()}>
                    <CardActionArea>
                        <CardContentNoPadding onClick={() => detailsPage()} sx={{ fontSize: 12 }}>
                            <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center" mb={.5}>
                                <Chip label="Options" size="small" />
                                {isACombo() ?
                                    <Typography variant="body2">{serviceItem.total_duration} min</Typography>
                                    : <>
                                        {serviceItem.durations_prices.map(
                                            (durPricePair, index) => <Chip key={index} label={`${durPricePair.duration} MIN / ${durPricePair.price} CAD`} size="small" variant="outlined" />)}
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
                    variant={isBlocked() ? 'contained' : 'outlined'}
                    onClick={() => toggleBlocked(serviceItem)}
                    color='warning'
                >
                    {isBlocked() ? 'unblock' : 'block'}
                </Button>
                <Button
                    className={cssStyled.buttonContainer}
                    variant="outlined"
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                >
                    Delete
                </Button>
            </Stack>
            <ConfirmDeleteDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                item={serviceItem}
                deleteService={deleteService}
            />
            {
                isACombo() && editComboDialog ? (
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
                    />
                ) : null
            }
        </div >
    );
};
export default ServiceCardRow;
