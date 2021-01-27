import React from "react";
import { DatePicker as Picker } from "antd";
import moment from "moment";

export default function DatePicker(props) {
  const handleChange = (date, _) => {
    props.onChange(date.set({ seconds: 0 }));
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
