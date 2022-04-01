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
    const [appointmentsHistory, setAppointmentsHistory]= useState([]);

    useEffect(async () => {
        setLoading(true);
        const today = new Date();
        let events = await http(`/api/v1/schedules`);
        events = formatSchedule(events,employeesList);
        setEventList(events);
        setLoading(false);
    }, [rerender]);

    useEffect(async () => {
        if (tabValue == 2) {
            let appointments = await http(`/api/v1/appointments`);
            appointments = formatAppointmentHistory(appointments);
            appointments.sort((a, b) => (a.date < b.date ? -1 : 1));
            setAppointmentsHistory(appointments);
        }
    }, [tabValue])
    const formatAppointmentHistory =(appointments)=>{

        var returnAppointments = _reduce(appointments, (accumulator, app) => {
            var service = app.services.map(service => `${service.name}`);
            var employee = app.employees.map(emp => `${emp.first_name}`);
            console.log({service: service})
            var client =`${app.Client.firstName}`;
            // duration sum of all service or set by person who book appointment
            return [...accumulator,
                {
                    id: app.id,
                    date: app.datetime,
                    time: app.datetime,
                    service:service.join('-'),
                    employee: employee.join('-'),
                    client: client,
                    duration: app.duration,
                    price: app.price,
                }
            ];
        }, []);
        return returnAppointments;
    }

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
                        appointmentsHistory={appointmentsHistory}
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