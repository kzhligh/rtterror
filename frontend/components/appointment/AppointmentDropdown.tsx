import { Select, MenuItem, InputLabel } from '@mui/material';

export const AppointmentDropdown = ({
  therapists,
  services,
  setAppointment,
}) => {
  return (
    <>
      {' '}
      <Select
        id="services"
        defaultValue="Choose a therapist"
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            service_ids: [ ...state.service_ids, e.target.value ],
          }));
        }}
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.serviceName}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>Therapists</InputLabel>
      <Select
        id="therapists"
        defaultValue="Choose a therapist"
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            employee_ids: [ ...state.employee_ids, e.target.value ],
          }));
        }}
      >
        {therapists.map((therapist) => (
          <MenuItem key={therapist.id} value={therapist.id}>
            {therapist.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};