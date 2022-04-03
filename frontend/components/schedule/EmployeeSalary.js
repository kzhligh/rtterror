import { Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import SalaryCalculation from "./salaryCalculation";

const EmployeeSalary =()=>{
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'employee', headerName: 'Employee', width: 200 },
        { field: 'earn', headerName: 'Total Earn', width: 200 },
    ];
    const [columnsHeader, setColumnHeader] = useState(columns);
    const setHeaderByMethod =(methodHeader)=>{
        switch (methodHeader){
            case 'ServiceBasedCalculation':
                 setColumnHeader([...columns,
                    { field: 'param1', headerName: '# of Service', width: 200 },
                    { field: 'param2', headerName: 'Fixed Rate/ Service', width: 200 },
                ]);
                 break;
            case 'CommissionBasedCalculation':
                setColumnHeader ([...columns,
                    { field: 'param1', headerName: 'Total Price', width: 200 },
                    { field: 'param2', headerName: 'Commission Rate', width: 200 },
                ]);
                break;
            default:
                setColumnHeader ([...columns,
                    { field: 'param1', headerName: 'Total hour', width: 200 },
                    { field: 'param2', headerName: 'Hourly Rate', width: 200 },
                ]);
                break;
        }
    }
    useEffect(()=>{
        setHeaderByMethod(rows[0]? rows[0].method:'');
    },[rows])

    return (
        <>
            <Typography variant="h6">Employee Salary</Typography>

            <div style={{ height: 400, width: '100%', maxWidth: '1000px'}}>
                <SalaryCalculation
                    setRows={setRows}
                />
                <DataGrid
                    rows={rows}
                    columns={columnsHeader}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </>
    )
}
export default EmployeeSalary;