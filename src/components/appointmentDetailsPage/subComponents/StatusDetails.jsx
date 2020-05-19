import React, { useState } from "react";
import { Steps, Card } from "antd";
import UpdateStatusModal from "./UpdateStatusModal";
import { updateAppointmentStatus } from "../../../services/db_service";

const { Step } = Steps;
const steps = {
  CONFIRMED: 0,
  DRIVING: 1,
  WASHING: 2,
  COMPLETED: 3,
};

export default function StatusDetails(props) {
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (status) => {
    setLoading(true);
    await updateAppointmentStatus(props.appointment.id, status);
    setLoading(false);
    toggleModal();
  };

  const { appointment, toggleModal, modalVisible } = props;
  return (
    <React.Fragment>
      <UpdateStatusModal
        visible={modalVisible}
        onOk={handleStatusUpdate}
        onCancel={toggleModal}
        currentStatus={appointment.status}
        loading={loading}
      />
      <div style={{ width: "60%" }}>
        <p>Status:</p>
        <Card
          bordered={false}
          hoverable
          bodyStyle={{ padding: "10px 10px 10px 10px" }}
          onClick={toggleModal}
        >
          <Steps size="small" current={steps[appointment.status]}>
            <Step title="Confirmed" />
            <Step title="Driving" />
            <Step title="Washing" />
            <Step title="Completed" />
          </Steps>
        </Card>
      </div>
    </React.Fragment>
  );
}
