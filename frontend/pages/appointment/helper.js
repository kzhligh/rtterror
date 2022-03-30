const generateSchedules = (appointments) => {
    let schedules = [];
    appointments.forEach(a => {
      // generate service name
      let servicesName = '';
      a.services.forEach(s => {
        servicesName += s.name + '/';
      });
      if (servicesName.length > 0) servicesName = servicesName.slice(0, -1);
  
      // generate end time
      const startTime = new Date(a.datetime);
      const endTime = new Date(startTime.getTime() + 1000*60*a.duration)
  
      // generate one schedue for each employee
      a.employees.forEach(e => {
        const schedule = {
          id: a.id,
          calendarId: e.id,
          title: a.client_id.toString() + ' ' + servicesName,
          category: 'time',
          dueDateClass: '',
          start: startTime,
          end: endTime
        };
        schedules.push(schedule);
      });
    });
    console.log('generateSchedules()/appointments: ', appointments);
    console.log('generateSchedules()/schedules: ', schedules);
    return schedules;
  }
  
  const employeeColors = [
    {
      color: '#ffffff',
      bgColor: 'red',
      dragBgColor: '#9e5fff',
      borderColor: '#9e5fff',
    },
    {
      color: '#ffffff',
      bgColor: 'green',
      dragBgColor: '#00a9ff',
      borderColor: '#00a9ff',
    },
    {
      color: '#ffffff',
      bgColor: 'blue',
      dragBgColor: '#00a9ff',
      borderColor: '#00a9ff',
    }
  ]
  
  const generateCalendarEmployees = (employees) => {
    let calendarEmployees = [];
    let counter = 0;
    employees.forEach(e => {
      const employee = {
        id: e.id,
        name: e.first_name + ' ' + e.last_name,
        ...employeeColors[counter%3],
        visible: true
      };
      calendarEmployees.push(employee);
      counter++;
    });
    console.log('generateCalendarEmployees()/calendarEmployees: ', calendarEmployees);
    return calendarEmployees;
  }
  
  export const helpers = { generateSchedules, generateCalendarEmployees }