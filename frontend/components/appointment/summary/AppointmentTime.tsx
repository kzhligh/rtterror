import { Typography } from '@mui/material';
import moment from 'moment';

export const AppointmentTime = ({ date, duration }) => (
  <>
    <Typography>{moment(date).format('dddd, MMMM Do YYYY')}</Typography>
    <Typography>
      {moment(date).format(' h:mm a')}
      {' - '}
      {moment(date)
        .add(duration, 'minutes')
        .format(' h:mm a')}
    </Typography>
    <Typography>{duration} minutes</Typography>
  </>
);
