window.addEventListener('load', start); // declara que quando a página carregar executa a função start;

function start(){
  rangeRed = document.querySelector('#rRed');
  rangeRed.value = 0;
  rangeRed.addEventListener('change', countValue);

  rangeGreen = document.querySelector('#rGreen');
  rangeGreen.value = 0;
  rangeGreen.addEventListener('change', countValue);

  rangeBlue = document.querySelector('#rBlue');
  rangeBlue.value = 0;
  rangeBlue.addEventListener('change', countValue);

 
}

function countValue(event){
  console.log(event);
  setValueinputText(event.target.id, event.target.value);
  changeBackgroundColorDiv();
}

function setValueinputText(idRange, valor){
  console.log(`idrange: ${idRange}, valor: ${valor}`)
 var idInputText = idRange.substr(1, 1) 
 idInputText = idInputText.toLowerCase() + "Text";
 console.log(idInputText);
 document.querySelector('#'+idInputText).value = valor;        
}

function changeBackgroundColorDiv(){
    var R = document.querySelector('#rText').value;
    var G = document.querySelector('#gText').value;
    var B = document.querySelector('#bText').value;
    R = R != 0 ? R : 0;
    G = G != 0 ? G : 0;
    B = B != 0 ? B : 0;

    console.log(`R:${R}, G: ${G}, B:${B}`);
    var colorDiv = document.querySelector('#divCor');

    colorDiv.style.backgroundColor = `rgb(${R},${G},${B})`;
   // colorDiv.style.boxShadow = `0px 0px 10px rgb(${G},${R},${B})`;
}