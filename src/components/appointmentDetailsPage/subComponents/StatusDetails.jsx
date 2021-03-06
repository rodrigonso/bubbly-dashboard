import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Steps, Button, message } from "antd";
import UpdateStatusModal from "./UpdateStatusModal";
import { updateAppointmentById } from "../../../services/db_service";
import withModal from "../../hoc/withModal";

const { Step } = Steps;

const statuses = ["CONFIRMED", "DRIVING", "WASHING", "COMPLETED"];
const formatted = {
  CONFIRMED: "Confirmed",
  DRIVING: "Driving",
  WASHING: "Washing",
  COMPLETED: "Completed",
};

function StatusDetails(props) {
  const { visible, toggleModal, appointment, fetchAppointment } = props;
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (status) => {
    var isActive = status !== "CONFIRMED" && status !== "COMPLETED";
    setLoading(true);
    try {
      await updateAppointmentById(appointment.id, {
        status,
        active: isActive,
      });
      toggleModal();
      message.success("Appointment status updated successfully");
      await fetchAppointment();
    } catch (ex) {
      message.error(ex.message);
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
      <div style={{ width: "18rem" }}>
        <UpdateStatusModal
          visible={visible}
          onOk={handleStatusUpdate}
          onCancel={toggleModal}
          currentStatus={appointment.status}
          loading={loading}
        />
        <div>
          <h4 style={{ fontWeight: "bold", marginBottom: 10 }}>
            Appointment Status
          </h4>
          <Steps
            direction="vertical"
            progressDot
            current={statuses.indexOf(appointment.status)}
          >
            {statuses.map((item) => (
              <Step title={formatted[item]} />
            ))}
          </Steps>
          <Button onClick={props.toggleModal}>Update Status</Button>
          <Link
            to={{
              pathname: `/track/${appointment.id}`,
              state: { appointmentId: appointment.id },
            }}
          >
            <Button
              disabled={!props.appointment.active}
              onClick={() =>
                props.history.push({
                  pathname: `overview/${props.appointment.id}`,
                  state: { appointmentId: props.appointment.id },
                })
              }
              style={{ marginLeft: "0.5rem" }}
            >
              Track
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(withModal()(StatusDetails));
