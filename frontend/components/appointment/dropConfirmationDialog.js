import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

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
                    <div>{'Previous start at: ' + ((updateEvent && updateEvent.schedule) ? updateEvent.schedule.start._date.toString().substr(4, 20) : '')}</div>
                    <div>{'Previous end at: ' + ((updateEvent && updateEvent.schedule) ? updateEvent.schedule.end._date.toString().substr(4, 20) : '')}</div>
                    <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "500" }}>To:</div>
                    <div>{'Now start at: ' + (changes ? changes.start._date.toString().substr(4, 20) : '')}</div>
                    <div>{'Now end at: ' + (changes ? changes.end._date.toString().substr(4, 20) : '')}</div>
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