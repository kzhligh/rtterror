import {Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import styled from '../../styles/service.module.css';

const ServiceEmployeeTable = (props) => {
    const [employeeList, setEmployeeList] = useState(['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8']);
    // useEffect(() => {
    //     setEmployeeList(['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'])
    // }, [])

    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">
                        <h2>First name</h2>
                    </TableCell>
                    <TableCell align="center">
                        <h2>Last name</h2>
                    </TableCell>
                    <TableCell align="center">
                        <h2>Primary</h2>
                    </TableCell>
                    <TableCell align="center">

                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'].map((ename) => (
                    <TableRow
                        key={ename}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <div className={styled.employeeRowDiv}>
                                <Checkbox
                                    // key={ename}
                                    // aria-label={ename}
                                    // value={ename}
                                    // checked={employeeCheckList.includes(ename)}
                                    // onChange={(event) => {
                                    //     handleCheck(event);
                                    // }}
                                />
                                <h3>{ename}</h3>
                            </div>
                        </TableCell>
                        <TableCell align="left">
                            <h4>Tittle</h4>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>);
}
export default ServiceEmployeeTable;