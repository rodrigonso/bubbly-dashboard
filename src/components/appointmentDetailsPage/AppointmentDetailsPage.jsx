import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BasicPage from "../common/BasicPage";
import { Card, Skeleton } from "antd";

import {
  cancelAppointmentById,
  getAppointmentById,
} from "../../services/db_service";

import RescheduleModal from "./subComponents/RescheduleModal";
import BasicDetails from "./subComponents/BasicDetails";
import PaymentDetails from "../common//PaymentDetails";
import StatusDetails from "./subComponents/StatusDetails";
import Actions from "./subComponents/Actions";
import withModal from "../hoc/withModal";

function AppointmentDetailsPage(props) {
  const { appointmentId } = props.location.state;
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    getAppointmentById(appointmentId).then((appt) => {
      setLoading(true);
      setAppointment(appt);
      setLoading(false);
    });
  };

  const handleAppointmentCancellation = async () => {
    setCancelling(true);
    await cancelAppointmentById(appointmentId);
    setCancelling(false);
    props.history.goBack();
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
      <BasicPage>
        <RescheduleModal
          visible={props.visible}
          appointment={appointment}
          onOk={props.toggleModal}
          onCancel={props.toggleModal}
        />
        <Actions
          {...props}
          title={`${
            appointment?.service?.name
          } for ${appointment?.customer?.formatName()}`}
          onReschedule={props.toggleModal}
          loading={loading}
          cancelling={cancelling}
          onCancel={handleAppointmentCancellation}
        />
        <Card style={{ backgroundColor: "#fff", borderRadius: 5 }}>
          <BasicDetails appointment={appointment} />
          <div style={{ width: "41%" }}>
            <PaymentDetails appointment={appointment} />
          </div>
          <StatusDetails appointment={appointment} />
        </Card>
      </BasicPage>
    );
}

export default withModal()(AppointmentDetailsPage);
