import React from "react";

export default function BigColumn(props) {
  return (
    <div className="row-1" style={{ flexBasis: "70%" }}>
      {props.children}
    </div>
  );
}
