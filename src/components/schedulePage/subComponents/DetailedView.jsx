import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { Card, Empty, Timeline, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function DetailedView(props) {
  const { selectedDate } = props;
  const appointments = props.appointments.filter(
    item => moment(item.date).dayOfYear() === moment(selectedDate).dayOfYear()
  );
  const isEmpty = appointments.length === 0;
  const cardTitle = moment(selectedDate).format("LL");

  switch (isEmpty) {
    case false:
      return (
        <Card title={cardTitle}>
          <Timeline>
            {appointments.map((item, i) => {
              return (
                <Timeline.Item key={i}>
                  <Link
                    to={{
                      pathname: `/schedule/${item.id}`,
                      state: {
                        appointmentId: item.id
                      }
                    }}
                  >
                    <Card
                      hoverable
                      bordered={false}
                      bodyStyle={{ padding: "5px 0px 5px 10px" }}
                    >
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {moment(item.startTime).format("LT")} -{" "}
                        {moment(item.endTime).format("LT")}
                      </Text>
                      <br />
                      <Text>{item.service.name}</Text>
                    </Card>
                  </Link>
                </Timeline.Item>
              );
            })}
            <Timeline.Item dot={<PlusSquareOutlined />}>
              <Button type="dashed" size="small">
                Add Appointment
              </Button>
            </Timeline.Item>
          </Timeline>
        </Card>
      );

    default:
      return (
        <Card title={cardTitle}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No appointments"
          />
        </Card>
      );
  }
}
