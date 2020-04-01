import React from "react";
import { Descriptions, Tag } from "antd";
import moment from "moment";

export default function BasicDetails(props) {
  const { appointment } = props;
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="Time">
        {moment(appointment.startTime).format("LT")} -{" "}
        {moment(appointment.endTime).format("LT")}
      </Descriptions.Item>
      <Descriptions.Item label="Date">
        {moment(appointment.date).format("LL")}
      </Descriptions.Item>
      <Descriptions.Item label="Address">
        {appointment.address.street}
      </Descriptions.Item>
      <Descriptions.Item label="Vehicle">
        {appointment.vehicle.make} {appointment.vehicle.model}
      </Descriptions.Item>
      <Descriptions.Item label="Upgrades">
        {appointment.upgrades.map(item => (
          <Tag closable>{item.name}</Tag>
        ))}
        <Tag style={{ borderStyle: "dashed", background: "#fff" }}>
          + Add Upgrade
        </Tag>
      </Descriptions.Item>
    </Descriptions>
  );
}
