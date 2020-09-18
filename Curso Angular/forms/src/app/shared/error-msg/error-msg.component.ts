import { FormValidations } from './../form-validations';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {


  // @Input() mostrarErro: boolean;
  // @Input() msgErro: string;

  @Input() control: FormControl;
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

  // nessa linha estamos definindo uma propriedade da Classe e não um método
  get errorMessage(){

    // iterando os erros
    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) && // confere se o controle tem essa propriedade
         this.control.touched)
       {
          return FormValidations.getErrormsg(this.label, propertyName, this.control.errors[propertyName])
       }
    }
      return null;
  }

}
