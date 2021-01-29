import React from "react";
import { Select } from "antd";
import { useState, useEffect } from "react";
import { CustomerApi } from "../../api/customerApi";

export default function UserAddressPicker(props) {
  const { customerId, onChange, defaultValue } = props;
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    CustomerApi.getCustomerAddresses(customerId).then(setAddresses);
  }, [customerId, defaultValue]);

  const handleChange = (id, _) => {
    const service = addresses.find((el) => el.id === id);
    onChange(service);
  };

  return (
    <>
      <Select
        defaultValue={defaultValue}
        disabled={customerId === null}
        onChange={handleChange}
      >
        {addresses.map((item) => (
          <Select.Option key={item.id}>{item.toString()}</Select.Option>
        ))}
      </Select>
    </>
  );
}
