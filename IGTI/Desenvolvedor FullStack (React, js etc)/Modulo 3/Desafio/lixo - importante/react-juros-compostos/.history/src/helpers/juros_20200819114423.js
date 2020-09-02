function jurosCompostos(montanteInicial, taxaJuros, periodoMeses) {
  return montanteInicial * (1 + taxaJuros / 100) ** periodoMeses;
}
export { jurosCompostos };
