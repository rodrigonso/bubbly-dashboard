import React, { Component } from "react";
import moment from "moment";

import { Calendar, Card, Badge, Tag } from "antd";

export default class Schedule extends Component {
  getAppointmentsData = date => {
    const { appointments } = this.props;
    return appointments.filter(function(item) {
      return moment(item.date).dayOfYear() === moment(date).dayOfYear();
    });
  };

  dateCellRender = val => {
    const appts = this.getAppointmentsData(val._d);
    return (
      <ul>
        {appts.map(item => (
          <li
            key={item.id}
            style={{
              listStyleType: "none",
              marginLeft: -40,
              padding: 0
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
                whiteSpace: "nowrap"
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { handleDateSelect } = this.props;
    return (
      <Card>
        <Calendar
          dateCellRender={this.dateCellRender}
          onChange={handleDateSelect}
        />
      </Card>
    );
  }
}
