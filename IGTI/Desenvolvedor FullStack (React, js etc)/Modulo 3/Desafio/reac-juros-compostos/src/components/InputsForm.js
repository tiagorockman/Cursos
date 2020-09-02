import React, { useEffect, useState }  from 'react'
import Installments from './Installments';
import { retNewRateCalc } from './helpers/JurosCompostosCalc'

export default function InputsForm({ initalCapvalue, interetRatevalue, monthPeriodvalue  }) {

const [initialCap, setinitialCap] = React.useState(initalCapvalue);
const [interetRate, setinteretRate] = useState(interetRatevalue);
const [monthPeriod, setmonthPeriod] = useState(monthPeriodvalue);

// Array responsável pelos valores passados para o grid
const [ArrayCompoundInterest, setArrayCompoundInterest] = useState([])


/********************************************* */
/*-- CADA MUDANÇA NO INPUT CHAMA O SETSTATE --*/ 
const handleChangeInitCap = ({ target}) => {
  setinitialCap(target.value);
}
const handleChangeIntRate = ({ target}) => {
  setinteretRate(target.value);
}
const handleChangeMonPer = ({ target}) => {
  setmonthPeriod(target.value);
}
/********************************************* */

/****************************************************************** */
/*-- MONITORA TODOS OS 3 INPUT CASO SEUS ESTADOS SEJAM ALTERADOS --*/
useEffect(() => {
  const getReturnAnyInputChange = () => {
    // retorna para o array os cálculos com os novos valores passados
    return retNewRateCalc(initialCap, interetRate, monthPeriod);
  }
  setArrayCompoundInterest(getReturnAnyInputChange());
}, [initialCap, interetRate, monthPeriod]);
/****************************************************************** */


  return (
    <div>
      <div className="input-field row">
        <div className="col s4">
          <label htmlFor="inputInitialCap" className="active">
            Capital Inicial
          </label>
          <input
            id="inputInitialCap"
            type="number"
            placeholder="1000"
            step="100"
            defaultValue={initialCap}
            onChange={handleChangeInitCap}
          />
        </div>
        <div className="col sm4">
          <label htmlFor="inputinteretRate" className="active">
            {' '}
            Taxa de Juros Mensal
          </label>
          <input
            id="inputinteretRate"
            type="number"
            placeholder="0.5"
            step="0.10"
            max="12"
            min="-12"
            defaultValue={interetRate}
            onChange={handleChangeIntRate}
          />
        </div>
        <div className="col sm4">
          <label htmlFor="inputmonthPeriod">Periodo (meses)</label>
          <input
            id="inputmonthPeriod"
            type="number"
            placeholder="12"
            defaultValue={monthPeriod}
            onChange={handleChangeMonPer}
          />
        </div>
      </div>
      <div style={styles.cardCss}>
        {ArrayCompoundInterest.map((array) => {
          return array.month !== 0 ? (
            <Installments key={array.month} children={array} />
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  cardCss: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
  }
}
