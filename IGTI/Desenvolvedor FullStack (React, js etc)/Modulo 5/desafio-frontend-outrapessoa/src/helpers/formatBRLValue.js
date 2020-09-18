const formattter = Intl.NumberFormat("pt-BR");

const formatBRLValue = (value) => {
  return formattter.format(value);
};

const formatPercentage = (value) => {
  const stringValue = value.toFixed(2);

  return `${stringValue.replace(".", ",")}%`;
};

const formatMoneyValue = (value) => {
  if (value.toString().split(".").length < 2) {
    return `${formatBRLValue(value)},00`;
  } else {
    return formatBRLValue(value);
  }
};

export { formatBRLValue, formatMoneyValue, formatPercentage };
