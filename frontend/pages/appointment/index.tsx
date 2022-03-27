import React, { useRef, useCallback, forwardRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { http } from 'utils/http';
import { randomBytes } from 'crypto';
import { Typography } from '@mui/material';
import ColorHash from 'color-hash';

import theme from 'components/appointment/themeConfig';
import template from 'components/appointment/templateConfig';
import { AddAppointmentDialog } from 'components/appointment/AddAppointmentDialog';
import { AppointmentControls } from 'components/appointment/AppointmentControls';
import AppointmentStatusDialog from 'components/appointment/AppointmentStatusDialog';
import DropConfirmationDialog from 'components/appointment/dropConfirmationDialog';

import 'tui-calendar/dist/tui-calendar.css';

const colorHash = new ColorHash();
const TuiCalendarWrapper = dynamic(
  () => import('components/appointment/TuiCalendarWrapper'),
  { ssr: false }
);
const TuiCalendar: any = forwardRef((props, ref) => (
  <TuiCalendarWrapper {...props} forwardedRef={ref} />
));
TuiCalendar.displayName = 'TuiCalendar';

const appointmentApiPath = `/api/v1/appointments`;
const employeeApiPath = `/api/v1/employees`;

export async function getServerSideProps () {
  const initAppointments = await http(appointmentApiPath);
  const employeeList = await http(employeeApiPath);
  return {
    props: {
      initAppointments,
      employeeList,
    },
  };
}

interface ISchedule {
  id: string;
  calendarId: string;
  title: string;
  category: 'time';
  start: Date;
  end: Date;
  attendees: any[];
  raw?:
    | {
        customer: string;
        duration: string | number;
        feedback: string;
        notes: string;
        status: any[];
        services: any[];
        therapists: any[];
      }
    | any;
}

interface IAppointmentResponse {
  id: string;
  rmq_id: string;
  client_id: string;
  pro_rmq_id: string;
  datetime: Date;
  duration: number;
  repeat: boolean;
  cycle_start: Date;
  cycle_end: Date;
  status: string | any;
  feedback: string;
  notes: string;
  employees?: any[];
  services?: any[];
  employee_ids?: string[] | number[];
  service_ids?: string[];
}

const Appointment = ({ initAppointments, employeeList }) => {
  const cal = useRef(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDropDialog, setOpenDropDialog] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState<
    IAppointmentResponse
  >(null);
  const [updateEvent, setUpdateEvent] = useState(null);

  const initAppointmentMap = new Map<string, IAppointmentResponse>();
  initAppointments.forEach((appm) => {
    initAppointmentMap.set(appm.id, appm);
  });

  const [appointmentMap, setAppointmentMap] = useState(initAppointmentMap);

  const onClickSchedule = useCallback(
    (e) => {
      const { id: appointmentId } = e.schedule;
      setSelectedAppointment(appointmentMap.get(appointmentId));

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

      const oldSchedule = appointmentMap.get(schedule.id);
      let newDatetime = new Date(oldSchedule.datetime);
      let newDuration = oldSchedule.duration;
      if ('start' in changes) {
        newDatetime = new Date(changes.start);
      }
      if ('end' in changes) {
        newDuration = new Date(changes.end).getTime() - newDatetime.getTime();
        newDuration = Math.floor(newDuration / 1000 / 60);
      }
      editAppointment(oldSchedule, {
        datetime: newDatetime,
        duration: newDuration,
      });
    }

    setUpdateEvent(null);
  };

  const editAppointment = async (
    oldAppointment: IAppointmentResponse,
    changes: any
  ) => {
    const newAppointment = {
      ...appointmentMap.get(oldAppointment.id),
      ...changes,
    };
    setAppointmentMap(
      new Map(appointmentMap.set(oldAppointment.id, newAppointment))
    );

    await http(appointmentApiPath, {
      method: 'PUT',
      body: {
        ...newAppointment,
        employee_ids: newAppointment.employees.map((emp) => emp.id),
        service_ids: newAppointment.services.map((serv) => serv.id),
      },
    });
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

  const changeCalendarView = (viewName) => {
    const calendar = cal.current.calendarInst;
    calendar.changeView(viewName, true);
    calendar.render();
  };

  const handleClickToday = () => {
    const calendar = cal.current.calendarInst;

    if (
      calendar.getDate().setHours(0, 0, 0, 0) !==
      new Date().setHours(0, 0, 0, 0)
    ) {
      calendar.today();
    } else {
      changeCalendarView('day');
    }
  };

  const calendarList = employeeList.map((emp) => ({
    id: emp.id,
    name: [emp.first_name, emp.last_name].join(' '),
    color: 'white',
    bgColor: colorHash.hex('' + emp.id),
    dragBgColor: '#9e5fff',
    borderColor: '#9e5fff',
    visible: true,
  }));

  const handleFilterEmployee = (_event, selectedEmployee, reason) => {
    const calendar = cal.current.calendarInst;
    if (reason === 'selectOption') {
      calendarList.forEach((emp) => {
        calendar.toggleSchedules(emp.id, true, false);
      });
      calendar.toggleSchedules(selectedEmployee.id, false, false);
    } else if (reason === 'clear') {
      calendarList.forEach((emp) => {
        calendar.toggleSchedules(emp.id, false, false);
      });
    }
    calendar.render();
  };

  const initSchedules: ISchedule[] = initAppointments.map((appm) => ({
    id: appm.id,
    calendarId: appm.employees?.length ? appm.employees[0].id : '',
    title: 'TITLE',
    category: 'time',
    start: appm.datetime,
    end: new Date(new Date(appm.datetime).getTime() + appm.duration * 60000),
    attendees: appm.employees.map((emp) =>
      [emp.first_name, emp.last_name].join(' ')
    ),
    raw: {
      customer: appm.client_id,
      duration: appm.duration,
      feedback: appm.feedback || '',
      notes: appm.notes || 'insert memo here',
      status: JSON.parse(appm.status) || [],
      services: appm.services,
      therapists: appm.employees,
    },
  }));

  const TuiCalendarProps = {
    ref: cal,
    view: 'day',
    taskView: false,
    scheduleView: ['time'],
    week: { hourStart: 8, hourEnd: 22 },
    useCreationPopup: false,
    useDetailPopup: false,
    theme: theme,
    template: template,
    calendars: calendarList,
    schedules: initSchedules,
    onClickDayname: onClickDayname,
    onClickSchedule: onClickSchedule,
    onBeforeCreateSchedule: onBeforeCreateSchedule,
    onBeforeDeleteSchedule: onBeforeDeleteSchedule,
    onBeforeUpdateSchedule: onBeforeUpdateSchedule,
  };

  return (
    <>
      <Typography variant='h6'>Appointment</Typography>
      <AppointmentControls
        onClickToday={handleClickToday}
        onClickWeek={() => changeCalendarView('week')}
        onClickMonth={() => changeCalendarView('month')}
        onClickPrevButton={() => cal.current.calendarInst.prev()}
        onClickNextButton={() => cal.current.calendarInst.next()}
        employees={calendarList}
        handleFilterEmployee={handleFilterEmployee}
        onClickNewAppointment={() => setOpenCreateDialog(true)}
      />
      <TuiCalendar {...TuiCalendarProps} />
      <AppointmentStatusDialog
        updateMemo={(value: string) => {
          if (selectedAppointment) {
            editAppointment(selectedAppointment, { notes: value });
            setSelectedAppointment(appointmentMap.get(selectedAppointment.id));
          }
        }}
        target={selectedAppointment}
        isOpen={openStatusDialog}
        onClose={() => {
          setOpenStatusDialog(false);
          setSelectedAppointment(null);
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
};

export default Appointment;
