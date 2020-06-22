import React from "react";
import CustomForm from "../../common/CustomForm";
import WeekdayPicker from "../../common/WeekdayPicker";
import { Modal, Input, InputNumber, Divider } from "antd";
import { useState } from "react";
import VehicleTypePicker from "../../common/VehicleTypePicker";
import TextArea from "antd/lib/input/TextArea";
import { addNewService } from "../../../services/db_service";
import EmployeePicker from "../../common/EmployeePicker";
import Employee from "../../../models/Employee";
import UpgradesPicker from "../../common/UpgradesPicker";

export default function NewServiceModal(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [upgrades, setUpgrades] = useState([]);
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState("");
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState("sedan");
  const [days, setDays] = useState("");
  const [employees, setEmployees] = useState([]);

  const fields = [
    {
      name: "name",
      label: "Name",
      component: <Input onChange={(e) => setName(e.target.value)} />,
    },
    {
      name: "desc",
      label: "Description",
      component: <Input onChange={(e) => setDesc(e.target.value)} />,
    },
    {
      name: "details",
      label: "Details",
      component: <TextArea onChange={(e) => setDetails(e.target.value)} />,
    },
    {
      name: "upgrades",
      label: "Upgrades",
      component: <UpgradesPicker onChange={setUpgrades} />,
    },
  ];

  const fields2 = [
    {
      name: "vehicleType",
      label: "Vehicle Type",
      component: <VehicleTypePicker onChange={setType} />,
    },
    {
      name: "price",
      label: "Price",
      component: (
        <InputNumber
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          onChange={setPrice}
        />
      ),
    },
    {
      name: "duration",
      label: "Duration",
      component: (
        <InputNumber
          formatter={(value) => `${value} hrs`}
          step={0.25}
          parser={(value) => value.replace(" hrs", "")}
          onChange={setDuration}
        />
      ),
    },
  ];

  const fields3 = [
    {
      name: "days",
      label: "Days",
      component: <WeekdayPicker onChange={setDays} />,
    },
    {
      name: "employees",
      label: "Employees",
      component: <EmployeePicker onChange={setEmployees} />,
    },
  ];

  const formatSchedule = () => {
    var obj = {};
    obj.days = days;
    obj.employees = employees.map((item) => Employee.toObj(item));
    obj.startTime = 10;
    obj.endTime = 16;
    return obj;
  };

  const formatDetails = () => {
    return details.split(",");
  };

  const handleOk = async () => {
    setLoading(true);
    const service = {
      name,
      desc,
      duration,
      price,
      type,
      upgrades,
      details: formatDetails(),
      schedule: formatSchedule(),
    };
    await addNewService(service);
    setLoading(false);
    props.onOk();
  };

  return (
    <Modal
      okButtonProps={{ shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      title="New Service"
    >
      <CustomForm fields={fields} />
      <Divider />
      <CustomForm fields={fields2} />
      <Divider />
      <CustomForm fields={fields3} />
    </Modal>
  );
}
