import React, { Component } from "react";
import BasicPage from "../common/BasicPage";
import { Card, Skeleton } from "antd";

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
import { LoadingOutlined } from "@ant-design/icons";

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
            {loadingAppt ? (
              <LoadingOutlined />
            ) : (
              <Actions
                {...this.props}
                title={appointment.service.name}
                onReschedule={this.toggleModal}
                isLoading={cancel}
                onCancel={this.handleCancel}
              />
            )}
            <Card>
              <BasicDetails appointment={appointment} />
              <PaymentDetails appointment={appointment} />
              <UpdatesDetails appointment={appointment} current={current} />
            </Card>
          </BasicPage>
        );

      default:
        return (
          <BasicPage>
            <div style={{ marginBottom: 20 }}>
              <Skeleton
                title={{ width: "30%" }}
                paragraph={false}
                active={true}
              />
            </div>
            <Card>
              <Skeleton
                title={{ width: "20%" }}
                paragraph={{
                  width: ["30%", "30%", "40%", "35%", "40%"],
                  rows: 5
                }}
              />
              <div style={{ marginTop: 40, marginBottom: 40 }}>
                <Skeleton
                  paragraph={false}
                  title={{ width: ["40%"] }}
                  active={true}
                />
              </div>
              <Skeleton
                paragraph={false}
                title={{ width: ["55%"] }}
                active={true}
              />
            </Card>
          </BasicPage>
        );
    }
  }
}
