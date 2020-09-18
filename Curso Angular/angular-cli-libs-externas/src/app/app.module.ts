import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'materialize-css'
import { AppComponent } from './app.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
