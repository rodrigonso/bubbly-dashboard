import React, { useState, useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { Card, Skeleton, Divider, message } from "antd";

import {
  getAppointmentById,
  cancelAppointmentById,
} from "../../services/db_service";

import RescheduleModal from "./subComponents/RescheduleModal";
import BasicDetails from "./subComponents/BasicDetails";
import PaymentDetails from "../common//PaymentDetails";
import StatusDetails from "./subComponents/StatusDetails";
import Actions from "./subComponents/Actions";
import withModal from "../hoc/withModal";
import EditAppointmentModal from "./subComponents/EditAppointmentModal";

function AppointmentDetailsPage(props) {
  const { state: appointmentId } = props.location;
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [mode, setMode] = useState("edit");

  useEffect(() => {
    getAppointmentById(appointmentId).then((appt) => {
      setLoading(true);
      setAppointment(appt);
      setLoading(false);
    });
  }, [appointmentId]);

  const fetchAppointment = async () => {
    setLoading(true);
    const appt = await getAppointmentById(appointmentId);
    setAppointment(appt);
    setLoading(false);
  };

  const handleAppointmentCancellation = async () => {
    setCancelling(true);
    try {
      await cancelAppointmentById(appointmentId);
      props.history.goBack();
      message.success("Appointment cancelled successfully");
    } catch (ex) {
      message.error(`Unable to cancel appointment: ${ex.message}`);
    }

    setCancelling(false);
  };

  const toggleModal = async (mode) => {
    setMode(mode);
    props.toggleModal();
    if (props.visible === true) {
      await fetchAppointment();
    }
  };

  if (loading)
    return (
      <BasicPage>
        <div style={{ marginBottom: 20 }}>
          <Skeleton title={{ width: "30%" }} paragraph={false} active={true} />
        </div>
        <Card>
          <Skeleton
            title={{ width: "20%" }}
            paragraph={{
              width: ["30%", "30%", "40%", "35%", "40%"],
              rows: 5,
            }}
          />
          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <Skeleton
              paragraph={false}
              title={{ width: ["40%"] }}
              active={true}
            />
          </div>
          <Skeleton
            paragraph={false}
            title={{ width: ["55%"] }}
            active={true}
          />
        </Card>
      </BasicPage>
    );
  else
    return (
      <BasicPage title="Appointment Details">
        <RescheduleModal
          visible={mode === "reschedule" ? props.visible : false}
          appointment={appointment}
          onOk={() => toggleModal("reschedule")}
          onCancel={() => toggleModal("reschedule")}
        />
        <EditAppointmentModal
          appointment={appointment}
          visible={mode === "edit" ? props.visible : false}
          onSave={() => toggleModal("edit")}
          onCancel={() => toggleModal("edit")}
        />
        <Card
          style={{ backgroundColor: "#fff", borderRadius: 5 }}
          bodyStyle={{ padding: 0 }}
          title={`${appointment?.service?.name} for ${
            appointment?.customer?.toString() ?? "N/A"
          }`}
          extra={
            <Actions
              onReschedule={() => toggleModal("reschedule")}
              onEdit={() => toggleModal("edit")}
              loading={loading}
              cancelling={cancelling}
              onCancel={handleAppointmentCancellation}
            />
          }
        >
          <div style={{ display: "flex" }}>
            <div style={{ padding: "20px 10px 0px 20px" }}>
              <h4 style={{ fontWeight: "bold" }}>Appointment Details</h4>
              <BasicDetails appointment={appointment} />
              <Divider style={{}} />
              <h4 style={{ fontWeight: "bold" }}>Payment Details</h4>
              <PaymentDetails appointment={appointment} />
            </div>
            <div>
              <Divider type="vertical" style={{ height: "100%" }} />
            </div>
            <div style={{ padding: "20px 20px 0px 20px" }}>
              <StatusDetails
                appointment={appointment}
                fetchAppointment={fetchAppointment}
              />
            </div>
          </div>
        </Card>
      </BasicPage>
    );
}

export default withModal()(AppointmentDetailsPage);
