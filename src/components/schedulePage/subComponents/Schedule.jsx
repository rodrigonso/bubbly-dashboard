import React, { Component } from "react";
import moment from "moment";

import { Calendar, Badge, Button } from "antd";
import { CloudOutlined } from "@ant-design/icons";

export default class Schedule extends Component {
  getAppointmentsData = (date) => {
    const { appointments } = this.props;
    console.log(appointments);
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
              status="success"
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
          padding: "10px 20px 0px 20px",
          borderRadius: 5,
          height: "65vh",
        }}
      >
        <Button
          style={{ position: "absolute", marginTop: "0.6rem" }}
          icon={<CloudOutlined />}
          loading={loading}
          onClick={handleRefresh}
        >
          Update
        </Button>
        <Calendar
          dateCellRender={this.dateCellRender}
          onChange={handleDateSelect}
        />
      </div>
    );
  }
}
