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
  DatePicker,
  Tag,
  Statistic,
  Divider,
  Row,
  Col
} from "antd";
import {
  getAppointmentUpdates,
  cancelAppointment,
  rescheduleAppointment
} from "../../services/db_service";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

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

    this.toggleBusy("updating");
    const updates = await getAppointmentUpdates(id);
    this.toggleBusy("updating");
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
      updating,
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
            allowClear={false}
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
          <div>
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
              <Descriptions.Item label="Upgrades">
                {appointment.upgrades.map(item => (
                  <Tag closable>{item.name}</Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
            <div style={{ margin: "40px 0px 50px 0px" }}>
              <Row gutter={20}>
                <Col>
                  <Statistic
                    title="Total"
                    value={appointment.total}
                    prefix="$"
                    valueStyle={{ fontSize: 26 }}
                  />
                </Col>
                <Col>
                  <Divider type="vertical" style={{ height: "100%" }} />
                </Col>
                <Col>
                  <Statistic
                    title="Subtotal"
                    value={appointment.subtotal}
                    prefix="$"
                    valueStyle={{ fontSize: 26 }}
                  />
                </Col>
                <Col>
                  <Divider type="vertical" style={{ height: "100%" }} />
                </Col>
                <Col>
                  <Statistic
                    title="Tip"
                    value={appointment.tip}
                    prefix="$"
                    valueStyle={{ fontSize: 26 }}
                  />
                </Col>
              </Row>
              <br />
              <Tag color="#108ee9">Paid Online</Tag>
            </div>
            <div style={{ width: "60%" }}>
              <p>Updates:</p>
              <Steps size="small" current={current} status={appointment.status}>
                <Steps.Step title="Confirmed" />
                <Steps.Step title="Driving" />
                <Steps.Step title="Washing" />
                <Steps.Step title="Completed" />
              </Steps>
            </div>
          </div>
        </Card>
      </BasicPage>
    );
  }
}
