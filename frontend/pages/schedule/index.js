import React, {useEffect, useState} from "react";
import {http} from "../../utils/http";
import ScheduleComponent from "../../components/schedule";
import {Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Box from "@mui/material/Box";
import EmployeeSalary from "../../components/schedule/EmployeeSalary";
import EmployeeAppointment from "../../components/schedule/EmployeeAppointment";
import _reduce from "lodash/reduce"
import ColorHash from 'color-hash'
import formatSchedule from "../../utils/formatSchedule";

export async function getServerSideProps(context) {
    var colorHash = new ColorHash();
    let employeeList = await http(`/api/v1/employees`);
    employeeList = _reduce(employeeList, (accumulator, emp) => {
        const color = colorHash.hex(emp.id);
        return [...accumulator,
            {
                id: emp.id,
                name: `${emp.first_name} ${emp.last_name} `,
                bgColor: color,
                visible: true,
            }
        ];
    }, []);
    return {
        props: {employeesList: employeeList},
    };
}

const Employee = ({employeesList}) => {
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState('1');
    const [rerender, setRerender] = useState(false);
    const [employee, setEmployee] = useState({});

    useEffect(async () => {
        setLoading(true);
        const today = new Date();
        let events = await http(`/api/v1/schedules`);
        events = formatSchedule(events,employeesList);
        setEventList(events);
        setLoading(false);
    }, [rerender]);

    return (
        <div>
            <TabContext value={tabValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList
                        onChange={(_event, newValue) => {
                            setTabValue(newValue);
                        }}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Schedule" value="1"/>
                        <Tab label="Appointment History" value="2"/>
                        <Tab label="Employee Salary" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {!loading && <ScheduleComponent
                        employeeList={employeesList}
                        eventList={eventList}
                        setRerender={setRerender}
                        rerender={rerender}
                        employee={employee}
                        setEmployee={setEmployee}
                    />}


                </TabPanel>
                <TabPanel value="2">
                    <EmployeeAppointment
                    />
                </TabPanel>
                <TabPanel value="3">
                    <EmployeeSalary
                    />
                </TabPanel>
            </TabContext>

        </div>
    );
}
export default Employee;