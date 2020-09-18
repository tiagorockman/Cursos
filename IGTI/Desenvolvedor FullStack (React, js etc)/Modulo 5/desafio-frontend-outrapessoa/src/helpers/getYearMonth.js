const getYearMonth = () => {
  const date = new Date();
  let month = date.getUTCMonth() + 1;
  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  return `${date.getUTCFullYear()}-${month}`;
};

export default getYearMonth;
