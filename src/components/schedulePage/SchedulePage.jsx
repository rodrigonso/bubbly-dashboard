import React, { Component } from "react";
import moment from "moment";

import { PageHeader } from "antd";
import BasicPage from "../common/BasicPage.jsx";
import Schedule from "./Schedule.jsx";
import DetailedView from "./DetailedView.jsx";

import { getSchedule } from "../../services/db_service.js";

export default class SchedulePage extends Component {
  state = {
    selectedDate: new Date(),
    appointments: []
  };

  componentDidMount = async () => {
    const { selectedDate } = this.state;
    await this.refreshSchedule(selectedDate);
  };

  refreshSchedule = async date => {
    this.setState({ isLoading: true });
    const appointments = await getSchedule(date);
    this.setState({ isLoading: false, appointments });
  };

  handleDateSelect = async val => {
    const { selectedDate } = this.state;
    const dt = val._d;
    console.log(dt);
    this.setState({ selectedDate: dt });

    if (
      moment(dt).month() !== moment(selectedDate).month() ||
      moment(dt).year() !== moment(selectedDate).year()
    ) {
      await this.refreshSchedule(dt);
    }
  };

  render() {
    const { appointments, selectedDate } = this.state;
    return (
      <BasicPage>
        <PageHeader title="Schedule" style={{ padding: "0px 0px 20px 0px" }} />
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "70%" }}>
            <Schedule
              appointments={appointments}
              selectedDate={selectedDate}
              handleDateSelect={this.handleDateSelect}
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
          </div>
        </div>
      </BasicPage>
    );
  }
}
