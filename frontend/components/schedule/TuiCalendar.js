import React from "react";
import Calendar from "@toast-ui/react-calendar";

const TuiCalendar = (props) => (
    <Calendar {...props} ref={props.forwardedRef} />
);

export default TuiCalendar;