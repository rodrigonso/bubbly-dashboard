import React, { Component } from "react";
import moment from "moment";

import BasicPage from "../common/BasicPage.jsx";
import Schedule from "./subComponents/Schedule.jsx";
import DetailedView from "./subComponents/DetailedView.jsx";

import { getSchedule } from "../../services/db_service.js";
import NewAppointmentModal from "./subComponents/NewAppointmentModal.jsx";

export default class SchedulePage extends Component {
  state = {
    selectedDate: new Date(),
    appointments: [],
    busy: false,
    modal: false,
  };

  componentDidMount = async () => {
    await this.fetchScheduleData();
  };

  fetchScheduleData = async () => {
    await this.handleRefresh();
  };

  handleRefresh = async () => {
    const { selectedDate } = this.state;
    this.busy();
    const appointments = await getSchedule(selectedDate);
    this.setState({ appointments });
    this.busy();
  };

  toggleModal = async () => {
    if (this.state.modal === true) {
      await this.fetchScheduleData();
    }
    this.setState({ modal: !this.state.modal });
  };

  busy = () => {
    this.setState({ busy: !this.state.busy });
  };

  handleDateSelect = async (val) => {
    const { selectedDate } = this.state;
    const dt = val._d;
    this.setState({ selectedDate: dt });

    if (
      moment(dt).month() !== moment(selectedDate).month() ||
      moment(dt).year() !== moment(selectedDate).year()
    ) {
      await this.handleRefresh();
    }
  };

  render() {
    const { appointments, selectedDate, busy, modal } = this.state;
    return (
      <BasicPage title="Schedule">
        <NewAppointmentModal
          visible={modal}
          onOk={this.toggleModal}
          onCancel={this.toggleModal}
        />
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "60%" }}>
            <Schedule
              appointments={appointments}
              selectedDate={selectedDate}
              handleDateSelect={this.handleDateSelect}
              handleRefresh={this.handleRefresh}
              loading={busy}
            />
          </div>
          <div
            className="row-2"
            style={{
              flexBasis: "40%",
              marginLeft: 20,
            }}
          >
            <DetailedView
              {...this.props}
              appointments={appointments}
              selectedDate={selectedDate}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      </BasicPage>
    );
  }
}
