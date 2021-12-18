import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import EmployeeForm from "./employee";

const NewEmployeeDialog =(props)=>{
    const {open , handleClose} = props;

    const initValues = {
        id: 0,
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        gender: 'na',
        startDate: new Date(),
        services: []
    };
    const saveEmployee = (data)=>{
        console.log(data);
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
        <DialogTitle>
            New Service
        </DialogTitle>
        <DialogContent>
            <EmployeeForm
                open={open}
                handleClose={handleClose}
                initValues={initValues}
                mode='add'
                saveEmployee={saveEmployee}
            />
        </DialogContent>

    </Dialog>
    );
};
export default NewEmployeeDialog