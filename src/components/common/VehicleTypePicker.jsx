import React from "react";
import { Select } from "antd";

export default function VehicleTypePicker(props) {
  return (
    <Select onChange={props.onChange} defaultValue="sedan">
      <Select.Option key={"sedan"}>Sedan</Select.Option>
      <Select.Option key={"non-sedan"}>Non-Sedan</Select.Option>
    </Select>
  );
}
