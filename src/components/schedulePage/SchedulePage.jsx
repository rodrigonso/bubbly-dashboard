import React, { Component } from "react";

import { Layout, Card, Calendar, Badge } from "antd";
import NavBar from "../common/NavBar";
import Moment from "moment";
import BasicPage from "../common/BasicPage";

const { Header } = Layout;

const mockAppointments = [
  {
    status: "confirmed",
    content: "Amazing Detail for John Doe",
    date: "03/08/2020"
  },
  {
    status: "confirmed",
    content: "Bubbly Pro for Daniel Doe",
    date: "03/08/2020"
  },
  {
    status: "on-hold",
    content: "Superior Detail for Trisha Doe",
    date: "03/12/2020"
  }
];

export default class SchedulePage extends Component {
  getAppointmentsData = date => {
    return mockAppointments.filter(function(item) {
      return item.date === date;
    });
  };

  formatDate = date => {
    return Moment(date).format("L");
  };

  dateCellRender = val => {
    const date = this.formatDate(val._d);
    const appts = this.getAppointmentsData(date);
    console.log(appts.length);
    return (
      <ul>
        {appts.map(item => (
          <li
            style={{
              listStyleType: "none",
              marginLeft: -40,
              padding: 0
            }}
          >
            <Badge
              status={item.status === "confirmed" ? "success" : "warning"}
              text={item.content}
              style={{
                textOverflow: "ellipsis",
                fontSize: 12,
                overflow: "hidden",
                width: "100%",
                whiteSpace: "nowrap"
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <NavBar />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, backgroundColor: "#fff" }}
          ></Header>
          <BasicPage title="Schedule">
            <Card>
              <Calendar dateCellRender={this.dateCellRender} />
            </Card>
          </BasicPage>
        </Layout>
      </Layout>
    );
  }
}
