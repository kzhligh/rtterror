import React, {useEffect, useState} from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import moment from "moment";

const ConfirmationDialog = (props) => {
    const { onClose, open, updateEvent } = props;
    const [updateEventValue , setUpdateEventValue] = useState(updateEvent);
    useEffect(()=>{setUpdateEventValue(updateEvent)},[updateEvent])

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
                    <label style={{ marginTop: "20px", fontSize: "24px", fontWeight: "500" }}>{'Appointment: ' + (updateEventValue ? updateEventValue.schedule.title : '')}</label><br />
                    <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "500" }}>From:</div>
                    <div>{'Previous start at: ' + ((updateEventValue && updateEventValue.schedule!= undefined) ?moment(updateEventValue.schedule.start._date).calendar()  : '')}</div>
                    <div>{'Previous end at: ' + ((updateEventValue && updateEventValue.schedule!= undefined) ?moment(updateEventValue.schedule.end._date).calendar()  : '')}</div>
                    <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "500" }}>To:</div>
                    <div>{'Now start at: ' + ((updateEventValue && updateEventValue.changes!= undefined) ? (updateEventValue['changes'].start?moment(updateEventValue['changes'].start._date).calendar() :moment(updateEventValue.schedule.start._date).calendar()) : '')}</div>
                    <div>{'Now end at: ' + ((updateEventValue && updateEventValue.changes!= undefined) ? moment(updateEventValue['changes'].end._date).calendar() : '')}</div>
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