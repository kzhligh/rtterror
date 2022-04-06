import { Select, MenuItem, InputLabel } from '@mui/material';

export const AppointmentDropdown = ({
  therapists,
  services,
  setAppointment,
}) => {
  return (
    <>
      <Select
        id='services'
        defaultValue=''
        style={{ width: '100%' }}
        onChange={(e) => {
            setAppointment(state => {
                const service = e.target.value;
                // @ts-ignore
                let serviceDuration = (service.duration)/60000;
                if(service.hasOwnProperty('services')){
                    // @ts-ignore
                    serviceDuration = (service.total_duration)/60000;
                }
                const duration = serviceDuration != state.duration ? serviceDuration : state.duration;
                return {
                    ...state,
                    // @ts-ignore
                    service_ids: [...state.service_ids, e.target.value.id],
                    duration: duration
                }
            });
        }}
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service}>
            {service.name} {service.hasOwnProperty('services')?"(Combo)": "("+service.duration/60000+" min)"}
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
            employee_ids: [...state.employee_ids, e.target.value],
          }));
        }}
      >
        {therapists.map((therapist) => (
          <MenuItem key={therapist.id} value={therapist.id}>
            {therapist.first_name + ' ' + therapist.last_name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
