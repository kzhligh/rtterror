import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const editAppointmentDialog = (props) => {
    const { openEditDialog, setOpenEditDialog, onSubmit, target } = props;

    return <Dialog open={openEditDialog} fullWidth={true} scroll="body">
        <DialogTitle>
            {target?.title}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
            <Button onClick={onSubmit} variant="contained">
                Submit
            </Button>
            <Button onClick={() => setOpenEditDialog(false)} color="inherit">Cancel</Button>
        </DialogActions>
    </Dialog>;
};

export default editAppointmentDialog;