import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-style',
  templateUrl: './diretiva-style.component.html',
  styleUrls: ['./diretiva-style.component.css']
})
export class DiretivaStyleComponent implements OnInit {

  ativo: boolean = false;
  tamanhoFonte: number = 10;

  constructor() { }

  ngOnInit() {
  }

  mudarAtivo(){
    this.ativo = !this.ativo;
  }

}
