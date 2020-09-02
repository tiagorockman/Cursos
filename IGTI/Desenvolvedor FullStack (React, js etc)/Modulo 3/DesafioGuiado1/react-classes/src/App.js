import React, { Component } from 'react';
import ProjetoBase from './components/ProjetoBase/ProjetoBase';
import { getNewTimeStamp } from './helpers/dateTimeHelpers';

// Classe no React
export default class App extends Component {
constructor(){
  super(); // herda o construtor do componente

  this.state = {
    clickArray: [],
  };
}

handleClick = () => {
    const newClickArray = Object.assign([],this.state.clickArray);
    newClickArray.push(getNewTimeStamp());
    
    this.setState({clickArray: newClickArray}); // quando alimenta o state novamente o React executa o render() novamente
}

componentDidUpdate(){
  document.title = "Javascript React";
  document.title = `(${this.state.clickArray.length.toString()}) - ${document.title}`;
}

  render() {
    const { clickArray } = this.state;
    return(
      <div>
        <h1>
          React e <em> Class Component </em>
        </h1>

        <button onClick={this.handleClick}>Clique</button>
        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    )
  }
}
