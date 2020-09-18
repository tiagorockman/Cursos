import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../curso.service';



@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursoService
  ) { 
    this.id = this.route.snapshot.params['id'];
    console.log(this.route);
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.curso = this.cursosService.getCurso(this.id);

        if (this.curso == null){
            this.router.navigate(['/cursos/naoEncontrado']);
        }
      }
    );
  }
}