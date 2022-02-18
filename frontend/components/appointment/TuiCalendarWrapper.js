import React from "react";
import Calendar from "@toast-ui/react-calendar";

export default (props) => (
    <Calendar {...props} ref={props.forwardedRef} />
);