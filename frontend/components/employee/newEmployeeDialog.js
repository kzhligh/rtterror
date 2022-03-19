import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import EmployeeForm from "./employeeform";

const NewEmployeeDialog = (props) => {
    const {open, addEmployee, serviceList , setAddOpen , validateEmployeeId} = props;

    const initValues = {
        id: '',
        first_name: '',
        last_name: '',
        unit:'',
        address: '',
        city:'',
        province: '',
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
                    validateEmployeeId={validateEmployeeId}
                />
            </DialogContent>

        </Dialog>
    );
};
export default NewEmployeeDialog