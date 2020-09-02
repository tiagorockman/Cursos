import React from "react";
import { jurosCompostos } from "./helpers/juros.js";

export default function App() {
  const calculateJuros = () => {
    const montanteInicial = 5000;
    const taxaJuros = 0.01;
    const periodoMeses = 6;

    console.log(jurosCompostos(montanteInicial, taxaJuros, periodoMeses));
  };

  return <div>Cheguei!!
    calculateJuros();
  </div>;
}
