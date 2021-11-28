import * as React from 'react';
import {
 Divider, Grid,
} from '@mui/material';
import styled from '../../styles/service.module.css';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';
import ServiceEmployeeTable from "./serviceEmployeeTable";
import TextField from "@mui/material/TextField";
import ServiceEmployeeDialog from "./serviceEmployeeDialog";
import DurationPrice from "./durationPrice";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// in the service detail page display only the employee of the service
// add employee display the employee not in the service


// add selected , add teh chcek employee list to the service employeelist
const ServiceDetailsCard = (props) => {
  const {item, serviceEmployeeList, employeeList} = props;
  const [addEmployeeCheckList, setAddEmployeeCheckList] = useState([]);
  const [deleteEmployeeCheckList, setDeleteEmployeeCheckList] = useState([]);
  const [serviceEmployeeDialog, setServiceEmployeeDialog] = useState(false);
  const [remainEmployeeList, setRemainEmployeeList] = useState([]);
  const [serviceEmployList, setServiceEmployList] = useState(serviceEmployeeList);
  const [descriptionDisable, setDescriptionDisable] = useState(true);
  const [durationPriceList, setDurationPriceList] = useState([{price:item.price, duration:item.duration/3600000}]);
  const [reload, setReload] = useState(false);
  useEffect(()=>{},[ durationPriceList ,reload]);
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState(item.barcode);
  const [description, setDescription] = useState(item.description);

  const handleAddEmployeeCheck = (val, employee) => {
    if (val) {
      setAddEmployeeCheckList([...addEmployeeCheckList, employee]);
    } else {
      setAddEmployeeCheckList(
          addEmployeeCheckList.filter((emp) => emp.firstname != employee.firstname)
      );
    }
  };

  const handleDeleteEmployeeCheck = (val, employee) => {
    if (val) {
      setDeleteEmployeeCheckList([...deleteEmployeeCheckList, employee]);
    } else {
      setDeleteEmployeeCheckList(
          deleteEmployeeCheckList.filter((emp) => emp.firstname != employee.firstname)
      );
    }
  };
  const handleAddEmployee = () => {
    //    extract the employ not in the service
    //    set the display service employee dialog
    setServiceEmployeeDialog(true);
    // filter the employee that are in employeelist but not in the serviceEmployelist , mean the employee who not yet in the service
    setRemainEmployeeList(employeeList.filter(({ firstname: val1 }) => !serviceEmployList.some(({ firstname: val2 }) => val2 === val1)));
  };

  const handleAddSelected = ()=>{
    setServiceEmployList([...serviceEmployList,...addEmployeeCheckList]);
    setServiceEmployeeDialog(false);
    setAddEmployeeCheckList([]);
  }

  const handleDeleteEmployee = ()=>{
    setServiceEmployList(serviceEmployList.filter(({ firstname: val1 }) => !deleteEmployeeCheckList.some(({ firstname: val2 }) => val2 === val1)))
    setDeleteEmployeeCheckList([]);
  }
  const handleSaveService = ()=>{
    // get the data
    // send to backend
  }

  const handleAddDurationPrice = ()=>{
    setDurationPriceList([...durationPriceList, {price:0, duration:0.5}]);
  };
  const handleRemoveDurationPrice =(index)=>{
    setDurationPriceList([...durationPriceList.slice(0, index),...durationPriceList.slice(index+1)])
  };

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
    }
  };
  console.log(item);
  return (
      <Box>
        <Card>

          <CardContent>
            <h1>Service name</h1>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
              <h3>Service Code</h3>
              <TextField
                  id="comboName"
                  required
                  value={barcode}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
              <TextField
                  fullWidth
                  id="description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(event) => handleSetValue(event)}
              />
            </Grid>
            <Divider />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
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
                  <Grid item xs={3}>
                    <IconButton onClick={handleAddDurationPrice}>
                      <AddIcon/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <h1>Employee table
                  <ServiceEmployeeTable
                      displayEmployeeList = {serviceEmployList}
                      handleEmployeeCheck ={handleDeleteEmployeeCheck}
                      employeeCheckList = {deleteEmployeeCheckList}
                  />
                </h1>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <Button
                        className={styled.addRightButton}
                        variant="outlined"
                        onClick={handleAddEmployee}
                    >
                      Add Employee
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                        className={styled.addRightButton}
                        variant="outlined"
                        onClick={() => handleDeleteEmployee()}
                    >
                      Delete Employee
                    </Button>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <ServiceEmployeeDialog
                serviceEmployeeDialog={serviceEmployeeDialog}
                setServiceEmployeeDialog={setServiceEmployeeDialog}
                handleAddSelected={handleAddSelected}
                displayEmployeeList={remainEmployeeList}
                handleEmployeeCheck={handleAddEmployeeCheck}
                employeeCheckList={addEmployeeCheckList}
            />
          </CardContent>
          <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
          >
            <Button
                className={styled.addRightButton}
                variant="outlined"
                onClick={() => alert('save')}
            >
              Save
            </Button>
          </Grid>
        </Card>
      </Box>
  );
};
export default ServiceDetailsCard;
