window.addEventListener('load', start);

// criando estado da aplicação
const clickArray = [];
function start(){
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick(){
  clickArray.push(getNewTimeStamp());
  // console.log(clickArray);
  render();
}

// função semelhante ao react
function render(){
  const ul = document.querySelector('#data');
  ul.innerHTML = '';

  let lis = '';
  // preenchendo elemento do vetor
  clickArray.map(item => {
    lis += `<li>${item}</li>`;
  });

  ul.innerHTML = lis;

  document.title = "Javascript não perfrormático";
  document.title = `(${clickArray.length}) - ${document.title}`;
}