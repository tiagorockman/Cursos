function retornaValorDuplicado(valor) {
  return valor * 2;
}

//retorna valor
returnaValorDuplicado(4);

/*Uma função retorna o que ela quiser exemplo função que retorna objeto vazio*/
function criaObjeto() {
  let objeto = {};

  return objeto;
}

criaObjeto();
criaObjeto();
criaObjeto();
//todos os retornos acima estão são apenas lixos pois não são atribuidos a nada

//Atribuindo retorno a variaveis
let pessoaA = criaObjeto();
let pessoaB = criaObjeto();
//Agora pessoaA e B tem um objeto em branco dentro delas
pessoaA;
pessoaB;
//Podemos então adicionar propriedades tanto a objeto pessoaA ou B e eles terão suas probpriedades próprias
pessoaA.nome = 'Tiago';
pessoaB.nome = 'James';
pessoaA;
pessoaB;

/*********************************************************************************************** */
/************************************************************************* */
//seguindo esse princípio vamos criar a função abaixo que ira criar pessoas
//com suas propriedades
function fabricarPessoa(nome, sobrenome) {
  let pessoa = {};
  pessoa.nome = nome;
  pessoa.sobrenome = sobrenome;

  //funcao não pode ser acessada pois não é retornada na interface
  //publica da funcao fabricarPessoa
  function nomeCompleto() {
    return `${pessoa.nome} ${pessoa.sobrenome}`;
  }

  //com essa linha expoe a função criada internamente
  pessoa.nomeCompleto = nomeCompleto;

  return pessoa;
}

let pessoaA = fabricarPessoa('Tiago', 'Neves');
let pessoaB = fabricarPessoa('James', 'Snows');
//as propriedades nome e sobrenome são propriedades públicas e podemos interagir
pessoaA.nome;
pessoaB.sobrenome;

//Não tem acesso
let pessoaA = fabricarPessoa('Jhon', 'Vanilha');
pessoaA.nomeCompleto();

//depois de alterar o processo
let pessoaA = fabricarPessoa('Jhon', 'Vanilha');
pessoaA.nomeCompleto();

///Exemplo de Factory ou fábrica
//https://github.com/filipedeschamps/cep-promise
