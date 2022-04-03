import {Typography} from "@mui/material";
import React, {useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import SalaryCalculation from "./salaryCalculation";

const EmployeeSalary =()=>{
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'employee', headerName: 'Employee', width: 300 },
        { field: 'earn', headerName: 'Total Earn', width: 300 },
    ];
    return (
        <>
            <Typography variant="h6">Employee Salary</Typography>

            <div style={{ height: 400, width: '100%', maxWidth: '1000px'}}>
                <SalaryCalculation
                    setRows={setRows}
                />
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