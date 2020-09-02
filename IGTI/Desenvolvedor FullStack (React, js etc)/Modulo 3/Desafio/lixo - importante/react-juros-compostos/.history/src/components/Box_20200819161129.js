import React from "react";

export default function Box({ value, children }) {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "4px",
        width: "20px",
        height: "20px",
        margin: "5px"
      }}
    >
      {children}
    </div>
  );
}
