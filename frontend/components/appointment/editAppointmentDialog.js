import React, { useState } from 'react';
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Grid, Stack, Button, Card, CardHeader, IconButton } from '@mui/material';

const editAppointmentDialog = (props) => {
    const { openEditDialog, setOpenEditDialog, onSubmit, target } = props;

    return <Dialog open={openEditDialog} fullWidth={true} scroll="body">
        <DialogTitle>
            {target.title}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onSubmit} variant="contained">
                Submit
            </Button>
            <Button onClick={() => setOpenEditDialog(false)} color="inherit">Cancel</Button>
        </DialogActions>
    </Dialog>;
};

export default editAppointmentDialog;