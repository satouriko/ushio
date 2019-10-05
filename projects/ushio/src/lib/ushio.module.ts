import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { UshioComponent, UshioSource, UshioSubtitles } from './ushio.component'

@NgModule({
  declarations: [
    UshioComponent,
    UshioSource,
    UshioSubtitles
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UshioComponent,
    UshioSource,
    UshioSubtitles
  ]
})
export class UshioModule { }
