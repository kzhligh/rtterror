import { InputLabel, Select, MenuItem } from '@mui/material';

export const AppointmentStatus = ({ status, setForm }) => (
  <>
    <InputLabel style={{ marginTop: '5%' }}>Status</InputLabel>
    <Select
      id='status'
      value={status}
      style={{ width: '100%' }}
      onChange={(e) => {
        setForm((state) => ({
          ...state,
          status: [...status, e.target.value],
        }));
      }}
    >
      <MenuItem value='Pending'>Pending</MenuItem>
      <MenuItem value='Checked In'>Checked In</MenuItem>
      <MenuItem value='No Show'>No Show</MenuItem>
    </Select>
  </>
);
