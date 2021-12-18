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

    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
        <DialogTitle>
            New Service
        </DialogTitle>
        <DialogContent>
            <EmployeeForm />
        </DialogContent>
        <DialogActions>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <Button onClick={()=>alert('create ')}>Add New Employee</Button>
                <Button onClick={handleClose}>Close</Button>
            </Grid>
        </DialogActions>
    </Dialog>
    );
};
export default NewEmployeeDialog