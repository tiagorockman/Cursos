import { CidadeBr } from './../models/cidades-br';
import { EstadoBr } from './../../../../../angular-cli-libs-externas/src/app/estado-br';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidadesBr(IdEstado: number){
  // console.log(`${IdEstado}`);
    return this.http.get<CidadeBr[]>('assets/dados/cidadesbr.json')
      .pipe(
        map((cidades: CidadeBr[]) => {
        // console.log(cidades);
          // tslint:disable-next-line: triple-equals
          return cidades.filter(c => c.estado == IdEstado);
        })
      );
  }

  getCargos() {
    return [
      {
        nome: 'Dev',
        nivel: 'Junior',
        desc: 'Dev JR',
      },
      {
        nome: 'Dev',
        nivel: 'Pleno',
        desc: 'Dev Pl',
      },
      {
        nome: 'Dev',
        nivel: 'Senior',
        desc: 'Dev Sr',
      },
    ];
  }


getTecnologias(){
  return [
    {nome: 'java', desc: 'Java'},
    {nome: 'javascript', desc: 'JavaScript'},
    {nome: 'php', desc: 'PHP'},
    {nome: 'ruby', desc: 'Ruby'},
    {nome: '.net', desc: '.NET'}
  ];
}

getNewsletter(){
  return [
    {valor: 's', desc:'Sim'},
    {valor: 'n', desc: 'Não'}
  ]
}

}
