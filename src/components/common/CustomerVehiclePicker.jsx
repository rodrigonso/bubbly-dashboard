import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { CustomerApi } from "../../api/customerApi";

export default function CustomerVehiclePicker(props) {
  const { customerId, defaultValue } = props;

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    CustomerApi.getCustomerVehicles(customerId).then((vehicles) =>
      setVehicles(vehicles)
    );
  }, [customerId]);

  const handleSelection = (item) => {
    const vehicle = vehicles.filter((el) => el.id === item)[0];
    console.log(vehicle);
    props.onChange(vehicle);
  };

  return (
    <Select
      defaultValue={defaultValue}
      disabled={customerId === null}
      onChange={handleSelection}
    >
      {vehicles.length > 0
        ? vehicles.map((item) => (
            <Select.Option
              key={item.id}
            >{`${item.make} ${item.model}`}</Select.Option>
          ))
        : null}
    </Select>
  );
}
