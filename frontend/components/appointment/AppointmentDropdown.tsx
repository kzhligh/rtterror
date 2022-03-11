import { Select, MenuItem, InputLabel } from '@mui/material';
import { useState } from 'react';

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
        value={services.serviceName}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            plan: { serviceName: e.target.value as string },
          }));
        }}
      >
        {services.map((service) => (
          <MenuItem key={service.serviceName} value={service.serviceName}>
            {service.serviceName}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>Therapists</InputLabel>
      <Select
        id="therapists"
        defaultValue="Choose a therapist"
        value={therapists.name}
        style={{ width: '100%' }}
        onChange={(e) => {
          setAppointment((state) => ({
            ...state,
            therapist: { name: e.target.value as string },
          }));
        }}
      >
        {therapists.map((therapist) => (
          <MenuItem key={therapist.name} value={therapist.name}>
            {therapist.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
