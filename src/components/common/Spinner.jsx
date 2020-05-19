import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "55vh",
      }}
    >
      <LoadingOutlined style={{ fontSize: 24, color: "#1180ff" }} />
    </div>
  );
}
