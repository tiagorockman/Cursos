import React, { useEffect } from "react";
import { jurosCompostos } from "./helpers/juros.js";

export default function App() {
  const calculateJuros = () => {
    const montanteInicial = 1000;
    const taxaJuros = 0.05;
    const periodoMeses = 1;

    console.log(jurosCompostos(montanteInicial, taxaJuros, periodoMeses));
  };

  useEffect(() => {
    calculateJuros();
  });

  return <div>Cheguei!!</div>;
}
