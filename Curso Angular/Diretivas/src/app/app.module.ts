import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DiretiraNgifComponent } from './diretira-ngif/diretira-ngif.component';
import { DiretivaNgclassComponent } from './diretiva-ngclass/diretiva-ngclass.component';
import { DiretivaNgSwitchComponent } from './diretiva-ng-switch/diretiva-ng-switch.component';
import { DiretivaNgforComponent } from './diretiva-ngfor/diretiva-ngfor.component';
import { DiretivaStyleComponent } from './diretiva-style/diretiva-style.component';
import { OperadorElvisComponent } from './operador-elvis/operador-elvis.component';
import { DiretivaNgcontentComponent } from './diretiva-ngcontent/diretiva-ngcontent.component';
import { FundoAmareloDirective } from './shared/fundo-amarelo.directive';
import { DiretivasCustomizadasComponent } from './diretivas-customizadas/diretivas-customizadas.component';
import { HighlightMouseDirective } from './shared/highlight-mouse.directive';
import { HighlightDirective } from './shared/highlight.directive';
import { NgElseDirective } from './shared/ng-else.directive';

@NgModule({
  declarations: [
    AppComponent,
    DiretiraNgifComponent,
    DiretivaNgclassComponent,
    DiretivaNgSwitchComponent,
    DiretivaNgforComponent,
    DiretivaStyleComponent,
    OperadorElvisComponent,
    DiretivaNgcontentComponent,
    FundoAmareloDirective,
    DiretivasCustomizadasComponent,
    HighlightMouseDirective,
    HighlightDirective,
    NgElseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
