import React, { Component } from "react";
import { Descriptions, Row, Tag } from "antd";
import moment from "moment";

export default class BasicDetails extends Component {
  state = {
    upgrades: [],
  };

  componentDidMount = async () => {
    const upgrades = this.props.appointment.upgrades;
    this.setState({ upgrades });
  };

  hasProfilePicture = () => {
    const { appointment } = this.props;
    return appointment.customer.profileUrl;
  };

  render() {
    const { appointment } = this.props;
    return (
      <React.Fragment>
        <Descriptions column={1}>
          <Descriptions.Item label="Time">
            {moment(appointment.startTime).format("LT")} -{" "}
            {moment(appointment.endTime).format("LT")}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {moment(appointment.date).format("LL")}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {appointment.address.toString()}
          </Descriptions.Item>
          <Descriptions.Item label="Vehicle">
            {appointment.vehicle.make} {appointment.vehicle.model}
          </Descriptions.Item>
          <Descriptions.Item label="Upgrades">
            <Row>
              {appointment.upgrades.map((item) => (
                <Tag style={{ marginBottom: "0.5rem" }}>{item.name}</Tag>
              ))}
            </Row>
          </Descriptions.Item>
        </Descriptions>
      </React.Fragment>
    );
  }
}
