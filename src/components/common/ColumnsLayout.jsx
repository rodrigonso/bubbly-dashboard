import React from "react";

export default function ColumnsLayout(props) {
  return (
    <div className="flexbox-2" style={{ display: "flex" }}>
      {props.children}
    </div>
  );
}
