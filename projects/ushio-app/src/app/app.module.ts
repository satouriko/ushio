import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { BrowserModule } from '@angular/platform-browser'
import { UshioComponent, UshioModule } from 'ushio'

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
  constructor (private injector: Injector) { }

  ngDoBootstrap () {
    window.customElements.define(
      'ushio-player',
      createCustomElement(UshioComponent, { injector: this.injector })
    )
  }
}
