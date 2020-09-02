import React, { useEffect, useState } from "react";
import { compoundInterest } from "../helpers/interest";
import Box from "./Box";

export default function JuroComposto({
  capitalInicial,
  jurosMensal,
  periodoMeses,
}) {
  const [jurosCompostos, setJurosCompostos] = useState([]);

  const [montanteInicial, setMontanteInicial] = useState(capitalInicial);
  const [taxaJuros, setTaxaJuros] = useState(jurosMensal);
  const [meses, setMeses] = useState(periodoMeses);

  useEffect(() => {
    setJurosCompostos(
      compoundInterest(capitalInicial, jurosMensal, periodoMeses)
    );
  }, []);

  const handleChangeMontanteInicial = (event) => {
    console.log(event.target.value);
    console.log(jurosMensal);
    console.log(periodoMeses);
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
        {jurosCompostos.map((montante) => (
          <Box key={montante}>
            {montante.mes}
            <br />
            {montante.valorMensal}
            <br />
            {montante.valorMensalMaisJuros}
            <br />
            {montante.valorJuroMensal}
            <br />
          </Box>
        ))}
      </div>
    </div>
  );
}
