import React from "react";
import { DatePicker as Picker } from "antd";
import moment from "moment";

export default function DatePicker(props) {
  const handleChange = (date, _) => {
    console.log("on datechange: " + date);
    props.onChange(date);
  };

  return (
    <Picker
      allowClear={false}
      format="MM/DD/YYYY"
      locale
      onChange={handleChange}
      defaultValue={
        props.appointment ? moment(props.appointment.date) : moment()
      }
    />
  );
}
