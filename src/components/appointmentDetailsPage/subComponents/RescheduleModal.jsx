import React, { Component } from "react";
import moment from "moment";
import { Modal, TimePicker, Form } from "antd";
import { rescheduleAppointment } from "../../../services/db_service";
import TimeRangePicker from "../../common/TimeRangePicker";
import DatePicker from "../../common/DatePicker";

export default class RescheduleModal extends Component {
  state = {
    newDate: null,
    timeRange: null,
  };

  handleRangeChange = (range, _) => {
    this.setState({ timeRange: range });
  };

  handleDateChange = (date, _) => {
    this.setState({ newDate: date });
  };

  handleOK = async () => {
    const { appointment, onOk } = this.props;
    const { timeRange, newDate } = this.state;

    // Add Validation logic for dates
    this.setState({ isLoading: true });
    await rescheduleAppointment(appointment.id, {
      date: this.formatDate(newDate),
      startTime: timeRange[0],
      endTime: timeRange[1],
    });
    this.setState({ isLoading: false });
    onOk();
  };

  render() {
    const { isVisible, onCancel, onOk } = this.props;
    const { newDate, timeRange, isLoading } = this.state;
    const validDate = newDate && timeRange;

    return (
      <Modal
        okButtonProps={{ shape: "round", disabled: !validDate }}
        cancelButtonProps={{ shape: "round" }}
        title="Reschedule"
        visible={isVisible}
        onOk={this.handleOK}
        onCancel={onCancel}
        confirmLoading={onOk}
      >
        <Form>
          <Form.Item label="Date">
            <DatePicker onChange={this.handleDateChange} />
          </Form.Item>
          <Form.Item label="Time">
            <TimeRangePicker onChange={this.handleRangeChange} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
