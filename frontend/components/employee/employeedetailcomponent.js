import Box from "@mui/material/Box";
import * as React from "react";
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import EmployeeForm from "./employeeform";
import {Tab} from "@mui/material";


const Employeedetailcomponent = (props) => {
    const {employee, editEmployee, serviceList, serviceEmployeeList, validateEmployeeId} = props;
    const [tabValue, setTabValue] = useState('1');
    const [employeeValue] = useState(employee);

    return (

        <Box sx={{maxWidth: '700px'}}>
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
                    <EmployeeForm
                        initValues={employeeValue}
                        mode='edit'
                        editEmployee={editEmployee}
                        tabValue={tabValue}
                        serviceList={serviceList}
                        serviceEmployeeList={serviceEmployeeList}
                        validateEmployeeId={validateEmployeeId}
                    />
                </TabPanel>
                <TabPanel value="2">

                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default Employeedetailcomponent;