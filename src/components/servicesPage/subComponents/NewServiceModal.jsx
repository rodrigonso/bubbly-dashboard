import React from "react";
import CustomForm from "../../common/CustomForm";
import WeekdayPicker from "../../common/WeekdayPicker";
import { Modal, Select, Input, InputNumber } from "antd";
import { useState } from "react";
import VehicleTypePicker from "../../common/VehicleTypePicker";
import TextArea from "antd/lib/input/TextArea";
import { addNewService } from "../../../services/db_service";

export default function NewServiceModal(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState("");
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState("");
  const [schedule, setSchedule] = useState("");

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
    {
      name: "vehicleType",
      label: "Vehicle Type",
      component: <VehicleTypePicker onChange={setType} />,
    },
    {
      name: "schedule",
      label: "Schedule",
      component: <WeekdayPicker onChange={setSchedule} />,
    },
  ];

  const formatSchedule = () => {
    var obj = {};
    const times = [10, 16];
    for (const key of schedule) {
      obj[key] = [{ startTime: times[0], endTime: times[1] }];
    }
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
      details: formatDetails(),
      schedule: formatSchedule(),
    };
    await addNewService(service);
    setLoading(false);
  };

  return (
    <Modal
      visible={props.modal}
      onCancel={props.onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      title="New Service"
    >
      <CustomForm fields={fields} />
    </Modal>
  );
}
