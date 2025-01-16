///Criando array
const a_rr = [1, 2, 3, 4];
console.log(a_rr);
const a_rr2 = new Array(1, 2, 3, 4)
console.log(a_rr2);

//Array.of Cria nova instancia de array
const newArray = Array.of('John', 'Cris', 'Yennifer')
console.log(newArray)

//Array
const arrayVazio3 = Array(3)
const array3com2comovalue = Array(3, 2)
console.log(`Array Vazio de 3 pos ${arrayVazio3} - \n Array com valor 3 e 2 ${array3com2comovalue}`)

//Array.from cria uma nova instancia de array a partir de um parametro array-like ou iterable object
//const divs = document.querySelectorAll('div');//armazena todas as divs da página na const divs armazena como nodelist
//const arrAlldivs = Array.from(divs); //transforma em array

//push adiciona 1 ou mais elementos no final do array - retorna todo array
newArray.push("Julian")
console.log("Push: " + newArray);
//pop remove ultimo elemento retorna elemento removido
newArray.pop("Julian")
console.log("Pop: " + newArray);
//unshift adiciona no inicio e retorna novo array
newArray.unshift("Ariane")
console.log("Unshift: " + newArray);
//remove do inicio do array e retorna item removido
newArray.shift("Ariane")
console.log("Shift " + newArray)
//concat concatena um ou mais arrays retornando um novo array
const merge = newArray.concat(a_rr);
console.log("Concat " + merge)
//slice retorna array fatiando o array de acordo com inicio e fim
console.log(merge.slice(0, 2)); //inicia o corte da posição 0 até 1
console.log(merge.slice(2)); //inicia o corte a partir da posição 2
console.log(merge.slice(-1)); //ultima posição
console.log(merge.slice(-3)); //3 ultimas posições 
//splice Altera um array adicionando novos elementos enquanto remove elementos antigos
console.log(merge.splice(2));//a partir da pos 2 remove os itens diretamente no array (não imutável)
merge.splice(0, 0, 'addedItem')// 0 posição, 0 não deleta, 'addedItem' adiciona após a primeira pos
console.log("Splice " + merge);
merge.splice(2, 1, "Item1", "Item2");//remove item da pos 2 e adiciona dois itens
console.log("Splice " + merge);



const frutas = Array.of("melancia", "acerola", "laranja", "amora");
//foreach apenas itera o array
/*
frutas.forEach(fruta => console.log(fruta));
frutas.forEach((fruta, index) => console.log(index, fruta));
frutas.forEach((fruta, index, arr) => console.log(index, fruta, arr))
*/
//map retorna um novo array
/*
var fmap = frutas.map((fruta, index) => `${index} - ${fruta}`)
console.log(fmap);
*/
//flat retorna um array com todos elementos de um subarray concatenados de forma recursiva.
/*
const idades = [20, 34, [35, 60, [70, 40]]];
console.log(idades)
console.log(idades.flat(2))//profundidade 2
*/
//flatmap retona novo array e executa flat de profundidade 1
/*
array.values e array.keys retorna as chaves e valores de array
exemplo: */

const arr = [1, 2, 3, 4];
const arrIterator = arr.entries()
arrIterator.next();

//find Busca de acordo com filtro
const firstItemGreaterThanTwo = arr.find(value => value > 2);
console.log(`firstItemGreaterThanTwo: ${firstItemGreaterThanTwo}`);
//findIndex retorna indice do item conforme condição
const firstIndexGreaterThanTwo = arr.findIndex(value => value > 2);
console.log(`firstIndexGreaterThanTwo: ${firstIndexGreaterThanTwo}`);
//filter realiza filtro e retorna novo array com elementos encontrados
const allValuesGreaterThanTwo = arr.filter(value => value > 2);
console.log(`allValuesGreaterThanTwo: ${allValuesGreaterThanTwo}`);
//indexOf retorna primeira ocorrencia de valor em index e lastIndexOf ultimo indice que um elemento é encontrado no array
const fIndexOf = arr.indexOf(3);
const flastIndexOf = arr.lastIndexOf(3);
console.log(`fIndexOf: ${fIndexOf} - flastIndexOf: ${flastIndexOf} `);
//includes verifica se determinado elemento existe em array
const hasItemOne = arr.includes(1);
console.log(`Tem item 1?:  ${hasItemOne} `);
//some retorna true se pelo menos um item satisfaz a condição
const TemPar = arr.some(value => value % 2 === 0)
console.log(`Tem Par?:  ${TemPar} `);
//every saber se todos os satisfazem a condição
const TodosPar = arr.every(value => value % 2 === 0)
console.log(`Todos são Pares?:  ${TodosPar} `);
//sort ordena conforme condição
const familia = [
    { nome: 'Tiago', idade: 35 },
    { nome: 'Katia', idade: 27 },
    { nome: 'Julie', idade: 4 },
    { nome: 'Sophia', idade: 10 },
    { nome: 'Iago', idade: 8 }
];

const familiaIdadeDESC = familia.sort((current, next) => next.idade - current.idade);
//familiaIdadeDESC

const familia2 = [
    { nome: 'Andre', homem: true },
    { nome: 'Zuleica', homem: false },
    { nome: 'Antonia', homem: false },
    { nome: 'Erlana', homem: false },
    { nome: 'Zulu', homem: true }
];

//ordena os true primeiro
 familia2.sort((a,b) => {
        if(a.homem && !b.homem) return -1;  //se o item a for concluido e b não for retorna 1
        else if(!a.homem && b.homem) return 1;  //se a não estiver concluido e b estiver retorna -1
        else return 0; //se a e b iguais
      });
	  
//ordena alfabeticamente por grupo de homem e mulher
familia2.sort((current, next) => {
	if(current.homem && next.homem){ //se atual e proximo for homem
		if(current.nome < next.nome) return -1;
		if(current.nome > next.nome) return 1;
		return 0;
	}else  if(!current.homem && !next.homem){ //se atual e proximo for mulher
		if(current.nome < next.nome) return -1;
		if(current.nome > next.nome) return 1;
		return 0;
	}else
		return 0;	
});

users.sort(function(a, b){
    if(a.firstname < b.firstname) { return -1; }
    if(a.firstname > b.firstname) { return 1; }
    return 0;
})

//reverse inverte elementos de um array
console.log("Reverse :" + arr.reverse());
//join junta os elementos de um array separado por um delimitador, retorna string 
console.log("Join: " + arr.join('|'))
//reduce itera cada posição do array e retorna outro tipo de dado.
console.log("Reduce Total :" +
    arr.reduce((total, value) => total += value, 0)// total inicia em 0 e vai somando até o final do array
);
//media de idade
console.log("Idade Média :" +
    familiaIdadeDESC.reduce((totalIdade, familia) => totalIdade += familia.idade, 0) / familia.length
);