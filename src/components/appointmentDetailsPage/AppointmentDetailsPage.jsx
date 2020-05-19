import React, { Component } from "react";
import BasicPage from "../common/BasicPage";
import { Card, Skeleton } from "antd";

import {
  getAppointmentUpdates,
  cancelAppointmentById,
  getAppointmentById,
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
    action: {},
    modal: false,
  };

  componentDidMount = async () => {
    const { appointmentId } = this.props.location.state;
    console.log(appointmentId);

    this.toggleBusy("loadingAppointment");
    const appointment = await getAppointmentById(appointmentId);
    this.setState({ appointment: appointment });
    this.toggleBusy("loadingAppointment");
  };

  toggleBusy = (action) => {
    this.setState({ [action]: !this.state[action] });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleCancel = async () => {
    const { id } = this.state.appointment;
    this.toggleBusy("cancel");
    await cancelAppointmentById(id);
    this.toggleBusy("cancel");
    this.props.history.goBack();
  };

  render() {
    const { appointment, cancel, modal, loadingAppointment } = this.state;
    switch (loadingAppointment) {
      case false:
        return (
          <BasicPage>
            <Reschedule
              isVisible={modal}
              appointment={appointment}
              toggleModal={this.toggleModal}
            />
            {loadingAppointment ? (
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
            <Card style={{ backgroundColor: "#fff", borderRadius: 5 }}>
              <BasicDetails appointment={appointment} />
              <PaymentDetails appointment={appointment} />
              <UpdatesDetails current={appointment.status} />
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
