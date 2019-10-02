import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  Input, OnDestroy,
  OnInit,
  QueryList, ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, of, merge, Subject, fromEvent, timer, Subscription, EMPTY } from 'rxjs';
import { concatMap, distinctUntilChanged, map, mapTo, switchAll, takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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
  templateUrl: './ushio.component.html',
  styleUrls: ['./ushio.component.styl'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UshioComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @Input() src;
  @Input() poster;
  @Input() crossorigin;
  @Input() autoplay;
  @Input() preload = 'metadata';
  @Input() loop;
  @Input() muted;

  @ViewChild('video', {static: true}) video;
  @ViewChild('sliderTrack', {static: true}) sliderTrack;

  @ContentChildren(UshioSubtitles) subtitles!: QueryList<UshioSubtitles>;
  private subtitles$: Observable<string[]>;
  private subtitlesSlot$ = new Subject<HTMLElement[]>();

  private sub: Subscription[] = [];

  private mouseMove$ = fromEvent(document, 'mousemove');
  private mouseUp$ = fromEvent(document, 'mouseup');
  private activeState$ = this.mouseMove$.pipe(
    map((e: MouseEvent) => {
      const rect = this.video.nativeElement.getBoundingClientRect();
      return e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom
          ? merge(
              of(true),
              e.clientY < rect.bottom - 46 ? timer(3000).pipe(
                mapTo(false)
              ) : EMPTY
            )
          : of(false);
    }),
    switchAll(),
    distinctUntilChanged()
  );
  private hover = false;
  private mouseDown = false;
  get hoverClass(): string {
    return (this.hover || this.mouseDown) ? ' mouse-hover' : '';
  }
  get noCursorClass(): string {
    return !(this.hover || this.mouseDown) ? ' no-cursor' : '';
  }
  get mouseDownClass(): string {
    return this.mouseDown ? ' mouse-down' : '';
  }
  get pausedClass(): string {
    return this.video.nativeElement.paused ? ' video-state-pause' : ' video-state-play';
  }
  private currentTime = 0;
  private duration = 0;
  private bufferedTime = 0;
  get currentTimeStr(): string {
    return this.formatDuration(this.currentTime);
  }
  get durationStr(): string {
    return this.formatDuration(this.duration);
  }
  get bufferedProgress(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleX(${this.bufferedTime / this.duration})`
    );
  }
  get playedProgress(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleX(${this.currentTime / this.duration})`
    );
  }
  get thumbPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `left: ${this.currentTime / this.duration * 100}%`
    );
  }

  private timeUpdate: Subscription;

  constructor(private sanitization: DomSanitizer) { }

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
    this.sub.push(this.subtitles$.subscribe((subtitles) => {
      console.log(subtitles);
    }));
  }

  ngAfterViewInit() {
    this.sub.push(this.activeState$.subscribe(state => {
      this.hover = state;
    }));
    this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate').subscribe(() => {
      this.currentTime = this.video.nativeElement.currentTime;
    });
    this.sub.push(fromEvent(this.video.nativeElement, 'progress').subscribe(() => {
      this.bufferedTime = ((timeRanges, currentTime) => {
        const length = timeRanges.length;
        for (let i = 0; i < length; i++) {
          if (timeRanges.end(i) <= currentTime) {
            continue;
          }
          if (timeRanges.start(i) <= currentTime) {
            return timeRanges.end(i);
          }
          return currentTime;
        }
        return currentTime;
      })(this.video.nativeElement.buffered, this.video.nativeElement.currentTime);
    }));
    this.sub.push(fromEvent(this.video.nativeElement, 'loadedmetadata').subscribe(() => {
      this.duration = this.video.nativeElement.duration;
    }));
    const thumbMouseDown$ = fromEvent(this.sliderTrack.nativeElement, 'mousedown');
    const thumbDrag$ = thumbMouseDown$.pipe(
      concatMap(() => {
        return this.mouseMove$.pipe(
          takeUntil(this.mouseUp$),
          map((moveEvent: MouseEvent) => {
            const rect = this.sliderTrack.nativeElement.getBoundingClientRect();
            let progress = moveEvent.x - rect.left;
            if (progress < 0) {
              progress = 0;
            } else if (progress > rect.width) {
              progress = rect.width;
            }
            return progress / rect.width;
          })
        );
      })
    );
    this.sub.push(thumbMouseDown$.subscribe((e: MouseEvent) => {
      this.mouseDown = true;
      this.timeUpdate.unsubscribe();
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      this.currentTime = (e.clientX - rect.left) / rect.width * this.duration;
    }));
    this.sub.push(thumbDrag$.subscribe(e => {
      this.currentTime = e * this.duration;
    }));
    this.sub.push(this.mouseUp$.subscribe(() => {
      if (this.mouseDown) {
        this.video.nativeElement.currentTime = this.currentTime;
        this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate').subscribe(() => {
          this.currentTime = this.video.nativeElement.currentTime;
        });
        this.mouseDown = false;
      }
    }));
  }

  ngOnDestroy() {
    this.timeUpdate.unsubscribe();
    this.sub.forEach(sub => sub.unsubscribe());
  }

  onSlotChange(e) {
    this.subtitlesSlot$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SUBTITLES')
    );
  }

  togglePlay() {
    if (this.video.nativeElement.paused) {
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
    }
  }

  private formatDuration = (duration: number): string => {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 60);
    let str = '';
    if (h && h < 10) { str += `0${h}:`; } else if (h) { str += `${h}:`; }
    if (m < 10) { str += `0${m}:`; } else { str += `${m}:`; }
    if (s < 10) { str += `0${s}`;  } else { str += `${s}`; }
    return str;
  }

}
