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
            max="36"
            onChange={handleChangePeriodoMensal}
          ></input>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {jurosCompostos.map((montante) => (
          <Box key={montante.mes}>
            <div class="col s4 m2">
              <div class="card horizontal">
                <div class="card-image">
                  <img src="https://lorempixel.com/100/190/nature/6" />
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p>
                      I am a very simple card. I am good at containing small
                      bits of information.
                    </p>
                  </div>
                  <div class="card-action">
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card horizontal">
              <div className="card-stacked">
                <div className="card-content">
                  <div>{montante.mes}</div>
                  <p>{formatCurrency(montante.valorMensal)}</p>
                  <p>
                    {montante.valorMensalMaisJuros > 0
                      ? "+" + formatCurrency(montante.valorMensalMaisJuros)
                      : montante.valorMensalMaisJuros === 0
                      ? formatCurrency(montante.valorMensalMaisJuros)
                      : formatCurrency(montante.valorMensalMaisJuros)}
                  </p>
                  <p>{formatPercent(montante.valorJuroMensal)}</p>
                </div>
              </div>
            </div> */}
          </Box>
        ))}
      </div>
    </div>
  );
}
