import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getUsers, searchUsers } from "../../services/db_service";

export default function CustomerPicker(props) {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const handleChange = (id) => {
    props.onChange(users.filter((el) => el.id === id)[0]);
  };

  const filtered = users.filter(function (el) {
    const lName = el.name.toLowerCase();
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
        <Select.Option key={item.id}>{item.name}</Select.Option>
      ))}
    </Select>
  );
}
