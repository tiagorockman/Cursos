/*
1. Criar uma função que irá criar um arquivo JSON para cada estado representado 
no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes 
a aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve 
ser o UF do estado, por exemplo: MG.json.
*/

import { promises as fileSystem } from 'fs';
import { exit } from 'process';

async function geraJsonEstados(){
    await MakeDir();
    const estadosOrig = JSON.parse(await fileSystem.readFile('Estados.json'));
    const cidadesOrig = JSON.parse(await fileSystem.readFile('Cidades.json'));
    
    for( const [idx,estado] of estadosOrig.entries()){
     const estadoCidade = cidadesOrig.filter(cidades => cidades.estado == estado.id);
     const path = `Estados/${estado.sigla}.json`;
     const fileExists = await FileExists(path);
     if(!fileExists){
       await fileSystem.writeFile(path, JSON.stringify(estadoCidade));
     }
    }
 
 // console.log(estadosOrig);
 // console.log(estadoCidade);
}

async function MakeDir(){
  try{
    await fileSystem.mkdir('Estados');
  }catch(err){
    if(err && err.code === 'EEXIST')
      {
        return;
      }else{
        console.log("<MSG>:" + err);
        exit(1);
      }
  }
}

async function FileExists(path){
  try {
    await fileSystem.access(path);
    return true;
  } catch (error) {
   // console.log("<MSG>: " + error);
    return false; // não existe
  }  
}

export default geraJsonEstados;