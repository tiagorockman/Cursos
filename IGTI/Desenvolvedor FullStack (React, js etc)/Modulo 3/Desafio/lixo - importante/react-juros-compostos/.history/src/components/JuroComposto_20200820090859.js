import React, { useEffect, useState } from "react";
import { compoundInterest } from "../helpers/interest";
import { formatCurrency, formatPercent } from "../helpers/formatHelpers";
import Box from "./Box";
// import css from "./jurosCompostos.module.css";

import { Chart } from "primereact/chart";

export default function JuroComposto({ montanteInicial, taxaJuros, meses }) {
  const [jurosCompostos, setJurosCompostos] = useState([]);
  const [dataChartLine, setDataChartLine] = useState([]);
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

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "#42A5F5",
        borderColor: "#42A5F5",
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: "#66BB6A",
        borderColor: "#66BB6A",
      },
    ],
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

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {jurosCompostos.map((montante) => (
          <Box key={montante.mes}>
            <div className="card horizontal z-depth-4">
              <div className="card-stacked">
                <div className="card-content">
                  <div className="right-align">
                    <h5>{montante.mes}</h5>
                  </div>
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
            </div>
          </Box>
        ))}

        <div>
          <h3>Basic</h3>
          <Chart type="line" data={data} />
        </div>
      </div>
    </div>
  );
}
