import {
  Typography,
  MenuList,
  MenuItem,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const AppointmentControls = ({
  onClickToday,
  onClickWeek,
  onClickMonth,
  onClickPrevButton,
  onClickNextButton,
  employees,
  handleFilterEmployee,
  onClickNewAppointment,
}) => {
  return (
    <MenuList sx={{ display: 'flex', flexDirection: 'row', maxHeight: 64 }}>
      <MenuItem onClick={onClickToday}>Today</MenuItem>
      <MenuItem onClick={onClickWeek}>Week</MenuItem>
      <MenuItem onClick={onClickMonth}>Month</MenuItem>
      <MenuItem onClick={onClickPrevButton}>
        <ChevronLeft />
      </MenuItem>
      <MenuItem onClick={onClickNextButton}>
        <ChevronRight />
      </MenuItem>
      <MenuItem disabled />
      <Autocomplete
        id='employee-calendar-filter'
        disablePortal
        clearOnEscape
        openOnFocus
        options={employees}
        getOptionLabel={(option: any) => option.name}
        onChange={handleFilterEmployee}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label='Employee' size='small' />
        )}
      />
      <MenuItem>
        <Button variant='outlined' onClick={onClickNewAppointment}>
          New appointment
        </Button>
      </MenuItem>
    </MenuList>
  );
};
