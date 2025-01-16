
//promises - utilizada para melhor chamada de processos assíncronos
const doSomethingPromise = new Promise((resolve, reject) => {
    //throw new Error('Something went wrong');
    setTimeout(function () {
        //não precisa de try catch pois já possui o reject caso erro
        resolve('First data');
    }, 1000);
});

const doOtherthingPromise = new Promise((resolve, reject) => {
    setTimeout(function () {
        //não precisa de try catch pois já possui o reject caso erro
        resolve('Second data');
    }, 1000);
});

//Promise não é necessário invocá-la
console.log(doSomethingPromise); //chama assim retorna pending pois ela só é executada após 1 seg

//retorna promise pending -  quando está em execução
//retorna Fulfilled - quando terminou de executar
//retorna Rejected - quando acontece erro


doSomethingPromise.then(data => console.log(data)); // para chamar e receber com sucesso precisa do uso do then

//doSomethingPromise.then(data => console.log(data)).catch(error => console.log(error)); //throw error
//chamando as duas promisses 
doSomethingPromise
    .then(data => {
        console.log(data);
        return doOtherthingPromise;
    })
    .then(data2 => console.log(data2))
    .catch();

//chamando em paralelo
//Cria promise like Function
const doSomethingPromiseAutoFunc = () =>
    new Promise((resolve, reject) => {
        //throw new Error('Something went wrong');
        setTimeout(function () {
            //não precisa de try catch pois já possui o reject caso erro
            resolve('First data');
        }, 1500);
    });

const doOtherthingPromiseAutoFunc = () =>
    new Promise((resolve, reject) => {
        setTimeout(function () {
            //não precisa de try catch pois já possui o reject caso erro
            resolve('Second data');
        }, 1000);
    });

Promise.all([doSomethingPromiseAutoFunc(), doOtherthingPromiseAutoFunc()]).then((data) => {
    console.log("Wait until all executed: ");
    console.log(data[0].split(''));
    console.log(data[1].split(''));
}).catch(err => {
    console.log(err);
});

//exibe quem for executada primeiro
Promise.race([doSomethingPromiseAutoFunc(), doOtherthingPromiseAutoFunc()]).then(data => {
    console.log("First Executed: " + data);
})







//callback - para tratamento de erros precisaria de vários try catch nas chamadas
function doSomething(callback) {
    setTimeout(function () {
        //printa após 1 seg e retorna o dado para o callback
        callback('First data');
    }, 1000);
}

function doOtherThing(callback) {
    setTimeout(function () {
        //faça outra coisa e retorna o dado para o callback
        callback('Second data');
    }, 100)
}

//chamando as funções de forma sequencial
function doAll() {
    doSomething(function (data) {
        var processData = data.split('');

        doOtherThing(function (data2) {
            var processData2 = data2.split('');

            setTimeout(function () {
                console.log(processData, processData2);
            }, 1000)
        })
    })
}

//doAll();
