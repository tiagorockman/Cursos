import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private alunos : Aluno[] = [
    {id:1, nome: 'Aluno 01', email: 'aluno01@gmail.com'},
    {id:2, nome: 'Aluno 02', email: 'aluno02@gmail.com'},
    {id:3, nome: 'Aluno 03', email: 'aluno03@gmail.com'},
  ];

  getAlunos(){
    return this.alunos;
  }

  getAluno(id : number){
    let aluno  = this.alunos.find(a => a.id == id);

  //  console.log("ID RECEBIDO: " + id);
  //  console.log("ALUNO: " + aluno);

    return aluno;
  }

  constructor() { }
}
