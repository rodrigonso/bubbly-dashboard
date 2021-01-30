import {
  Card,
  Descriptions,
  Image,
  Divider,
  Typography,
  Form,
  Input,
  TimePicker,
  Button,
  message,
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useState } from "react";
import BasicPage from "../common/BasicPage";
import moment from "moment";
import { EmployeeApi } from "../../api/employeeApi";
import { ResponsiveBar } from "@nivo/bar";

export default function EmployeeDetailsPage(props) {
  const { state: employee } = props.location;

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(employee?.schedule);
  const [phone, setPhone] = useState(employee?.phone);
  const [firstName, setFirstName] = useState(employee?.firstName);
  const [lastName, setLastName] = useState(employee?.lastName);
  const [email, setEmail] = useState(employee?.email);

  const getDetailerSchedule = (day) => {
    const sche = schedule[day.toLowerCase()];

    if (!sche) return {};

    const start = moment().set({
      hour: sche.startTime,
      minute: 0,
      second: 0,
    });

    const end = moment().set({
      hour: sche.endTime,
      minute: 0,
      second: 0,
    });
    return { startTime: start, endTime: end };
  };

  const isChecked = (day) => {
    day = day.toLowerCase();
    return schedule[day] !== undefined;
  };

  const handleScheduleChange = (day) => {
    day = day.toLowerCase();
    const obj = { ...schedule };
    if (obj[day]) {
      delete obj[day];
    } else {
      obj[day] = { startTime: 10, endTime: 16 };
    }

    setSchedule(obj);
  };

  const handleTimeChange = (day, time, type) => {
    day = day.toLowerCase();
    const obj = { ...schedule };

    obj[day][type] = moment(time).hour();
    setSchedule(obj);
  };

  const handleEmployeeSave = async () => {
    try {
      setLoading(true);
      const data = { ...employee };
      data.schedule = schedule;
      data.phone = phone;
      data.firstName = firstName;
      data.lastName = lastName;
      data.email = email;

      console.log(data);

      await EmployeeApi.updateEmployee(employee.id, data);

      message.success("Employee updated with success!");
    } catch (error) {
      message.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatRatingData = () => {
    const res = [];
    console.log(res);
    for (const [key, val] of Object.entries(employee.ratings)) {
      res.push({ name: key, value: val });
    }
    console.log(res);
    return res.reverse();
  };

  if (!employee) return <div />;

  return (
    <BasicPage>
      <Card style={{ borderRadius: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography.Title level={3}>
              {firstName} {lastName}
            </Typography.Title>
          </div>
          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={handleEmployeeSave}
              type="primary"
            >
              Save
            </Button>
          </div>
        </div>
        <Divider />
        <div style={{ display: "flex" }}>
          <div>
            <Image
              preview={false}
              height={200}
              width={200}
              style={{ borderRadius: "100%", objectFit: "cover" }}
              src={employee?.photoUrl}
            />
          </div>
          <div style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }} />
          <div>
            <Form layout="vertical">
              <div style={{ display: "flex" }}>
                <div>
                  <Form.Item label="First name">
                    <Input
                      onChange={(e) => setFirstName(e.target.value)}
                      defaultValue={firstName}
                    />
                  </Form.Item>
                </div>
                <div
                  style={{ marginLeft: "0.25rem", marginRight: "0.25rem" }}
                />
                <div>
                  <Form.Item label="Last name">
                    <Input
                      onChange={(e) => setLastName(e.target.value)}
                      defaultValue={lastName}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item label="Email">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  defaultValue={email}
                />
              </Form.Item>
              <Form.Item style={{ width: "60%" }} label="Phone number">
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  defaultValue={phone}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <Divider />

        <div style={{ display: "flex" }}>
          <div>
            <Typography.Title level={5}>Schedule</Typography.Title>

            <div style={{ flexBasis: "22.5rem" }}>
              {weekdays.map((day) => {
                const defaultStart = moment().set({
                  hour: 10,
                  minute: 0,
                  second: 0,
                });
                const defaultEnd = moment().set({
                  hour: 16,
                  minute: 0,
                  second: 0,
                });
                const schedule = getDetailerSchedule(day);

                return (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Checkbox
                        onChange={(e) => handleScheduleChange(day)}
                        checked={isChecked(day)}
                      />
                      <Typography.Text style={{ marginLeft: "1rem" }}>
                        {day}
                      </Typography.Text>
                    </div>
                    <div style={{ display: "flex" }}>
                      <TimePicker
                        onChange={(time) =>
                          handleTimeChange(day, time, "startTime")
                        }
                        disabled={!isChecked(day)}
                        format="hh:mm A"
                        minuteStep={15}
                        use12Hours={true}
                        showSecond={false}
                        showNow={false}
                        defaultValue={schedule?.startTime ?? defaultStart}
                        style={{
                          marginLeft: "2rem",
                          marginTop: "0.35rem",
                          marginBottom: "0.35rem",
                        }}
                      />
                      <TimePicker
                        onChange={(time) =>
                          handleTimeChange(day, time, "endTime")
                        }
                        disabled={!isChecked(day)}
                        format="hh:mm A"
                        minuteStep={15}
                        use12Hours={true}
                        showSecond={false}
                        showNow={false}
                        defaultValue={schedule?.endTime ?? defaultEnd}
                        style={{
                          marginLeft: "1rem",
                          marginTop: "0.35rem",
                          marginBottom: "0.35rem",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginLeft: "2.5rem", marginRight: "2.5rem" }}>
            <Divider type="vertical" style={{ height: "100%" }} />
          </div>
          <div>
            <Typography.Title level={5}>Ratings</Typography.Title>
            <div style={{ height: "25rem", width: "15rem" }}>
              <ResponsiveBar
                data={formatRatingData()}
                indexBy="name"
                margin={{ bottom: 45, top: 10 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors="#cae6fc"
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Stars",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>
          </div>
        </div>
      </Card>
    </BasicPage>
  );
}
