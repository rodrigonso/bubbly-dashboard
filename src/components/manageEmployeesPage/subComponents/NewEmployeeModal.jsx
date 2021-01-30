import React from "react";
import CustomForm from "../../common/CustomForm";
import { Modal, Input } from "antd";
import { useState } from "react";
import { createNewEmployee } from "../../../services/functions_service";

import EmployeeRolePicker from "../../common/EmployeeRolePicker";
import { EmployeeApi } from "../../../api/employeeApi";

export default function NewEmployeeModal({ onOk, onCancel, visible }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const fields = [
    {
      name: "firstName",
      label: "First Name",
      component: <Input onChange={(e) => setFirstName(e.target.value)} />,
    },
    {
      name: "lastName",
      label: "Last Name",
      component: <Input onChange={(e) => setLastName(e.target.value)} />,
    },
    {
      name: "email",
      label: "Email",
      component: <Input onChange={(e) => setEmail(e.target.value)} />,
    },
    {
      name: "phone",
      label: "Phone Number",
      component: <Input onChange={(e) => setPhone(e.target.value)} />,
    },
    {
      name: "role",
      label: "Role",
      component: <EmployeeRolePicker onChange={setRole} />,
    },
  ];

  const handleOk = async () => {
    try {
      setLoading(true);
      const employee = {
        firstName,
        lastName,
        email,
        phone,
        role,
      };
      console.log(employee);
      await EmployeeApi.createNewEmployee(employee);
      onOk();
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      okButtonProps={{ shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      title="New Employee"
    >
      <CustomForm fields={fields} />
    </Modal>
  );
}
