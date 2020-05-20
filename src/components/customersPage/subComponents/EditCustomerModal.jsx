import React, { useState } from "react";
import { Modal, Input, Divider } from "antd";
import CustomForm from "../../common/CustomForm";
import { updateCustomerDetailsWithId } from "../../../services/db_service";

export default function EditCustomerModal(props) {
  const { customer } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "firstName",
      label: "First Name",
      component: (
        <Input
          defaultValue={customer?.firstName ?? ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
      ),
    },
    {
      name: "lastName",
      label: "Last Name",
      component: (
        <Input
          defaultValue={customer?.lastName ?? ""}
          onChange={(e) => setLastName(e.target.value)}
        />
      ),
    },
    {
      name: "email",
      label: "Email",
      component: (
        <Input
          defaultValue={customer?.email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      ),
    },
    {
      name: "phone",
      label: "Phone Number",
      component: (
        <Input
          defaultValue={customer?.phone ?? ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      ),
    },
  ];
  const handleCustomerUpdate = async () => {
    setLoading(true);
    await updateCustomerDetailsWithId(props.customer.id, {
      firstName,
      lastName,
      email,
      phone,
    });
    setLoading(false);
    props.onOk();
  };

  return (
    <Modal
      destroyOnClose
      visible={props.visible}
      confirmLoading={loading}
      onCancel={props.onCancel}
      onOk={handleCustomerUpdate}
      title="Edit Customer"
      okButtonProps={{ shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
    >
      <CustomForm fields={fields} />
    </Modal>
  );
}
