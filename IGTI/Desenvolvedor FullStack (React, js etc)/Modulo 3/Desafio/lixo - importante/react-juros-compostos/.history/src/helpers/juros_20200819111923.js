function jurosCompostos(montanteInicial, taxaJuros, periodoMeses ) {
    return montanteInicial * ((1 + taxaJuros) ** periodoMeses);
}