import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import styled from '../../styles/service.module.css';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  Slider,
  InputAdornment,
  Box,
  Container, Grid,
} from '@mui/material';
import ServiceEmployeeTable from "./serviceEmployeeTable";

const AddServiceForm = (props) => {
  const { addHandle, employeeList, open, closeDialog } = props;
  const [employeeCheckList, setEmployeeCheckList] = useState([]);
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const processAddService = () => {
    if (validationInput()) {
      let data = {
        serviceCode: barcode,
        name: 'service ' + barcode,
        description: description,
        treatment_type: 'type 1',
        duration: duration,
        price: price,
        barcode: barcode,
        sms_description: 'sms description 1',
      };
      addHandle(data);
    }
  };
  const handleAddEmployeeCheck = (val, employee) => {
    if (val) {
      setEmployeeCheckList([...employeeCheckList, employee]);
    } else {
      setEmployeeCheckList(
          employeeCheckList.filter((emp) => emp.firstname != employee.firstname)
      );
    }
  };

  useEffect(()=>{},[employeeCheckList]);

  const durationSelect = (hour) => {
    setDuration(hour * 60000);
  };
  const durationList = [
    { 30: '30 M' },
    { 60: '1 H' },
    { 90: '1.5 H' },
    { 120: '2 H' },
  ];
  const handleSetValue = (e) => {
    let label = e.target.id;
    let value = e.target.value;
    switch (label) {
      case 'name':
        setName(value);
        break;
      case 'code':
        setBarcode(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
    }
  };

  const validationInput = () => {
    if (name == '' || barcode == '' || price <= 0) {
      return false;
    }
    return true;
  };
  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
        <DialogTitle>
          New Service
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            size="medium"
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid
              container
              direction="column"
              alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  id="name"
                  label="name"
                  value={name}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  required
                  id="code"
                  label="Service code"
                  value={barcode}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  id="price"
                  label="price"
                  type="number"
                  value={price}
                  required
                  onChange={(event) => handleSetValue(event)}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
              />
            </Grid>
          </Grid>



          <div className={styled.separateVDiv}></div>
          <div className={styled.flexAlignContainer}>
       
           <div className="card  container-md bg-light">
              <div className="card-body"  >
              <label for="customRange2" className="form-label">Duration (in hours): </label> 
            
              <div className={styled.separateVDiv}></div>
                <Slider
                    onChange={(event) => setDuration(event.target.value)}
                aria-label="Always visible"
                defaultValue={0.5}
                //getAriaValueText={valuetext}
                min={0.5}
                step={0.5}
                max={2}
                valueLabelDisplay="on"
                />
              

              <div className={styled.separateVDiv}></div>

              </div>
           </div>

          </div>

          <div className="bg-success p-2 text-dark bg-opacity-10"  >New Service for 1H has been successfully added! </div>
      
          <div className={styled.separateVDiv}></div>
          <h1>Add Employee </h1>
          <ServiceEmployeeTable
              displayEmployeeList = {employeeList}
              handleEmployeeCheck ={handleAddEmployeeCheck}
              employeeCheckList = {employeeCheckList}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={processAddService}>Create Service</Button>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddServiceForm;
