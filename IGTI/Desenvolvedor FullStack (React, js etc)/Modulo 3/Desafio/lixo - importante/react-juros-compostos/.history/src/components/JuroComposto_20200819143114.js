import React, { useEffect, useState } from "react";
import { compoundInterest } from "../helpers/interest.js";

export default function JuroComposto({
  capitalInicial,
  jurosMensal,
  periodoMeses,
}) {
  const [juroComposto, setJuroComposto] = useState([]);
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

      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {array.map((item) => (
          <Box key={item}>{item + 1}</Box>
        ))}
      </div>
    </div>
  );
}
