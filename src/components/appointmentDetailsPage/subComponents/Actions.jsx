import React from "react";
import { Button, PageHeader, Popconfirm } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Actions(props) {
  const { loading, cancelling, onCancel, onReschedule, title } = props;

  if (loading) return <LoadingOutlined />;
  else
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
          <Popconfirm title="Cancel Appointment" onConfirm={onCancel}>
            <Button
              shape="round"
              key="cancel"
              type="danger"
              loading={cancelling}
            >
              Cancel
            </Button>
          </Popconfirm>,
        ]}
      />
    );
}
