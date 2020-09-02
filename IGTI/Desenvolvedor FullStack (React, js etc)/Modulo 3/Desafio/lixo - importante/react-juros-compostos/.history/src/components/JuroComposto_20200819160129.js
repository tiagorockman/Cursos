import React, { useEffect, useState } from "react";
import { compoundInterest } from "../helpers/interest";
import { formatCurrency, formatPercent } from "../helpers/formatHelpers";
import Box from "./Box";
import css from "./jurosCompostos.module.css";

export default function JuroComposto({ montanteInicial, taxaJuros, meses }) {
  const [jurosCompostos, setJurosCompostos] = useState([]);

  const [capitalInicial, setCapitialInicial] = useState(montanteInicial);
  const [jurosMensal, setJurosMensal] = useState(taxaJuros);
  const [periodoMeses, setPeriodoMeses] = useState(meses);

  useEffect(() => {
    setJurosCompostos(
      compoundInterest(capitalInicial, jurosMensal, periodoMeses)
    );
  }, [capitalInicial, jurosMensal, periodoMeses]);

  const handleChangeMontanteInicial = (event) => {
    setCapitialInicial(event.target.value);
  };

  const handleChangeJurosMensal = (event) => {
    setJurosMensal(event.target.value);
  };
  const handleChangePeriodoMensal = (event) => {
    setPeriodoMeses(event.target.value);
  };
  return (
    <div>
      <div className="row">
        <div className="col s12">
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
      </div>
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {jurosCompostos.map((montante) => (
          <Box key={montante.mes}>
            {montante.mes}
            <br />
            {formatCurrency(montante.valorMensal)}
            <br />
            {formatCurrency(montante.valorMensalMaisJuros)}
            <br />
            {formatPercent(montante.valorJuroMensal)}
            <br />
          </Box>
        ))}
      </div>
    </div>
  );
}
