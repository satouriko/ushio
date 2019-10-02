import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, of, merge, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ushio-subtitles'
})
// tslint:disable-next-line:directive-class-suffix
export class UshioSubtitles {
  @Input() value !: string;
}

@Component({
  selector: 'ushio-player',
  template: `
    <slot (slotchange)="onSlotChange($event)"></slot>
    <p>
      ushio works!
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UshioComponent implements OnInit, AfterContentInit {

  @ContentChildren(UshioSubtitles) subtitles !: QueryList<UshioSubtitles>;
  subtitles$: Observable<string[]>;
  subtitlesSlot$ = new Subject<HTMLElement[]>();

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.subtitles$ = merge(
      of(this.subtitles.map(item => item.value)),
      this.subtitles.changes.pipe(
        map(subtitles => (
          subtitles.toArray().filter(s => s.value).map(s => s.value)
        ))
      ),
      this.subtitlesSlot$.pipe(
        map(subtitles => (
          subtitles.filter(s => s.getAttribute('value'))
            .map(s => s.getAttribute('value'))
        ))
      )
    );
    this.subtitles$.subscribe((subtitles) => {
      console.log(subtitles);
    });
  }

  onSlotChange(e) {
    this.subtitlesSlot$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SUBTITLES')
    );
  }


}
