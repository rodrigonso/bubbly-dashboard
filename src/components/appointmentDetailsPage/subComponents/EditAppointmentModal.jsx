import React, { useState } from "react";
import {
  Modal,
  Form,
  Card,
  Typography,
  Divider,
  Input,
  message,
  Image,
} from "antd";
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
import moment from "moment";
import Avatar from "antd/lib/avatar/avatar";

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

  const handleDateChange = (date) => {
    setDate(date);
    const startTime = date.clone().set({
      hour: range[0].hours(),
      minute: range[0].minutes(),
    });
    const endTime = date.clone().set({
      hour: range[1].hours(),
      minute: range[1].minutes(),
    });
    setRange([startTime, endTime]);
  };

  const handleRangeChange = (range) => {
    console.log(date.format("LLL"));
    const startTime = date.clone().set({
      hour: range[0].hours(),
      minute: range[0].minutes(),
    });
    const endTime = date.clone().set({
      hour: range[1].hours(),
      minute: range[1].minutes(),
    });
    console.log(startTime, endTime);
    setRange([startTime, endTime]);
  };

  const handleOk = async () => {
    setLoading(true);
    const obj = Appointment.toObject(appointment);

    obj.employeeId = detailer?.id ?? detailer;
    obj.service = service;
    obj.upgrades = upgrades;
    obj.vehicle = vehicle;
    obj.address = Address.toObject(address);
    obj.notes = notes;
    obj.total = Appointment.calculateTotal(obj);
    obj.subtotal = obj.total - obj.tip;
    obj.startTime = range[0].unix();
    obj.endTime = range[1].unix();
    obj.date = date.unix();

    console.log(obj);

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
        <div style={{ display: "flex" }}>
          <div style={{ borderRadius: 5 }}>
            <Image
              style={{
                borderRadius: "100%",
                objectFit: "cover",
              }}
              width="5rem"
              height="5rem"
              src={appointment.customer.photoUrl}
              placeholder
              fallback="data:image/png;base64,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"
            />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <h3 style={{ fontWeight: "bold", fontSize: 24, lineHeight: 1 }}>
              {appointment.customer.toString()}
            </h3>
            <Typography.Text>{appointment.customer.phone}</Typography.Text>
            <br />
            <Typography.Text>{appointment.customer.email}</Typography.Text>
          </div>
        </div>
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
              customerId={appointment.customer.id}
            />
          </div>
        </Form.Item>
        <Form.Item label="Detailer">
          <div style={{ width: "50%" }}>
            <EmployeePicker
              allowMultiple={false}
              onChange={setDetailer}
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
          <DatePicker onChange={handleDateChange} defaultValue={date} />
        </Form.Item>
        <Form.Item label="Time">
          <TimeRangePicker onChange={handleRangeChange} defaultValue={range} />
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
