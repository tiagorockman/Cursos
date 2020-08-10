let tabCountries = null;
let tabFavorites = null;

let allCountries =[];
let favoriteCoutries = [];

let countCoutries = 0;
let countFavorites = 0;

let numberFormat = null;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

window.addEventListener('load', () =>{
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCoutries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

 // fetchCountriesPromise();

 
  fetchCountriesAsync();

});

//com promise
function fetchCountriesPromise(){
  fetch('https://restcountries.eu/rest/v2/all').then(
    res => {
      // esse res é outra promise
      return res.json()
    }
  ).then(json => {
    allCountries = json;
    console.log(allCountries);
  });
}

async function fetchCountriesAsync(){
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  allCountries = json.map(country => {

    // oject destruction
  const { numericCode, translations, population, flag } = country;

    return{
      id: numericCode,
      name: translations.pt,
      population: population,
      formattedPopulation: formatNumber(population),
      flag: flag
    }

    
  });
  console.log(allCountries);

  render();

}

function render(){
renderCountryList();
renderFavorites();
renderSumary();
handleCountryButtons();
}

// implementada com teplate literal
function renderCountryList(){

  allCountries.sort((previus, current)=>{
    return previus.name.localeCompare(current.name);
  })

  let countriesHTML = '<div>';

  allCountries.forEach(country =>{
    const{ name, flag, id, population, formattedPopulation } = country;

    const countryHTML = `
    <div class='country'>
      <div> 
        <a id="${id}" class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}" >
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>   
    </div>
    `;

    countriesHTML += countryHTML;
  });
  countriesHTML.innerHTML = '</div>';

  tabCountries.innerHTML = countriesHTML;

}
function renderFavorites(){  

  let favoritiesHTML = '<div>';

  favoriteCoutries.forEach(country => {
    const{ name, flag, id, population, formattedPopulation } = country;

    
    const favoriteCountryHTML = `
    <div class='country'>
      <div> 
        <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}" >
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>   
    </div>
    `;
    favoritiesHTML += favoriteCountryHTML;
  })
  favoritiesHTML.innerHTML = '</div>';
  tabFavorites.innerHTML = favoritiesHTML;

}


function renderSumary(){
  countCoutries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCoutries.length;

  const totalPopulation = allCountries.reduce((previus, current) => {
    return previus + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);

  const totalFavorites = favoriteCoutries.reduce((acumulated, current)=>{
    return acumulated + current.population;
  },0);

  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}
function handleCountryButtons(){
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach(button =>{
    button.addEventListener('click', () => addToFavorites(button.id));
  })
  favoriteButtons.forEach(button =>{
    button.addEventListener('click', () => removeFromFavorities(button.id));
  })

}

function addToFavorites(id){
  const countryFavorited = allCountries.find(country => country.id === id);

    // armazena na var global favoriteCountries o que já existe nela ...favoriteCountries e adiciona o selecionado
    favoriteCoutries = [...favoriteCoutries, countryFavorited];
    
    //ordena em ordem alfabetica
    favoriteCoutries.sort((previus, current) => {
      return previus.name.localeCompare(current.name);
    });
    
    // regera o array do allCountries sem o objeto country selecionado e remove do array
    allCountries = allCountries.filter(country => country.id !== id);
   

    render()
}

function removeFromFavorities(id){
  const countryFavoritedRemove = favoriteCoutries.find(country => country.id === id);

  // retorna para allcoutries o removido 
  allCountries = [...allCountries, countryFavoritedRemove];

  allCountries.sort((previus, current) => {
    return previus.name.localeCompare(current.name);
  });

  favoriteCoutries = favoriteCoutries.filter(country => country.id !== id);

  render();
 
}

function formatNumber(number){
  return numberFormat.format(number);
}