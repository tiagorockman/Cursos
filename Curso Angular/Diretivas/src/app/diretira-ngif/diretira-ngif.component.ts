import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretira-ngif',
  templateUrl: './diretira-ngif.component.html',
  styleUrls: ['./diretira-ngif.component.css']
})
export class DiretiraNgifComponent implements OnInit {

  cursos: string[]=["Angular 2"];
  mostrarCursos: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onMostrarCursos(){
    this.mostrarCursos =!this.mostrarCursos;
  }

}
