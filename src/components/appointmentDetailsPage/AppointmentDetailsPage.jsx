import React, { Component } from "react";
import BasicPage from "../common/BasicPage";
import { PageHeader, Card, Skeleton } from "antd";

import {
  getAppointmentUpdates,
  cancelAppointment,
  getAppointmentById
} from "../../services/db_service";

import Reschedule from "./subComponents/Reschedule";
import BasicDetails from "./subComponents/BasicDetails";
import PaymentDetails from "./subComponents/PaymentDetails";
import UpdatesDetails from "./subComponents/UpdatesDetails";
import Actions from "./subComponents/Actions";

export default class AppointmentDetails extends Component {
  state = {
    appointment: null,
    updates: [],
    action: {},
    modal: false
  };

  componentDidMount = async () => {
    const { appointmentId } = this.props.location.state;

    this.toggleBusy("loadingAppt");
    const appointment = await getAppointmentById(appointmentId);
    const updates = await getAppointmentUpdates(appointmentId);
    this.setState({ updates: updates, appointment: appointment });
    this.toggleBusy("loadingAppt");
  };

  toggleBusy = action => {
    this.setState({ [action]: !this.state[action] });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleCancel = async () => {
    const { id } = this.state.appointment;
    this.toggleBusy("cancel");
    await cancelAppointment(id);
    this.toggleBusy("cancel");
    this.props.history.goBack();
  };

  render() {
    const { appointment, updates, cancel, modal, loadingAppt } = this.state;
    const current = updates.length - 1;

    switch (loadingAppt) {
      case false:
        return (
          <BasicPage>
            <Reschedule
              isVisible={modal}
              appointment={appointment}
              toggleModal={this.toggleModal}
            />
            <Actions
              {...this.props}
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

      default:
        return <div>Loading...</div>;
    }
  }
}
