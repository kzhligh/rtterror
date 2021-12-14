import EmployeeComponent from "./index";
import Box from "@mui/material/Box";
import {Tabs, Tab, Dialog, DialogContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";

const EmployeeDetailComponent =(props)=>{
    const {open, handleClose} = props
    const [tabValue, setTabValue] = useState('1');
    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
            <DialogContent>



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

                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div style={{ height: 600, width: '100%' }}>

                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Button onClick={()=>alert('create ')}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeDetailComponent;