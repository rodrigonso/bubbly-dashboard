import React from "react";
import CustomForm from "../../common/CustomForm";
import { Modal, Input, InputNumber } from "antd";
import { useState } from "react";
import { addNewUpgrade } from "../../../services/db_service";

export default function NewUpgradeModal(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const handleOk = async () => {
    setLoading(true);
    await addNewUpgrade({ name, desc, duration, price });
    setLoading(false);
    props.onOk();
  };

  return (
    <Modal
      visible={props.modal}
      onCancel={props.onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      title="New Upgrade"
    >
      <CustomForm fields={fields} />
    </Modal>
  );
}
