import React, { useEffect, useState } from "react";
import { compoundInterest } from "./helpers/interest.js";

export default function App() {

  const {capitalInicial, setCapitialInicial} = useState(0);
  const {jurosMensal, setJurosMensal} = useState(0);
  const {periodoMeses, setPeriodoMeses} = useState(0);

  useEffect(() => {
    console.log(capitalInicial);
    console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
  }, [capitalInicial]);

  return <div>
    <h1>
      React - Juros Compostos
    </h1>
  </div>;
}
