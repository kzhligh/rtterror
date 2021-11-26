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
import {
  Grid,
} from '@mui/material';
import ServiceEmployeeTable from "./serviceEmployeeTable";
import DurationPrice from "./durationPrice";
import AddIcon from "@mui/icons-material/Add";

const AddServiceForm = (props) => {
  const hourToMs = 60000;
  const MsToHour = 3600000;
  const { addHandle, employeeList, open, closeDialog } = props;
  const [employeeCheckList, setEmployeeCheckList] = useState([]);
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [durationPriceList, setDurationPriceList] = useState([{price:0, duration:0.5}]);
  const [reload, setReload] = useState(false);

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

  useEffect(()=>{},[employeeCheckList, durationPriceList ,reload]);

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
  const handleAddDurationPrice = ()=>{
    setDurationPriceList([...durationPriceList, {price:0, duration:0.5}]);
  };
  const handleRemoveDurationPrice =(index)=>{
    setDurationPriceList([...durationPriceList.slice(0, index),...durationPriceList.slice(index+1)])
  }
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
              alignItems="stretch"
          >
            <Grid item xs={12}>
              <TextField
                  margin="normal"
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
                  margin="normal"
                  fullWidth
                  required
                  id="code"
                  label="Service code"
                  value={barcode}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
            <Grid item xs={12}>
              {durationPriceList.map((element, index) =>(
                  <DurationPrice
                      key={index}
                      index={index}
                      item={element}
                      durationPriceList={durationPriceList}
                      handleRemoveDurationPrice={handleRemoveDurationPrice}
                      reload = {reload}
                      setReload = {setReload}
                  />
                  ))
              }

              <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
              >
                <Grid item={3}>
                  <IconButton onClick={handleAddDurationPrice}>
                    <AddIcon/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
          </Grid>

          {/*<div className="bg-success p-2 text-dark bg-opacity-10"  >New Service for 1H has been successfully added! </div>*/}

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
