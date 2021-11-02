import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ServiceEmployee from "./serviceEmployee";
import styled from "../../styles/service.module.css";
import {useState} from "react";


const ServiceForm = (props) => {
  const { addHandle} = props;
  const [employeeCheckList , setEmployeeCheckList] = useState([]);
  const item = {
    serviceId: 4,
    treatmentType: "type4 ",
    name: "y",
    description: "a",
    price: 100,
    duration: "1h30m",
    code: "code4",
    offerBy: ["E1", "E2"],
    status: "active",
    dateCreated: "2018 / 10/ 08",
  };
  const handleClose=()=>{
    router.push("").then(r => console.log(r));
  }

  return (
    <div>
      <Dialog open={true} fullWidth={true} maxWidth="lg" scroll="body">
        <DialogTitle>
          New Service
          <IconButton
            aria-label="close"
            onClick={addHandle}
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
              onChange={(event)=>alert(event.target.value)}
          />
          <div className={styled.separateVDiv}></div>
          <TextField
              fullWidth
              required
              id="code"
              label="Service code"
              // defaultValue="Hello World"
              onChange={(event)=>alert(event.target.value)}
          />
          <div className={styled.separateVDiv}></div>
            <TextField
                fullWidth
                id="code"
                label="Description"
                multiline
                rows={4}
                // defaultValue="Default Value"
                onChange={(event)=>alert(event.target.value)}
            />
          <div className={styled.separateVDiv}></div>
        {/*add Employee form*/}
          <h1>Add Employee</h1>
          <ServiceEmployee mode={''} employeeCheckList={employeeCheckList} setEmployeeCheckList={setEmployeeCheckList}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={addHandle}>Create Service</Button>
          <Button onClick={addHandle}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ServiceForm;
