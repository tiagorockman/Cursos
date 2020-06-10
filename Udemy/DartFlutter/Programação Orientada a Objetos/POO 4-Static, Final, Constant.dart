class Valores {
  
  static const tamanhoBotoes = 20.0;
  
  //static ao chamar não precisa instanciar o objeto/classe
  static int vezesClicado;
  
  static void teste() {
    print("Teste!");
  }
  
}

class Pessoa {
  
}

void main() {
  
	Valores.vezesClicado = 2;
  print(Valores.vezesClicado);
  
  Valores.teste();
  
  print(Valores.tamanhoBotoes);
  //Valores.tamanhoBotoes = 10;
  
  //final em tempo de execução você não pode instanciar a classe mais de uma vez
  final Pessoa pessoa = Pessoa();
  final pessoa2 = Pessoa();
  
}