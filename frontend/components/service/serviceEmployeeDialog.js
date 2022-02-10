import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import ServiceEmployeeTable from './serviceEmployeeTable';

const ServiceEmployeeDialog = (props) => {
    const {
        serviceEmployeeDialog,
        setServiceEmployeeDialog,
        displayEmployeeList,
        handleEmployeeCheck,
        handleAddSelected,
        employeeCheckList,
    } = props;

    const closeDialog = () => {
        setServiceEmployeeDialog(false);
    };

    return (
        <Dialog maxWidth="lg" open={serviceEmployeeDialog} scroll="body">
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    size="medium"
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ServiceEmployeeTable
                    displayEmployeeList={displayEmployeeList}
                    handleEmployeeCheck={handleEmployeeCheck}
                    employeeCheckList={employeeCheckList}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleAddSelected}>
                    Assign
                </Button>
                <Button onClick={closeDialog} color='inherit'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ServiceEmployeeDialog;
