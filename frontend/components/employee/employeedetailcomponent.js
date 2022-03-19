import Box from "@mui/material/Box";
import {Tab, Grid} from "@mui/material";
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import * as React from "react";
import EmployeeForm from "./employeeform";

const EmployeeDetailComponent = (props) => {
    const {employee, editEmployee, serviceList, serviceEmployeeList , validateEmployeeId} = props;
    const [tabValue, setTabValue] = useState('1');
    const [employeeValue] = useState(employee);

    return (
        <Box>
            <Grid
                container
                direction="row"
            >
                <Grid item xs={12}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={tabValue}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList
                                    onChange={(_event, newValue) => {
                                        setTabValue(newValue);
                                    }}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="Contact Information" value="1"/>
                                    <Tab label="Work Schedule" value="2"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div style={{height: 600, width: '100%'}}>
                                    <EmployeeForm
                                        initValues={employeeValue}
                                        mode='edit'
                                        editEmployee={editEmployee}
                                        tabValue={tabValue}
                                        serviceList={serviceList}
                                        serviceEmployeeList={serviceEmployeeList}
                                        validateEmployeeId={validateEmployeeId}
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div style={{height: 600, width: '100%'}}>

                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EmployeeDetailComponent;