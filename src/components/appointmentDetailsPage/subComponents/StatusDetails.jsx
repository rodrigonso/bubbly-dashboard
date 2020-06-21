import React, { useState } from "react";
import {
  Steps,
  Card,
  Row,
  Col,
  Timeline,
  Typography,
  Descriptions,
  Button,
  Badge,
  Divider,
} from "antd";
import UpdateStatusModal from "./UpdateStatusModal";
import { updateAppointmentStatus } from "../../../services/db_service";
import withModal from "../../hoc/withModal";
import {
  CheckCircleOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const { Step } = Steps;
const steps = {
  CONFIRMED: 0,
  DRIVING: 1,
  WASHING: 2,
  COMPLETED: 3,
};

const statuses = ["CONFIRMED", "DRIVING", "WASHING", "COMPLETED"];
const formatted = {
  CONFIRMED: "Confirmed",
  DRIVING: "Driving",
  WASHING: "Washing",
  COMPLETED: "Completed",
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

  return (
    <React.Fragment>
      <div style={{ width: "18rem", marginLeft: 20 }}>
        <UpdateStatusModal
          visible={visible}
          onOk={handleStatusUpdate}
          onCancel={toggleModal}
          currentStatus={props.appointment.status}
          loading={loading}
        />
        <div>
          <Row>
            <Descriptions>
              <Descriptions.Item label="Status" />
            </Descriptions>
          </Row>
          <Steps
            direction="vertical"
            progressDot
            current={statuses.indexOf(props.appointment.status)}
          >
            {statuses.map((item) => (
              <Step title={formatted[item]} />
            ))}
          </Steps>
          <Button onClick={props.toggleModal} shape="round">
            Change Status
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withModal()(StatusDetails);
