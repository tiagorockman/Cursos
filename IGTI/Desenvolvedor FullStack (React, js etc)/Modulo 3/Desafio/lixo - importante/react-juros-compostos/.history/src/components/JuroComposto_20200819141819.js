import React, { useEffect } from "react";
import { compoundInterest } from "../helpers/interest.js";

export default function JuroComposto({
  capitalInicial,
  jurosMensal,
  periodoMeses,
}) {
  useEffect(() => {
    console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
  });

  const handleChangeMontanteInicial = () => {};
  return (
    <div>
      <label>Montante inicial: </label>
      <input
        type="number"
        value={capitalInicial}
        step="1"
        onChange={handleChangeMontanteInicial}
      ></input>

      <label>Taxa de juros mensal: </label>
      <input type="number" value={jurosMensal}></input>

      <label>Perido (mensal): </label>
      <input type="number" value={periodoMeses}></input>
    </div>
  );
}
