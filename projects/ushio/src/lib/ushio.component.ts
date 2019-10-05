import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef, EventEmitter,
  Input,
  OnDestroy,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  fromEvent, merge, NEVER, Observable, of,
  Subject, Subscription, timer,
} from 'rxjs';
import {
  concatMap, distinctUntilChanged,
  filter, map, mapTo, switchMap, takeUntil
} from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ushio-source'
})
// tslint:disable-next-line:directive-class-suffix
export class UshioSource {
  @Input() src!: string;
  @Input() type: string;
  @Input() shortname: string;
  @Input() name: string;
  @Input() default: string;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ushio-subtitles'
})
// tslint:disable-next-line:directive-class-suffix
export class UshioSubtitles {
  @Input() value!: string;
}

interface Source {
  shortName: string;
  name: string;
  sources: {
    src: string;
    type: string;
  }[];
  default?: boolean;
}

@Component({
  selector: 'ushio-player',
  templateUrl: './ushio.component.html',
  styleUrls: ['./ushio.component.styl'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UshioComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @Input() set src(src) {
    this.mSrc = src;
    this.updateSources();
  }
  get src() {
    return this.mSrc;
  }
  @Input() poster;
  @Input() crossorigin;
  @Input() autoplay;
  @Input() preload = 'metadata';

  private mSrc;
  private mSources = [];
  sources: Source[] = [];
  playingSource = 0;

  private mVolume = 1;
  @Input() set volume(volume) {
    this.video.nativeElement.volume = volume;
  }
  get volume100() {
    return Math.round(this.mVolume * 100);
  }
  @Output() volumeChange = new EventEmitter<number>();

  private mPlaybackRate = 1;
  @Input() set playbackRate(playbackRate) {
    this.video.nativeElement.playbackRate = playbackRate;
  }
  @Output() playbackRateChange = new EventEmitter<number>();

  private mVolumeControl = true;
  @Input() set volumeControl(volumeControl) {
    this.mVolumeControl = volumeControl;
    this.setAllControlPanelsPosition();
  }
  get volumeControl() {
    return this.mVolumeControl;
  }
  private mSourceControl = true;
  @Input() set sourceControl(sourceControl) {
    this.mSourceControl = sourceControl;
    this.setAllControlPanelsPosition();
  }
  get sourceControl() {
    return this.mSourceControl;
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
  @ViewChild('slider', {static: true}) slider;
  @ViewChild('volumeBar', {static: true}) volumeBar;
  @ViewChild('volumePanel', {static: true}) volumePanel;
  @ViewChild('volumeBtn', {static: true}) volumeBtn;
  @ViewChild('settingsPanel', {static: true}) settingsPanel;
  @ViewChild('settingsBtn', {static: true}) settingsBtn;
  @ViewChild('speedBar', {static: true}) speedBar;
  @ViewChild('sourcePanel', {static: true}) sourcePanel;
  @ViewChild('sourceBtn', {static: true}) sourceBtn;

  @ContentChildren(UshioSource) sourceContentChildren!: QueryList<UshioSource>;
  @ContentChildren(UshioSubtitles) subtitlesContentChildren!: QueryList<UshioSubtitles>;
  private subtitlesSlotUpdate$ = new Subject<HTMLElement[]>();
  private sourcesSlotUpdate$ = new Subject<HTMLElement[]>();
  private subtitlesSlotChange$ = this.subtitlesSlotUpdate$.asObservable().pipe(distinctUntilChanged());
  private sourcesSlotChange$ = this.sourcesSlotUpdate$.asObservable().pipe(distinctUntilChanged());
  private mobileShowControlStateChange$ = new Subject<{ showControl: boolean, delaySwitch: boolean }>();

  interactMode: 'desktop' | 'mobile' = 'desktop';
  private showControl = false;
  private thumbMouseDown = false;
  private controlMouseDown = false;
  controlHoveredClass = '';
  get isFullScreen(): boolean {
    return document.fullscreenElement !== null;
  }
  get mouseDown(): boolean {
    return this.thumbMouseDown || this.controlMouseDown;
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
    return this.mPaused ? ' video-state-pause' : ' video-state-play';
  }
  get waitingClass(): string {
    return this.waiting && !this.mPaused ? ' video-state-waiting' : '';
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

  private mPaused = true;
  @Input() set paused(paused) {
    if (paused) {
      this.video.nativeElement.pause();
    } else {
      this.video.nativeElement.play();
    }
  }
  @Output() pausedChange = new EventEmitter<boolean>();
  private mCurrentTime = 0;
  @Input() set currentTime(currentTime) {
    this.video.nativeElement.currentTime = currentTime;
  }
  @Output() currentTimeChange = new EventEmitter<number>();
  private duration = 0;
  private bufferedTime = 0;
  private waiting = false;
  @Output() waitingChange = new EventEmitter<boolean>();
  @Input() set loop(loop) {
    this.video.nativeElement.loop = loop;
  }
  @Output() loopChange = new EventEmitter<boolean>();
  @Input() set muted(muted) {
    this.video.nativeElement.muted = muted;
  }
  @Output() mutedChange = new EventEmitter<boolean>();

  get currentTimeStr(): string {
    return UshioComponent.formatDuration(this.mCurrentTime);
  }
  get durationStr(): string {
    return UshioComponent.formatDuration(this.duration);
  }
  get bufferedProgress(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleX(${this.bufferedTime / this.duration})`
    );
  }
  get playedProgress(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleX(${this.mCurrentTime / this.duration})`
    );
  }
  get thumbPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `left: ${this.mCurrentTime / this.duration * 100}%`
    );
  }
  get volumeRate(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleY(${this.mVolume})`
    );
  }
  get volumeThumbPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `bottom: ${this.volume100}%`
    );
  }
  get speedThumbPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `left: ${UshioComponent.mapSpeedToProgress(this.mPlaybackRate)}%`
    );
  }
  private panelTranslations = {
    settings: 0,
    source: 0
  };
  get settingsPanelPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.settings}px - 50%))`
    );
  }
  get sourcePanelPosition(): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.source}px - 50%))`
    );
  }

  private timeUpdate: Subscription;
  private controlHoveredChange: Subscription;
  private subscriptions: Subscription[] = [];

  static mapSpeedToProgress(speed) {
    if (speed < 0.5) {
      return 0;
    } else if (speed < 1.5) {
      return (speed - 0.5) * 80;
    } else if (speed < 2.0) {
      return 80 + (speed - 1.5) * 40;
    } else {
      return 100;
    }
  }
  static mapProgressToSpeed(progress) {
    if (progress < .1) {
      return .5;
    } else if (progress < .9) {
      return .75 + .25 * Math.floor((progress - 0.1) * 5);
    } else {
      return 2;
    }
  }

  static formatDuration(duration: number) {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 60);
    let str = '';
    if (h && h < 10) { str += `0${h}:`; } else if (h) { str += `${h}:`; }
    if (m < 10) { str += `0${m}:`; } else { str += `${m}:`; }
    if (s < 10) { str += `0${s}`;  } else { str += `${s}`; }
    return str;
  }

  constructor(
    private element: ElementRef,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.mPaused = this.video.nativeElement.paused;
    this.mVolume = this.video.nativeElement.volume;
    this.mPlaybackRate = this.video.nativeElement.playbackRate;
  }

  ngAfterContentInit() {
    const mapPropsToObject = (props: string[], fn) => (sourceObj: any) => (
      props.reduce((agg, cur) =>  ({...agg, [cur]: fn(sourceObj, cur)}), {})
    );
    const onContentChildrenOrSlotChanged$ = (
      attr, contentChildren:
      QueryList<any>,
      slotChange$: Observable<HTMLElement[]>
    ) => {
      const contentChildrenMap = mapPropsToObject(attr, (obj, cur) => (obj[cur]));
      const slotMap = mapPropsToObject(attr, (obj, cur) => (obj.getAttribute(cur)));
      return merge(
        of(contentChildren.toArray().map(contentChildrenMap)),
        contentChildren.changes.pipe(
          map((contents: QueryList<any>) => (contents.toArray().map(contentChildrenMap)))
        ),
        slotChange$.pipe(
          map((contents: HTMLElement[]) => (
            contents.map(slotMap)
          ))
        )
      );
    };
    const subtitlesAttr = ['value'];
    const subtitlesChange$ = onContentChildrenOrSlotChanged$(
      subtitlesAttr, this.subtitlesContentChildren, this.subtitlesSlotChange$);
    this.subscriptions.push(subtitlesChange$.subscribe((subtitles) => {
      console.log(subtitles);
    }));
    const sourcesAttr = ['src', 'type', 'name', 'shortname', 'default'];
    const sourcesChange$ = onContentChildrenOrSlotChanged$(
      sourcesAttr, this.sourceContentChildren, this.sourcesSlotChange$);
    this.subscriptions.push(sourcesChange$.subscribe((sources) => {
      console.log(sources);
      this.mSources = sources;
      this.updateSources();
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
    if (this.mPaused) {
      this.video.nativeElement.pause();
    } else {
      this.video.nativeElement.play();
    }
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'pause')
      .subscribe(() => {
        this.mPaused = true;
        this.pausedChange.emit(true);
      }));
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'play')
      .subscribe(() => {
        this.mPaused = false;
        this.pausedChange.emit(false);
      }));
    this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
      .subscribe(() => {
        this.mCurrentTime = this.video.nativeElement.currentTime;
        this.currentTimeChange.emit(this.mCurrentTime);
      });
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'waiting')
      .subscribe(() => {
        this.waiting = true;
        this.waitingChange.emit(this.waiting);
      }));
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'playing')
      .subscribe(() => {
        this.waiting = false;
        this.waitingChange.emit(this.waiting);
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
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'volumechange')
      .subscribe(() => {
        this.mVolume = this.video.nativeElement.volume;
        this.volumeChange.emit(this.mVolume);
      }));
    this.video.nativeElement.playbackRate = this.mPlaybackRate;
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'ratechange')
      .subscribe(() => {
        this.mPlaybackRate = this.video.nativeElement.playbackRate;
        this.playbackRateChange.emit(this.mPlaybackRate);
      }));
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
      this.slider.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    );
    const thumbTouchDrag$ = onMouseTouchDrag$(
      this.slider.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    );
    this.subscriptions.push(thumbMouseTouchDown$.subscribe(e => {
      this.thumbMouseDown = true;
      this.timeUpdate.unsubscribe();
      this.mCurrentTime = e * this.duration;
    }));
    this.subscriptions.push(thumbTouchDrag$.subscribe(e => {
      this.mCurrentTime = e * this.duration;
    }));
    this.subscriptions.push(mouseTouchUp$.subscribe(() => {
      if (this.thumbMouseDown) {
        this.video.nativeElement.currentTime = this.mCurrentTime;
        this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
          .subscribe(() => {
            this.mCurrentTime = this.video.nativeElement.currentTime;
          });
        this.thumbMouseDown = false;
      }
    }));
    const controlHoverStateChange$ = onControlBtnHoverStateChanged$([{
      btnElement: this.volumeBtn.nativeElement,
      popUpElement: this.volumePanel.nativeElement,
      btnName: 'volume',
    }, {
      btnElement: this.settingsBtn.nativeElement,
      popUpElement: this.settingsPanel.nativeElement,
      btnName: 'settings',
    }, {
      btnElement: this.sourceBtn.nativeElement,
      popUpElement: this.sourcePanel.nativeElement,
      btnName: 'source',
    }]);
    this.controlHoveredChange = controlHoverStateChange$.subscribe(e => {
      this.controlHoveredClass = e;
      this.setAllControlPanelsPosition();
    });
    const volumeMouseTouchDown$ = onMouseTouchDown$(
      this.volumeBar.nativeElement,
      (moveEvent, rect) => (rect.bottom - moveEvent.clientY),
      (rect) => (rect.height),
    );
    const volumeTouchDrag$ = onMouseTouchDrag$(
      this.volumeBar.nativeElement,
      (moveEvent, rect) => (rect.bottom - moveEvent.clientY),
      (rect) => (rect.height),
    );
    this.subscriptions.push(volumeMouseTouchDown$.subscribe(e => {
      if (!this.controlMouseDown) {
        this.controlMouseDown = true;
        this.controlHoveredChange.unsubscribe();
      }
      this.video.nativeElement.volume = e;
    }));
    this.subscriptions.push(volumeTouchDrag$.subscribe(e => {
      this.video.nativeElement.volume = e;
    }));
    this.subscriptions.push(mouseTouchUp$.subscribe(() => {
      if (this.controlMouseDown) {
        this.controlHoveredChange = controlHoverStateChange$.subscribe(e => {
          this.controlHoveredClass = e;
          this.setAllControlPanelsPosition();
        });
        this.controlMouseDown = false;
      }
    }));
    const speedMouseTouchDown$ = onMouseTouchDown$(
      this.speedBar.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width),
    );
    const speedTouchDrag$ = onMouseTouchDrag$(
      this.speedBar.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width),
    );
    this.subscriptions.push(speedMouseTouchDown$.subscribe(e => {
      if (!this.controlMouseDown) {
        this.controlMouseDown = true;
        this.controlHoveredChange.unsubscribe();
      }
      this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
    }));
    this.subscriptions.push(speedTouchDrag$.subscribe(e => {
      this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
    }));
    this.setAllControlPanelsPosition();
  }

  ngOnDestroy() {
    this.timeUpdate.unsubscribe();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private updateSources() {
    if (this.mSources.length === 0) {
      this.sources = [{
        shortName: 'Default',
        name: 'Default',
        default: true,
        sources: [{ src: this.mSrc, type: undefined }]
      }];
    } else {
      const sm = {};
      this.mSources.forEach(source => {
        if (!source.shortname) {
          source.shortname = 'Untitled';
        }
        if (!sm[source.shortname]) {
          sm[source.shortname] = {
            shortName: source.shortname,
            name: source.name || 'Untitled',
            sources: []
          };
        }
        sm[source.shortname].sources.push(source);
        if (source.default !== undefined) {
          sm[source.shortname].default = true;
        }
      });
      this.sources = Object.values(sm);
    }
    console.log(this.sources);
    const indexOfDefault = this.sources.findIndex(s => s.default);
    this.playingSource = indexOfDefault >= 0 ? indexOfDefault : 0;
  }

  private setAllControlPanelsPosition() {
    setTimeout(() => {
      [{
        btn: this.settingsBtn,
        panel: this.settingsPanel,
        name: 'settings'
      }, {
        btn: this.sourceBtn,
        panel: this.sourcePanel,
        name: 'source'
      }].forEach(item => this.setPanelPosition(item.btn, item.panel, item.name));
    }, 0);
  }

  private setPanelPosition(btn, panel, name) {
    if (!this.element || !panel || !btn) {
      return;
    }
    const outerRect = this.element.nativeElement.getBoundingClientRect();
    const panelRect = panel.nativeElement.getBoundingClientRect();
    const btnRect = btn.nativeElement.getBoundingClientRect();
    if (panelRect.width / 2 - outerRect.right + btnRect.right > 0) {
      this.panelTranslations[name] = panelRect.width / 2 - outerRect.right + btnRect.right;
    } else {
      this.panelTranslations[name] = 0;
    }
  }

  onSlotChange(e) {
    this.subtitlesSlotUpdate$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SUBTITLES')
    );
    this.sourcesSlotUpdate$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SOURCE')
    );
  }

  onVideoMaskClicked() {
    if (this.interactMode === 'desktop') {
      this.togglePlay();
    } else {
      this.mobileShowControlStateChange$.next({
        showControl: !this.showControl,
        delaySwitch: true
      });
    }
  }

  onSelectSource(i) {
    const currentTime = this.mCurrentTime;
    const paused = this.mPaused;
    this.playingSource = i;
    this.video.nativeElement.load();
    this.video.nativeElement.currentTime = currentTime;
    if (!paused) {
      this.video.nativeElement.play();
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
      this.mutedChange.emit(this.video.nativeElement.muted);
    } else if (this.video.nativeElement.muted) {
      this.video.nativeElement.muted = false;
      this.mutedChange.emit(false);
    }
  }

  toggleLoop() {
    this.video.nativeElement.loop = !this.video.nativeElement.loop;
    this.loopChange.emit(this.video.nativeElement.loop);
  }

  toggleFullscreen() {
    if (!this.isFullScreen) {
      this.element.nativeElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

}
