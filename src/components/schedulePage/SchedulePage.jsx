import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Calendar,
  Badge,
  Timeline,
  Empty,
  Typography,
  Button,
  PageHeader,
  PlusSquareOutlined
} from "antd";
import Moment from "moment";
import BasicPage from "../common/BasicPage.jsx";
const { Text } = Typography;

// mock data
const mockAppointments = [
  {
    id: 1,
    status: "confirmed",
    content: "Amazing Detail for John Doe",
    date: "03/08/2020",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    address: "12307 Moretti Court, Richmond, TX 77406",
    vehicle: {
      make: "Nissan",
      model: "Rogue"
    }
  },
  {
    id: 2,
    status: "confirmed",
    content: "Bubbly Pro for Daniel Doe",
    date: "03/08/2020",
    startTime: "12:00 PM",
    endTime: "02:00 PM",
    address: "12307 Moretti Court, Richmond, TX 77406",
    vehicle: {
      make: "Tesla",
      model: "Model X"
    }
  }
];

export default class SchedulePage extends Component {
  state = {
    selectedDate: new Moment(Date()).format("L"),
    appointments: []
  };

  componentDidMount = () => {
    const appointments = mockAppointments;
    this.setState({ appointments });
  };

  handleDateSelect = val => {
    const date = this.formatDate(val._d);
    this.setState({ selectedDate: date });
  };

  getAppointmentsData = date => {
    return this.state.appointments.filter(function(item) {
      return item.date === date;
    });
  };

  formatDate = date => {
    return Moment(date).format("L");
  };

  dateCellRender = val => {
    const date = this.formatDate(val._d);
    const appts = this.getAppointmentsData(date);
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

  appointmentCellRender = () => {
    const { selectedDate } = this.state;
    const appts = this.getAppointmentsData(selectedDate);

    if (!selectedDate) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Please select a day"
        />
      );
    }

    if (appts.length === 0)
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No appointments"
        />
      );

    return (
      <Timeline>
        {appts.map((item, i) => {
          return (
            <Timeline.Item>
              <Link
                to={{
                  pathname: `/schedule/${item.id}`,
                  state: {
                    appointment: item
                  }
                }}
              >
                <Card
                  hoverable
                  bordered={false}
                  bodyStyle={{ padding: "5px 0px 5px 10px" }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.startTime} - {item.endTime}
                  </Text>
                  <br />
                  <Text>{item.content}</Text>
                </Card>
              </Link>
            </Timeline.Item>
          );
        })}
        <Timeline.Item dot={<PlusSquareOutlined />}>
          <Button type="dashed" size="small">
            Add Appointment
          </Button>
        </Timeline.Item>
      </Timeline>
    );
  };

  render() {
    const { selectedDate } = this.state;
    return (
      <BasicPage>
        <PageHeader title="Schedule" style={{ padding: "0px 0px 20px 0px" }} />
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "70%" }}>
            <Card>
              <Calendar
                dateCellRender={this.dateCellRender}
                onSelect={this.handleDateSelect}
              />
            </Card>
          </div>
          <div
            className="row-2"
            style={{
              flexBasis: "30%",
              marginLeft: 20
            }}
          >
            <Card title={selectedDate}>{this.appointmentCellRender()}</Card>
          </div>
        </div>
      </BasicPage>
    );
  }
}
