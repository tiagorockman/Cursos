import React, { useEffect, useState } from "react";
import { compoundInterest } from "./helpers/interest.js";

export default function App() {

  const {capitalInicial, setCapitialInicial} = useState(1000);
  const {jurosMensal, setJurosMensal} = useState(0.5);
  const {periodoMeses, setPeriodoMeses} = useState(1);

  const calculateMonthlyInterest = () => {
    console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
  };

  useEffect(() => {
    calculateMonthlyInterest();
  }, []);

  return <div>
    <h1>
      React - Juros Compostos
    </h1>
  </div>;
}
