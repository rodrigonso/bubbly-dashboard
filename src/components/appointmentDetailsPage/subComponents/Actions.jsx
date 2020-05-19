import React from "react";
import { Button, PageHeader } from "antd";

export default function Actions(props) {
  const { isLoading, onCancel, onReschedule, title } = props;
  return (
    <PageHeader
      style={{ padding: "0px 0px 20px 0px" }}
      title={title}
      onBack={() => props.history.goBack()}
      extra={[
        <Button
          shape="round"
          type="ghost"
          key="reschedule"
          onClick={onReschedule}
        >
          Reschedule
        </Button>,
        <Button
          shape="round"
          key="cancel"
          type="danger"
          loading={isLoading}
          onClick={onCancel}
        >
          Cancel
        </Button>,
      ]}
    />
  );
}
