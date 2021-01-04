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
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Schedule Info</p>
      <Row>
        {/* <Col>
          <CalendarOutlined />
        </Col> */}
        <Descriptions column={1}>
          {service.schedule.map((item) => (
            <Descriptions.Item label={weekdays[item.day]}>
              {item.detailers[0].startTime}-{item.detailers[0].endTime} PM
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Row>
    </Card>
  );
}
