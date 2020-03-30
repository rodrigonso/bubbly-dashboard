import React, { Component } from "react";
import BasicPage from "./BasicPage";
import { PageHeader, Card, Descriptions, Button } from "antd";

export default class AppointmentDetails extends Component {
  render() {
    const { appointment } = this.props.location.state;
    return (
      <BasicPage>
        <PageHeader
          style={{ padding: "0px 0px 20px 0px" }}
          className="site-page-header"
          title={appointment.content}
          onBack={() => this.props.history.goBack()}
          extra={[
            <Button>Reschedule</Button>,
            <Button type="danger">Cancel</Button>
          ]}
        />
        <Card>
          <Descriptions column={1}>
            <Descriptions.Item label="Time">
              {appointment.startTime} - {appointment.endTime}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {appointment.date}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {appointment.address}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle">
              {appointment.vehicle.make} {appointment.vehicle.model}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </BasicPage>
    );
  }
}
