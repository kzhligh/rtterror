import { Select, MenuItem, InputLabel } from '@mui/material';

export const AppointmentDropdown = ({
  employeeList,
  serviceList,
  setAppointment,
}) => {
  return (
    <>
      <Select
        id='services'
        defaultValue={''}
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => {
            const service = e.target.value;
            // @ts-ignore
            let serviceDuration = service.duration / 60000;
            if (service.hasOwnProperty('services')) {
              // @ts-ignore
              serviceDuration = service.total_duration / 60000;
            }
            const duration =
              serviceDuration != state.duration
                ? serviceDuration
                : state.duration;
            return {
              ...state,
              services: [...state.services, e.target.value],
              duration: duration,
            };
          });
        }}
      >
        {serviceList.map((serv) => (
          <MenuItem key={serv.id} value={serv}>
            {serv.first_name + ' ' + serv.last_name}{' '}
            {'(' + serv.duration / 60000 + ' min)'}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>Therapists</InputLabel>
      <Select
        id='therapists'
        defaultValue=''
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            employees: [...state.employees, e.target.value],
          }));
        }}
      >
        {employeeList.map((therapist) => (
          <MenuItem key={therapist.id} value={therapist}>
            {therapist.first_name + ' ' + therapist.last_name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
