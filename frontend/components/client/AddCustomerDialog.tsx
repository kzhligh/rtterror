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
  DialogProps,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';
import { http } from 'utils/http';
import { formatPhoneNumber } from 'utils';

interface Props extends DialogProps {
  onCustomerAdded: Function;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

const initialFormValue = {
  firstName: '',
  lastName: '',
  email: '',
  dob: '',
  gender: 'N/A',
  address: '',
  postalCode: '',
  phone: '',
  confirmationType: 'email',
};

export const AddCustomerDialog = ({
  onCustomerAdded,
  onClose,
  ...props
}: Props) => {
  const [formInputs, setFormInputs] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(false);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { firstName, lastName } = formInputs;

    try {
      const { duplicate } = await http(`/api/v1/customer/duplicate`, {
        searchParams: {
          firstName,
          lastName,
        },
      });

      if (duplicate) {
        setWarning(duplicate);
        setLoading(false);
        return;
      }

      const result = await http('/api/v1/customer', {
        method: 'POST',
        body: formInputs,
      });

      onCustomerAdded(result);
      setFormInputs(initialFormValue);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await http('/api/v1/customer', {
        method: 'POST',
        body: formInputs,
      });
      onCustomerAdded(result);
      setFormInputs(initialFormValue);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setWarning(false);
    }
  };

  return (
    <Dialog {...props}>
      {error && <Alert severity='error'>Something wrong happened!</Alert>}

      <Dialog open={warning}>
        <DialogTitle>Attention!</DialogTitle>

        <Box padding='16px 40px'>
          <h3>
            Client with name {`${formInputs.firstName} ${formInputs.lastName}`}{' '}
            already exists. A new client by the same name with a different ID
            will be created. Would you like to continue?
          </h3>
        </Box>

        <Stack
          spacing={2}
          direction='row'
          justifyContent='space-between'
          height='100%'
          py='1.125rem'
          mx='2rem'
        >
          <Button
            variant='outlined'
            onClick={handleConfirm}
            data-cy='confirm-duplicate-customer'
          >
            {loading ? <CircularProgress /> : 'Confirm'}
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={(_e) => {
              setWarning(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Dialog>

      <DialogTitle>New Client</DialogTitle>

      <form
        onSubmit={handleAddCustomer}
        style={{
          display: 'flex',
          padding: '16px 40px',
          flexDirection: 'column',
        }}
      >
        <TextField
          fullWidth
          margin='normal'
          required
          label='First Name'
          data-cy='clientFirstName'
          value={formInputs.firstName}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, firstName: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin='normal'
          required
          label='Last Name'
          data-cy='clientLastName'
          value={formInputs.lastName}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, lastName: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin='normal'
          required
          label='Phone Number'
          data-cy='clientNumber'
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
          margin='normal'
          required
          label='Email'
          data-cy='clientEmail'
          value={formInputs.email}
          onChange={(e) =>
            setFormInputs((state) => ({ ...state, email: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin='normal'
          required
          label='Address'
          data-cy='clientAddress'
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

          <Box display='flex' flex={5} justifyContent='center'>
            <RadioGroup
              row
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: '0px 16px',
                width: '100%',
              }}
              aria-label='gender'
              defaultValue={formInputs.gender}
              value={formInputs.gender}
              onChange={(e) =>
                setFormInputs((state) => ({ ...state, gender: e.target.value }))
              }
            >
              <FormControlLabel
                data-cy='clientGenderF'
                value='F'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel
                data-cy='clientGenderM'
                value='M'
                control={<Radio />}
                label='Male'
              />
              <FormControlLabel value='N/A' control={<Radio />} label='Other' />
            </RadioGroup>
          </Box>
        </Box>

        <Box display='flex'>
          <Box mr='60px'>
            <h3>Date of Birth</h3>
          </Box>

          <DatePicker
            label={formInputs.dob ?? 'Date of birth'}
            value={formInputs.dob}
            data-cy='clientdob'
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ placeholder: 'YYYY-MM-DD' }}
                disabled
              />
            )}
            onChange={(date: Date) =>
              setFormInputs((state) => ({
                ...state,
                dob: Intl.DateTimeFormat('sv-SE').format(date),
              }))
            }
          />
        </Box>

        <Box display='flex' mt='40px'>
          <Box mr='60px'>
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
              placeholder='Sort...'
              label='Confirmation Type'
              data-cy='clientNotification'
              value={formInputs.confirmationType}
              defaultValue='email'
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
              <MenuItem data-cy='typeEmail' value='email'>
                Email
              </MenuItem>
              <MenuItem data-cy='typeSMS' value='SMS'>
                SMS
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack
          spacing={2}
          direction='row'
          justifyContent='space-between'
          height='100%'
          py='1.125rem'
          mx='2rem'
        >
          <Button variant='outlined' data-cy='clientSubmit' type='submit'>
            {loading ? <CircularProgress /> : 'Add Client'}
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={(e) => {
              onClose(e, 'backdropClick');
            }}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
};
