import React, { Component } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      candidates: [],
      previousVotes: [],
      previousPercentages: []
    }

    // criada para ser utilizada posteriormente quando o componente morrer para não ter vazamento de memória
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
      .then(res => res.json())
      .then((json) =>{
        const previousVotes = this.state.candidates.map(({id, votes})=>{
          return { id, votes};
        });

         const previousPercentages = this.state.candidates.map(({id, percentage})=>{
          return { id, percentage};
        });

        this.setState({
          candidates: json.candidates,
          previousVotes,
          previousPercentages
        });
      });
    }, 1000);
  }

  render() {
    const { candidates, previousVotes, previousPercentages } = this.state;
    if(candidates.length === 0)
        return <Spinner description="Carregando..." />;
    
    return  (
      <div className="container">
       <Header>Votação</Header> {/* dessa forma podemos acessar pela prop children no functional component */}
       { /*<Header title="Votação" />  Dessa forma é necessário ter uma prop title no componente */}
       
       <Candidates 
       previousVotes={previousVotes} 
       candidates={candidates} 
       previousPercentages={previousPercentages} 
       />
      </div>
    );
  }
}
