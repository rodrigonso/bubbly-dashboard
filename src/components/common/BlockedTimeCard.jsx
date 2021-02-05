import React, { useState, useEffect } from "react";

import { Card, Typography, Divider, Popover, Button, message } from "antd";
import { ClockCircleOutlined, ContactsOutlined } from "@ant-design/icons";
import moment from "moment";
import { EmployeeApi } from "../../api/employeeApi";
import { ScheduleApi } from "../../api/scheduleApi";

export default function BlockedTimeCard(props) {
  const { appointment, isSelected = false, onClick } = props;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    EmployeeApi.getEmployeeById(appointment.employeeId).then((employee) => {
      setEmployee(employee);
      setLoading(false);
    });
  }, [appointment]);

  const handleUnblock = async () => {
    try {
      await ScheduleApi.cancelBlockedTime(appointment.id);
      message.success("Blocked time removed successfully!");
    } catch (error) {
      message.error("Unable to unblock this time slot");
    }
  };

  const handleEdit = () => {};

  const formatTime = (date) => {
    return moment(date).format("LT");
  };

  const formatDate = (date) => {
    return moment(date).format("MMM Do YY");
  };

  const renderDateAndTime = () => {
    const { date, startTime, endTime } = appointment;
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  return (
    <React.Fragment>
      <Popover
        trigger="click"
        placement="left"
        title="Blocked Time"
        content={
          <div>
            <Button onClick={handleUnblock} style={{ marginRight: "1rem" }}>
              Unblock
            </Button>
            <Button onClick={handleEdit} type="primary">
              Edit
            </Button>
          </div>
        }
      >
        <Card
          loading={loading}
          hoverable
          bordered={props.bordered}
          style={{
            padding: 0,
            borderRadius: 5,
            marginBottom: 10,
            marginLeft: 5,
            borderColor: `${isSelected ? "#1180ff" : null}`,
          }}
          bodyStyle={{
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="left-col">
              <div
                style={{
                  textOverflow: "elipsis",
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 10,
                  }}
                >
                  {appointment.service.name}
                </p>
                <div>
                  <div style={{ display: "flex" }}>
                    <ContactsOutlined style={{ fontSize: 12 }} />
                    <Typography.Text
                      type="secondary"
                      style={{
                        marginLeft: 10,
                        fontSize: 12,
                        textOverflow: "elipsis",
                      }}
                    >
                      {employee?.firstName} {employee?.lastName}
                    </Typography.Text>
                  </div>
                </div>
                <div>
                  <ClockCircleOutlined style={{ fontSize: 12 }} />
                  <Typography.Text
                    type="secondary"
                    style={{ marginLeft: 10, fontSize: 12 }}
                  >
                    {renderDateAndTime()}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              ></div>
            </div>
          </div>
        </Card>
      </Popover>
      {props.divider ? <Divider /> : null}
    </React.Fragment>
  );
}
