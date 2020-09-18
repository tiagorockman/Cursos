const getCurrentDate = () => {
  const date = new Date();
  const day = date.getUTCDay();
  let month = date.getUTCMonth() + 1;
  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
};

export default getCurrentDate;
