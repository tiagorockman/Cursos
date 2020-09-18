import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosGuard } from '../guards/alunos.guard';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guard/aluno-detalhe.resolver';

/*
const alunosRoutes : Routes = [
    {path: 'alunos', component: AlunosComponent },
    {path: 'alunos/novo', component: AlunosFormComponent}, /*hard coded primeiro para nao aconetecer colisão de rota*/
/*   {path: 'alunos/:id', component: AlunoDetalheComponent},
   {path: 'alunos/:id/editar', component: AlunosFormComponent}
   
];*/


/*ROTAS FILHAS*/

const alunosRoutes: Routes = [
    {
        path: '', component: AlunosComponent,
        canActivateChild: [AlunosGuard],
        children: [
            { path: 'novo', component: AlunosFormComponent },
            {
                path: ':id', component: AlunoDetalheComponent,
                resolve: { aluno: AlunoDetalheResolver }
            },
            {
                path: ':id/editar', component: AlunosFormComponent,
                canDeactivate: [AlunosDeactivateGuard]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(alunosRoutes)
    ],
    exports: [RouterModule]
})
export class AlunosRountingModule { }