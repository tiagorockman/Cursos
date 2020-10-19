const formatYearMonth = (yearMonth) => {
  const [year, numMonth] = yearMonth.split("-");

  let month;
  switch (numMonth) {
    case "01":
      month = "Jan";
      break;

    case "02":
      month = "Fev";
      break;

    case "03":
      month = "Mar";
      break;

    case "04":
      month = "Abr";
      break;

    case "05":
      month = "Mai";
      break;

    case "06":
      month = "Jun";
      break;

    case "07":
      month = "Jul";
      break;

    case "08":
      month = "Ago";
      break;

    case "09":
      month = "Set";
      break;

    case "10":
      month = "Out";
      break;

    case "11":
      month = "Nov";
      break;

    case "12":
      month = "Dez";
      break;

    default:
      break;
  }

  return `${month}/${year}`;
};

export default formatYearMonth;
