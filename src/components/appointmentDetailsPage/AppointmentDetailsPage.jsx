import React, { Component } from "react";
import BasicPage from "../common/BasicPage";
import { Card, Skeleton } from "antd";

import {
  cancelAppointmentById,
  getAppointmentById,
} from "../../services/db_service";

import RescheduleModal from "./subComponents/RescheduleModal";
import BasicDetails from "./subComponents/BasicDetails";
import PaymentDetails from "../common//PaymentDetails";
import StatusDetails from "./subComponents/StatusDetails";
import Actions from "./subComponents/Actions";
import { LoadingOutlined } from "@ant-design/icons";

export default class AppointmentDetails extends Component {
  state = {
    appointment: null,
    action: {},
    statusModal: false,
    rescheduleModal: false,
  };

  componentDidMount = async () => {
    await this.fetchAppointment();
  };

  fetchAppointment = async () => {
    const { appointmentId } = this.props.location.state;
    this.toggleBusy("loadingAppointment");
    const appointment = await getAppointmentById(appointmentId);
    this.setState({ appointment: appointment });
    this.toggleBusy("loadingAppointment");
  };

  toggleBusy = (action) => {
    this.setState({ [action]: !this.state[action] });
  };

  toggleRescheduleModal = async () => {
    if (this.state.appointment.status !== "COMPLETED") {
      this.setState({ rescheduleModal: !this.state.rescheduleModal });
      await this.fetchAppointment();
    } else {
      alert("Cannot reschedule an already completed appointment!");
    }
  };

  toggleStatusModal = async () => {
    this.setState({ statusModal: !this.state.statusModal });
    await this.fetchAppointment();
  };

  handleCancel = async () => {
    if (this.state.appointment.status !== "COMPLETED") {
      const { id } = this.state.appointment;
      this.toggleBusy("cancel");
      await cancelAppointmentById(id);
      this.toggleBusy("cancel");
      this.props.history.goBack();
    } else {
      alert("Cannot cancel an already completed appointment!");
    }
  };

  render() {
    const {
      appointment,
      cancel,
      loadingAppointment,
      rescheduleModal,
      statusModal,
    } = this.state;
    switch (loadingAppointment) {
      case false:
        return (
          <BasicPage>
            <RescheduleModal
              isVisible={rescheduleModal}
              appointment={appointment}
              onOk={this.toggleRescheduleModal}
              onCancel={this.toggleRescheduleModal}
            />
            {loadingAppointment ? (
              <LoadingOutlined />
            ) : (
              <Actions
                {...this.props}
                title={`${
                  appointment.service.name
                } for ${appointment.customer.formatName()}`}
                onReschedule={this.toggleRescheduleModal}
                isLoading={cancel}
                onCancel={this.handleCancel}
              />
            )}
            <Card style={{ backgroundColor: "#fff", borderRadius: 5 }}>
              <BasicDetails appointment={appointment} />
              <div style={{ width: "41%" }}>
                <PaymentDetails appointment={appointment} />
              </div>
              <StatusDetails
                modalVisible={statusModal}
                toggleModal={this.toggleStatusModal}
                appointment={appointment}
              />
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
                  rows: 5,
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
