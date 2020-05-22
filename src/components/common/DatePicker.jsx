import React from "react";
import { DatePicker as Picker } from "antd";
import moment from "moment";

export default function DatePicker(props) {
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  };

  const handleChange = (date, _) => {
    props.onChange(formatDate(date));
  };

  return (
    <Picker
      allowClear={false}
      format="MM/DD/YYYY"
      locale
      onChange={handleChange}
      defaultValue={
        props.appointment
          ? moment(props.appointment.date)
          : moment(props.defaultValue)
      }
    />
  );
}
