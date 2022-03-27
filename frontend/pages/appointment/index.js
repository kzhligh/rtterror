import React, { useRef, useCallback, forwardRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { randomBytes } from 'crypto';
import {
  Typography,
  MenuList,
  MenuItem,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import AppointmentStatusDialog from '../../components/appointment/AppointmentStatusDialog';
import DropConfirmationDialog from '../../components/appointment/dropConfirmationDialog';

import theme from '../../components/appointment/themeConfig';
import template from '../../components/appointment/templateConfig';
import { AddAppointmentDialog } from 'components/appointment/AddAppointmentDialog';
import { http } from "../../utils/http";

import 'tui-calendar/dist/tui-calendar.css';

const TuiCalendarWrapper = dynamic(
  () => import('../../components/appointment/TuiCalendarWrapper'),
  { ssr: false }
);
const TuiCalendar = forwardRef((props, ref) => (
  <TuiCalendarWrapper {...props} forwardedRef={ref} />
));
TuiCalendar.displayName = 'TuiCalendar';

const today = new Date();

function Appointment() {
  const cal = useRef(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openStatusDialog, setopenStatusDialog] = useState(false);
  const [openDropDialog, setOpenDropDialog] = useState(false);

  const [clickTarget, setClickTarget] = useState({
    employeeId: 0,
    scheduleId: 0,
  });
  const [updateEvent, setUpdateEvent] = useState(null);

  const [schedules, setSchedules] = useState([
    {
      id: '1',
      calendarId: '3',
      title: 'TOAST UI Calendar Study',
      category: 'time',
      dueDateClass: '',
      start: new Date(new Date().setHours(13)),
      end: new Date(new Date().setHours(14)),
    },
    {
      id: '2',
      calendarId: '1',
      title: 'Practice',
      category: 'time',
      dueDateClass: '',
      start: new Date(new Date().setHours(12)),
      end: new Date(new Date().setHours(15)),
      isReadOnly: true,
    },
    {
      id: '3',
      calendarId: '2',
      title: 'FE Workshop',
      category: 'time',
      dueDateClass: '',
      start: new Date(new Date().setHours(14)),
      end: new Date(new Date().setHours(16)),
      isReadOnly: true,
    },
    {
      id: '4',
      calendarId: '3',
      title: 'Report',
      category: 'time',
      dueDateClass: '',
      start: new Date(new Date().setDate(today.getDay() - 1)),
      end: new Date(new Date().setDate(today.getDay() - 1)),
    },
  ]);
  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'Employee X',
      color: '#ffffff',
      bgColor: 'red',
      dragBgColor: '#9e5fff',
      borderColor: '#9e5fff',
      visible: true,
    },
    {
      id: '2',
      name: 'Employee Y',
      color: '#ffffff',
      bgColor: 'green',
      dragBgColor: '#00a9ff',
      borderColor: '#00a9ff',
      visible: true,
    },
    {
      id: '3',
      name: 'Employee Z',
      color: '#ffffff',
      bgColor: 'blue',
      dragBgColor: '#00a9ff',
      borderColor: '#00a9ff',
      visible: true,
    },
  ]);

  // add new appointment
  const [ therapists, setTherapists ] = useState([]);
  useEffect(() => {
    // console.log('therapists: ', therapists);
    if (therapists.length === 0) {
      http('/api/v1/employees')
        .then(data => setTherapists(data.map(t => ({ ...t, name: t.first_name + ' ' + t.last_name }))))
        .catch(error => console.error('get employees error: ', error));
    }
  }, [therapists]);
  const [ services, setServices ] = useState([]);
  useEffect(() => {
    if (services.length === 0) {
      http('/api/v1/services')
        .then(data => setServices(data.map(s => ({ ...s, serviceName: s.name }))))
        .catch(error => console.error('get services error: ', error));
    }
  }, [services]);
  const [ existingClients, setExistingClients ] = useState([]);
  useEffect(() => {
    // console.log('therapists: ', therapists);
    if (existingClients.length === 0) {
      http('/api/v1/customer')
        .then(data => {
          console.log('clients: ', data);
          setExistingClients(data.map(c => ({...c, name: c.firstName + ' ' + c.lastName})));
        })
        .catch(error => console.error('get existingClients error: ', error));
    }
  }, [existingClients]);


  const onClickSchedule = useCallback(
    (e) => {
      const { calendarId: employeeId, id: scheduleId } = e.schedule;
      setClickTarget({ employeeId: employeeId, scheduleId: scheduleId });

      setopenStatusDialog(true);
    },
    [openStatusDialog]
  );

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    const schedule = {
      id: String(randomBytes(8)),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      state: scheduleData.state,
    };

    cal.current.calendarInst.createSchedules([schedule]);
    // TODO: create schedule

    setopenStatusDialog(true);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log('onBeforeDeleteSchedule');
    console.log(res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);

    // TODO: delete schedule
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    setUpdateEvent(e);
    setOpenDropDialog(true);
  }, []);

  const handleConfirmUpdateSchedule = (ok) => {
    setOpenDropDialog(false);

    if (ok && updateEvent) {
      const { schedule, changes } = updateEvent;

      cal.current.calendarInst.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
    }

    setUpdateEvent(null);
  };

  const changeCalendarView = (viewName) => {
    const calendar = cal.current.calendarInst;
    calendar.changeView(viewName, true);
    calendar.render();
  };

  const onClickDayname = useCallback((e) => {
    const calendar = cal.current.calendarInst;
    if (calendar.getViewName() === 'day') {
      calendar.changeView('week', true);
    } else if (
      calendar.getViewName() === 'week' ||
      calendar.getViewName() === 'month'
    ) {
      const date = new Date(e.date);
      date.setDate(date.getDate() + 1);
      calendar.setDate(date);
      calendar.changeView('day', true);
    } else {
      return;
    }
    calendar.render();
  }, []);

  const handleFilterEmployee = (event, selectedEmployee, reason) => {
    const calendar = cal.current.calendarInst;
    if (reason === 'selectOption') {
      employees.forEach((emp) => {
        calendar.toggleSchedules(emp.id, true, false);
      });
      calendar.toggleSchedules(selectedEmployee.id, false, false);
    } else if (reason === 'clear') {
      employees.forEach((emp) => {
        calendar.toggleSchedules(emp.id, false, false);
      });
    }
    calendar.render();
  };

  const handleClickPrevButton = () => {
    const calendar = cal.current.calendarInst;
    calendar.prev();
  };

  const handleClickNextButton = () => {
    const calendar = cal.current.calendarInst;
    calendar.next();
  };

  return (
    <>
      <Typography variant="h6">Appointment</Typography>
      <MenuList sx={{ display: 'flex', flexDirection: 'row', maxHeight: 64 }}>
        <MenuItem
          onClick={() => {
            cal.current.calendarInst.today();
            changeCalendarView('day');
          }}
        >
          Today
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeCalendarView('week');
          }}
        >
          Week
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeCalendarView('month');
          }}
        >
          Month
        </MenuItem>
        <MenuItem onClick={handleClickPrevButton}>
          <ChevronLeft />
        </MenuItem>
        <MenuItem onClick={handleClickNextButton}>
          <ChevronRight />
        </MenuItem>
        <MenuItem disabled />
        <Autocomplete
          id="employee-calendar-filter"
          disablePortal
          clearOnEscape
          openOnFocus
          options={employees}
          getOptionLabel={(option) => option.name}
          onChange={handleFilterEmployee}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Employee" size="small" />
          )}
        />
        <MenuItem>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenCreateDialog(true);
            }}
          >
            Add new
          </Button>
        </MenuItem>
      </MenuList>
      <TuiCalendar
        ref={cal}
        view="week"
        taskView={false}
        scheduleView={['time']}
        week={{ hourStart: 8, hourEnd: 22 }}
        useCreationPopup={false}
        useDetailPopup={false}
        theme={theme}
        template={template}
        calendars={employees}
        schedules={schedules}
        onClickDayname={onClickDayname}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
      <AppointmentStatusDialog
        onSubmit={onBeforeUpdateSchedule}
        target={schedules.find(
          (el) => parseInt(el.id) === clickTarget.scheduleId
        )}
        isOpen={openStatusDialog}
        onClose={() => {
          setopenStatusDialog(false);
        }}
      />
      <AddAppointmentDialog
        isOpen={openCreateDialog}
        onClose={() => {
          setOpenCreateDialog(false);
        }}
        therapists = {therapists}
        services = {services}
        existingClients = {existingClients}
      />
      <DropConfirmationDialog
        open={openDropDialog}
        onClose={handleConfirmUpdateSchedule}
        changes={updateEvent?.changes}
      />
    </>
  );
}

export default Appointment;