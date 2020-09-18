import { NgModule } from '@angular/core';
import { AlunosComponent } from './alunos.component';
import { CommonModule } from '@angular/common';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRountingModule } from './alunos.routing.module';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosService } from './alunos.service';
import { FormsModule } from '@angular/forms';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guard/aluno-detalhe.resolver';

@NgModule({
  declarations: [
    AlunoDetalheComponent,
    AlunosFormComponent,
    AlunosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlunosRountingModule

  ],
  providers: [
    AlunosService,
    AlunosDeactivateGuard,
    AlunoDetalheResolver
  ],
  bootstrap: []
})
export class AlunosModule { }
