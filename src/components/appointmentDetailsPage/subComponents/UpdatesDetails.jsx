import React from "react";
import { Steps } from "antd";

const { Step } = Steps;
const steps = {
  CONFIRMED: 0,
  DRIVING: 1,
  WASHING: 2,
  COMPLETED: 3,
};

export default function UpdatesDetails(props) {
  const { current } = props;
  return (
    <div style={{ width: "60%" }}>
      <p>Updates:</p>
      <Steps size="small" current={steps[current]}>
        <Step title="Confirmed" />
        <Step title="Driving" />
        <Step title="Washing" />
        <Step title="Completed" />
      </Steps>
    </div>
  );
}
