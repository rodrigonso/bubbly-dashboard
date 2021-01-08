import React, { useState } from "react";
import { Modal, Divider, Switch, message } from "antd";
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
import { bookNewAppointment } from "../../../services/functions_service";
import Address from "../../../models/Address";

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
      name: "date",
      label: "Date",
      component: <DatePicker onChange={setDate} />,
    },
    {
      name: "time",
      label: "Time",
      component: <TimeRangePicker onChange={setRange} />,
    },
    {
      name: "detailer",
      label: "Detailer",
      component: <EmployeePicker onChange={setDetailer} />,
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
        <CustomerVehiclePicker customer={customer} onChange={setVehicle} />
      ),
    },
    {
      name: "address",
      label: "Address",
      component: (
        <CustomerAddressPicker customer={customer} onChange={setAddress} />
      ),
    },
  ];

  const fields3 = [
    {
      name: "send email",
      label: "Send email",
      component: <Switch checked={sendEmail} onChange={setSendEmail} />,
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

  const formatDate = (date) => {
    return date / 1000;
  };

  const handleNewAppointment = async () => {
    if (!isFormValid()) {
      message.error("All fields are required");
      return;
    }

    const appt = {
      active: false,
      paymentStatus: "NOT PAID",
      userId: customer.id,
      customer: Customer.toCompactObj(customer),
      service,
      upgrades,
      vehicle,
      address: Address.toObject(address),
      duration,
      notes: null,
      status: "CONFIRMED",
      subtotal: service.price,
      total: service.price,
      tip: 0,
      date: formatDate(date),
      startTime: formatDate(range[0]),
      endTime: formatDate(range[1]),
      employeeId: detailer[0].id,
    };

    const options = {
      sendConfirmationEmail: sendEmail,
      paymentSource: "IN_PERSON",
    };

    const order = {
      appointments: [appt],
      customer,
      status: "NOT CONFIRMED",
      total: service.price,
      subtotal: service.price,
      tip: 0,
    };

    try {
      setLoading(true);
      await bookNewAppointment({ options, order });
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
      <div style={{ width: "75%", marginLeft: "3rem" }}>
        <PaymentDetails appointment={payment} />
      </div>
      <CustomForm fields={fields3} />
    </Modal>
  );
}
