import React, { useEffect, useState } from "react";
import { compoundInterest } from "../helpers/interest";
import { formatCurrency, formatPercent } from "../helpers/formatHelpers";
import Box from "./Box";
// import css from "./jurosCompostos.module.css";

import { Chart } from "primereact/chart";

export default function JuroComposto({ montanteInicial, taxaJuros, meses }) {
  const [jurosCompostos, setJurosCompostos] = useState([]);
  const [dataChartLine, setDataChartLine] = useState({});
  const [capitalInicial, setCapitialInicial] = useState(montanteInicial);
  const [jurosMensal, setJurosMensal] = useState(taxaJuros);
  const [periodoMeses, setPeriodoMeses] = useState(meses);

  useEffect(() => {
    const getCompoundInterest = () => {
      return compoundInterest(capitalInicial, jurosMensal, periodoMeses);
    };

    const chartLine = getCompoundInterest();
    const chartLabels = [0];
    const chartAccumulatedMoney = [capitalInicial];
    const chartTotalInterest = [0];
    chartLine.forEach((chart) => {
      chartLabels.push(chart.mes);
      chartAccumulatedMoney.push(chart.valorMensal);
      chartTotalInterest.push(chart.valorMensalMaisJuros);
    });
    chartLine.map((chart) => {
      setDataChartLine({
        labels: chartLabels,
        datasets: [
          {
            label: "Dinheiro investido",
            data: [capitalInicial, capitalInicial],
            fill: false,
            backgroundColor: "#66BB6A",
            borderColor: "#66BB6A",
          },
          {
            label: "Dinheiro acumulado",
            data: chartAccumulatedMoney,
            fill: false,
            backgroundColor: "#42A5F5",
            borderColor: "#42A5F5",
          },
          {
            label: "Total em juros",
            data: chartTotalInterest,
            fill: false,
            backgroundColor: "#ef5350",
            borderColor: "#ef5350",
          },
        ],
      });
    });

    setJurosCompostos(getCompoundInterest());
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

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* {jurosCompostos.map((montante) => (
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
        ))} */}

        <div>
          {/* <h3>Basic</h3> */}
          <Chart type="line" data={dataChartLine} />
        </div>
      </div>
    </div>
  );
}
