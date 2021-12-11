import ServiceComponent from "../service";
import SearchInput from "../service/search";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';
import {Divider, Grid} from "@mui/material";

import Link from "next/link";
import Button from "@mui/material/Button";
import {useState} from "react";
import NewEmployeeDialog from "./newEmployee";
import {Rowing} from "@mui/icons-material";
import styled from '../../styles/employee.module.css';

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
const TableRow = ()=>{
    return (
        <Grid container item onClick={()=>alert('clicked')}>
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
    const closeAddOpen = ()=>{
        setAddOpen(false);
    };

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
                {/*<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>*/}
                {/*    {Array.from(Array(6)).map((_, index) => (*/}
                {/*        <Grid item xs={2} sm={4} md={4} key={index}>*/}
                {/*            Item*/}
                {/*        </Grid>*/}
                {/*    ))}*/}
                {/*</Grid>*/}
            {/*padding="160px 200px"*/}
            <Box padding='100px'>

                <Grid
                    container spacing={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <HeaderTable />
                    <TableRow />

                    <TableRow />
                    <TableRow />

                    <TableRow />

                    {/*<Grid container item >*/}
                    {/*    <Grid item xs={4} >*/}
                    {/*        <div style={{backgroundColor: '#e1e1e1'}} > test </div>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4} >*/}
                    {/*        <div style={{backgroundColor: '#e1e1e1'}} > test </div>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4} >*/}
                    {/*        <div style={{backgroundColor: '#e1e1e1'}} > test </div>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    {/*<Grid container item spacing={3}>*/}
                    {/*    <Grid item xs={4} >*/}
                    {/*        <div style={{backgroundColor: '#e1e1e1'}} > test </div>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4} >*/}
                    {/*        <div style={{backgroundColor: '#e1e1e1'}} > test </div>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4} >*/}
                    {/*        <div style={{backgroundColor: '#e1e1e1'}} > test </div>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>
            </Box>
                {/*<Grid container style={{backgroundColor:'#e1e1e1'}}*/ }
                {/*      direction="column"*/}
                {/*      justifyContent="center"*/}
                {/*      alignItems="center"*/}
                {/*      spacing={3}*/}
                {/*>*/}
                {/*    <HeaderTable />*/}
                {/*    <TableRow />*/}
                {/*</Grid>*/}

            {/*<div style={{ height: 400, width: '100%' }}>*/}
            {/*    <DataGrid*/}
            {/*        rows={rows}*/}
            {/*        columns={columns}*/}
            {/*        pageSize={5}*/}
            {/*        rowsPerPageOptions={[5]}*/}
            {/*        checkboxSelection*/}
            {/*    />*/}
            {/*</div>*/}
            <NewEmployeeDialog open={addOpen} handleClose={closeAddOpen} />
        </Box>
    );
}
export default EmployeeComponent;