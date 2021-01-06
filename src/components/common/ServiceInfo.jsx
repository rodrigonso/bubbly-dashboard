import React from "react";
import { Card, Row, Col, Tag, Descriptions, Divider, Typography } from "antd";
import { CalendarOutlined, ContactsOutlined } from "@ant-design/icons";

const weekdays = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function ServiceInfo(props) {
  const { service } = props;

  const renderStartAndEndTimes = (detailer) => {
    const { schedule } = detailer;
    for (const weekday in weekdays) {
      const startTime = formatTime(schedule[weekday].startTime);
      const endTime = formatTime(schedule[weekday].endTime);
      return (
        <p>
          {startTime} - {endTime}
        </p>
      );
    }
  };

  const formatTime = (time) => {
    return time >= 12 ? `${time - 12} PM` : `${time} AM`;
  };

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Schedule Info</p>
      <Row>
        {/* <Col>
          <CalendarOutlined />
        </Col> */}
        <Descriptions column={1}>
          {service.detailers.map((item) => (
            <Descriptions.Item key={item.id} label={item.firstName}>
              {renderStartAndEndTimes(item)}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Row>
    </Card>
  );
}
