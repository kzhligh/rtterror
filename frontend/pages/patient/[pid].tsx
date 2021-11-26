import { TabPanel, TabContext, TabList, DatePicker } from '@mui/lab';
import styles from '../../styles/client.module.css';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { putUser } from '../../utils/httpRequests';
import { useRouter } from 'next/dist/client/router';
import { http } from '../../utils/http';
import { DataGrid } from '@mui/x-data-grid';

const blankUser = {
  firstName: 'firstName',
  lastName: 'lastName',
  phone: '1234567890',
  address: '123 Stone',
  email: 'email@email.com',
  postalCode: 'A1B 2C3',
  dob: ' 1 January 2021',
  gender: 'M',
  confirmationType: 'SMS',
  appointments: [],
};
const PatientPage = () => {
  const [userForm, setUser] = useState(blankUser);
  const [tabValue, toggleTab] = useState('1');
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'date', headerName: 'DATE', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'plan', headerName: 'Service', width: 200 },
    { field: 'therapist', headerName: 'Employee', width: 100 },
    { field: 'duration', headerName: 'Duration', width: 100 },
  ];

  const router = useRouter();
  const editUser = () => {
    putUser(userForm);
  };

  useEffect(() => {
    const fetchUser = () => {
      http(`/api/v1/customer/${router.query.pid}/appointments`)
        .then(setUser)
        .then(() => {
          setRows(userForm.appointments);
        });
    };
    if (router) fetchUser();
  }, [router]);
  return (
    <>
      <h3>{userForm.firstName + ' ' + userForm.lastName}</h3>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={(_event, newValue) => {
                toggleTab(newValue);
              }}
              aria-label="lab API tabs example"
            >
              <Tab label="Information" value="1" />
              <Tab label="Appointment History" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box style={{ display: 'flex' }}>
              <Box style={{ flex: 1 }}>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel>First Name</InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin="normal"
                    required
                    value={userForm.firstName}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel>Last Name</InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin="normal"
                    required
                    value={userForm.lastName}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel>Phone Number</InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin="normal"
                    required
                    value={userForm.phone}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        phone: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel className={styles.userFormRow}>
                      Address
                    </InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin="normal"
                    required
                    value={userForm.address}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        address: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel className={styles.userFormRow}>
                      Email
                    </InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin="normal"
                    required
                    value={userForm.email}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.userFormGroup}>
                  <Box className={styles.userFormRow}>
                    <InputLabel className={styles.userFormRow}>
                      Postal Code
                    </InputLabel>
                  </Box>
                  <TextField
                    className={styles.userTextField}
                    margin="normal"
                    required
                    value={userForm.postalCode}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        postalCode: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabel
                    value="F"
                    control={
                      <Checkbox
                        checked={userForm.gender === 'F'}
                        onChange={() =>
                          setUser((state) => ({
                            ...state,
                            gender: 'F',
                          }))
                        }
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
                    control={
                      <Checkbox
                        checked={userForm.gender === 'M'}
                        onChange={() =>
                          setUser((state) => ({
                            ...state,
                            gender: 'M',
                          }))
                        }
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="N/A"
                    control={
                      <Checkbox
                        checked={!userForm.gender}
                        onChange={() =>
                          setUser((state) => ({
                            ...state,
                            gender: null,
                          }))
                        }
                      />
                    }
                    label="Other"
                  />
                </FormGroup>
              </Box>
              <Box style={{ flex: 1 }}>
                <InputLabel>Date of Birth</InputLabel>
                <DatePicker
                  label={userForm.dob ?? 'Date of birth'}
                  value={userForm.dob}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ placeholder: 'YYYY-MM-DD' }}
                      disabled
                    />
                  )}
                  onChange={(date) =>
                    setUser((state) => ({
                      ...state,
                      dob: Intl.DateTimeFormat('sv-SE').format(
                        date as unknown as Date
                      ),
                    }))
                  }
                />
                <InputLabel>Confirmation Type</InputLabel>
                <Select
                  placeholder="Sort..."
                  label="Confirmation Type"
                  value={
                    userForm.confirmationType === 'email' ? 'email' : 'SMS'
                  }
                  onChange={(e) =>
                    setUser((state) => ({
                      ...state,
                      confirmationType: e.target.value,
                    }))
                  }
                  sx={{
                    minWidth: '100px',
                  }}
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                </Select>
                <InputLabel>Package</InputLabel>
                <Select
                  placeholder="Select Type"
                  label="Select Type"
                  sx={{
                    minWidth: '100px',
                  }}
                ></Select>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      {tabValue === '1' && (
        <Button
          variant="outlined"
          style={{ width: '10%' }}
          onClick={() => editUser()}
        >
          Save
        </Button>
      )}
    </>
  );
};

export default PatientPage;
