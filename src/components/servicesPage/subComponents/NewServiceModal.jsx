import React from "react";
import CustomForm from "../../common/CustomForm";
import { Modal, Input, InputNumber, Divider } from "antd";
import { useState } from "react";
import VehicleTypePicker from "../../common/VehicleTypePicker";
import TextArea from "antd/lib/input/TextArea";
import { addNewService } from "../../../services/db_service";
import EmployeePicker from "../../common/EmployeePicker";
import UpgradesPicker from "../../common/UpgradesPicker";
import Employee from "../../../models/Employee";

export default function NewServiceModal(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [upgrades, setUpgrades] = useState([]);
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState("");
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState("sedan");
  const [detailers, setDetailers] = useState([]);

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
      name: "detailers",
      label: "Detailers",
      component: <EmployeePicker onChange={setDetailers} />,
    },
  ];

  const formatDetails = () => {
    return details.split(",");
  };

  const formatDetailers = () => {
    return detailers.map((item) => Employee.toCompactObj(item));
  };

  const handleOk = async () => {
    console.log(formatDetailers());
    const service = {
      name,
      desc,
      duration,
      price,
      type,
      upgrades,
      detailers: formatDetailers(),
      details: formatDetails(),
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
