import * as React from "react";
import {useState} from "react";
import {
    Checkbox,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import styled from "../../styles/service.module.css";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";

const ServiceEmployee = (props) => {
    const { remainEmployeeList, serviceEmployeeDialog, setServiceEmployeeDialog, item} = props;
    const [employeeCheckList , setEmployeeCheckList] = useState([]);

    const closeDialog = ()=>{
        setServiceEmployeeDialog(false);
    }
    const handleCheck =(e)=>{
        if(e.target.checked){
            setEmployeeCheckList([...employeeCheckList,e.target.value]);
        }
        else{
            setEmployeeCheckList(employeeCheckList.filter((name)=>e.target.value!=name));
        }
    }
    console.log(employeeCheckList);
    const addEmployee=()=>{

    }

    return (
        <div>
            <Dialog
                // fullWidth={serviceEmployeeDialog}
                maxWidth="lg"
                open={serviceEmployeeDialog}
                scroll="body"
            >
                <DialogTitle>

                    Add Employee
                    <IconButton
                        aria-label="close"
                        onClick={closeDialog}
                        size="medium"
                        sx={{
                            position: "absolute",
                            right: 10,
                            top: 10,
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><h1>Employee name</h1></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {remainEmployeeList.map((ename) => (
                            <TableRow
                                key={ename}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    <div className={styled.employeeRowDiv}>
                                    {ename}
                                    <Checkbox
                                        key={ename}
                                        aria-label={ename}
                                        value={ename}
                                        checked={employeeCheckList?employeeCheckList.includes(ename):false}
                                        onChange={(event)=>{handleCheck(event)}}
                                    />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={addEmployee}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ServiceEmployee;
