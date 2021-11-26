import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {
  CardActionArea,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Divider, Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '../../styles/service.module.css';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import ServiceEmployeeTable from "./serviceEmployeeTable";
import SearchInput from "./search";
import TextField from "@mui/material/TextField";
import ServiceEmployeeDialog from "./serviceEmployeeDialog";

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

  return (
      <Box>
        <Card>

          <CardContent>
            search
            {/*<SearchInput handleSearch={} />*/}
            <h1>Service name</h1>
            <h3>Service Code</h3>
            <TextField
                fullWidth
                id="comboName"
                required
                // value={comboName}
                // onChange={(event) => handleSetValue(event)}
            />
            <h5>Description</h5>
            <Divider />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                duration
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
          <CardActionArea>
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
          </CardActionArea>
        </Card>
      </Box>
  );
};
export default ServiceDetailsCard;
