import React, { Component } from "react";
import BasicPage from "../common/BasicPage";
import { PageHeader, Card } from "antd";

import {
  getAppointmentUpdates,
  cancelAppointment
} from "../../services/db_service";

import Reschedule from "./subComponents/Reschedule";
import BasicDetails from "./subComponents/BasicDetails";
import PaymentDetails from "./subComponents/PaymentDetails";
import UpdatesDetails from "./subComponents/UpdatesDetails";
import Actions from "./subComponents/Actions";

export default class AppointmentDetails extends Component {
  state = {
    updates: [],
    action: {},
    modal: false
  };

  componentDidMount = async () => {
    const { id } = this.props.location.state.appointment;

    const updates = await getAppointmentUpdates(id);
    this.setState({ updates });
  };

  toggleBusy = action => {
    this.setState({ [action]: !this.state[action] });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleCancel = async () => {
    const { id } = this.props.location.state.appointment;
    this.toggleBusy("cancel");
    await cancelAppointment(id);
    this.toggleBusy("cancel");
    this.props.history.goBack();
  };

  render() {
    const { appointment } = this.props.location.state;
    const { updates, cancel, modal } = this.state;
    const current = updates.length - 1;

    return (
      <BasicPage>
        <Reschedule
          isVisible={modal}
          appointment={appointment}
          toggleModal={this.toggleModal}
        />
        <Actions
          title={appointment.service.name}
          onReschedule={this.toggleModal}
          isLoading={cancel}
          onCancel={this.handleCancel}
        />
        <Card>
          <BasicDetails appointment={appointment} />
          <PaymentDetails appointment={appointment} />
          <UpdatesDetails appointment={appointment} current={current} />
        </Card>
      </BasicPage>
    );
  }
}
