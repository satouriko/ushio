import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  fromEvent, merge, NEVER, of,
  Subject, Subscription, timer } from 'rxjs';
import {
  concatMap, distinctUntilChanged,
  filter, map, mapTo, switchMap, takeUntil
} from 'rxjs/operators';
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

  private mVolume = 1;
  @Input() set volume(volume) {
    this.video.nativeElement.volume = volume / 100;
  }
  get volume() {
    return Math.round(this.mVolume * 100);
  }

  private mVolumeControl = true;
  @Input() set volumeControl(volumeControl) {
    this.mVolumeControl = volumeControl;
    this.setAllControlPanelsPosition();
  }
  get volumeControl() {
    return this.mVolumeControl;
  }
  private mSettingsControl = true;
  @Input() set settingsControl(settingsControl) {
    this.mSettingsControl = settingsControl;
    this.setAllControlPanelsPosition();
  }
  get settingsControl() {
    return this.mSettingsControl;
  }
  private mLoopControl = true;
  @Input() set loopControl(loopControl) {
    this.mLoopControl = loopControl;
    this.setAllControlPanelsPosition();
  }
  get loopControl() {
    return this.mLoopControl;
  }
  private mFullscreenControl = true;
  @Input() set fullscreenControl(fullscreenControl) {
    this.mFullscreenControl = fullscreenControl;
    this.setAllControlPanelsPosition();
  }
  get fullscreenControl() {
    return this.mFullscreenControl;
  }

  @ViewChild('video', {static: true}) video;
  @ViewChild('sliderTrack', {static: true}) sliderTrack;
  @ViewChild('volumeBarTrack', {static: true}) volumeBarTrack;
  @ViewChild('volumePanel', {static: true}) volumePanel;
  @ViewChild('volumeBtn', {static: true}) volumeBtn;
  @ViewChild('settingsPanel', {static: true}) settingsPanel;
  @ViewChild('settingsBtn', {static: true}) settingsBtn;

  @ContentChildren(UshioSubtitles) subtitles!: QueryList<UshioSubtitles>;
  private subtitlesSlotUpdate$ = new Subject<HTMLElement[]>();
  private mobileShowControlStateChange$ = new Subject<{ showControl: boolean, delaySwitch: boolean }>();

  interactMode: 'desktop' | 'mobile' = 'desktop';
  private showControl = false;
  private thumbMouseDown = false;
  private volumeMouseDown = false;
  controlHoveredClass = '';
  get isFullScreen(): boolean {
    return document.fullscreenElement !== null;
  }
  get mouseDown(): boolean {
    return this.thumbMouseDown || this.volumeMouseDown;
  }
  get showControlClass(): string {
    return (this.showControl || this.controlHoveredClass || this.mouseDown) ? ' mouse-hover' : '';
  }
  get noCursorClass(): string {
    return !(this.showControl || this.controlHoveredClass || this.mouseDown) ? ' no-cursor' : '';
  }
  get thumbMouseDownClass(): string {
    return this.thumbMouseDown ? ' thumb-mouse-down' : '';
  }
  get pausedClass(): string {
    return this.video.nativeElement.paused ? ' video-state-pause' : ' video-state-play';
  }
  get pendingClass(): string {
    return this.pending && !this.video.nativeElement.paused ? ' video-state-pending' : '';
  }
  get mutedClass(): string {
    return (this.video.nativeElement.muted || this.video.nativeElement.volume === 0)
      ? ' video-state-muted' : ' video-state-volume';
  }
  get repeatClass(): string {
    return this.video.nativeElement.loop ? ' video-state-repeat' : ' video-state-norepeat';
  }
  get fullscreenClass(): string {
    return this.isFullScreen ? ' video-state-fullscreen' : ' video-state-nofullscreen';
  }
  private currentTime = 0;
  private duration = 0;
  private bufferedTime = 0;
  private pending = false;
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
  get volumeRate(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleY(${this.mVolume})`
    );
  }
  get volumeThumbPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `bottom: ${this.volume}%`
    );
  }
  private settingsPanelTranslation = 0;
  get settingsPanelPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(${-this.settingsPanelTranslation}px)`
    );
  }

  private timeUpdate: Subscription;
  private volumeChange: Subscription;
  private controlHoveredChange: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(
    private element: ElementRef,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.mVolume = this.video.nativeElement.volume;
  }

  ngAfterContentInit() {
    const subtitlesChange$ = merge(
      of(this.subtitles.map(item => item.value)),
      this.subtitles.changes.pipe(
        map(subtitles => (
          subtitles.toArray().filter(s => s.value).map(s => s.value)
        ))
      ),
      this.subtitlesSlotUpdate$.pipe(
        map(subtitles => (
          subtitles.filter(s => s.getAttribute('value'))
            .map(s => s.getAttribute('value'))
        ))
      )
    );
    this.subscriptions.push(subtitlesChange$.subscribe((subtitles) => {
      console.log(subtitles);
    }));
  }

  ngAfterViewInit() {
    const mouseMove$ = fromEvent(document, 'mousemove');
    const mouseUp$ = fromEvent(document, 'mouseup');
    const touchMove$ = fromEvent(document, 'touchmove');
    const touchStart$ = fromEvent(document, 'touchstart');
    const touchEnd$ = fromEvent(document, 'touchEnd');
    const mouseTouchUp$ = merge(mouseUp$, touchEnd$);
    touchStart$.subscribe(() => {
      this.interactMode = 'mobile';
    });
    const ifMouseInArea = (e: MouseEvent, btnElement, popUpElement) => {
      const rect1 = popUpElement.getBoundingClientRect();
      const rect2 = btnElement.getBoundingClientRect();
      return (e.clientX > rect1.left &&
        e.clientX < rect1.right &&
        e.clientY > rect1.top &&
        e.clientY < rect1.bottom) || (e.clientX > rect2.left &&
        e.clientX < rect2.right &&
        e.clientY > rect2.top &&
        e.clientY < rect2.bottom);
    };
    const onControlBtnHoverStateChanged$ = (btns) => {
      return mouseMove$.pipe(
        switchMap((e: MouseEvent) => {
          for (const btn of btns) {
            if (ifMouseInArea(e, btn.btnElement, btn.popUpElement)) {
              return of(` btn-${btn.btnName}-hover`);
            }
          }
          return timer(150).pipe(
            mapTo('')
          );
        }),
        distinctUntilChanged()
      );
    };
    const desktopShowControlStateChange$ = mouseMove$.pipe(
      filter(() => (this.interactMode === 'desktop')),
      map((e: MouseEvent) => {
        const rect = this.video.nativeElement.getBoundingClientRect();
        return {
          showControl: e.clientX > rect.left &&
            e.clientX < rect.right &&
            e.clientY > rect.top &&
            e.clientY < rect.bottom,
          delaySwitch: e.clientY < rect.bottom - 46
        };
      })
    );
    const showControlStateChange$ = merge(
      desktopShowControlStateChange$,
      this.mobileShowControlStateChange$
    ).pipe(
      switchMap(e => {
        return e.showControl
          ? merge(
            of(true),
            e.delaySwitch ? timer(
              this.interactMode === 'desktop' ? 750 : 5000
            ).pipe(
              mapTo(false)
            ) : NEVER
          )
          : of(false);
      }),
      distinctUntilChanged()
    );
    this.subscriptions.push(showControlStateChange$.subscribe(state => {
      this.showControl = state;
    }));
    this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
      .subscribe(() => {
        this.currentTime = this.video.nativeElement.currentTime;
      });
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'waiting')
      .subscribe(() => {
        this.pending = true;
      }));
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'playing')
      .subscribe(() => {
        this.pending = false;
      }));
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'progress')
      .subscribe(() => {
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
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'loadedmetadata')
      .subscribe(() => {
        this.duration = this.video.nativeElement.duration;
      }));
    this.video.nativeElement.volume = this.mVolume;
    this.volumeChange = fromEvent(this.video.nativeElement, 'volumechange')
      .subscribe(() => {
        this.mVolume = this.video.nativeElement.volume;
      });
    const mapToRate = (element, progress, total) => map(
      (moveEvent: MouseEvent | TouchEvent) => {
        const eventCoordinate = moveEvent instanceof TouchEvent
          ? moveEvent.changedTouches[0]
          : moveEvent;
        const rect = element.getBoundingClientRect();
        let p = progress(eventCoordinate, rect);
        const t = total(rect);
        if (p < 0) {
          p = 0;
        } else if (p > t) {
          p = t;
        }
        return p / t;
      }
    );
    const onMouseTouchDown$ = (element, progress, total) => {
      return merge(
        fromEvent(element, 'mousedown'),
        fromEvent(element, 'touchstart')
      ).pipe(
        mapToRate(element, progress, total)
      );
    };
    const onMouseTouchDrag$ = (element, progress, total) => {
      return merge(
        fromEvent(element, 'mousedown').pipe(
          mapToRate(element, progress, total),
          concatMap(() => {
            return mouseMove$.pipe(
              takeUntil(mouseUp$),
              mapToRate(element, progress, total)
            );
          })
        ),
        fromEvent(element, 'touchstart').pipe(
          mapToRate(element, progress, total),
          concatMap(() => {
            return touchMove$.pipe(
              takeUntil(touchEnd$),
              mapToRate(element, progress, total)
            );
          })
        ),
      );
    };
    const thumbMouseTouchDown$ = onMouseTouchDown$(
      this.sliderTrack.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    );
    const thumbTouchDrag$ = onMouseTouchDrag$(
      this.sliderTrack.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    );
    this.subscriptions.push(thumbMouseTouchDown$.subscribe(e => {
      this.thumbMouseDown = true;
      this.timeUpdate.unsubscribe();
      this.currentTime = e * this.duration;
    }));
    this.subscriptions.push(thumbTouchDrag$.subscribe(e => {
      this.currentTime = e * this.duration;
    }));
    this.subscriptions.push(mouseTouchUp$.subscribe(() => {
      if (this.thumbMouseDown) {
        this.video.nativeElement.currentTime = this.currentTime;
        this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
          .subscribe(() => {
            this.currentTime = this.video.nativeElement.currentTime;
          });
        this.thumbMouseDown = false;
      }
    }));
    const controlHoverStateChange$ = onControlBtnHoverStateChanged$([{
      btnElement: this.volumeBtn.nativeElement,
      popUpElement: this.volumePanel.nativeElement,
      btnName: 'volume',
    }]);
    this.controlHoveredChange = controlHoverStateChange$.subscribe(e => {
      this.controlHoveredClass = e;
    });
    const volumeMouseTouchDown$ = onMouseTouchDown$(
      this.volumeBarTrack.nativeElement,
      (moveEvent, rect) => (rect.bottom - moveEvent.clientY),
      (rect) => (rect.height),
    );
    const volumeTouchDrag$ = onMouseTouchDrag$(
      this.volumeBarTrack.nativeElement,
      (moveEvent, rect) => (rect.bottom - moveEvent.clientY),
      (rect) => (rect.height),
    );
    this.subscriptions.push(volumeMouseTouchDown$.subscribe(e => {
      this.volumeMouseDown = true;
      this.volumeChange.unsubscribe();
      this.controlHoveredChange.unsubscribe();
      this.mVolume = e;
      this.video.nativeElement.volume = this.mVolume;
    }));
    this.subscriptions.push(volumeTouchDrag$.subscribe(e => {
      this.mVolume = e;
      this.video.nativeElement.volume = this.mVolume;
    }));
    this.subscriptions.push(mouseTouchUp$.subscribe(() => {
      if (this.volumeMouseDown) {
        this.video.nativeElement.volume = this.mVolume;
        this.volumeChange = fromEvent(this.video.nativeElement, 'volumechange')
          .subscribe(() => {
            this.mVolume = this.video.nativeElement.volume;
          });
        this.controlHoveredChange = controlHoverStateChange$.subscribe(e => {
          this.controlHoveredClass = e;
        });
        this.volumeMouseDown = false;
      }
    }));
    this.setAllControlPanelsPosition();
  }

  ngOnDestroy() {
    this.timeUpdate.unsubscribe();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private setAllControlPanelsPosition() {
    setTimeout(() => {
      this.setSettingsPanelPosition();
    }, 0);
  }

  private setSettingsPanelPosition() {
    if (!this.element || !this.settingsPanel || !this.settingsBtn) {
      return;
    }
    const outer = this.element.nativeElement.getBoundingClientRect();
    const panel = this.settingsPanel.nativeElement.getBoundingClientRect();
    const btn = this.settingsBtn.nativeElement.getBoundingClientRect();
    if (panel.width / 2 - outer.right + btn.right > 0) {
      this.settingsPanelTranslation = panel.width / 2 - outer.right + btn.right;
    } else {
      this.settingsPanelTranslation = 0;
    }
  }

  onSlotChange(e) {
    this.subtitlesSlotUpdate$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SUBTITLES')
    );
  }

  onVideoMaskClicked(e) {
    if (this.interactMode === 'desktop') {
      this.togglePlay();
    } else {
      this.mobileShowControlStateChange$.next({
        showControl: !this.showControl,
        delaySwitch: true
      });
    }
  }

  togglePlay() {
    if (this.video.nativeElement.paused) {
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
    }
  }

  toggleMute() {
    if (this.interactMode === 'desktop') {
      this.video.nativeElement.muted = !this.video.nativeElement.muted;
    } else {
      this.video.nativeElement.muted = false;
    }
  }

  toggleLoop() {
    this.video.nativeElement.loop = !this.video.nativeElement.loop;
  }

  toggleFullscreen() {
    if (!this.isFullScreen) {
      this.element.nativeElement.requestFullscreen();
    } else {
      document.exitFullscreen();
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
