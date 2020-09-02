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
        <div className="col s4">
          <label>Montante inicial: </label>
          <input
            type="number"
            defaultValue={capitalInicial}
            onChange={handleChangeMontanteInicial}
          ></input>
        </div>

        <div className="col s4">
          <label>Taxa de juros mensal: </label>
          <input
            type="number"
            defaultValue={jurosMensal}
            min="-12"
            max="12"
            onChange={handleChangeJurosMensal}
          ></input>
        </div>
        <div className="col s4">
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
            <div className={css.flexRow}>
             

              <div class="card horizontal">
                <div class="card-image">{montante.mes}</div>
                <div class="card-stacked">
                  <div class="card-content">
                  {formatCurrency(montante.valorMensal)}
              {formatCurrency(montante.valorMensalMaisJuros)}
              {formatPercent(montante.valorJuroMensal)}
                  </div>
                  <div class="card-action">
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}
