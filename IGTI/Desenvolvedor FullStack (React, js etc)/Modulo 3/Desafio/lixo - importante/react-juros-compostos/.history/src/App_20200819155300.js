import React from "react";
import JuroComposto from "./components/JuroComposto.js";

export default function App() {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>React - Juros Compostos</h1>

      <JuroComposto montanteInicial={1000} taxaJuros={0.5} meses={1} />
    </div>
  );
}
