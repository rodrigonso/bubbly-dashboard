import React, { useState } from "react";
import { Input } from "antd";
import FormModal from "../../common/FormModal";
import { updateCustomerDetailsWithId } from "../../../services/db_service";

function EditCustomerModal(props) {
  const { customer, visible, onCancel, onOk } = props;
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [loading, setLoading] = useState(false);

  const sections = [
    [
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
    ],
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
    onOk();
  };

  return (
    <FormModal
      sections={sections}
      visible={visible}
      loading={loading}
      onCancel={onCancel}
      onOk={handleCustomerUpdate}
      title="Edit Customer"
    />
  );
}

export default EditCustomerModal;
