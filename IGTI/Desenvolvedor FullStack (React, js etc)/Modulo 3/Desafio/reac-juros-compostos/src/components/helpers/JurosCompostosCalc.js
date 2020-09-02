function retNewRateCalc ( initialCapital, interestRatePeriod, monthsPeriod) {
  const amount = [
    {
      month: 0,
      valueMonthly: 0,
      interestMonthlyValue: 0,
      monthlyInterest: 0,
    }
  ]

  const montanteMensal = [
    {
      mes: 0,
      valorMensal: 0,
      valorMensalMaisJuros: 0,
      valorJuroMensal: 0,
    }
  ]

for (let i = 1; i <= monthsPeriod; i++){
  const amountPlusInterest = initialCapital * (1 + interestRatePeriod/ 100) ** i;
  const amountMonthlyInterest = amountPlusInterest - initialCapital;
  amount.push({
    month: i,
      valueMonthly: amountPlusInterest,
      interestMonthlyValue: amountMonthlyInterest,
      monthlyInterest: amountMonthlyInterest / initialCapital,
  });
}

  // for (let index = 1; index <= monthsPeriod; index++) {
  //   const montanteMaisJuros = initialCapital * (1 + interestRatePeriod / 100) ** index;
  //   const montanteJuroMensal = montanteMaisJuros - initialCapital
  //   montanteMensal[index - 1] = {
  //     mes: index,
  //     valorMensal: montanteMaisJuros,
  //     valorMensalMaisJuros: montanteJuroMensal,
  //     valorJuroMensal: montanteJuroMensal / initialCapital,
  //   };
  // }

 // console.log(`Meu: ${JSON.stringify(amount)}`);
 // console.log(`outro: ${JSON.stringify(montanteMensal)}`);
 return amount;
}

export {retNewRateCalc};