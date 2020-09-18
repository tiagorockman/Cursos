import { AlunosFormComponent } from '../alunos/alunos-form/alunos-form.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IFormCanDeactivate } from './Iform-candeactivate';

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

    canDeactivate(
        component: IFormCanDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('guarda de desativação executado');
        return component.podeDesativar();
    }
}
