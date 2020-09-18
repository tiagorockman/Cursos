import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCepService {
  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {

      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http.get(`http://viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
