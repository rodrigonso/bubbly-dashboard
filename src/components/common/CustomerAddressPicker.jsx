import React from "react";
import { Select } from "antd";
import { useState, useEffect } from "react";
import Address from "../../models/Address";
import { getCustomerById } from "../../services/db_service";

export default function UserAddressPicker(props) {
  const { customer, onChange, defaultValue } = props;
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (customer === null) return;
    getCustomerById(customer?.id ?? "").then((customer) =>
      setAddresses(customer.addresses.map((item) => new Address(item)))
    );
  }, [customer]);

  const handleChange = (id, _) => {
    const service = addresses.filter((el) => el.id === id)[0];
    onChange(service);
  };

  return (
    <>
      <Select
        defaultValue={defaultValue}
        disabled={customer === null}
        onChange={handleChange}
      >
        {addresses.map((item) => (
          <Select.Option key={item.id}>{item.toString()}</Select.Option>
        ))}
      </Select>
    </>
  );
}
