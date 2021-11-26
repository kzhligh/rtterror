import {
  Alert,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  Radio,
  RadioGroup,
  Stack,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';
import { http } from '../../utils/http';

const formatPhoneNumber = (input) =>
  input.length === 10
    ? `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(
        6,
        10
      )}`
    : input;

const initialFormValue = {
  firstName: '',
  lastName: '',
  email: '',
  dob: '',
  gender: null,
  address: '',
  postalCode: '',
  phone: '',
  confirmationType: null,
};

export const AddCustomerDialog = ({ onCustomerAdded, onClose, ...props }) => {
  const [formInputs, setFormInputs] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(false);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { duplicate } = await http(
        `/api/v1/customer/duplicate?firstName=${formInputs.firstName}&lastName=${formInputs.lastName}`
      );

      if (duplicate) {
        setWarning(duplicate);
        setLoading(false);
        return;
      }

      const result = await http('/api/v1/customer', 'POST', {
        body: formInputs,
      });
      onCustomerAdded(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await http('/api/v1/customer', 'POST', {
        body: formInputs,
      });
      onCustomerAdded(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setWarning(false);
      setFormInputs(initialFormValue);
    }
  };

  return (
    <Dialog {...props}>
      {error && <Alert severity="error">Something wrong happened!</Alert>}

      <Dialog open={warning}>
        <DialogTitle>Attention!</DialogTitle>

        <Box padding="16px 40px">
          <h3>
            Client with name {`${formInputs.firstName} ${formInputs.lastName}`}{' '}
            already exists. A new client by the same name with a different ID
            will be created. Would you like to continue?
          </h3>
        </Box>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          height="100%"
          py="1.125rem"
          mx="2rem"
        >
          <Button variant="outlined" onClick={handleConfirm}>
            {loading ? <CircularProgress /> : 'Confirm'}
          </Button>
          <Button variant="outlined" color="error" onClick={props.onClose}>
            Cancel
          </Button>
        </Stack>
      </Dialog>

      <DialogTitle>New Client</DialogTitle>

      <Box
        as="form"
        onSubmit={handleAddCustomer}
        style={{
          display: 'flex',
          padding: '16px 40px',
          flexDirection: 'column',
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          required
          label="First Name"
          value={formInputs.firstName}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, firstName: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Last Name"
          value={formInputs.lastName}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, lastName: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Phone Number"
          value={formatPhoneNumber(formInputs.phone)}
          onChange={(e) =>
            setFormInputs((state) => ({
              ...state,
              phone: e.target.value.replace(/\D/g, '').substring(0, 10),
            }))
          }
        />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Email"
          value={formInputs.email}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, email: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin="normal"
          required
          label="Address"
          value={formInputs.address}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, address: e.target.value }))
          }
        />

        <Box
          style={{
            display: 'flex',
            marginTop: '30px',
          }}
        >
          <Box flex={2}>
            <h3>Gender</h3>
          </Box>

          <Box display="flex" flex={5} justifyContent="center">
            <RadioGroup
              row
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: '0px 16px',
                width: '100%',
              }}
              aria-label="gender"
              defaultValue={formInputs.gender}
              value={formInputs.gender}
              onChange={(e) =>
                setFormInputs((state) => ({ ...state, gender: e.target.value }))
              }
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="N/A" control={<Radio />} label="Other" />
            </RadioGroup>
          </Box>
        </Box>

        <Box display="flex">
          <Box mr="60px">
            <h3>Date of Birth</h3>
          </Box>

          <DatePicker
            label={formInputs.dob ?? 'Date of birth'}
            value={formInputs.dob}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ placeholder: 'YYYY-MM-DD' }}
                disabled
              />
            )}
            onChange={(date) =>
              setFormInputs((state) => ({
                ...state,
                dob: Intl.DateTimeFormat('sv-SE').format(date),
              }))
            }
            format="YYYY-MM-DD"
          />
        </Box>

        <Box display="flex" mt="40px">
          <Box mr="60px">
            <h3>Confirmation Type</h3>
          </Box>

          <FormControl
            sx={{
              marginX: '10px',
              width: '40%',
            }}
          >
            <InputLabel>Confirmation Type</InputLabel>
            <Select
              placeholder="Sort..."
              label="Confirmation Type"
              value={formInputs.confirmationType || 'email'}
              onChange={(e) =>
                setFormInputs((state) => ({
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
          </FormControl>
        </Box>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          height="100%"
          py="1.125rem"
          mx="2rem"
        >
          <Button variant="outlined" type="submit">
            {loading ? <CircularProgress /> : 'Add Client'}
          </Button>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};
