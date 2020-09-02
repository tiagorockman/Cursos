function jurosCompostos(montanteInicial, taxaJuros, periodoMeses) {
    const montanteMensal = [];

    for (let index = 0; index < periodoMeses; index++) {
      //const element = array[index];
      montanteMensal[index] =
        montanteInicial * (1 + taxaJuros / 100) ** periodoMeses;
    }

  return montanteMensal;
}
export { jurosCompostos };
