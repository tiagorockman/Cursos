import React from "react";

export default function Box({ value, children }) {
  return (
    <div style={{margin: '5px'}}
      /*style={{
        border: "1px solid black",
        borderRadius: "4px",
        width: "90px",
        height: "90px",
        margin: "5px"
      }}*/
    >
      {children}
    </div>
  );
}
