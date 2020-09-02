import React from 'react';
import InputsForm from './components/InputsForm';


export default function App() {


// const handleChangeEffect = (id, value) => {
//   console.log(`id - ${id} - value ${value}`);
// }

// useEffect(() => {
// //  setinitialCap(arrayValores.initialCap);
// }, [initialCap, interetRate, monthPeriod])

  return (
      <div className="container">
        <h1 style={{alignItems: 'center'}}>Juros Compostos</h1>
        <InputsForm initalCapvalue={1000} interetRatevalue={0.5} monthPeriodvalue={1} />
      </div>
  );
}
