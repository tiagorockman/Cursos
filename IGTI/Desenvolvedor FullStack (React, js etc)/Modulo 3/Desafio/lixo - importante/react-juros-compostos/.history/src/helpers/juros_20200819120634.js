function jurosCompostos(montanteInicial, taxaJuros, periodoMeses) {
  const montanteMensal = [
    {
      valorMensal: 0,
      valorMensalMaisJuros: 0,
      valorJuroMensal: 0,
    },
  ];

  for (let index = 1; index <= periodoMeses; index++) {
    const montanteMaisJuros = montanteInicial * (1 + taxaJuros / 100) ** index;
    const montanteJuroMensal = montanteMaisJuros - montanteInicial
    montanteMensal[index - 1] = {
      valorMensal: montanteMaisJuros,
      valorMensalMaisJuros: montanteJuroMensal,
      valorJuroMensal: valorMensalMaisJuros / montanteInicial,
    };
  }

  return montanteMensal;
}
export { jurosCompostos };
