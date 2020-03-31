import React, { Component } from "react";
import BasicPage from "../common/BasicPage";
import {
  PageHeader,
  Card,
  Descriptions,
  Button,
  Steps,
  Modal,
  TimePicker,
  DatePicker
} from "antd";
import {
  getAppointmentUpdates,
  cancelAppointment,
  rescheduleAppointment
} from "../../services/db_service";
import moment from "moment";

const { RangePicker } = TimePicker;

export default class AppointmentDetails extends Component {
  state = {
    updates: [],
    action: {},
    modal: false,
    newDate: null,
    timeRange: null
  };

  componentDidMount = async () => {
    const { id } = this.props.location.state.appointment;
    const updates = await getAppointmentUpdates(id);
    this.setState({ updates });
  };

  toggleBusy = action => {
    this.setState({ [action]: !this.state[action] });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleCancel = async () => {
    const { id } = this.props.location.state.appointment;
    this.toggleBusy("cancel");
    await cancelAppointment(id);
    this.toggleBusy("cancel");
    this.props.history.goBack();
  };

  handleOK = async () => {
    const { id } = this.props.location.state.appointment;
    const { timeRange, newDate } = this.state;

    this.toggleBusy("reschedule");
    const day = newDate.getDate();
    const [startTime, endTime] = timeRange;

    startTime.setDate(day);
    endTime.setDate(day);

    await rescheduleAppointment(id, {
      date: newDate.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    });

    this.toggleBusy("reschedule");
    this.toggleModal();
  };

  handleDateChange = (date, _, field) => {
    console.log(date);
    this.setState({ [field]: date._d });
  };

  handleRangeChange = (range, _) => {
    const [startTime, endTime] = range;
    this.setState({ timeRange: [startTime._d, endTime._d] });
  };

  render() {
    const { appointment } = this.props.location.state;
    const {
      updates,
      reschedule,
      cancel,
      modal,
      newDate,
      timeRange
    } = this.state;

    const current = updates.length - 1;
    const validDate = newDate && timeRange;
    return (
      <BasicPage>
        <Modal
          title="Reschedule"
          visible={modal}
          onOk={this.handleOK}
          okButtonProps={{ disabled: !validDate, loading: reschedule }}
          onCancel={this.toggleModal}
        >
          <DatePicker
            onChange={(date, _) => this.handleDateChange(date, _, "newDate")}
            defaultValue={moment(appointment.date)}
          />

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
        </Modal>
        <PageHeader
          style={{ padding: "0px 0px 20px 0px" }}
          className="site-page-header"
          title={appointment.service.name}
          onBack={() => this.props.history.goBack()}
          extra={[
            <Button key="reschedule" onClick={this.toggleModal}>
              Reschedule
            </Button>,
            <Button
              key="cancel"
              type="danger"
              loading={cancel}
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          ]}
        />
        <Card>
          <Descriptions column={1}>
            <Descriptions.Item label="Time">
              {moment(appointment.startTime).format("LT")} -{" "}
              {moment(appointment.endTime).format("LT")}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {moment(appointment.date).format("LL")}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {appointment.address.street}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle">
              {appointment.vehicle.make} {appointment.vehicle.model}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ width: "50%" }}>
            <p>Updates:</p>
            <Steps size="small" current={current}>
              {updates.map(item => (
                <Steps.Step key={item.status} title={item.status} />
              ))}
            </Steps>
          </div>
        </Card>
      </BasicPage>
    );
  }
}
