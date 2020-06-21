import React from "react";
import { Empty as NoData } from "antd";

export default function Empty(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 5,
      }}
    >
      <NoData
        image={NoData.PRESENTED_IMAGE_SIMPLE}
        description={props.desc ?? "Nothing Selected"}
      />
    </div>
  );
}
