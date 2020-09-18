import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.verificarAcesso();
  }

  private verificarAcesso() {
    if (this.authService.usuarioEstaAutenticado()) {
      console.log('UsuarioAutenticado');

      return true;
    }
    console.log('UsuarioNaoAutenticado');

    this.router.navigate(['/login'])

    return false;
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    console.log('canLoad: verificando se usuario pode carregar o codigo do módulo');

    return this.verificarAcesso();
  }


}
