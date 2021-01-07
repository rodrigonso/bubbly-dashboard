import React from "react";
import { Button, Popconfirm } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Actions(props) {
  const { loading, cancelling, onCancel, onReschedule, onEdit } = props;

  if (loading) return <LoadingOutlined />;
  else
    return (
      <>
        <Button
          type="ghost"
          key="reschedule"
          onClick={onReschedule}
          style={{ marginRight: 10 }}
        >
          Reschedule
        </Button>
        <Button onClick={onEdit}>Edit</Button>
        <Popconfirm title="Cancel Appointment" onConfirm={onCancel}>
          <Button key="cancel" type="danger" loading={cancelling}>
            Cancel
          </Button>
        </Popconfirm>
      </>
    );
}
