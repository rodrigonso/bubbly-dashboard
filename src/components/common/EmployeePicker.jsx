import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getDetailers } from "../../services/db_service";

export default function EmployeePicker(props) {
  const { allowMultiple, onChange, defaultValue } = props;

  const [detailers, setDetailers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getDetailers().then((detailers) => setDetailers(detailers));
  }, []);

  const handleChange = (employee) => {
    let res;

    console.log(employee);

    if (allowMultiple) {
      res = detailers.filter((el) => employee.map((item) => item.id === el.id));
    } else res = detailers.find((el) => el.id === employee);

    onChange(res);
  };

  const filtered = detailers.filter(function (el) {
    const lName = el.toString().toLowerCase();
    const lQuery = query.toLowerCase();
    return lName.includes(lQuery);
  });

  return (
    <Select
      defaultValue={defaultValue}
      filterOption={false}
      showSearch
      mode={allowMultiple ? "multiple" : null}
      onSearch={setQuery}
      onChange={handleChange}
    >
      {filtered.map((item) => (
        <Select.Option key={item.id}>{item.toString()}</Select.Option>
      ))}
    </Select>
  );
}
