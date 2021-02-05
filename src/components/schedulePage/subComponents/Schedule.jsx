import React, { Component } from "react";
import moment from "moment";

import { Calendar, Badge, Button, Row, Col } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import SearchTable from "../../common/SearchTable";

const statuses = {
  DRIVING: "processing",
  WASHING: "processing",
  CONFIRMED: "success",
  CANCELED: "error",
  COMPLETED: "default",
  LATE: "error",
};

export default class Schedule extends Component {
  getAppointmentsData = (date) => {
    const { appointments } = this.props;
    return appointments.filter(function (item) {
      return moment(item.date).dayOfYear() === moment(date).dayOfYear();
    });
  };

  dateCellRender = (val) => {
    const appts = this.getAppointmentsData(val._d);
    return (
      <ul>
        {appts.map((item) => (
          <li
            key={item.id}
            style={{
              listStyleType: "none",
              marginLeft: -40,
              padding: 0,
            }}
          >
            <Badge
              status={statuses[item.calculateStatus()]}
              text={item.service.name}
              style={{
                textOverflow: "ellipsis",
                fontSize: 12,
                overflow: "hidden",
                width: "100%",
                whiteSpace: "nowrap",
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { handleDateSelect, loading, handleRefresh } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px 10px 0px 10px",
          borderRadius: 5,
          height: "80vh",
          overflow: "scroll",
        }}
      >
        <Row style={{ marginBottom: "-2.65rem", marginTop: "0.1rem" }}>
          <Col style={{ marginRight: "0.5rem" }}>
            <Button
              icon={<CloudOutlined />}
              loading={loading}
              onClick={handleRefresh}
            >
              Update
            </Button>
          </Col>
          <Col span={18}>
            <SearchTable onSearch={this.props.handleSearch} />
          </Col>
        </Row>

        <Calendar
          dateCellRender={this.dateCellRender}
          onChange={handleDateSelect}
        />
      </div>
    );
  }
}
