import {
  MenuList,
  MenuItem,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ICalendar } from './common/appointmentInterfaces';

export const AppointmentControls = ({
  onClickToday,
  onClickWeek,
  onClickMonth,
  onClickPrevButton,
  onClickNextButton,
  calendars,
  handleFilterCalendar,
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
        id='calendar-filter'
        disablePortal
        clearOnEscape
        openOnFocus
        options={calendars}
        getOptionLabel={(option: ICalendar) => option.name}
        onChange={handleFilterCalendar}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            label='Filter by Customer'
            size='small'
          />
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
