import SearchInput from "../service/search";
import * as React from "react";
import Box from "@mui/material/Box";
import {Divider, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import styled from '../../styles/employee.module.css';
import EmployeeDetailComponent from "./details";
import NewEmployeeDialog from "./newEmployeeDialog";

const HeaderTable =()=>{
    return (
        <Grid container item>
            <Grid item xs={4}>
                <div className={styled.tableHeader} > Name & Title </div>
            </Grid>
            <Grid item xs={4} >
                <div className={styled.tableHeader} > Phone </div>
            </Grid>
            <Grid item xs={4} >
                <div className={styled.tableHeader} > Email </div>
            </Grid>
        </Grid>
    );
}
const TableRow = (props)=>{
    const {setDetailOpen} = props
    return (
        <Grid container item onClick={()=>setDetailOpen(true)}>
            <Grid item xs={4}>
                <div className={styled.tableRow} > test </div>
            </Grid>
            <Grid item xs={4}>
                <div className={styled.tableRow}> test </div>
            </Grid>
            <Grid item xs={4}>
                <div className={styled.tableRow} > test </div>
            </Grid>
        </Grid>
    );
}
const EmployeeComponent =(props)=>{
    const {employeeList } = props;
    const [addOpen, setAddOpen]= useState(false);
    const [detailOpen, setDetailOpen]= useState(false);
    const closeAddOpen = ()=>{
        setAddOpen(false);
    };
    const closeDetailsDialog =()=>{
        setDetailOpen(false);
    }

    const handleSearch =()=>{
        console.log('search');
    }


    return (

        <Box>
            <SearchInput handleSearch={handleSearch} />
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={8}>
                    <h1>Employee List
                    </h1>
                </Grid>
                <Grid item xs={4}>
                    <Button className={styled.addButton} variant="outlined" onClick={()=>setAddOpen(true)}>
                        New Employee
                    </Button>
                </Grid>


            </Grid>
            <Divider />

            <Box padding='100px'>

                <Grid
                    container spacing={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <HeaderTable />
                    <TableRow setDetailOpen={setDetailOpen}/>

                    <TableRow setDetailOpen={setDetailOpen}/>
                    <TableRow setDetailOpen={setDetailOpen}/>

                    <TableRow setDetailOpen={setDetailOpen}/>

                </Grid>
            </Box>

            <NewEmployeeDialog open={addOpen} handleClose={closeAddOpen} />
            <EmployeeDetailComponent open={detailOpen} handleClose={closeDetailsDialog} />
        </Box>
    );
}
export default EmployeeComponent;