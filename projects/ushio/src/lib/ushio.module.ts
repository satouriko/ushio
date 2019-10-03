import { NgModule } from '@angular/core';
import { UshioComponent, UshioSubtitles } from './ushio.component';

@NgModule({
  declarations: [
    UshioComponent,
    UshioSubtitles,
  ],
  exports: [
    UshioComponent,
    UshioSubtitles
  ]
})
export class UshioModule { }
