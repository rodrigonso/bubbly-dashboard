import React from "react";
import { DatePicker as Picker } from "antd";
import moment from "moment";

export default function DatePicker(props) {
  const handleChange = (date, _) => {
    console.log("on datechange: " + date);
    props.onChange(date._d);
  };

  return (
    <Picker
      allowClear={false}
      format="MM/DD/YYYY"
      locale
      onChange={handleChange}
      defaultValue={moment(props.defaultValue ?? moment())}
    />
  );
}
