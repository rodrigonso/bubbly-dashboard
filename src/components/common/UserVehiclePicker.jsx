import React from "react";
import { Select } from "antd";

export default function UserVehiclePicker(props) {
  const handleSelection = (item) => {
    console.log(item);
    const vehicle = props.user.vehicles.filter((el) => el.id === item)[0];
    props.onChange(vehicle);
  };

  return (
    <Select disabled={props.user === null} onChange={handleSelection}>
      {props.user
        ? props.user.vehicles.map((item) => (
            <Select.Option
              key={item.id}
            >{`${item.make} ${item.model}`}</Select.Option>
          ))
        : null}
    </Select>
  );
}
