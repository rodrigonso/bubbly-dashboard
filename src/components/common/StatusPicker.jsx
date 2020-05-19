import React from "react";
import { Select } from "antd";

export default function StatusPicker(props) {
  const statuses = ["CONFIRMED", "DRIVING", "WASHING", "COMPLETED"];

  console.log("BUILD");
  return (
    <Select onChange={props.onChange} defaultValue={props.defaultStatus}>
      {statuses.map((item) => (
        <Select.Option key={item}>{item}</Select.Option>
      ))}
    </Select>
  );
}
