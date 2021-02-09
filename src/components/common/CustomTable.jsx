import React from "react";
import { Card, Table } from "antd";
import { useState } from "react";
import SearchTable from "./SearchTable";

export default function CustomTable(props) {
  const { data, columns, onRowClick, hint } = props;
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.length > 0)
      return data.filter((item) => {
        if (item.toString()) {
          return item.toString().toLowerCase().includes(query.toLowerCase());
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
      bodyStyle={{ padding: 0 }}
      bordered
    >
      <Table
        title={() => <SearchTable onSearch={setQuery} hint={hint} />}
        dataSource={handleSearch()}
        columns={columns}
        onRow={(record, _) => {
          return {
            onClick: () => onRowClick(record),
          };
        }}
        pagination={{ style: { marginRight: 10 } }}
      />
    </Card>
  );
}
