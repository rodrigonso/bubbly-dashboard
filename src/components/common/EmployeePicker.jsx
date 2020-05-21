import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getEmployees } from "../../services/db_service";

export default function EmployeePicker(props) {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getEmployees().then((employees) => setEmployees(employees));
  }, []);

  const handleChange = (id) => {
    props.onChange(employees.filter((el) => el.id !== id));
  };

  const filtered = employees.filter(function (el) {
    const lName = el.formatName().toLowerCase();
    const lQuery = query.toLowerCase();
    return lName.includes(lQuery);
  });

  return (
    <Select
      filterOption={false}
      showSearch
      mode="multiple"
      onSearch={setQuery}
      onChange={handleChange}
    >
      {filtered.map((item) => (
        <Select.Option key={item.id}>{item.formatName()}</Select.Option>
      ))}
    </Select>
  );
}
