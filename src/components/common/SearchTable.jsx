import React from "react";
import { Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchTable(props) {
  const handleSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <Input
        allowClear
        placeholder={props.hint}
        style={{ width: "30%", marginRight: 10 }}
        prefix={<SearchOutlined />}
        onChange={handleSearch}
      />
    </React.Fragment>
  );
}
