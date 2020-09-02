import React, { useEffect } from "react";
import { jurosCompostos } from "./helpers/juros.js";
import { useState } from "react";

export default function App() {

  const {capitalInicial, setCapitialInicial} = useState({});

  const calculateJuros = () => {
    const montanteInicial = 5900;
    const taxaJuros = 0.8;
    const periodoMeses = 12;
  };

  useEffect(() => {
    calculateJuros();
  });

  return <div>
    <h1>
      React - Juros Compostos
    </h1>
  </div>;
}
