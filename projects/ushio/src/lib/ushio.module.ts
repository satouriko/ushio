import { NgModule } from '@angular/core';
import { UshioComponent, UshioSubtitles } from './ushio.component';

@NgModule({
  declarations: [
    UshioComponent,
    UshioSubtitles,
  ],
  imports: [
  ],
  exports: [
    UshioComponent,
    UshioSubtitles
  ]
})
export class UshioModule { }
