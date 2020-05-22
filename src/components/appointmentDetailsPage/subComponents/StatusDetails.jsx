import React, { useState } from "react";
import { Steps, Card } from "antd";
import UpdateStatusModal from "./UpdateStatusModal";
import { updateAppointmentStatus } from "../../../services/db_service";
import withModal from "../../hoc/withModal";

const { Step } = Steps;
const steps = {
  CONFIRMED: 0,
  DRIVING: 1,
  WASHING: 2,
  COMPLETED: 3,
};

function StatusDetails(props) {
  const { visible, toggleModal, appointment } = props;
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (status) => {
    var isActive = status !== "CONFIRMED";
    setLoading(true);
    await updateAppointmentStatus(props.appointment.id, {
      status,
      active: isActive,
    });
    setLoading(false);
    toggleModal();
  };

  console.log(appointment.status);
  return (
    <React.Fragment>
      <UpdateStatusModal
        visible={visible}
        onOk={handleStatusUpdate}
        onCancel={toggleModal}
        currentStatus={appointment.status.status}
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

export default withModal()(StatusDetails);
