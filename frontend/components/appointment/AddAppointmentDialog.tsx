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

export async function getServerSideProps() {
  let therapists = await http('/api/v1/employees');
  therapists = therapists.map(t => ({ ...t, name: t.first_name + ' ' + t.last_name }));
  let services = await http('/api/v1/services');
  services = services.map(s => ({ ...s, serviceName: s.name }));
  let existingClients = await http('/api/v1/customer');
  existingClients = existingClients.map(c => ({ ...c, name: c.firstName + ' ' + c.lastName }))

  return {
    props: { therapists, services, existingClients }
  };
}

export const AddAppointmentDialog = ({ therapists, services, existingClients, isOpen, onClose }) => {
  console.log('therapists: ', therapists)
  console.log('services: ', services)
  console.log('existingClients: ', existingClients)

  const [expanded, setExpanded] = useState<string | false>(false);
  //const [appointmentForm, setAppointment] = useState(blankAppointment);
  //initialize DTO.
  const [appointmentForm, setAppointment] = useState({
    rmq_id: '',
    client_id: '',
    employee_ids: [],
    service_ids: [],
    pro_rmq_id: '',         // optional
    datetime: '',
    duration: 30,            // in minutes
    repeat: false,
    cycle_start: new Date(),    // optional
    cycle_end: new Date(),    // optional
    status: [],
    feedback: '',           // optional
    notes: ''
  });
  useEffect(() => {
    console.log('appointmentForm: ', appointmentForm)
  }, [appointmentForm])

  const validateAppointment = () => {
    return true;
  }

  return (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle>New Appointment</DialogTitle>

      <DialogContent style={{ width: '100%' }}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            // setAppointment((state) => ({ ...state, status: 'Pending' }));
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
            label={appointmentForm.datetime ?? 'Date'}
            value={appointmentForm.datetime}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ placeholder: 'YYYY-MM-DD-HH:MM' }}
                disabled
              />
            )}
            onChange={(date: Date) => {
              // console.log('DateTimePicker/date: ', date)
              setAppointment((state) => ({
                ...state,
                datetime: date.toLocaleString(),
              }))
            }
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
                duration: parseInt(e.target.value.toString()),
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
                console.log('client.event: ', e);
                setAppointment({...appointmentForm, client_id: e.target.id})
              }}
            >
              <Select id="existing" style={{ width: '100%' }}>
                {existingClients.map((client) => (
                  <option id={client.id}>{client.name}</option>
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