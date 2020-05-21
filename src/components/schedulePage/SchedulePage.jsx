import React, { Component } from "react";
import moment from "moment";

import BasicPage from "../common/BasicPage.jsx";
import Schedule from "./subComponents/Schedule.jsx";
import DetailedView from "./subComponents/DetailedView.jsx";

import { getAppointments } from "../../services/db_service.js";
import NewAppointmentModal from "./subComponents/NewAppointmentModal.jsx";

export default class SchedulePage extends Component {
  state = {
    selectedDate: new Date(),
    appointments: [],
    busy: false,
    modal: false,
    query: "",
  };

  componentDidMount = async () => {
    await this.fetchScheduleData();
  };

  fetchScheduleData = async () => {
    const { selectedDate } = this.state;
    this.busy();
    const appointments = await getAppointments(selectedDate);
    console.log("HERE", appointments);
    this.setState({ appointments });
    this.busy();
  };

  handleSearch = (query) => {
    this.setState({ query });
  };

  searchAppointment = () => {
    return this.state.appointments.filter((el) =>
      el.customer
        .formatName()
        .toLowerCase()
        .includes(this.state.query.toLowerCase())
    );
  };

  handleRefresh = async () => { };

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
    const { appointments, selectedDate, busy, modal, query } = this.state;
    console.log(appointments);
    return (
      <BasicPage title="Schedule">
        <NewAppointmentModal
          visible={modal}
          onOk={this.toggleModal}
          onCancel={this.toggleModal}
        />
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "70%" }}>
            <Schedule
              {...this.props}
              appointments={appointments}
              selectedDate={selectedDate}
              handleDateSelect={this.handleDateSelect}
              handleSearch={this.handleSearch}
              handleRefresh={this.fetchScheduleData}
              loading={busy}
            />
          </div>
          <div
            className="row-2"
            style={{
              flexBasis: "30%",
              marginLeft: 20,
            }}
          >
            <DetailedView
              {...this.props}
              title={query}
              appointments={
                query.length > 0 ? this.searchAppointment() : appointments
              }
              selectedDate={selectedDate}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      </BasicPage>
    );
  }
}
