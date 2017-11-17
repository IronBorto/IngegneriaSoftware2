import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'
import { Header } from './header'
import { HttpClient } from './HttpClient'

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    Header,
    HttpClient
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }