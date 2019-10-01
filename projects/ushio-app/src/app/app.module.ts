import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { UshioComponent, UshioModule } from 'ushio';
import { createCustomElement } from '@angular/elements';

@NgModule({
  imports: [
    BrowserModule,
    UshioModule
  ],
  providers: [],
  entryComponents: [
    UshioComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const customElement = createCustomElement(UshioComponent, { injector: this.injector });
    window.customElements.define('ushio-player', customElement);
  }
}
