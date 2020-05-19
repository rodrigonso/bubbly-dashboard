import React, { useState } from "react";
import { Modal, Select } from "antd";
import CustomForm from "../../common/CustomForm";
import StatusPicker from "../../common/StatusPicker";
import { updateAppointmentStatus } from "../../../services/db_service";

export default function UpdateStatusModal(props) {
  const [status, setStatus] = useState(props.currentStatus);
  const fields = [
    {
      name: "status",
      label: "Status",
      component: (
        <StatusPicker
          onChange={setStatus}
          defaultStatus={props.currentStatus}
        />
      ),
    },
  ];

  return (
    <Modal
      okButtonProps={{ shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
      confirmLoading={props.loading}
      visible={props.visible}
      onOk={() => props.onOk(status)}
      onCancel={props.onCancel}
      title="Update Status"
    >
      <CustomForm fields={fields} />
    </Modal>
  );
}
