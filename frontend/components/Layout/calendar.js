import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const Calendar = () => {
  const [date, setDate] = React.useState(new Date());

  return (<LocalizationProvider dateAdapter={AdapterDateFns}>
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      // openTo="year"
      value={date}
      onChange={(newDate) => {
        setDate(newDate);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  </LocalizationProvider>
  );
};
export default Calendar;
