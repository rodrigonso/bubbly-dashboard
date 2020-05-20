import React from "react";

export default function SmallColumn(props) {
  return (
    <div
      className="row-2"
      style={{
        flexBasis: "30%",
        marginLeft: 20,
      }}
    >
      {props.children}
    </div>
  );
}
