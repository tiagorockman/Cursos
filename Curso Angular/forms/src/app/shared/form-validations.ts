
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
  // valida se pelo menos 1 check framework está marcado
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /* const values = formArray.controls;
       let totalChecked = 0;

       for (let i=0;i< values.length; i++){
         if(values[i].value){ // se for true
           totalChecked +=1;
         }
       }*/ // Programação Estruturada

      // Linhas abaixo Programação Funcional - Reativa
      const totalChecked = formArray.controls
        .map(v => v.value) // gera um array de true ou false
        .reduce((total, atual) => atual ? total + atual : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equaisTO(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(formControl.root as FormGroup).controls) {
        return null;
      }

      const field = (formControl.root as FormGroup).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;

    };
    return validator;
  }

  static getErrormsg(fieldName: string, validatorNAme: string, validatorValue?: any) {
    // console.log(`fieldName: ${fieldName}, validatorNAme: ${validatorNAme}, validatorValue: ${validatorValue} `);

    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: `CEP inválido.`
    };
    return config[validatorNAme];
  }
}
