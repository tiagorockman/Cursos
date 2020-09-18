import { log } from 'util';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) {}

    verificarEmail(email: string){
      return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(3000), // espera 3 segundos antes de chamar
        map((dados: { emails: any[] }) => dados.emails), // informa que o retorno terá uma propriedade emails do tipo array
        tap(console.log), // verifica se está recebendo a resposta correta
        map((dados: {email: string }[]) => dados.filter(v => v.email === email)), // pega apenas a propriedade email do retorno e verifica se é igual ao email recebido
        tap(console.log),
        map((dados: any[]) => dados.length > 0), // retorna true se o email existe na base json
        tap(console.log)
      );
    }

}
