import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {
  aluno: any;
  inscricao: Subscription;

  constructor(private route: ActivatedRoute,
    private alunosService: AlunosService,
    private router: Router /*para rotas imperativas*/
  ) { }

  ngOnInit() {
    /* this.inscricao = this.route.params.subscribe(
       (params: any) => {
         let id = params['id'];
         this.aluno = this.alunosService.getAluno(id);
       }
     );*/
    this.inscricao = this.route.data.subscribe(
      (info) => {
        console.log(info);
        this.aluno = info.aluno;
      }
    );
  }

  /*rota imperativa*/
  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  ngOndestroy() {
    this.inscricao.unsubscribe();
  }

}
