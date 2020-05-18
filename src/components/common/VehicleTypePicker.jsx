import React from "react";
import { Select } from "antd";

export default function VehicleTypePicker(props) {
  return (
    <Select onChange={props.onChange} defaultValue="Sedan">
      <Select.Option key={"Sedan"}>Sedan</Select.Option>
      <Select.Option key={"Non-Sedan"}>Non-Sedan</Select.Option>
    </Select>
  );
}
