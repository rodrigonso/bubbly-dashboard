import React, { Component } from "react";
import moment from "moment";

import { PageHeader } from "antd";
import BasicPage from "../common/BasicPage.jsx";
import Schedule from "./subComponents/Schedule.jsx";
import DetailedView from "./subComponents/DetailedView.jsx";

import { getSchedule } from "../../services/db_service.js";
import ScheduleOverview from "./subComponents/ScheduleOverview.jsx";

export default class SchedulePage extends Component {
  state = {
    selectedDate: new Date(),
    appointments: [],
    isUpdating: false
  };

  componentDidMount = async () => {
    await this.handleRefresh();
  };

  handleRefresh = async () => {
    const { selectedDate } = this.state;
    this.setState({ isUpdating: true });
    const appointments = await getSchedule(selectedDate);
    this.setState({ isUpdating: false, appointments });
  };

  handleDateSelect = async val => {
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
    const { appointments, selectedDate, isUpdating } = this.state;
    return (
      <BasicPage>
        <PageHeader title="Schedule" style={{ padding: "0px 0px 20px 0px" }} />
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "70%" }}>
            <Schedule
              appointments={appointments}
              selectedDate={selectedDate}
              handleDateSelect={this.handleDateSelect}
              handleRefresh={this.handleRefresh}
              isUpdating={isUpdating}
            />
          </div>
          <div
            className="row-2"
            style={{
              flexBasis: "30%",
              marginLeft: 20
            }}
          >
            <DetailedView
              appointments={appointments}
              selectedDate={selectedDate}
            />
            <div style={{ marginTop: 20 }}>
              <ScheduleOverview totalAppointments={appointments.length} />
            </div>
          </div>
        </div>
      </BasicPage>
    );
  }
}
