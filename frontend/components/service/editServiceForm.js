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


const EditServiceForm = (props) => {
  const { editHandle, serviceItem , closeAddDialog, employeeList} = props;
  const [employeeCheckList , setEmployeeCheckList] = useState(serviceItem.offerBy);
  const [name , setName] = useState(serviceItem.name);
  const [code , setCode] = useState(serviceItem.code);
  const [description , setDescription] = useState(serviceItem.description);

  const processUpdateService = ()=>{
    // process data
    console.log(employeeCheckList);
    console.log(name);
    console.log(code);
    console.log(description);
    const data = [];
    editHandle(data);
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
          Update Service
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
              // defaultValue="" maybe value when edit
              onChange={(event)=>handleSetValue(event)}
          />
          <div className={styled.separateVDiv}></div>
          <TextField
              fullWidth
              required
              id="code"
              label="Service code"
              // defaultValue="Hello World"
              onChange={(event)=>handleSetValue(event)}
          />
          <div className={styled.separateVDiv}></div>
            <TextField
                fullWidth
                id="code"
                label="Description"
                multiline
                rows={4}
                // defaultValue="Default Value"
                onChange={(event)=>handleSetValue(event)}
            />
          <div className={styled.separateVDiv}></div>
          <h1>Add Employee</h1>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Employee name</TableCell>
                  <TableCell align="left">Title</TableCell>
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
                        <Checkbox
                            key={ename}
                            aria-label={ename}
                            value={ename}
                            checked={employeeCheckList.includes(ename)}
                            onChange={(event) => {
                              handleCheck(event)
                            }}
                        />
                        {ename}
                        </div>
                      </TableCell>
                      <TableCell align="right">title</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={processUpdateService}>Create Service</Button>
          <Button onClick={closeAddDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditServiceForm;
