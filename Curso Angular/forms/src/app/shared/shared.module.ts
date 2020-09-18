import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownService } from './services/dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { BaseFormComponent } from './base-form/base-form.component';

@NgModule({
  declarations: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent, InputFieldComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent, InputFieldComponent],
  providers: [DropdownService],
})
export class SharedModule {}
