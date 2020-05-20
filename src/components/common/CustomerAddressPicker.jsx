import React from "react";
import { Select } from "antd";

export default function UserAddressPicker(props) {
  const handleSelection = (item) => {
    const address = props.user.addresses.filter((el) => el.id === item)[0];
    props.onChange(address);
  };

  return (
    <Select disabled={props.user === null} onChange={handleSelection}>
      {props.user
        ? props.user.addresses.map((item) => (
            <Select.Option key={item.id}>{item.toString()}</Select.Option>
          ))
        : null}
    </Select>
  );
}
