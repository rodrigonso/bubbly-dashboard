import React from "react";
import { Select } from "antd";

const weekdays = [
  { label: "Monday", val: "mon" },
  { label: "Tuesday", val: "tue" },
  { label: "Wednesday", val: "wed" },
  { label: "Thursday", val: "thu" },
  { label: "Friday", val: "fri" },
  { label: "Saturday", val: "sat" },
  { label: "Sunday", val: "sun" },
];

export default function WeekdayPicker(props) {
  const generateWeekdays = () => {
    return weekdays.map((item) => (
      <Select.Option key={item.val}>{item.label}</Select.Option>
    ));
  };

  return (
    <div style={{ width: "100%" }}>
      <Select onChange={props.onChange} mode="multiple">
        {generateWeekdays()}
      </Select>
    </div>
  );
}
