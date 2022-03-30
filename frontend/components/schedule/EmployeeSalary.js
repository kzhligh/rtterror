import {Typography} from "@mui/material";
import React, {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import SalaryCalculation from "./salaryCalculation";

const EmployeeSalary =()=>{
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'date', headerName: 'DATE', width: 100 },
        { field: 'time', headerName: 'Time', width: 100 },
        { field: 'plan', headerName: 'Service', width: 200 },
        { field: 'therapist', headerName: 'Employee', width: 100 },
        { field: 'duration', headerName: 'Duration', width: 100 },
    ];
    return (
        <>
            <Typography variant="h6">Employee Salary</Typography>

            <div style={{ height: 400, width: '100%', maxWidth: '1000px'}}>
                <SalaryCalculation />
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </>
    )
}
export default EmployeeSalary;