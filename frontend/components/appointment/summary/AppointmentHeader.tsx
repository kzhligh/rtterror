import { Grid, Typography } from '@mui/material';

export const AppointmentHeader = ({ appointmentForm }) => {
  return (
    <Grid container direction='row'>
      <Grid item xs={8}>
        <Typography variant='h5'>
          {`${appointmentForm.client.firstName} ${appointmentForm.client.lastName}`}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='subtitle2'>
          {appointmentForm.client.phoneNumber}
        </Typography>
        <Typography variant='subtitle2'>
          {appointmentForm.client.email}
        </Typography>
      </Grid>
    </Grid>
  );
};
