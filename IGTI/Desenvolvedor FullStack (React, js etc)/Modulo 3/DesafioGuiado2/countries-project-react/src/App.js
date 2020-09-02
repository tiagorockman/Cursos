import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';


export default class App extends Component {
  constructor(){
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }

  async componentDidMount(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const _allCountries = json.map(({name, numericCode, flag, population }) =>{
      return {
        id: numericCode,
        name, 
        filterName: name.toLowerCase(),
        flag, 
        population
      };
    });

   const filteredPopulation = this.calculateTotalPopFrom(_allCountries);

    this.setState({
      allCountries: _allCountries,
      filteredCountries: Object.assign([],_allCountries), // se deixar apenas _allCountries, apontaria para mesmo endereço de memória o que poderia acarretar em erro por isso realiza uma cópia.
      filteredPopulation,
    });
  }

  calculateTotalPopFrom = (countries) => {
    const totalPopulation = countries.reduce((acumulator, current)=>{
      return acumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  // toda vez que o usuário digitar entra no handleChangeFilter
  handleChangeFilter = (newFilter) => {
   // console.log(newFilter);
    this.setState({
      filter: newFilter,
    });

    // realiza realmente o filtro
    const filterLowerCase = newFilter.toLowerCase();

   // console.log(filterLowerCase);
   // console.log(this.state.allCountries);

    const filteredCountries = this.state.allCountries.filter((country) =>{
     // console.log(country);
     return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopFrom(filteredCountries);

    // atualiza o estado
    this.setState({
      filteredCountries,
      filteredPopulation,
    })
  };


  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;

   // console.log(allCountries);
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header filter={filter} 
        countryCount={filteredCountries.length} 
        totalPopulation={filteredPopulation}
        onChangeFilter={this.handleChangeFilter} />

        {/* utilizando componenete Countries - o mesmo recebe allCountries como contries  */}
        <Countries countries={filteredCountries} />
      </div>
    )
  }
}


const styles = {
  centeredTitle:{
    textAlign: 'center',
  },
}