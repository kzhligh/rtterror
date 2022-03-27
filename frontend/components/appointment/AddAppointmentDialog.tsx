import {
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Accordion,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/lab';
import { useState, useEffect } from 'react';
import { AppointmentDropdown } from './AppointmentDropdown';
import { http } from "../../utils/http";

const blankAppointment = {
  plan: { serviceName: 'TestService' },
  therapist: { name: 'TestTherapist' },
  branchLocation: '',
  duration: '',
  notes: '',
  feedback: '',
  status: '',
  cancellationTime: '',
  date: '',
};
interface Props extends DialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export const AddAppointmentDialog = ({ isOpen, onClose }) => {
  console.log('AddAppointmentDialog...')

  const [ therapists, setTherapists] = useState([]);
  useEffect( () => {
    if (therapists.length === 0) {
      http('/api/v1/employees/')
      .then(allEmployees => {
        console.log('allEmployees: ', allEmployees);
        setTherapists(allEmployees.map(employee => ({...employee, name: employee.first_name + ' ' + employee.last_name})))
      })
      .catch(error => console.error(error));
    }
  }, [therapists])

//  const therapists = [
//   { name: 'mark' },
//    { name: 'Walhberg' },
//    { name: 'Johnathan' },
//  ];


//const therapists = employees;

const [ services, setServices ] = useState([]);
useEffect( () => {
  if (services.length === 0) {
    http('/api/v1/services')
      .then(allServices => {
        console.log('allServices: ', allServices);
        setServices(allServices.map(service => ({...service, serviceName: service.name})))
      })
      .catch(error => console.error(error));
  }
}, [services])


//  const services = [{ serviceName: 'massage' }];
const [ existingClients, setClients ] = useState([]);
useEffect( () => {
  if (existingClients.length === 0) {
    http('/api/v1/customer')
      .then(allClients => {
        console.log('allClients: ', allClients);
        setClients(allClients.map(client => ({...client, name: client.firstName + ' ' + client.lastName})))
      })
      .catch(error => console.error('error: get all clients', error));
  }
}, [existingClients])

//  const existingClients = [
//    { name: 'Bean' },
//    { name: 'Ben' },
//    { name: 'Bobert' },
//  ];

  const [expanded, setExpanded] = useState<string | false>(false);
  const [appointmentForm, setAppointment] = useState(blankAppointment);

  return (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle>New Appointment</DialogTitle>

      <DialogContent style={{ width: '100%' }}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            setAppointment((state) => ({ ...state, status: 'Pending' }));
            console.log(appointmentForm);
            onClose(e, 'backdropClick');
          }}
        >
          <InputLabel>Services</InputLabel>

          <AppointmentDropdown
            therapists={therapists}
            services={services}
            setAppointment={setAppointment}
          />

          <InputLabel>Choose a starting time</InputLabel>
          <DateTimePicker
            label={appointmentForm.date ?? 'Date'}
            value={appointmentForm.date}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ placeholder: 'YYYY-MM-DD-HH:MM' }}
                disabled
              />
            )}
            onChange={(date: Date) =>
              setAppointment((state) => ({
                ...state,
                date: date.toLocaleDateString(),
              }))
            }
          />
          <InputLabel>Set Duration</InputLabel>
          <Select
            id="duration"
            value={appointmentForm.duration}
            style={{ width: '100%' }}
            onChange={(e) => {
              setAppointment((state) => ({
                ...state,
                duration: e.target.value,
              }));
            }}
          >
            <MenuItem value={10}>15 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={45}>45 minutes</MenuItem>
            <MenuItem value={60}>60 minutes</MenuItem>
            <MenuItem value={75}>75 minutes</MenuItem>
            <MenuItem value={90}>90 minutes</MenuItem>
          </Select>
          <Accordion
            expanded={expanded === 'existing'}
            onClick={() => {
              setExpanded(
                expanded === false || expanded === 'newClient'
                  ? 'existing'
                  : false
              );
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Existing Client</Typography>
            </AccordionSummary>
            <AccordionDetails
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select id="existing" style={{ width: '100%' }}>
                {existingClients.map((client) => (
                  <option key={client.name}>{client.name}</option>
                ))}
              </Select>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'newClient'}
            onClick={() => {
              setExpanded(
                expanded === false || expanded === 'existing'
                  ? 'newClient'
                  : false
              );
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>New Client</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                style={{ width: '100%' }}
                onClick={(E) => {
                  E.stopPropagation();
                }}
              ></TextField>
            </AccordionDetails>
          </Accordion>
          <InputLabel>Notes</InputLabel>
          <TextField
            onChange={(e) => {
              setAppointment((state) => ({
                ...state,
                notes: e.target.value,
              }));
            }}
          ></TextField>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onClick={(e) => {
                onClose(e, 'backdropClick');
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};