import SearchInput from "../service/search";
import * as React from "react";
import Box from "@mui/material/Box";
import {Divider, Grid,} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import styled from '../../styles/employee.module.css';
import NewEmployeeDialog from "./newEmployeeDialog";
import {useRouter} from "next/router";
import {DataGrid} from "@mui/x-data-grid";


const EmployeeComponent = (props) => {
    const router = useRouter();
    const {employeeList, addEmployee, deleteEmployee, serviceList} = props;
    const [displayEmployeeList, setDisplayEmployeeList] = useState(employeeList);
    const [addOpen, setAddOpen] = useState(false);
    const [rowSelection, setRowSelection] = useState([]);

    const closeAddOpen = () => {
        setAddOpen(false);
    };


    const handleSearch = (val) => {
        const searchValue = val.toLowerCase().trim()
        if (searchValue.length > 0) {
            const empList = employeeList.filter(
                (emp) =>
                    emp.first_name.toLowerCase().includes(searchValue) ||
                    emp.last_name.toLowerCase().includes(searchValue)
            );
            setDisplayEmployeeList(empList);
        } else {
            setDisplayEmployeeList(employeeList);
        }
    };
    const columns = [
        {field: 'first_name', headerName: 'First name', width: 250, sortable: false},
        {field: 'last_name', headerName: 'Last name', width: 300, sortable: false},
        {field: 'title', headerName: 'Title', width: 250, sortable: false},
        {field: 'email', headerName: 'Email', width: 300, sortable: false},

    ];
    const handleDeleteEmployee = () => {
        deleteEmployee(rowSelection[0]);
    }

    return (

        <Box>
            <SearchInput handleSearch={handleSearch}/>

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <h1>Employee List
                    </h1>
                </Grid>
                <Grid item xs={3}>
                    <Button className={styled.addButton} variant="outlined" onClick={() => setAddOpen(true)}>
                        New Employee
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button className={styled.addButton} disabled={!(rowSelection.length > 0)} variant="outlined"
                            onClick={handleDeleteEmployee}>
                        Delete Employee
                    </Button>
                </Grid>


            </Grid>
            <Divider/>
            <DataGrid
                style={{minHeight: '60%', height: '560px'}}
                rows={employeeList}
                columns={columns}
                pagination
                pageSize={8}
                onRowClick={({row}) =>
                    router.push({
                        pathname: '/employee/details',
                        query: {empid: row.id}
                    }, '/employee')
                }
                rowsPerPageOptions={[8]}
                checkboxSelection
                hideFooterSelectedRowCount
                disableColumnMenu
                selectionModel={rowSelection}
                onSelectionModelChange={(rows) => setRowSelection(rows)}
            />

            <NewEmployeeDialog open={addOpen} setAddOpen={setAddOpen} addEmployee={addEmployee}
                               serviceList={serviceList}/>

        </Box>
    );
}
export default EmployeeComponent;