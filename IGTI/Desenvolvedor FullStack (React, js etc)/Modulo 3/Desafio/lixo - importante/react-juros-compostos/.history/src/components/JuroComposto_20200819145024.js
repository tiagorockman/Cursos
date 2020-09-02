import React, { useEffect, useState } from "react";
import { compoundInterest } from "../helpers/interest";
import Box from "./Box";

export default function JuroComposto({
  capitalInicial,
  jurosMensal,
  periodoMeses,
}) {
  const [jurosCompostos, setJurosCompostos] = useState([{}]);

  /*useEffect(() => {
    console.log("chegou!!");
    compoundInterest(capitalInicial, jurosMensal, periodoMeses);
  }, [juroComposto]);*/

  const handleChangeMontanteInicial = (event) => {
    setJurosCompostos(
      compoundInterest(Number(event.target.value), jurosMensal, periodoMeses)
    );
    console.log(jurosCompostos);
  };

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

      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {jurosCompostos.map((juroComposto) => (
          <Box key={juroComposto.mes}>{juroComposto.mes}</Box>
        ))}
      </div>
    </div>
  );
}
