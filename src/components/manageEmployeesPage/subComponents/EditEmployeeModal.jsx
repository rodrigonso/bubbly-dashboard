import React, { useState } from "react";
import { Modal, Input, Divider } from "antd";
import CustomForm from "../../common/CustomForm";
import { updateEmployeeDetailsWithId } from "../../../services/db_service";
import EmployeeRolePicker from "../../common/EmployeeRolePicker";

export default function EditEmployeeModal(props) {
  console.log(props);

  const { employee } = props;
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone);
  const [role, setRole] = useState(employee.role);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "firstName",
      label: "First Name",
      component: (
        <Input
          defaultValue={employee?.firstName ?? ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
      ),
    },
    {
      name: "lastName",
      label: "Last Name",
      component: (
        <Input
          defaultValue={employee?.lastName ?? ""}
          onChange={(e) => setLastName(e.target.value)}
        />
      ),
    },
    {
      name: "email",
      label: "Email",
      component: (
        <Input
          defaultValue={employee?.email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
        />
      ),
    },
    {
      name: "phone",
      label: "Phone Number",
      component: (
        <Input
          defaultValue={employee?.phone ?? ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      ),
    },
    {
      name: "role",
      label: "Role",
      component: (
        <EmployeeRolePicker
          defaultValue={employee?.role ?? ""}
          onChange={setRole}
        />
      ),
    },
  ];

  const handleEmployeeUpdate = async () => {
    setLoading(true);
    try {
      await updateEmployeeDetailsWithId(props.employee.id, {
        firstName,
        lastName,
        email,
        phone,
        role,
      });
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
    props.onOk();
  };

  return (
    <Modal
      destroyOnClose
      visible={props.visible}
      confirmLoading={loading}
      onCancel={props.onCancel}
      onOk={handleEmployeeUpdate}
      title="Edit Employee"
      okButtonProps={{ shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
    >
      <CustomForm fields={fields} />
    </Modal>
  );
}
