import { Injector, NgModule } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { BrowserModule } from '@angular/platform-browser'
import { UshioComponent, UshioModule, UshioService } from 'ushio'

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
    UshioService.build = 'CE Build'
    window.customElements.define(
      'ushio-player',
      createCustomElement(UshioComponent, { injector: this.injector })
    )
  }
}
