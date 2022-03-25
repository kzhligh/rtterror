import { Typography } from '@mui/material';
import moment from 'moment';

export const AppointmentHeader = ({ appointmentForm }) => {
  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
        <Typography>
          {`${appointmentForm.client.firstName} ${appointmentForm.client.lastName}`}
        </Typography>
        <Typography style={{ marginTop: '10%' }}>
          {moment(appointmentForm.date).format('dddd, MMMM Do YYYY')}
        </Typography>
        <Typography>
          {moment(appointmentForm.date).format(' h:mm a')}
          {' - '}
          {moment(appointmentForm.date)
            .add(appointmentForm.duration, 'minutes')
            .format(' h:mm a')}
        </Typography>
        <Typography>{appointmentForm.duration} minutes</Typography>
        <Typography>{appointmentForm.plan.serviceName}</Typography>
      </div>
      <div>
        <Typography>
          Primary Phone: {appointmentForm.client.phoneNumber}{' '}
        </Typography>
        <Typography>Email: {appointmentForm.client.email}</Typography>
      </div>
    </div>
  );
};
