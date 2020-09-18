import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

export class AlunosGuard implements CanActivateChild {

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

        console.log(route);
        console.log(state);

        //não deixando usuário editar
        if (state.url.includes('editar')) {
            //  alert('Você não tem permissão para essa ação.');
            //  return false;
        }

        return true;
    }

}