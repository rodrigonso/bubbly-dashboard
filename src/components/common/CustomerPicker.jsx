import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getCustomers, searchUsers } from "../../services/db_service";

export default function CustomerPicker(props) {
  const [customers, setSustomers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCustomers().then((customers) => setSustomers(customers));
  }, []);

  const handleChange = (id) => {
    props.onChange(customers.filter((el) => el.id === id)[0]);
  };

  const filtered = customers.filter(function (el) {
    const lName = el.nameToString().toLowerCase();
    const lQuery = query.toLowerCase();
    return lName.includes(lQuery);
  });

  return (
    <Select
      filterOption={false}
      showSearch
      onSearch={setQuery}
      onChange={handleChange}
    >
      {filtered.map((item) => (
        <Select.Option key={item.id}>{item.nameToString()}</Select.Option>
      ))}
    </Select>
  );
}
