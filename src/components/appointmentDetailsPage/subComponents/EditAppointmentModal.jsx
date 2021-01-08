import React, { useState } from "react";
import { Modal, Form, Card, Typography, Divider, Input, message } from "antd";
import ServicePicker from "../../common/ServicePicker";
import UpgradesPicker from "../../common/UpgradesPicker";
import CustomerVehiclePicker from "../../common/CustomerVehiclePicker";
import CustomerAddressPicker from "../../common/CustomerAddressPicker";
import EmployeePicker from "../../common/EmployeePicker";
import PaymentDetails from "../../common/PaymentDetails";
import Appointment from "../../../models/Appointment";
import { updateAppointmentById } from "../../../services/db_service";
import Address from "../../../models/Address";
import { withRouter } from "react-router-dom";
import DatePicker from "../../common/DatePicker";
import TimeRangePicker from "../../common/TimeRangePicker";

function EditAppointmentModal(props) {
  const { onSave, onCancel, visible, appointment } = props;

  const [loading, setLoading] = useState(false);
  const [detailer, setDetailer] = useState(appointment.employeeId);
  const [service, setService] = useState(appointment.service);
  const [upgrades, setUpgrades] = useState(appointment.upgrades);
  const [vehicle, setVehicle] = useState(appointment.vehicle);
  const [address, setAddress] = useState(appointment.address);
  const [notes, setNotes] = useState(appointment.notes);
  const [range, setRange] = useState([
    appointment.startTime,
    appointment.endTime,
  ]);
  const [date, setDate] = useState(appointment.date);

  const handleVehicleChange = (vehicle) => {
    // reset the select vehicle to reflect the possible change in vehicle type
    setService(null);
    setVehicle(vehicle);
  };

  const handleDetailerChange = (detailer) => {
    setDetailer(detailer.id);
  };

  const handleOk = async () => {
    setLoading(true);
    const obj = Appointment.toObject(appointment);
    obj.employeeId = detailer;
    obj.service = service;
    obj.upgrades = upgrades;
    obj.vehicle = vehicle;
    obj.address = Address.toObject(address);
    obj.notes = notes;
    obj.total = Appointment.calculateTotal(obj);
    obj.subtotal = obj.total - obj.tip;
    obj.startTime = range[0] / 1000;
    obj.endTime = range[1] / 1000;
    obj.date = date / 1000;

    try {
      await updateAppointmentById(obj.id, obj);
      onSave();
      message.success("Appointment updated with success!");
    } catch (ex) {
      console.log(ex);
      message.error("Something went wrong: ", ex.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      destroyOnClose
      title="Edit Appointment"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okButtonProps={{ loading: loading }}
    >
      <Card
        onClick={() =>
          props.history.replace({
            pathname: `/customers/${appointment.customer.id}`,
            state: appointment.customer.id,
          })
        }
        hoverable
        style={{ borderRadius: 5 }}
        bodyStyle={{ padding: "1rem" }}
      >
        <h3 style={{ fontWeight: "bold" }}>
          {appointment.customer.toString()}
        </h3>
        <Typography.Text>{appointment.customer.phone}</Typography.Text>
        <br />
        <Typography.Text>{appointment.customer.email}</Typography.Text>
      </Card>
      <Divider />
      <Form>
        <h4 style={{ fontWeight: "bold" }}>Service Info</h4>
        <br />
        <Form.Item label="Vehicle">
          <div style={{ width: "50%" }}>
            <CustomerVehiclePicker
              defaultValue={vehicle.id}
              onChange={handleVehicleChange}
              customer={appointment.customer}
            />
          </div>
        </Form.Item>
        <Form.Item label="Detailer">
          <div style={{ width: "50%" }}>
            <EmployeePicker
              onChange={handleDetailerChange}
              defaultValue={appointment.employeeId}
            />
          </div>
        </Form.Item>
        <Form.Item label="Service">
          <div style={{ width: "50%" }}>
            <ServicePicker
              onChange={setService}
              defaultService={service?.id ?? null}
              type={vehicle.type}
            />
          </div>
        </Form.Item>
        <Form.Item label="Upgrades">
          <UpgradesPicker
            onChange={setUpgrades}
            defaultValue={upgrades.map((item) => item.id)}
          />
        </Form.Item>
      </Form>
      <Divider />
      <Form>
        <h4 style={{ fontWeight: "bold" }}>Date and Time</h4>
        <br />
        <Form.Item label="Date">
          <DatePicker onChange={setDate} defaultValue={date} />
        </Form.Item>
        <Form.Item label="Time">
          <TimeRangePicker onChange={setRange} defaultValue={range} />
        </Form.Item>
      </Form>
      <Divider />
      <Form>
        <h4 style={{ fontWeight: "bold" }}>Address Info</h4>
        <br />
        <Form.Item label="Address">
          <CustomerAddressPicker
            onChange={setAddress}
            defaultValue={address.id}
            customer={appointment.customer}
          />
        </Form.Item>
        <Form.Item label="Notes">
          <Input.TextArea
            defaultValue={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Divider />
      <h4 style={{ fontWeight: "bold" }}>Payment Info</h4>
      <br />
      <PaymentDetails appointment={appointment} />
    </Modal>
  );
}

export default withRouter(EditAppointmentModal);
