const formatter = Intl.NumberFormat('pt-BR');

//formata número formato brasileiro

function formatNumber(value){
  return formatter.format(value);
}

function formatPercent(value){
  const stringValue = value.toFixed(2);

  return stringValue.replace('.', ',') + '%';
}


export { formatNumber, formatPercent }