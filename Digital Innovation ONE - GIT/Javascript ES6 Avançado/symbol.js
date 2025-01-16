//Symbols

const uniqueID = Symbol('Hello');

//Conhecendo Symbols -- iterator
Symbol.iterator;
Symbol.split;
Symbol.toStringTag;

const arr = [1, 2, 3, 4];
const iterat = arr[Symbol.iterator](); //consegue fazer iteração do array conforme prints abaixo

console.log(iterat.next());
console.log(iterat.next());
console.log(iterat.next());
console.log(iterat.next());
console.log(iterat.next());


//Generators
//executa até o yield e para a execução, dependento da chamado do next
function* hello() {
    console.log('Hello');
    yield 1;

    console.log('From');
    yield 2;

    console.log('Function!');
}

const it = hello();
console.log(it.next());
console.log(it.next());
console.log(it.next());