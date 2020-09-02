import React, { useState, useEffect } from 'react';
import { getNewTimeStamp } from './helpers/dateTimeHelpers';

// Não é mais classs é function
export default function App(){
  // definições do estado
  // Var Monitorada | Var será utilizada para alterar essa var // O useState é processo que monitora // [] é o valor que ela é iniciada
  const [ clickArray, setClickArray ] = useState([]);

  // toda vez que renderizar o componente o processo chama o useeffect
useEffect(() => {
  document.title = "React com Hooks";
  document.title = `(${clickArray.length}) - ${document.title}`;
 });


 const handleClick = () => {    
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimeStamp());

    setClickArray(newClickArray);
  };

    return(
      <div>
        <h1>
          React e <em> Class Component </em>
        </h1>

        <button onClick={handleClick}>Clique</button>
        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    )
}


