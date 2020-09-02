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
  const handleChangeJurosMensal = () => {};
  const handleChangePeriodoMensal = () => {};
  return (
    <div>
      <label>Montante inicial: </label>
      <input
        type="number"
        defaultValue={capitalInicial}
        onChange={handleChangeMontanteInicial}
      ></input>

      <label>Taxa de juros mensal: </label>
      <input
        type="number"
        defaultValue={jurosMensal}
        min="-12"
        max="12"
        onChange={handleChangeJurosMensal}
      ></input>

      <label>Perido (mensal): </label>
      <input
        type="number"
        defaultValue={periodoMeses}
        min="1"
        max="12"
        onChange={handleChangePeriodoMensal}
      ></input>
    </div>
  );
}
