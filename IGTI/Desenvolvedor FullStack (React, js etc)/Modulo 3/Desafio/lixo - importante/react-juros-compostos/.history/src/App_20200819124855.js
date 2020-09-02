import React, { useEffect, useState } from "react";
import { compoundInterest } from "./helpers/interest.js";
import {} from "react";

export default function App() {
  const { capitalInicial, setCapitialInicial } = useState(false);
  const { jurosMensal, setJurosMensal } = useState(0.5);
  const { periodoMeses, setPeriodoMeses } = useState(1);

  useEffect(() => {
    const calculateMonthlyInterest = () => {
      //setCapitialInicial(1000);
      console.log(capitalInicial.valor);
      //console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
    };

    calculateMonthlyInterest();
  });

  return (
    <div>
      <h1>React - Juros Compostos</h1>
    </div>
  );
}
