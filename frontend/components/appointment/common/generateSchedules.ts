import { ISchedule, IAppointmentResponse } from './appointmentInterfaces';

const generateSchedules = (appointments: IAppointmentResponse[]): ISchedule[] =>
  appointments.map((appm: IAppointmentResponse) => ({
    id: appm.id,
    calendarId: '' + appm.client_id,
    title:
      appm.services?.reduce((a, b) => a.name + '^' + b.name, '') ||
      'no service scheduled',
    category: 'time',
    start: new Date(appm.datetime),
    end: new Date(
      new Date(appm.datetime).getTime() + appm.duration * 60 * 1000
    ),
    attendees:
      appm.employees?.map((emp) => [emp.first_name, emp.last_name].join(' ')) ||
      [],
    raw: {
      ...appm,
      feedback: appm.feedback || '',
      notes: appm.notes || 'insert memo here',
    },
  }));

export { generateSchedules };
