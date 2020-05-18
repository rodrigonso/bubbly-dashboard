import React, { Component } from "react";
import moment from "moment";
import { DatePicker, Modal, TimePicker, Form } from "antd";
import { rescheduleAppointment } from "../../../services/db_service";

const { RangePicker } = TimePicker;

export default class Reschedule extends Component {
  state = {
    newDate: null,
    timeRange: null,
  };

  handleRangeChange = (range, _) => {
    const [startTime, endTime] = range;
    this.setState({ timeRange: [startTime._d, endTime._d] });
  };

  formatDate = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  };

  handleOK = async () => {
    const { appointment, toggleModal } = this.props;
    const { timeRange, newDate } = this.state;

    // Add Validation logic for dates
    this.setState({ isLoading: true });
    await rescheduleAppointment(appointment.id, {
      date: this.formatDate(newDate),
      startTime: this.formatDate(timeRange[0]),
      endTime: this.formatDate(timeRange[1]),
    });
    this.setState({ isLoading: false });
    toggleModal();
    window.location.reload();
  };

  handleDateChange = (date, _, field) => {
    date._isUTC = true;
    console.log(date);
    this.setState({ [field]: date._d });
  };

  render() {
    const { isVisible, appointment, toggleModal } = this.props;
    const { newDate, timeRange, isLoading } = this.state;
    const validDate = newDate && timeRange;

    return (
      <Modal
        title="Reschedule"
        visible={isVisible}
        onOk={this.handleOK}
        okButtonProps={{ disabled: !validDate }}
        onCancel={toggleModal}
        confirmLoading={isLoading}
      >
        <Form>
          <Form.Item label="Date">
            <DatePicker
              allowClear={false}
              format="MM/DD/YYYY"
              locale
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
                moment(appointment.endTime),
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
