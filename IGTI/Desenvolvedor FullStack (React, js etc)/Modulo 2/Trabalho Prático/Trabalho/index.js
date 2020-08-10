import {promises as fileSystem} from "fs";
import geraJsonEstados from './1GeradorEstCid.js';
import {ConsultaUF,StateFilter,NomeCidade} from './2outrasfuncoes.js';

//Cidades = [];
//EstadosOrig = [];

init();

async function init(){

  await geraJsonEstados();
  
  const uf = "AC";
  const qtd = await ConsultaUF(uf);
  console.log(`O estado ${uf} tem ${qtd} cidades.`);

  await StateFilter(); // 5 maiores e menores cidades / estado
  await NomeCidade(); // maiores e menores nomes cidades / estado

}

