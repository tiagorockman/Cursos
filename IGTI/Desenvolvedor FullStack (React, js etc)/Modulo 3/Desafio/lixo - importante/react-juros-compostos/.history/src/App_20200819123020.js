import React, { useEffect, useState } from "react";
import { compoundInterest } from "./helpers/interest.js";

export default function App() {

  const {capitalInicial, setCapitialInicial} = useState([]);
  const {jurosMensal, setJurosMensal} = useState([]);
  const {periodoMeses, setPeriodoMeses} = useState([]);

  useEffect(() => {
    setCapitialInicial(1000);
    console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
  });

  return <div>
    <h1>
      React - Juros Compostos
    </h1>
  </div>;
}
