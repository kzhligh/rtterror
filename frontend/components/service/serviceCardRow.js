import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '../../styles/service.module.css';
import {
    CardActionArea,
    Checkbox,
    Dialog,
    DialogContent,
    Grid,
    Stack,
} from '@mui/material';
import {useRouter} from 'next/router';
import {useState} from 'react';
import ComboForm from './comboForm';
import Box from '@mui/material/Box';

const ConfirmDelete = (props) => {
    const {open, setOpen, item, step, setStep, deleteService} = props;
    const handleClose = () => {
        setOpen(false);
        setStep(0);
    };
    const handleConfirm = () => {
        if (step == 0 && !item.hasOwnProperty('services')) {
            setStep(1);
        } else {
            // delete
            deleteService(item);
            handleClose();
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box padding="160px 200px">
                        <Typography variant="h4">
                            {step == 0
                                ? `Delete ${item.name}`
                                : `Attention: All Combos with ${item.name} will be deleted . Are you sure you want to continue`}
                        </Typography>
                    </Box>
                </Grid>
            </DialogContent>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Button
                    className={styled.buttonContainer}
                    variant="outlined"
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </Grid>
        </Dialog>
    );
};

const ServiceCardRow = (props) => {
    const router = useRouter();
    const {
        item,
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
    const isBlock = () => item.blocked;
    const isCombo = () => item.hasOwnProperty('services');
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const detailsPage = () => {
        if (isCombo()) {
            setType('edit');
            setEditComboDialog(true);
            setComboDetail(item);
            extractServiceCheckList(item.services);
        } else {
            router.push({
                pathname: '/service/details',
                query: {servicecode: item.service_code}
            }, '/service/details')
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
                onClick={
                    !isBlock()
                        ? () => {
                            detailsPage();
                        }
                        : undefined
                }
                style={{backgroundColor: isBlock() ? 'gray' : 'white'}}
            >
                <CardContent>
                    <Typography sx={{fontSize: 24}} color="text.secondary">
                        Service Name: {item.name}
                    </Typography>
                    <Typography sx={{fontSize: 24}} color="text.secondary">
                        {isCombo() ? `Duration: ${item.total_duration}` : `Duration:  ${item.durations_prices.map((dur) => dur.duration).join(" - ")}  H`}
                    </Typography>
                    <Typography sx={{fontSize: 24}} color="text.secondary">
                        Description : {item.description}
                    </Typography>
                    <Typography sx={{fontSize: 24}} color="text.secondary">
                        {isCombo() ? 'Combo' : ''}
                    </Typography>
                </CardContent>
                <div className={styled.separateVDiv}/>
                <CardActionArea>
                    <div className={styled.dateContainer}>
                        <Typography sx={{fontSize: 20}}>
                            Created On : {getCreateDate(item)}
                        </Typography>
                    </div>
                </CardActionArea>
            </Card>
            {!isCombo() ? (
                <Checkbox
                    key={item.id}
                    value={item}
                    checked={serviceCheckList ? serviceCheckList.includes(item) : false}
                    onChange={(event) => {
                        handleServiceCheck(event.target.checked, item);
                    }}
                />
            ) : null}
            <Stack spacing={2}>
                <Button
                    className={styled.buttonContainer}
                    variant={isBlock() ? 'contained' : 'outlined'}
                    onClick={() => toggleBlocked(item)}
                    style={{backgroundColor: isBlock() ? 'gray' : 'white'}}
                >
                    {isBlock() ? 'unblocked' : 'blocked'}
                </Button>
                <Button
                    className={styled.buttonContainer}
                    variant="outlined"
                    onClick={() => setOpen(true)}
                >
                    Delete
                </Button>
            </Stack>
            <ConfirmDelete
                open={open}
                setOpen={setOpen}
                item={item}
                step={step}
                setStep={setStep}
                deleteService={deleteService}
            />
            {isCombo() && editComboDialog ? (
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
            ) : null}
        </div>
    );
};
export default ServiceCardRow;
