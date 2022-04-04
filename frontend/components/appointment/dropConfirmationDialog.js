import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import moment from "moment";

const ConfirmationDialog = (props) => {
    const { onClose, open, changes, updateEvent } = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle style={{ textAlign: "center", boxShadow: "0 0 5px blue", fontSize: "24px" }}>Confirm reschedule?</DialogTitle>
            <DialogContent style={{ paddingTop: "20px" }}>
                <div>
                    <label style={{ marginTop: "20px", fontSize: "24px", fontWeight: "500" }}>{'Appointment: ' + (updateEvent ? updateEvent.schedule.title : '')}</label><br />
                    <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "500" }}>From:</div>
                    <div>{'Previous start at: ' + ((updateEvent && updateEvent.schedule) ? moment(updateEvent.schedule.start).calendar() : '')}</div>
                    <div>{'Previous end at: ' + ((updateEvent && updateEvent.schedule) ? moment(updateEvent.schedule.end).calendar() : '')}</div>
                    <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "500" }}>To:</div>
                    <div>{'Now start at: ' + (changes ? moment(changes.start).calendar() : '')}</div>
                    <div>{'Now end at: ' + (changes ? moment(changes.end).calendar() : '')}</div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk} variant="contained">Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;