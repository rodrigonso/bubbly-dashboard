import React, { Component } from "react";
import { Avatar, Card, Descriptions, Tag } from "antd";
import moment from "moment";
import { updateAppointmentUpgrades } from "../../../services/db_service";
import { UserOutlined } from "@ant-design/icons";

export default class BasicDetails extends Component {
  state = {
    upgrades: [],
  };

  componentDidMount = async () => {
    const upgrades = this.props.appointment.upgrades;
    this.setState({ upgrades });
  };

  handleUpgradeDelete = async (upgrade) => {
    const { appointment } = this.props;

    const upgrades = [...this.state.upgrades];
    const newUpgrades = upgrades.filter((item) => item.name !== upgrade.name);

    this.setState({ upgrades: newUpgrades });
    await updateAppointmentUpgrades(appointment.id, newUpgrades);
  };

  hasProfilePicture = () => {
    const {appointment} = this.props;
    return appointment.customer.profileUrl;
  }

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
            {appointment.upgrades.map((item) => (
              <Tag closable onClose={() => this.handleUpgradeDelete(item)}>
                {item.name}
              </Tag>
            ))}
            <Tag
              style={{ borderStyle: "dashed", background: "#fff" }}
              onClick={this.toggleUpgradeInput}
            >
              + Add Upgrade
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </React.Fragment>
    );
  }
}
