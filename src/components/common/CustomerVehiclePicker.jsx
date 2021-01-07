import React from "react";
import { Select } from "antd";

export default function CustomerVehiclePicker(props) {
  const handleSelection = (item) => {
    console.log(item);
    const vehicle = props.customer.vehicles.filter((el) => el.id === item)[0];
    props.onChange(vehicle);
  };

  return (
    <Select
      defaultValue={props.defaultValue}
      disabled={props.customer === null}
      onChange={handleSelection}
    >
      {props.customer
        ? props.customer.vehicles.map((item) => (
            <Select.Option
              key={item.id}
            >{`${item.make} ${item.model}`}</Select.Option>
          ))
        : null}
    </Select>
  );
}
