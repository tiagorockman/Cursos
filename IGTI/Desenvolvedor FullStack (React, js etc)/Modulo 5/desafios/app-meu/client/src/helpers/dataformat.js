// const options = { year: "numeric", month: "long", day: "numeric"};

function dateformatNow(){
  const date = new Date();
 // const DateNow = date.toLocaleDateString("pt-br", {...options, month: 'numeric'});
  var year= date.getUTCFullYear(), month = '' + (date.getUTCMonth() + 1);
  
  if (month.length < 2) month = '0' + month;

  const YearMonth = [year, month].join('-');
return YearMonth;
}

function returnYearMonth(date){
  date = new Date(date);
  var year= date.getUTCFullYear(), month = '' + (date.getUTCMonth() + 1)
  if(month.length <2) month = '0' + month;

  return [year, month].join('-');
}

function returnDay(date){
  date = new Date(date);
  var day = '' + (date.getUTCDate());

//  if(day.length <2) day = '0' + day
return day;
}

function returnMonth(date){
  date = new Date(date);
  var month = '' + (date.getUTCMonth() +1);

//  if(month.length <2) month = '0' + month
return month;
}

function returnYear(date){
  date = new Date(date);
  var year = (date.getUTCFullYear());

//  if(month.length <2) month = '0' + month
return year;
}

export { dateformatNow, returnYearMonth, returnDay, returnMonth, returnYear };