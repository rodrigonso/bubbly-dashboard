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
              style={{
                borderRadius: "100%",
                objectFit: "cover",
              }}
              placeholder
              fallback="data:image/png;base64,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"
              src={employee.photoUrl}
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
