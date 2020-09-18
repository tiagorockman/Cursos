import { Component, OnInit } from '@angular/core';
import { CursoService } from '../cursos/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

cursos: any[];
pagina: number;
inscriacao: Subscription;

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.cursos = this.cursoService.getCursos();
    this.inscriacao = this.route.queryParams.subscribe(
      (queryParams: any) =>{
        this.pagina = queryParams['pagina'];
      }
    )
    }

    ngOnDestroy() {
      this.inscriacao.unsubscribe();
    }

    proximaPagina(){
      this.pagina++;
      this.router.navigate(['/cursos'],
      {queryParams: {'pagina': this.pagina}})
    }
}
