import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import EmployeeForm from "./employee";

const NewEmployeeDialog = (props) => {
    const {open, addEmployee, serviceList , setAddOpen} = props;

    const initValues = {
        first_name: '',
        last_name: '',
        address: '',
        postal_code: '',
        phone: '',
        email: '',
        title: 'General Practice',
        gender: 'na',
        dob: new Date(),
        sin: '',
        start_date: new Date(),
        services: []
    };


    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
            <DialogTitle>
                New Employee
            </DialogTitle>
            <DialogContent>
                <EmployeeForm
                    open={open}
                    setAddOpen={setAddOpen}
                    initValues={initValues}
                    mode='add'
                    addEmployee={addEmployee}
                    serviceList={serviceList}
                />
            </DialogContent>

        </Dialog>
    );
};
export default NewEmployeeDialog