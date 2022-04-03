import moment from "moment";

function _getFormattedTime(time) {
    return moment(new Date(time)).format('hh:mm A');
}

function _getTimeTemplate(schedule, isAllDay) {
    const html = [];

    html.push(`<span style="font-size: 125%;">${schedule.title}</span>`);

    html.push(`<div style="display: flex; justify-content: space-between;">${schedule.raw?.customer || ''}`);
    if (!isAllDay) {
        html.push(`<span style="padding-right: 12px;">${_getFormattedTime(schedule.start)}</span></div>`);
    } else {
        html.push("</div>");
    }

    const ulStyle = "margin: 0; padding: 0; overflow: hidden; font-weight: lighter;";
    const liStyle = "display: inline; padding: 1px;";
    html.push(`<ul style="${ulStyle}"><li style="${liStyle}">${(schedule.attendees || []).join(`</li>,<li style="${liStyle}">`)}</li></ul>`);

    if (schedule.raw?.notes) {
        html.push(`---<br><span style="font-weight: lighter;">${schedule.raw.notes}</span>`);
    }
    return html.join("");
}

const tuiTemplateConfig = {
    milestone: function (schedule) {
        return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
    },
    milestoneTitle: function () {
        return '<span class="tui-full-calendar-left-content">MILESTONE</span>';
    },
    task: function (schedule) {
        return '#' + schedule.title;
    },
    taskTitle: function () {
        return '<span class="tui-full-calendar-left-content">TASK</span>';
    },
    allday: function (schedule) {
        return _getTimeTemplate(schedule, true);
    },
    alldayTitle: function () {
        return '<span class="tui-full-calendar-left-content">ALL DAY</span>';
    },
    time: function (schedule) {
        return _getTimeTemplate(schedule, false);
    },
    goingDuration: function (schedule) {
        return '<span class="calendar-icon ic-travel-time"></span>' + schedule.goingDuration + 'min.';
    },
    comingDuration: function (schedule) {
        return '<span class="calendar-icon ic-travel-time"></span>' + schedule.comingDuration + 'min.';
    },
    monthMoreTitleDate: function (date, dayname) {
        var day = date.split('.')[2];

        return '<span class="tui-full-calendar-month-more-title-day">' + day + '</span> <span class="tui-full-calendar-month-more-title-day-label">' + dayname + '</span>';
    },
    monthMoreClose: function () {
        return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
    },
    monthGridHeader: function (dayModel) {
        var date = parseInt(dayModel.date.split('-')[2], 10);
        var classNames = ['tui-full-calendar-weekday-grid-date '];

        if (dayModel.isToday) {
            classNames.push('tui-full-calendar-weekday-grid-date-decorator');
        }

        return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
    },
    monthGridHeaderExceed: function (hiddenSchedules) {
        return '<span class="weekday-grid-more-schedules">+' + hiddenSchedules + '</span>';
    },
    monthGridFooter: function () {
        return '';
    },
    monthGridFooterExceed: function () {
        return '';
    },
    monthDayname: function (model) {
        return (model.label).toString().toLocaleUpperCase();
    },
    weekDayname: function (model) {
        return '<span style="cursor: pointer;"><span class="tui-full-calendar-dayname-date">' + model.date + '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' + model.dayName + '</span></span>';
    },
    weekGridFooterExceed: function (hiddenSchedules) {
        return '+' + hiddenSchedules;
    },
    dayGridTitle: function (viewName) {

        // use another functions instead of 'dayGridTitle'
        // milestoneTitle: function() {...}
        // taskTitle: function() {...}
        // alldayTitle: function() {...}

        var title = '';
        switch (viewName) {
            case 'milestone':
                title = '<span class="tui-full-calendar-left-content">MILESTONE</span>';
                break;
            case 'task':
                title = '<span class="tui-full-calendar-left-content">TASK</span>';
                break;
            case 'allday':
                title = '<span class="tui-full-calendar-left-content">ALL DAY</span>';
                break;
        }

        return title;
    },
    schedule: function (schedule) {

        // use another functions instead of 'schedule'
        // milestone: function() {...}
        // task: function() {...}
        // allday: function() {...}

        var tpl;

        switch (schedule.category) {
            case 'milestone':
                tpl = '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
                break;
            case 'task':
                tpl = '#' + schedule.title;
                break;
            case 'allday':
                tpl = _getTimeTemplate(schedule, true);
                break;
        }

        return tpl;
    },
    collapseBtnTitle: function () {
        return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
    },
    popupIsAllDay: function () {
        return 'All Day';
    },
    popupStateFree: function () {
        return 'Free';
    },
    popupStateBusy: function () {
        return 'Busy';
    },
    titlePlaceholder: function () {
        return 'Subject';
    },
    locationPlaceholder: function () {
        return 'Location';
    },
    startDatePlaceholder: function () {
        return 'Start date';
    },
    endDatePlaceholder: function () {
        return 'End date';
    },
    popupSave: function () {
        return 'Save';
    },
    popupUpdate: function () {
        return 'Update';
    },
    popupDetailDate: function (isAllDay, start, end) {
        var isSameDate = moment(start).isSame(end);
        var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

        if (isAllDay) {
            return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
        }

        return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
    },
    popupDetailLocation: function (schedule) {
        return 'Location : ' + schedule.location;
    },
    popupDetailUser: function (schedule) {
        return 'User : ' + (schedule.attendees || []).join(', ');
    },
    popupDetailState: function (schedule) {
        return 'State : ' + schedule.state || 'Busy';
    },
    popupDetailRepeat: function (schedule) {
        return 'Repeat : ' + schedule.recurrenceRule;
    },
    popupDetailBody: function (schedule) {
        return 'Body : ' + schedule.body;
    },
    popupEdit: function () {
        return 'Edit';
    },
    popupDelete: function () {
        return 'Delete';
    }
};

export default tuiTemplateConfig;