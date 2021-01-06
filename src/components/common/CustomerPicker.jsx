import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getCustomers } from "../../services/db_service";

export default function CustomerPicker(props) {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getCustomers().then((customers) => setCustomers(customers));
  }, []);

  const handleChange = (id) => {
    props.onChange(customers.filter((el) => el.id === id)[0]);
  };

  const handleSearch = (query) => {
    let filtered = customers.filter(function (el) {
      const lName = el.toString().toLowerCase();
      const lQuery = query.toLowerCase();
      return lName.includes(lQuery);
    });
    setFiltered(filtered);
  };

  return (
    <Select
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={null}
      showSearch
      showArrow={false}
      onSearch={handleSearch}
      onChange={handleChange}
    >
      {filtered.map((item) => (
        <Select.Option key={item.id}>{item.toString()}</Select.Option>
      ))}
    </Select>
  );
}
