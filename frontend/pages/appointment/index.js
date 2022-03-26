import React, { useRef, useCallback, forwardRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { http } from 'utils/http';
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
import ColorHash from 'color-hash';

import AppointmentStatusDialog from '../../components/appointment/AppointmentStatusDialog';
import DropConfirmationDialog from '../../components/appointment/dropConfirmationDialog';

import theme from '../../components/appointment/themeConfig';
import template from '../../components/appointment/templateConfig';
import { AddAppointmentDialog } from 'components/appointment/AddAppointmentDialog';

import 'tui-calendar/dist/tui-calendar.css';

const colorHash = new ColorHash();
const TuiCalendarWrapper = dynamic(() => import('../../components/appointment/TuiCalendarWrapper'), { ssr: false });
const TuiCalendar = forwardRef((props, ref) => (
  <TuiCalendarWrapper {...props} forwardedRef={ref} />
));
TuiCalendar.displayName = 'TuiCalendar';

export async function getServerSideProps() {
  const initAppointments = await http(`/api/v1/appointments`);
  const employeeList = await http(`/api/v1/employees`);
  const customerList = await http(`/api/v1/customer`);
  return {
    props: {
      initAppointments,
      employeeList
    },
  };
}

function Appointment({ initAppointments, employeeList }) {

  const cal = useRef(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDropDialog, setOpenDropDialog] = useState(false);

  const [clickTarget, setClickTarget] = useState(null);
  const [updateEvent, setUpdateEvent] = useState(null);

  const [schedules, setSchedules] = useState(
    initAppointments.map((appm) => ({
      id: appm.id,
      calendarId: appm.employees?.length ? appm.employees[0].id : '',
      title: 'TITLE',
      category: 'time',
      start: appm.datetime,
      end: new Date(new Date(appm.datetime).getTime() + appm.duration * 60000),
      attendees: appm.employees.map((emp) => [emp.first_name, emp.last_name].join(' ')),
      raw: {
        customer: appm.client_id,
        duration: appm.duration,
        feedback: appm.feedback || '',
        notes: appm.notes || 'default notes',
        status: JSON.parse(appm.status) || {},
        services: appm.services
      }
    }))
  );

  const [employees, setEmployees] = useState(
    employeeList.map((emp) => ({
      id: emp.id,
      name: [emp.first_name, emp.last_name].join(' '),
      color: 'white',
      bgColor: colorHash.hex(emp.id),
      dragBgColor: '#9e5fff',
      borderColor: '#9e5fff',
      visible: true,
    }))
  );

  const onClickSchedule = useCallback(
    (e) => {
      const { id: scheduleId } = e.schedule;
      setClickTarget(schedules.find(
        (el) => el.id === scheduleId
      ));

      setOpenStatusDialog(true);
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

    setOpenStatusDialog(true);
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
            New appointment
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
        target={clickTarget}
        isOpen={openStatusDialog}
        onClose={() => {
          setOpenStatusDialog(false);
        }}
      />
      <AddAppointmentDialog
        isOpen={openCreateDialog}
        onClose={() => {
          setOpenCreateDialog(false);
        }}
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
