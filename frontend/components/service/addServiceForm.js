import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styled from "../../styles/service.module.css";
import {useState} from "react";
import Paper from "@mui/material/Paper";
import {Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const AddServiceForm = (props) => {
  const { addHandle , employeeList ,closeAddDialog} = props;
  const [employeeCheckList , setEmployeeCheckList] = useState([]);
  const [name , setName] = useState('');
  const [code , setCode] = useState('');
  const [description , setDescription] = useState('');
  const processAddService=()=>{
    //processData from the code name description and emplyee list
    let Data = [];
    console.log(employeeCheckList);
    console.log(name);
    console.log(code);
    console.log(description);
    addHandle(Data);
  }
  const handleCheck =(e)=>{
    if(e.target.checked){
      setEmployeeCheckList([...employeeCheckList,e.target.value]);
    }
    else{
      setEmployeeCheckList(employeeCheckList.filter((name)=>e.target.value!=name));
    }
  }

  const handleSetValue = (e)=>{
    let label = e.target.id;
    let value = e.target.value.trim();
    switch (label){
      case 'name':
          setName(value);
        break;
      case 'code':
          setCode(value);
        break;
      case 'description':
          setDescription(value);
        break;
    }
  }

  return (
    <div>
      <Dialog open={true} fullWidth={true} maxWidth="lg" scroll="body">
        <DialogTitle>
          New Service
          <IconButton
            aria-label="close"
            onClick={closeAddDialog}
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
        <DialogContent >

          {/*form control*/}
          <TextField
              fullWidth
              required
              id="name"
              label="Service name"
              value={name}
              onChange={(event)=>handleSetValue(event)}
          />
          <div className={styled.separateVDiv}></div>
          <TextField
              fullWidth
              required
              id="code"
              label="Service code"
              value={code}
              onChange={(event)=>handleSetValue(event)}
          />
          <div className={styled.separateVDiv}></div>
            <TextField
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(event)=>handleSetValue(event)}
            />
          <div className={styled.separateVDiv}></div>
          <h1>Add Employee</h1>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><h1>Employee name</h1></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.map((ename) => (
                    <TableRow
                        key={ename}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell component="th" scope="row">
                        <div className={styled.employeeRowDiv}>
                          {ename}
                        <Checkbox
                            key={ename}
                            aria-label={ename}
                            value={ename}
                            checked={employeeCheckList.includes(ename)}
                            onChange={(event) => {
                              handleCheck(event)
                            }}
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
          <Button onClick={processAddService}>Create Service</Button>
          <Button onClick={closeAddDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddServiceForm;
