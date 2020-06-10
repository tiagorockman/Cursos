/* use esse código no site - https://dartpad.dartlang.org*/

class Pessoa {
  
		  String nome;
		  int _idade;
		  double _altura;
		  
		  /* Construtor padrão
		  Pessoa(String nome, int idade, double altura) {
			this.nome = nome;
			this.idade = idade;
			this.altura = altura;
		  }
		  */
		  
		  //novo construtor
		  Pessoa(this.nome, this._idade, this._altura);
		  
		  //Método nascer
		  Pessoa.nascer(this.nome, this._altura) {
			_idade = 0;
			print("$nome nasceu!");
			dormir();
		  }
		  
      //Método dormir
		  void dormir() {
			print("$nome está dormindo!");
		  }
		  
      //Método aniversário 
		  void aniver() {
        //idade não pode ser acessada de fora
			_idade++;
		  }
		  
      //GET para setar idade 
		  int get idade => _idade;
		  
      //GET para setar altura
		  double get altura => _altura;
		  
      //SET para setar altura que também é protegida
		  set altura(double altura){
			if(altura > 0.0 && altura < 3.0){
			  _altura = altura;
			}
		  }
   
}

void main() {
  
  //usa o contrutor
  Pessoa pessoa1 = Pessoa("João", 30, 1.80);
  
  //usa o contrutor
  Pessoa pessoa2 = Pessoa("Thiago", 28, 1.90);
  
  print(pessoa1.nome);
  print(pessoa2.nome);
  
  print(pessoa1.idade);
  pessoa1.aniver();
  print(pessoa1.idade);
  
  pessoa2.dormir();
  
  
  Pessoa nene = Pessoa.nascer("Enzo", 0.30);
  print(nene.nome);
  //pega a idade que é publico para pegar _idade
  print(nene.idade);
  
  //seta altrua que vai para _altura
  nene.altura = 15.0;
  print(nene.altura);
  
}


