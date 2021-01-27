import React, { useState } from "react";
import { Modal, Divider, Checkbox, message, Typography, Form } from "antd";
import ServicePicker from "../../common/ServicePicker";
import CustomForm from "../../common/CustomForm";
import VehicleTypePicker from "../../common/VehicleTypePicker";
import TimeRangePicker from "../../common/TimeRangePicker";
import DatePicker from "../../common/DatePicker";
import CustomerPicker from "../../common/CustomerPicker";
import UserContactInfo from "../../common/UserContactInfo";
import UpgradesPicker from "../../common/UpgradesPicker";
import CustomerVehiclePicker from "../../common/CustomerVehiclePicker";
import CustomerAddressPicker from "../../common/CustomerAddressPicker";
import PaymentDetails from "../../common/PaymentDetails";
import Customer from "../../../models/Customer";
import EmployeePicker from "../../common/EmployeePicker";
import Address from "../../../models/Address";
import { ScheduleApi } from "../../../api/scheduleApi";

export default function NewAppointmentModal(props) {
  const { selectedDate, visible, onCancel, onOk } = props;
  const [type, setType] = useState("sedan");
  const [service, setService] = useState(null);
  const [upgrades, setUpgrades] = useState([]);
  const [range, setRange] = useState([]);
  const [date, setDate] = useState(selectedDate ?? null);
  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("NOT_PAID");
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [detailer, setDetailer] = useState(null);

  const handleServiceSelection = (item) => {
    setService(item);
    setDuration(item.duration);
    setPayment({ subtotal: item.price, total: item.price });
  };

  const handleUpgrades = (items) => {
    var subtotal = service.price;
    var duration = service.duration;
    items.forEach((item) => {
      subtotal += item.price;
      duration += item.duration;
    });
    setUpgrades(items);
    setDuration(duration);
    setPayment({ subtotal, total: subtotal });
  };

  const handleDateChange = (date) => {
    setDate(date);
    if (range.length > 0) {
      const startTime = date.clone().set({
        hour: range[0].hours(),
        minute: range[0].minutes(),
      });
      const endTime = date.clone().set({
        hour: range[1].hours(),
        minute: range[1].minutes(),
      });
      setRange([startTime, endTime]);
    }
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

  const fields = [
    {
      name: "vehicleType",
      label: "Vehicle Type",
      component: <VehicleTypePicker onChange={setType} />,
    },
    {
      name: "service",
      label: "Service",
      component: (
        <ServicePicker type={type} onChange={handleServiceSelection} />
      ),
    },
    {
      name: "upgrades",
      label: "Upgrades",
      component: <UpgradesPicker onChange={handleUpgrades} />,
    },
    {
      name: "detailer",
      label: "Detailer",
      component: <EmployeePicker onChange={setDetailer} />,
    },
  ];

  const fields2a = [
    {
      name: "date",
      label: "Date",
      component: <DatePicker onChange={handleDateChange} />,
    },
    {
      name: "time",
      label: "Time",
      component: <TimeRangePicker onChange={handleRangeChange} />,
    },
  ];

  const fields2 = [
    {
      name: "customer",
      label: "Customer",
      component: <CustomerPicker onChange={setCustomer} />,
    },
    {
      name: "vehicle",
      label: "Vehicle",
      component: (
        <CustomerVehiclePicker
          customerId={customer?.id ?? null}
          onChange={setVehicle}
        />
      ),
    },
    {
      name: "address",
      label: "Address",
      component: (
        <CustomerAddressPicker
          customerId={customer?.id ?? null}
          onChange={setAddress}
        />
      ),
    },
  ];

  const isFormValid = () => {
    return (
      customer ||
      service ||
      date ||
      vehicle ||
      address ||
      duration ||
      range.length === 2 ||
      detailer.length > 0
    );
  };

  const handleNewAppointment = async () => {
    if (!isFormValid()) {
      message.error("All fields are required");
      return;
    }

    const appt = {
      active: false,
      userId: customer.id,
      customer: Customer.toCompactObj(customer),
      address: Address.toObject(address),
      status: "CONFIRMED",
      subtotal: service.price,
      total: service.price,
      notes: null,
      tip: 0,
      date: date.unix(),
      startTime: range[0].unix(),
      endTime: range[1].unix(),
      employeeId: detailer[0].id,
      paymentStatus,
      service,
      upgrades,
      vehicle,
      duration,
    };

    const options = {
      sendConfirmationEmail: sendEmail,
      paymentMethod: "IN_PERSON",
    };

    const order = {
      customer,
      appointments: [appt],
      status: "NOT_CONFIRMED",
      total: service.price,
      subtotal: service.price,
      tip: 0,
    };

    try {
      setLoading(true);
      // await bookNewAppointment({ options, order });
      await ScheduleApi.bookNewAppointment({ options, order });

      onOk();
      message.success("Appointment booked successfully");
    } catch (ex) {
      message.error(ex.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      destroyOnClose
      title="New Appointment"
      visible={visible}
      okButtonProps={{ loading }}
      onOk={handleNewAppointment}
      onCancel={onCancel}
    >
      <CustomForm fields={fields2} />
      {customer ? (
        <div style={{ marginLeft: "8rem" }}>
          <UserContactInfo user={customer} />
        </div>
      ) : null}
      <Divider />
      <CustomForm fields={fields} />
      <Divider />
      <CustomForm fields={fields2a} />
      <Divider />
      <div style={{ width: "75%", marginLeft: "3rem" }}>
        <PaymentDetails appointment={payment} />
      </div>
      <Divider />
      <div style={{ width: "75%", marginLeft: "3rem" }}>
        <Form>
          <Form.Item>
            <Checkbox
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
            />
            <Typography.Text style={{ marginLeft: "1rem" }}>
              Send confirmation email
            </Typography.Text>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={paymentStatus === "PAID"}
              onChange={(e) =>
                setPaymentStatus(e.target.checked ? "PAID" : "NOT_PAID")
              }
            />
            <Typography.Text style={{ marginLeft: "1rem" }}>
              Mark as paid
            </Typography.Text>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
