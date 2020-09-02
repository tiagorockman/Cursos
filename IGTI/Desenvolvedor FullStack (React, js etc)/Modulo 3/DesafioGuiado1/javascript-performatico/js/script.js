window.addEventListener('load', start);

// criando estado da aplicação
const clickArray = [];
function start(){
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick(){
  const item = getNewTimeStamp()
  clickArray.push(item);
  // console.log(clickArray);
  render(item);
}

// função semelhante ao react
function render(item){
  const ul = document.querySelector('#data');
  // Adicionando apenas as Lis e não recriando toda a ul

  const li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li);

  document.title = "Javascript não perfrormático";
  document.title = `(${clickArray.length}) - ${document.title}`;
}