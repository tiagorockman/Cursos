import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  // cria a variavel formulário para reaproveitar pois no data-form já é formulario
  formulario: FormGroup;

  constructor() { }

  abstract submit();

  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }else {
      // formulario invalido
      console.log('form invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        // se o controle é instancia de formgrupo
        // utiliza a recursividade e verifica todos os campos de endereco
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    // this.formulario.reset();
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaRequired(campo: string) {
    return (
      !this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }
  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  getCampo(campo: string){
    return this.formulario.get(campo);
  }

  ngOnInit(): void {
  }

}
