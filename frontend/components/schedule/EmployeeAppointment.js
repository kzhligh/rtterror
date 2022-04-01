import {Typography} from "@mui/material";
import React, {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";

const EmployeeAppointment =(props)=>{
    const {appointmentsHistory} = props;
    const columns = [
        { field: 'date', headerName: 'DATE', width: 100 },
        { field: 'time', headerName: 'Time', width: 100 },
        { field: 'service', headerName: 'Service', width: 200 },
        { field: 'employee', headerName: 'Employee', width: 200 },
        { field: 'client', headerName: 'Client', width: 200 },
        { field: 'duration', headerName: 'Duration', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
    ];
    return (
    <>
        <Typography variant="h6">Employee Appointment</Typography>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={appointmentsHistory}
                columns={columns}
                pageSize={30}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    </>
    )
}
export default EmployeeAppointment;