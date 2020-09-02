import React from "react";

export default function Box({ value, children }) {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "4px",
        width: "120px",
        height: "1200px",
        margin: "5px"
      }}
    >
      {children}
    </div>
  );
}
