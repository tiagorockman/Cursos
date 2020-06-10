//JsES 6 Functions

//Antiga
function fn() {
    return 'Code here'; zxx
}

//nova função com apenas um retorno Arrow Functions
const arrowFn = () => 'Code here';
const arrowFn2 = () => {
    //Mais de um expressao
    return 'Code here';
}

//Funções também são objetos
fn.prop = 'Posso criar propriedades';

console.log(fn());
console.log(fn.prop);

//Receber parâmetros
const logValue = value => console.log(value);
const logFnResult = fnParam => console.log(fnParam());

logFnResult(fn);
