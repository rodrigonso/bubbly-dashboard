import React, { useState } from "react";
import {
  Modal,
  Divider,
  Input,
  Row,
  Col,
  Select,
  Checkbox,
  Switch,
} from "antd";
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
import { bookAppointment } from "../../../services/db_service";
import Customer from "../../../models/Customer";
import moment from "moment";

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
        <ServicePicker vehicleType={type} onChange={handleServiceSelection} />
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
      component: (
        <DatePicker
          defaultValue={selectedDate ? selectedDate : null}
          onChange={setDate}
        />
      ),
    },
    {
      name: "time",
      label: "Time",
      component: <TimeRangePicker onChange={setRange} />,
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
        <CustomerVehiclePicker user={customer} onChange={setVehicle} />
      ),
    },
    {
      name: "address",
      label: "Address",
      component: (
        <CustomerAddressPicker user={customer} onChange={setAddress} />
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

  const formatDate = (date) => {
    return new Date(date).getTime() / 1000;
    // return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  };

  const handleNewAppointment = async () => {
    setLoading(true);
    const appt = {
      active: false,
      paymentStatus: "NOT PAID",
      userId: customer.id,
      customer: Customer.toCompactObj(customer),
      service,
      upgrades,
      date: formatDate(date),
      vehicle,
      address: address.toObj(),
      duration,
      notes: "",
      status: "CONFIRMED",
      subtotal: service.price,
      total: service.price,
      tip: 0,
      startTime: formatDate(range[0]),
      endTime: formatDate(range[1]),
    };
    await bookAppointment(appt);
    setLoading(false);
    onOk();
  };

  return (
    <Modal
      destroyOnClose
      title="New Appointment"
      visible={visible}
      okButtonProps={{ shape: "round", loading }}
      cancelButtonProps={{ shape: "round" }}
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
