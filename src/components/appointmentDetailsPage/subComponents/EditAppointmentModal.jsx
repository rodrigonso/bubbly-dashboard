import React, { useState } from "react";
import { Modal, Form, Card, Typography, Divider, Input } from "antd";
import ServicePicker from "../../common/ServicePicker";
import UpgradesPicker from "../../common/UpgradesPicker";
import CustomerVehiclePicker from "../../common/CustomerVehiclePicker";
import CustomerAddressPicker from "../../common/CustomerAddressPicker";

export default function EditAppointmentModal(props) {
  const { handleSave, handleCancel, loading, visible, appointment } = props;

  const [service, setService] = useState(appointment.service);
  const [upgrades, setUpgrades] = useState(appointment.upgrades);
  const [vehicle, setVehicle] = useState(appointment.vehicle);
  const [address, setAddress] = useState(appointment.address);
  const [notes, setNotes] = useState(appointment.notes);

  const handleVehicleChange = (vehicle) => {
    //reset the select vehicle to reflect the possible change in vehicle type
    setService(null);
    setVehicle(vehicle);
  };

  return (
    <Modal
      destroyOnClose
      title="Edit Appointment"
      visible={visible}
      onOk={handleSave}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Card
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
          <CustomerVehiclePicker
            defaultValue={vehicle.id}
            onChange={handleVehicleChange}
            customer={appointment.customer}
          />
        </Form.Item>
        <Form.Item label="Service">
          <ServicePicker
            onChange={setService}
            defaultService={service?.id ?? null}
            type={vehicle.type}
          />
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
    </Modal>
  );
}
