function jurosCompostos(montanteInicial, taxaJuros, periodoMeses) {
    const montanteMensal = [{
        valorMensal: 0,
        valorMensalMaisJuros: 0,
    }];

    for (let index = 1; index <= periodoMeses; index++) {
      //const element = array[index];
      montanteMensal[index - 1] = {
        valorMensal: montanteInicial * (1 + taxaJuros / 100) ** index,
        valorMensalMaisJuros: valorMensal - montanteInicial,
      }
    }

  return montanteMensal;
}
export { jurosCompostos };
