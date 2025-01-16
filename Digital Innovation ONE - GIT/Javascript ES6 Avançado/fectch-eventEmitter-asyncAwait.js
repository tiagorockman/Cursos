//fecht tem mesmo funcionamento do xmlhttpRequest mas usa promises, não tendo tanto problema com os callback
/*
fetch("'/data.json'").then(responseStream => {
    console.log(responseStream);
    responseStream.json().then(data => { //responseStream é uma promise e retorna os dados
        console.log(data)

    });
})
*/
//async /await ES7

const simpleFunc = async () => {
    //throw new Error('Test: Oh no');
    return 12345;
}
//retorna uma Promise já resolvida
console.log(simpleFunc())

//para ver o conteúdo
simpleFunc().then(data => {
    console.log(data);
})  //retorno de erro
    .catch(err => {
        console.log(err);
    })

//async await
const asyncTimer = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(123456);
    }, 1000);
})

const simpleFunc2 = async () => {
    const data = await asyncTimer();
    return data
}

simpleFunc2().then(data => {
    console.log(data);
})  //retorno de erro
    .catch(err => {
        console.log(err);
    })


//EventEmitter

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('User logged', data => {
    console.log(data);
});
emitter.emit('User logged', { user: 'Tiago Neves' });



const EventEmitter2 = require('events');
class Users extends EventEmitter2 {
    //extende da classe emitter
    userLogged(data) {
        this.emit('User logged2', data);
    }
}
const users = new Users();
users.on('User logged2', data => {
    console.log(data);
});

users.userLogged({ user: 'James Snow' });