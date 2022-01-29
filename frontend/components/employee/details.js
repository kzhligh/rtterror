import Box from "@mui/material/Box";
import {Tab, Dialog, DialogContent, Grid} from "@mui/material";
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import EmployeeForm from "./employee";

const EmployeeDetailComponent =(props)=>{
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
    const {open, handleClose} = props
    const [tabValue, setTabValue] = useState('1');
    return (
        <Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={(_event, newValue) => {
                                setTabValue(newValue);
                            }}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Contact Information" value="1" />
                            <Tab label="Work Schedule" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div style={{ height: 600, width: '100%' }}>
                            <EmployeeForm
                                initValues={initValues}
                                mode='edit'
                                saveEmployee={saveEmployee}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div style={{ height: 600, width: '100%' }}>

                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
            {tabValue ==1 &&
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Button onClick={()=>alert('create ')}>Save</Button>
                </Grid>
            }
        </Box>
    );
}

export default EmployeeDetailComponent;