import { NgModule } from '@angular/core';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoService } from './curso.service';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './curos.routing.module';

@NgModule({
    imports:[
        CommonModule,
        CursosRoutingModule
    ],
    exports: [],
    declarations: [
       CursosComponent,
       CursoDetalheComponent,
       CursoNaoEncontradoComponent 
    ],
    providers:[CursoService],
})
export class CursosModule{}