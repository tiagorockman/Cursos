import React, { useEffect, useState } from "react";
import { compoundInterest } from "./helpers/interest.js";

export default function App() {
  const montante = 1000;
  const {capitalInicial, setCapitialInicial} = useState(montante);
  const {jurosMensal, setJurosMensal} = useState(montante);
  const {periodoMeses, setPeriodoMeses} = useState(montante);

  useEffect(() => {
    console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
  });

  return <div>
    <h1>
      React - Juros Compostos
      {capitalInicial}
    </h1>
  </div>;
}
