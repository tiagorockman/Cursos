import React from "react";
import JuroComposto from "./components/JuroComposto.js";

export default function App() {
  return (
    <div>
      <h1>React - Juros Compostos</h1>

      <JuroComposto capitalInicial={1000} jurosMensal={0.5} periodoMeses={1} />
    </div>
  );
}
