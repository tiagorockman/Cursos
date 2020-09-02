import React, { useEffect } from "react";
import { compoundInterest } from "./helpers/interest.js";
import { useState } from "react";

export default function App() {

  const {capitalInicial, setCapitialInicial} = useState({});
  const {jurosMensal, setJurosMensal} = useState({});
  const {periodoMeses, setPeriodoMeses} = useState({});

  const calculateMonthlyInterest = () => {
  };

  useEffect(() => {
    calculateMonthlyInterest();
  });

  return <div>
    <h1>
      React - Juros Compostos
    </h1>
  </div>;
}
