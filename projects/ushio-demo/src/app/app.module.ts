import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UshioModule } from 'ushio';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UshioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
