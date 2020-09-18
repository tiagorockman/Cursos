import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

  usuario: any = {
    nome: null,
    email: null,
  };

  onSubmit(form) {
    console.log(form);

    /*EndPointOnline de teste https://resttesttest.com/ */
    this.http
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe((res) => console.log(res));
  }

  ngOnInit(): void {}
  vaerificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }
  aplicaCssErro(campo) {
    return {
      'has-error': this.vaerificaValidTouched(campo),
      'has-feedback': this.vaerificaValidTouched(campo),
    };
  }
  consultaCEP(cep, form) {
    // console.log(cep);
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) => this.populaDadosForm(dados, form));
    }
    return of({}); //retorna vazio
  }

  populaDadosForm(dados, formulario) {
    /*  formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
          cep: dados.cep,
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
    });*/

    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
}
