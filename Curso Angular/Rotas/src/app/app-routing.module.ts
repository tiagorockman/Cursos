import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes: Routes = [
  {
    path: 'cursos',
    loadChildren: 'src/app/cursos/cursos.module#CursosModule', //this is LazyLoading
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard]
  }, //performance Lazy Loading (carregamento sob demanda)
  {
    path: 'alunos',
    loadChildren: 'src/app/alunos/alunos.module#AlunosModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
    // canActivateChild: [AlunosGuard]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
