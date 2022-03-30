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
  Autocomplete
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/lab';
import { useState, useEffect } from 'react';
import { AppointmentDropdown } from './AppointmentDropdown';
import { http } from "../../utils/http";
import {AddCustomerDialog} from "../client/AddCustomerDialog";
import {data} from "browserslist";

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

interface IAppointment {
  rmq_id: string;
  client_id: number;
  employee_ids: string[];
  service_ids: string[];
  pro_rmq_id?: string;         // optional
  datetime: Date;
  duration: number;            // in minutes
  repeat: boolean;
  cycle_start?: Date;    // optional
  cycle_end?: Date;    // optional
  status: string[];
  feedback?: string;           // optional
  notes: string;
}

interface IClient {
  id: number;
  name: string;
}

interface Props extends DialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export const AddAppointmentDialog = ({ therapists, services, existingClients, isOpen, onClose, refreshAppointments}) => {
  // console.log('therapists: ', therapists)
  // console.log('services: ', services)
  console.log('existingClients: ', existingClients)

  const [expanded, setExpanded] = useState<string | false>(false);
  const [ showClientDialog, setShowClientDialog ] = useState(false);
  const [ clients, setClients ] = useState([]);
  useEffect(() => {
    console.log('useEffect()/clients: ', clients);
    if (existingClients.length !== clients.length) setClients([ ...existingClients ])
  }, [existingClients]);
  const [appointmentForm, setAppointment] = useState({
    rmq_id: '',
    client_id: -1,
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
  }, [appointmentForm]);

  const selectedClient = clients.filter(client => client.id === appointmentForm.client_id)[0]

  const handleSubmit = () => {
    http(
      '/api/v1/appointments',
      {
        method: 'POST',
        body: appointmentForm
      }
    )
      .then((res) => {
        console.log('the res of submitting an appointment: ', res)
        refreshAppointments();
      })
      .catch(error => {
        console.error('ERROR - submitting appointment: ', error)
      });
  }

  console.log('rendered/clients: ', clients);

  return (
    showClientDialog ?
      (<AddCustomerDialog
        open={showClientDialog}
        onClose={() => setShowClientDialog(false)}
        onCustomerAdded={(newClient) => {
          setAppointment({ ...appointmentForm, client_id: newClient.id })
          setClients([...clients, {...newClient, name: newClient.firstName + ' ' + newClient.lastName}])
        }}
        maxWidth="md"
        fullWidth
      />) :
      (<Dialog fullWidth open={isOpen}>
      <DialogTitle>New Appointment</DialogTitle>
      <DialogContent style={{ width: '100%' }}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            // setAppointment((state) => ({ ...state, status: 'Pending' }));
            console.log(appointmentForm);
            handleSubmit();
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
              }}
            >
              <Autocomplete
                renderInput={(params) => (
                  <TextField { ...params } label="Client name" />
                )}
                options={clients}
                value={selectedClient}
                getOptionLabel={(option: IClient) => option.name}
                style={{ width: "100%" }}
                id="existing"
                onChange={(event, value: any) => {
                  console.log('Autocomplete/onChange()/clients: ', clients)
                  setAppointment((state) => ({ ...state, client_id: value.id }))
                }}
              />
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
              <Button
                variant="outlined"
                onClick={() => setShowClientDialog(true)}
              >
                Create New Client
              </Button>
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
          />
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
    </Dialog>)
  );
};