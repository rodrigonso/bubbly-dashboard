import React from "react";
import { Button, Popconfirm } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Actions(props) {
  const { loading, cancelling, onCancel, onEdit } = props;

  if (loading) return <LoadingOutlined />;
  else
    return (
      <>
        <Button onClick={onEdit} style={{ marginRight: 10 }}>
          Edit
        </Button>
        <Button
          onClick={onCancel}
          key="cancel"
          type="danger"
          loading={cancelling}
        >
          Cancel
        </Button>
      </>
    );
}
