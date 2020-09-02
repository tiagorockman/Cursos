import React, { useEffect } from "react";
import { jurosCompostos } from "./helpers/juros.js";

export default function App() {
  const calculateJuros = () => {
    const montanteInicial = 5900;
    const taxaJuros = 0.8;
    const periodoMeses = 12;

    console.log(jurosCompostos(montanteInicial, taxaJuros, periodoMeses));
  };

  useEffect(() => {
    calculateJuros();
  });

  return <div>Cheguei!!</div>;
}
