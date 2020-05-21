import React from "react";
import { Card, Row, Col, Typography, Tag, Checkbox } from "antd";
import {
  MobileOutlined,
  BookOutlined,
  ProfileOutlined,
  CarOutlined,
  CalendarOutlined,
  ContactsFilled,
  ContactsOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const weekdays = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function UpgradeInfo(props) {
  const { upgrade } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Upgrade Info</p>
      <Row>
        <Col>
          <AppstoreOutlined />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          {/* <Typography.Text>{`${weekdays[service.schedule.days[0]]} - ${
            weekdays[service.schedule.days[service.schedule.days.length - 1]]
          }`}</Typography.Text> */}
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        {/* {service.schedule.employees.map((item) => (
          <Col>
            <Tag>{item.firstName}</Tag>
          </Col>
        ))} */}
      </Row>
    </Card>
  );
}
