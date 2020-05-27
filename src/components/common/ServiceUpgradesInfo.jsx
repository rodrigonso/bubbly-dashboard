import React from "react";
import { Card, Row, Col, Typography, Tag, List, Checkbox } from "antd";
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
  DeleteOutlined,
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

export default function ServiceUpgradesInfo(props) {
  const { upgrades } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Upgrades</p>

      <Row style={{ marginTop: 10 }}>
        {upgrades.map((item) => (
          <Tag>{item.name}</Tag>
        ))}
      </Row>
    </Card>
  );
}
