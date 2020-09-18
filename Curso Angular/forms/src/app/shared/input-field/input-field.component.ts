import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACESSOR]
})
export class InputFieldComponent implements ControlValueAccessor  {


  @Input() classeCSS;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() control;
  @Input() isReadOnly = false;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }
  set value(v: any){
    if(v !== this.innerValue){
      this.innerValue = v;
      // avisar para o angular que esse valor foi alterado
      this.onChangeCallBack(v);
    }
  }

  // funcao falsa para ajudar na tarefa de avisar para o angular que o set foi invocado
  // as funções recebem qualquer parametro
  onChangeCallBack: (_:any) => void =() => {};
  onTouchedCallBack: (_:any) => void =() => {};

  writeValue(v: any): void {
   if(v !== this.innerValue){
    //  this.innerValue =v;
    //  this.onChangeCallBack(v)
    this.value = v; // já realiza a chamada da função onChangeCallBack
   }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallBack = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallBack = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }



}
