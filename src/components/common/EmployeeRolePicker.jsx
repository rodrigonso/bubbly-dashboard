import React from "react";
import { Select } from "antd";

export default function EmployeeRolePicker(props) {
  const roles = [
    { name: "detailer", label: "Detailer" },
    { name: "manager", label: "Manager" },
  ];

  return (
    <Select defaultValue={props.defaultValue} onChange={props.onChange}>
      {roles.map((item) => (
        <Select.Option key={item.name}>{item.label}</Select.Option>
      ))}
    </Select>
  );
}
