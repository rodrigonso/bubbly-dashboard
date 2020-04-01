import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

export default function UpdatesDetails(props) {
  const { current, appointment } = props;
  return (
    <div style={{ width: "60%" }}>
      <p>Updates:</p>
      <Steps size="small" current={current} status={appointment.status}>
        <Step title="Confirmed" />
        <Step title="Driving" />
        <Step title="Washing" />
        <Step title="Completed" />
      </Steps>
    </div>
  );
}
