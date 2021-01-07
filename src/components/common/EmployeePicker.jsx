import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getDetailers } from "../../services/db_service";

export default function EmployeePicker(props) {
  const [detailers, setDetailers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getDetailers().then((detailers) => setDetailers(detailers));
  }, []);

  const handleChange = (id) => {
    const res = detailers.filter((el) => el.id !== id);
    props.onChange(res);
  };

  const filtered = detailers.filter(function (el) {
    const lName = el.toString().toLowerCase();
    const lQuery = query.toLowerCase();
    return lName.includes(lQuery);
  });

  return (
    <Select
      defaultValue={props.defaultValue}
      filterOption={false}
      showSearch
      mode="multiple"
      onSearch={setQuery}
      onChange={handleChange}
    >
      {filtered.map((item) => (
        <Select.Option key={item.id}>{item.toString()}</Select.Option>
      ))}
    </Select>
  );
}
