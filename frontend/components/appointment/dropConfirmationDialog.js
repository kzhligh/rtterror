import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Skeleton,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import moment from 'moment';

const ConfirmationDialog = (props) => {
    const { onClose, open, updateEvent } = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };
    let {
        start: oldStart,
        end: oldEnd,
        changes: { start: newStart, end: newEnd },
    } = updateEvent || { changes: {} };
    oldStart = new Date(oldStart);
    oldEnd = new Date(oldEnd);
    newStart = new Date(newStart || oldStart);
    newEnd = new Date(newEnd || oldEnd);
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { maxHeight: 435 } }}
            maxWidth='xs'
            open={open}
            onClose={handleCancel}
        >
            <DialogTitle
                style={{
                    textAlign: 'center',
                    boxShadow: '0 0 5px blue',
                    fontSize: '24px',
                }}
            >
                Confirm reschedule?
            </DialogTitle>

            {open ?
                <DialogContent style={{ paddingTop: '20px' }}>
                    <Typography variant='button' fontSize='medium'>Appointment</Typography>
                    <Typography variant='body1' fontSize='large'>
                        {updateEvent ? updateEvent.schedule.title : ''}
                    </Typography>
                    <Typography variant='button' fontSize='medium'>Start Time</Typography>
                    <Typography variant='body1' fontSize='large'>{moment(oldStart).calendar()} <ArrowRightAltIcon /> {moment(newStart).calendar()} </Typography>
                    <Typography variant='button' fontSize='medium'>End Time</Typography>
                    <Typography variant='body1' fontSize='large'>{moment(oldEnd).calendar()} <ArrowRightAltIcon /> {moment(newEnd).calendar()} </Typography>
                </DialogContent> : <Skeleton variant='rectangular' sx={{
                    height: 0,
                    overflow: "hidden",
                    paddingTop: "100%",
                    position: "relative"
                }} />}
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk} variant='contained'>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
