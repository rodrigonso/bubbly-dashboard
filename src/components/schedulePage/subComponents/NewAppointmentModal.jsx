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
import { MobileOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import UserContactInfo from "../../common/UserContactInfo";
import UpgradesPicker from "../../common/UpgradesPicker";
import UserVehiclePicker from "../../common/UserVehiclePicker";
import Appointment from "../../../models/Appointment";
import UserAddressPicker from "../../common/UserAddressPicker";
import PaymentDetails from "../../common/PaymentDetails";
import { bookAppointment } from "../../../services/db_service";

export default function NewAppointmentModal(props) {
  const [type, setType] = useState("sedan");
  const [service, setService] = useState(null);
  const [upgrades, setUpgrades] = useState([]);
  const [range, setRange] = useState([]);
  const [date, setDate] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [userVehicle, setUserVehicle] = useState(null);
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
      component: <DatePicker onChange={setDate} />,
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
        <UserVehiclePicker user={customer} onChange={setUserVehicle} />
      ),
    },
    {
      name: "address",
      label: "Address",
      component: <UserAddressPicker user={customer} onChange={setAddress} />,
    },
  ];

  const fields3 = [
    {
      name: "send email",
      label: "Send email",
      component: <Switch checked={sendEmail} onChange={setSendEmail} />,
    },
  ];

  const handleNewAppointment = async () => {
    setLoading(true);
    const appt = {
      userId: customer.id,
      charge: { payment: { status: "NOT PAID" } },
      service,
      upgrades,
      date,
      userVehicle,
      address: address.toObj(),
      duration,
      notes: "",
      status: "CONFIRMED",
      subtotal: service.price,
      total: service.price,
      tip: 0,
      startTime: range[0],
      endTime: range[1],
    };
    await bookAppointment(appt);
    setLoading(false);
    props.onOk();
  };

  return (
    <Modal
      destroyOnClose
      title="New Appointment"
      visible={props.visible}
      okButtonProps={{ shape: "round", loading }}
      cancelButtonProps={{ shape: "round" }}
      onOk={handleNewAppointment}
      onCancel={props.onCancel}
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
