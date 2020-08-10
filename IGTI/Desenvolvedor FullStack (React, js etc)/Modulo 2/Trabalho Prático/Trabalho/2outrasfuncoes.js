import { promises as fileSystem } from 'fs';
import { format } from 'path';

let globalEstados = [];
let globalCidadeEstado = [];
/* 
2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
*/
export async function ConsultaUF(uf){
  const arrayEstado =  JSON.parse(await fileSystem.readFile(`Estados/${uf}.json`));
  return arrayEstado.length;
}

/*
3. Criar um método que imprima no console um array com o UF dos cinco estados
que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
“UF - 74”, “UF - 72”, “UF - 65”](/)
4. Criar um método que imprima no console um array com o UF dos cinco estados
que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
- 27”, “UF - 25”, “UF - 23”, “UF - 21”]
*/

export async function StateFilter(){
  try{
    const estadoOrig = JSON.parse(await fileSystem.readFile('Estados.json'));
    for( const [idx, estado] of estadoOrig.entries()){
      const qtd = await ConsultaUF(estado.sigla);
      // console.log(`${estado.sigla} - ${qtd}`);
      const dadoCidade = { uf: estado.sigla, numerocidades: qtd };
      // adiciona no array o que já tem mais o novo
      globalEstados = [...globalEstados, dadoCidade];
    };
    // imprime os 5 estados com mais cidades
    fiveCitiesMore();
    fiveCitiesMinus();

  }catch(err){
    console.log(err);
  }
}

function fiveCitiesMore(){

   // ordena por numero cidade decresente
   globalEstados.sort((previus, current) =>{
    return current.numerocidades - previus.numerocidades;
/* regra A = previus | B = current
  se B menor que A ex: 90 - 100 = -10 
        retorna negativo --> ordena A para um índice anterior que B.
  se B maior que A ex: 100 - 90 =  10
        retorna positivo --> ordena B para um índice anterior que A.
  se for igual ou seja 0
        permanece inalterados.
   */   
 });

  console.log("5 estados com mais cidades do Brasil:")
  const fiveCities = globalEstados.slice(0,5);
  let totalcities = 0;
 
  fiveCities.forEach(element => {
    totalcities += element.numerocidades;
    console.log(`${element.uf} - ${element.numerocidades}`);
  });
  console.log(`\nTotal Cidades dos 5: %d\n`, totalcities);
}

function fiveCitiesMinus(){
  // ordena numerocidade crescente
  globalEstados.sort((previus, current) => {
    return previus.numerocidades - current.numerocidades;
  });
  let totalcities = 0;
  
  console.log("\n5 estados com menos cidades do Brasil");
  const fiveCities = globalEstados.slice(0, 5);
  fiveCities.forEach(element => {
    totalcities += element.numerocidades;
    console.log(`${element.uf} - ${element.numerocidades}`);
  });
  console.log(`\nTotal Cidades dos 5: %d\n`, totalcities);
}

/*
5. Criar um método que imprima no console um array com a cidade de maior nome de
cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
Cidade – UF”, ...].
6. Criar um método que imprima no console um array com a cidade de menor nome
de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
da Cidade – UF”, ...].
7. Criar um método que imprima no console a cidade de maior nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
8. Criar um método que imprima no console a cidade de menor nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".
*/
export async function NomeCidade(){
 // console.log(globalEstados);
  for( const [idx, estado] of globalEstados.entries()){
     let dadosCidade =  await CidadeNomeMAiorMenor(estado.uf);
     globalCidadeEstado = [...globalCidadeEstado, dadosCidade];
  }
  MaiorCidadeEstado();
  MenorCidadeEstado();
  MaiorCidadeBrasil();
  MenorCidadeBrasil();
}

function MaiorCidadeEstado(){
  globalCidadeEstado.sort((prev, curr)=>{
    if(prev.uf > curr.uf)
      return 1;
    if(prev.uf < curr.uf)
      return -1;
    return 0;
  })

  console.log("Maiores Cidades por estado: ");
  globalCidadeEstado.forEach(estado =>{
    const { cidade_maior_nome, uf} = estado;
    console.log(`Nome da Cidade - ${cidade_maior_nome} - ${uf}`);
  })
}

function MenorCidadeEstado(){
  console.log("Menores Cidades por estado: ");
  globalCidadeEstado.forEach(estado =>{
    const { cidade_menor_nome, uf} = estado;
    console.log(`Nome da Cidade - ${cidade_menor_nome} - ${uf}`);
  })
}

function MaiorCidadeBrasil(){
  const maioresCidades = globalCidadeEstado.map(cidade =>{
    return {
      nome: cidade.cidade_maior_nome,
      estado: cidade.uf,
      quantidade: cidade.tamanhoMaior
    };
  });

// ordena nome crescente
maioresCidades.sort((previus, current) =>{
  if(previus.nome > current.nome)
    return 1; // previus vem depois de current
  if(previus.nome < current.nome)
    return -1; // previus vem antes de current
  
  return 0; // não interfere no array
   // Se funcaoDeComparacao(a, b) for menor que 0, ordena a para um índice anterior a b, i.e. a vem primeiro.
   // Se funcaoDeComparacao(a, b) retornar 0, deixa a e b inalterados em relação um ao outro, mas ordenado em relação a todos os outros elementos. Nota: O padrão ECMAscript não garante este comportamento, e, portanto, nem todos os navegadores (e.g. Versões do Mozilla anteriores a 2003) respeitarão isto.
   // Se funcaoDeComparacao(a, b) é maior que 0, ordena b para um índice anterior que a.
});

// retorna o maior nome cidade
const maior = maioresCidades.reduce((prev, current) => (prev.quantidade > current.quantidade) ? prev : current);

console.log(`\n O maior nome de cidade do Brasil ${JSON.stringify(maior)}.`);
}

function MenorCidadeBrasil(){
  const menoresCidades = globalCidadeEstado.map(cidade =>{
    return {
      nome: cidade.cidade_menor_nome,
      estado: cidade.uf,
      quantidade: cidade.tamanhoMenor
    };
  });

  // ordena nome crescente
menoresCidades.sort((previus, current) =>{
  if(previus.nome > current.nome)
    return 1;
  if(previus.nome < current.nome)
    return -1;

  return 0;
});

 // retorna o menor nome cidade
const menor = menoresCidades.reduce((prev, current) => (prev.quantidade < current.quantidade) ? prev : current);

console.log(`\n O menor nome de cidade do Brasil ${JSON.stringify(menor)}.`);
}

async function CidadeNomeMAiorMenor(uf){
  const arrayCidade = JSON.parse(await fileSystem.readFile(`Estados/${uf}.json`));

  //ordenando cidades do estado por nome crescente
  arrayCidade.sort((previus, current) =>{
    if(previus.nome > current.nome)
      return 1;
    if(previus.nome < current.nome)
      return -1;
    return 0;
  });

  let cidadeMaiorNome = "";
  let cidadeMenorNome = arrayCidade[0].nome;
   arrayCidade.forEach(cidade => {
     if(cidadeMaiorNome.length < cidade.nome.length)
        cidadeMaiorNome = cidade.nome;

     if(cidadeMenorNome.length > cidade.nome.length)
        cidadeMenorNome = cidade.nome;
   });
   return { cidade_menor_nome: cidadeMenorNome, 
            tamanhoMenor: cidadeMenorNome.length,
            cidade_maior_nome: cidadeMaiorNome, 
            tamanhoMaior: cidadeMaiorNome.length,
            uf: uf 
          }
}


