import React, { Component } from "react";
import moment from "moment";
import { DatePicker, Modal, TimePicker, Form } from "antd";
import { rescheduleAppointment } from "../../../services/db_service";

const { RangePicker } = TimePicker;

export default class Reschedule extends Component {
  state = {
    newDate: null,
    timeRange: null
  };

  handleRangeChange = (range, _) => {
    const [startTime, endTime] = range;
    this.setState({ timeRange: [startTime._d, endTime._d] });
  };

  formatTimeRange = (timeRange, newDate) => {
    const d = newDate.getDate();
    const m = newDate.getMonth();
    const y = newDate.getFullYear();
    let [startTime, endTime] = timeRange;

    return [
      new Date(
        y,
        m,
        d,
        startTime.getHours(),
        startTime.getMinutes()
      ).toISOString(),
      new Date(y, m, d, endTime.getHours(), endTime.getMinutes()).toISOString()
    ];
  };

  handleOK = async () => {
    const { appointment, toggleModal } = this.props;
    const { timeRange, newDate } = this.state;

    // Add Validation logic for dates
    const [startTime, endTime] = this.formatTimeRange(timeRange, newDate);

    await rescheduleAppointment(appointment.id, {
      date: newDate.toISOString(),
      startTime,
      endTime
    });

    toggleModal();
  };

  handleDateChange = (date, _, field) => {
    console.log(date);
    this.setState({ [field]: date._d });
  };

  render() {
    const { isVisible, appointment, toggleModal } = this.props;
    const { newDate, timeRange } = this.state;
    const validDate = newDate && timeRange;

    return (
      <Modal
        title="Reschedule"
        visible={isVisible}
        onOk={this.handleOK}
        okButtonProps={{ disabled: !validDate }}
        onCancel={toggleModal}
      >
        <Form>
          <Form.Item label="Date">
            <DatePicker
              allowClear={false}
              onChange={(date, _) => this.handleDateChange(date, _, "newDate")}
              defaultValue={moment(appointment.date)}
            />
          </Form.Item>
          <Form.Item label="Time">
            <RangePicker
              format="hh:mm A"
              minuteStep={15}
              use12Hours
              onChange={this.handleRangeChange}
              defaultValue={[
                moment(appointment.startTime),
                moment(appointment.endTime)
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
