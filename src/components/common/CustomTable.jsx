import React from "react";
import { Card, Table } from "antd";
import { useState } from "react";
import SearchTable from "./SearchTable";
import Spinner from "./Spinner";

export default function CustomTable(props) {
  const { data, columns, onRowClick } = props;
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.length > 0)
      return data.filter((item) => {
        if (item.formatName()) {
          return item.formatName().toLowerCase().includes(query.toLowerCase());
        } else {
          return item.name.toLowerCase().includes(query.toLowerCase());
        }
      });
    else return data;
  };

  return (
    <Card
      style={{
        borderRadius: 5,
        height: "80vh",
        overflow: "scroll",
      }}
      bodyStyle={{ padding: "10px 10px 10px 10px" }}
      bordered
    >
      <Table
        title={() => <SearchTable onSearch={setQuery} hint="Search" />}
        dataSource={handleSearch()}
        columns={columns}
        onRow={(record, _) => {
          return {
            onClick: () => onRowClick(record),
          };
        }}
      />
    </Card>
  );
}
