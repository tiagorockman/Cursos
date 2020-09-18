import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

getCurso(id: number){
  let cursos = this.getCursos();
  for(let i=0;i<cursos.length;i++){
    let curso = cursos[i];
    if(curso.id == id )
      {
        console.log("retornoucurso: " + curso);
        
        return curso;
      }
  }
  console.log("retornouNull: ");
  return null;
}

  getCursos(){
    return [
      {id: 1, nome: 'Angular 2'},
      {id: 2, nome: 'C#'},
    ]
  }
  constructor() { }
}
