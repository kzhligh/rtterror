import React from "react";
import Calendar from "@toast-ui/react-calendar";

const TuiCalendarWrapper = (props) => (
    <Calendar {...props} ref={props.forwardedRef} />
);

export default TuiCalendarWrapper;