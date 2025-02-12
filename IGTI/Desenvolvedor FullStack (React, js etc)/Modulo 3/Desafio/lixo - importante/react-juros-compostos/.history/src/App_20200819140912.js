import React, { useEffect, useState } from "react";
import {} from "react";
import JuroComposto from "./components/JuroComposto.js";

export default function App() {
  const [capitalInicial, setCapitialInicial] = useState(1000);
  const [jurosMensal, setJurosMensal] = useState(0.5);
  const [periodoMeses, setPeriodoMeses] = useState(1);

  return (
    <div>
      <h1>React - Juros Compostos</h1>

      <JuroComposto capitalInicial={capitalInicial} jurosMensal={jurosMensal} periodoMeses={periodoMeses} />
    </div>
  );
}
