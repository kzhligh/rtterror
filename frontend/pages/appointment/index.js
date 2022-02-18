import React, { useRef, useCallback, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'tui-calendar/dist/tui-calendar.css';
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from '@material-ui/core';

const TuiCalendarWrapper = dynamic(() => import('../../components/appointment/TuiCalendarWrapper'), { ssr: false });
const TuiCalendar = forwardRef((props, ref) => (
  <TuiCalendarWrapper {...props} forwardedRef={ref} />
));
TuiCalendar.displayName = 'TuiCalendar';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules = [
  {
    calendarId: '1',
    category: 'time',
    isVisible: true,
    title: 'Study',
    id: '1',
    body: `${start}`,
    start,
    end,
  },
  {
    calendarId: '2',
    category: 'time',
    isVisible: true,
    title: 'Meeting',
    id: '2',
    body: 'Description',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2)),
  },
];

const calendars = [
  {
    id: '1',
    name: 'My Calendar',
    color: '#ffffff',
    bgColor: '#9e5fff',
    dragBgColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '2',
    name: 'Company',
    color: '#ffffff',
    bgColor: '#00a9ff',
    dragBgColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

const calendarOptions = {
  // sort of option properties.
};
const today = new Date();

function Appointment() {
  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.getInstance().getElement(id, calendarId);
    console.log(el);
    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.log(scheduleData);

    const schedule = {
      id: String(uuidv4),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      state: scheduleData.state
    };

    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);

    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule) {
      console.log(schedule);
      return _getTimeTemplate(schedule, false);
    }
  };

  return (
    <>
      <Typography variant="h6">Appointment</Typography>
      <TuiCalendar
        ref={cal}
        view="week"
        useCreationPopup={true}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </>
  );
}

export default Appointment;
