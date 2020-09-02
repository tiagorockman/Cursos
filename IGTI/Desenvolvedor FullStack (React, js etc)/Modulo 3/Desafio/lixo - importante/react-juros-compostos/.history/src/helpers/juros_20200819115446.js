function jurosCompostos(montanteInicial, taxaJuros, periodoMeses) {
    const montanteMensal = [{
        valorMensal: 0,
        jurosMensal: 0,
    }];

    for (let index = 1; index <= periodoMeses; index++) {
      //const element = array[index];
      montanteMensal[index - 1] = {
        valorMensal: montanteInicial * (1 + taxaJuros / 100) ** index
      }
    }

  return montanteMensal;
}
export { jurosCompostos };
