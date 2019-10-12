import {
  AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef, EventEmitter,
  Input, NgZone,
  OnDestroy,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'
import {
  animationFrameScheduler,
  fromEvent, merge, NEVER, Observable, of,
  Subject, Subscription, timer
} from 'rxjs'
import {
  concatMap, distinctUntilChanged,
  filter, map, mapTo, repeat, switchMap, takeUntil, tap
} from 'rxjs/operators'

import { ISubtitle, UshioService } from './ushio.service'

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ushio-source'
})
export class UshioSource {
  @Input() src!: string
  @Input() type: string
  @Input() shortname: string
  @Input() name: string
  @Input() default: boolean
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ushio-subtitles'
})
export class UshioSubtitles {
  @Input() value: string
  @Input() src: string
  @Input() type: string
  @Input() name: string
  @Input() class: string
  @Input() srclang: string
  @Input() default: boolean
}

interface Source {
  shortName: string
  name: string
  sources: {
    src: string;
    type: string;
  }[]
  default?: boolean
}

interface Subtitles {
  name: string
  class: string
  parsedSubtitles: ISubtitle[]
  enabled: boolean
}

@Component({
  selector: 'ushio-player',
  templateUrl: './ushio.component.html',
  styleUrls: ['./ushio.component.styl'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UshioComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  private mInjectedStyles = []
  get injectedStyles () {
    return this.mInjectedStyles.map(
      style => this.sanitization.bypassSecurityTrustHtml(`
      <style>
       ${style}
      </style>
    `))
  }

  private viewInit = false

  @Input() set src (src) {
    this.mSrc = src
    this.updateSources()
  }
  get src () {
    return this.mSrc
  }
  @Input() poster
  @Input() crossorigin
  @Input() autoplay
  @Input() preload = 'metadata'
  @Input() set lang (lang: string) {
    this.service.i18n.setLanguage(lang)
  }
  @Input() thumbnails

  private mSrc
  private mSources = []
  sources: Source[] = []
  playingSource = 0

  private mSubtitles = []
  subtitles: Subtitles[] = []
  get enabledSubtitles () {
    return this.subtitles.filter(s => s.enabled)
  }
  flyingSubtitles: Subtitles[] = []

  private mVolume = 1
  @Input() set volume (volume) {
    this.video.nativeElement.volume = volume
  }
  get volume100 () {
    if (this.video.nativeElement.muted) return 0
    return Math.round(this.mVolume * 100)
  }
  @Output() volumeChange = new EventEmitter<number>()

  private mPlaybackRate = 1
  @Input() set playbackRate (playbackRate) {
    this.video.nativeElement.playbackRate = playbackRate
  }
  @Output() playbackRateChange = new EventEmitter<number>()

  private mVolumeControl = true
  @Input() set volumeControl (volumeControl) {
    this.mVolumeControl = volumeControl
    this.setAllControlPanelsPosition()
  }
  get volumeControl () {
    return this.mVolumeControl
  }
  private mSourceControl = true
  @Input() set sourceControl (sourceControl) {
    this.mSourceControl = sourceControl
    this.setAllControlPanelsPosition()
  }
  get sourceControl () {
    return this.mSourceControl
  }
  private mSubtitlesControl = true
  @Input() set subtitlesControl (subtitlesControl) {
    this.mSubtitlesControl = subtitlesControl
    this.setAllControlPanelsPosition()
  }
  get subtitlesControl () {
    return this.mSubtitlesControl
  }
  private mSettingsControl = true
  @Input() set settingsControl (settingsControl) {
    this.mSettingsControl = settingsControl
    this.setAllControlPanelsPosition()
  }
  get settingsControl () {
    return this.mSettingsControl
  }
  private mLoopControl = true
  @Input() set loopControl (loopControl) {
    this.mLoopControl = loopControl
    this.setAllControlPanelsPosition()
  }
  get loopControl () {
    return this.mLoopControl
  }
  private mFullscreenControl = true
  @Input() set fullscreenControl (fullscreenControl) {
    this.mFullscreenControl = fullscreenControl
    this.setAllControlPanelsPosition()
  }
  get fullscreenControl () {
    return this.mFullscreenControl
  }

  @ViewChild('video', { static: true }) video
  @ViewChild('slider', { static: true }) slider
  @ViewChild('volumeBar', { static: true }) volumeBar
  @ViewChild('volumePanel', { static: true }) volumePanel
  @ViewChild('volumeBtn', { static: true }) volumeBtn
  @ViewChild('settingsPanel', { static: true }) settingsPanel
  @ViewChild('settingsBtn', { static: true }) settingsBtn
  @ViewChild('speedBar', { static: true }) speedBar
  @ViewChild('sourcePanel', { static: true }) sourcePanel
  @ViewChild('sourceBtn', { static: true }) sourceBtn
  @ViewChild('subtitlesPanel', { static: true }) subtitlesPanel
  @ViewChild('subtitlesBtn', { static: true }) subtitlesBtn
  @ViewChild('loopBtn', { static: true }) loopBtn
  @ViewChild('loopPanel', { static: true }) loopPanel
  @ViewChild('fullScreenBtn', { static: true }) fullScreenBtn
  @ViewChild('fullScreenPanel', { static: true }) fullScreenPanel
  @ViewChild('contextMenu', { static: true }) contextMenu
  @ViewChild('langContextMenuOption', { static: true }) langContextMenuOption

  @ContentChildren(UshioSource) sourceContentChildren!: QueryList<UshioSource>
  @ContentChildren(UshioSubtitles) subtitlesContentChildren!: QueryList<UshioSubtitles>
  private subtitlesSlotUpdate$ = new Subject<HTMLElement[]>()
  private sourcesSlotUpdate$ = new Subject<HTMLElement[]>()
  private subtitlesSlotChange$ = this.subtitlesSlotUpdate$.asObservable().pipe(distinctUntilChanged())
  private sourcesSlotChange$ = this.sourcesSlotUpdate$.asObservable().pipe(distinctUntilChanged())
  private mobileShowControlStateChange$ = new Subject<{ showControl: boolean, delaySwitch: boolean }>()
  private showControlProbablyChanged$ = new Subject()
  private showControlChange$ = this.showControlProbablyChanged$.asObservable().pipe(
    map(() => this.showControl),
    distinctUntilChanged()
  )

  interactMode: 'desktop' | 'mobile' = 'desktop'
  private focus = false
  private mShowControl = false
  private mNoCursor = false
  private thumbMouseDown = false
  private controlMouseDown = false
  controlHoveredClass = ''
  private showContextMenu = false
  private showStatisticInfoPanel = false
  private showVolumeHint = false
  private showProgressDetail = false
  get isFullScreen (): boolean {
    return document.fullscreenElement !== null
  }
  get mouseDown (): boolean {
    return this.thumbMouseDown || this.controlMouseDown
  }
  get showControl () {
    return !!(this.mShowControl || this.controlHoveredClass || this.mouseDown)
  }
  get noCursor () {
    return !this.showControl && this.mNoCursor
  }
  @Output() showControlChange = new EventEmitter<boolean>()
  get thumbMouseDownClass (): string {
    return this.thumbMouseDown ? ' thumb-mouse-down' : ''
  }
  get pausedClass (): string {
    return this.mPaused ? ' video-state-pause' : ' video-state-play'
  }
  get waitingClass (): string {
    return this.waiting && !this.mPaused ? ' video-state-waiting' : ''
  }
  get mutedClass (): string {
    return (this.video.nativeElement.muted || this.video.nativeElement.volume === 0)
      ? ' video-state-muted' : ' video-state-volume'
  }
  get loopClass (): string {
    return this.video.nativeElement.loop ? ' video-state-loop' : ' video-state-noloop'
  }
  get subtitleEnabledClass (): string {
    return this.enabledSubtitles.length > 0 ? ' video-state-subtitles' : ' video-state-nosubtitles'
  }
  get fullscreenClass (): string {
    return this.isFullScreen ? ' video-state-fullscreen' : ' video-state-nofullscreen'
  }
  get contextMenuClass (): string {
    return this.contextMenuState + (this.showContextMenu ? ' active' : '')
  }
  get statisticInfoPanelClass (): string {
    return this.showStatisticInfoPanel ? ' active' : ''
  }
  get volumeHintClass (): string {
    return this.showVolumeHint ? ' active' : ''
  }
  get progressDetailClass (): string {
    return this.showProgressDetail ? ' active' : ''
  }

  private mPaused = true
  @Input() set paused (paused) {
    if (paused) this.video.nativeElement.pause()
    else this.video.nativeElement.play()
  }
  @Output() pausedChange = new EventEmitter<boolean>()
  private mCurrentTime = 0
  @Input() set currentTime (currentTime) {
    this.video.nativeElement.currentTime = currentTime
  }
  @Output() currentTimeChange = new EventEmitter<number>()
  private duration = 0
  @Output() durationChange = new EventEmitter<number>()
  private bufferedTime = 0
  private waiting = false
  @Output() waitingChange = new EventEmitter<boolean>()
  @Input() set loop (loop) {
    this.video.nativeElement.loop = loop
  }
  @Output() loopChange = new EventEmitter<boolean>()
  @Input() set muted (muted) {
    this.video.nativeElement.muted = muted
  }
  @Output() mutedChange = new EventEmitter<boolean>()

  fps = '0.00'
  private fpsStart = 0
  private fpsIndex = 0

  get currentTimeStr (): string {
    return UshioComponent.formatDuration(this.mCurrentTime)
  }
  get durationStr (): string {
    return UshioComponent.formatDuration(this.duration)
  }
  get bufferedProgress (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleX(${this.bufferedTime / this.duration})`
    )
  }
  get playedProgress (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleX(${this.mCurrentTime / this.duration})`
    )
  }
  get thumbPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `left: ${this.mCurrentTime / this.duration * 100}%`
    )
  }
  get volumeRate (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: scaleY(${this.volume100 / 100})`
    )
  }
  get volumeThumbPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `bottom: ${this.volume100}%`
    )
  }
  get speedThumbPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `left: ${UshioComponent.mapSpeedToProgress(this.mPlaybackRate)}%`
    )
  }
  private panelTranslations = {
    settings: 0,
    source: 0,
    subtitles: 0,
    loop: 0,
    fullscreen: 0
  }
  get settingsPanelPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.settings}px - 50%))`
    )
  }
  get sourcePanelPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.source}px - 50%))`
    )
  }
  get subtitlesPanelPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.subtitles}px - 50%))`
    )
  }
  get loopPanelPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.loop}px - 50%))`
    )
  }
  get fullScreenPanelPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(
      `transform: translateX(calc(${-this.panelTranslations.fullscreen}px - 50%))`
    )
  }
  private mContextMenuPosition = ''
  get contextMenuPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(this.mContextMenuPosition)
  }
  private mProgressDetailPosition = ''
  private mProgressDetailContainerPosition = ''
  private mProgressDetailTimePosition = ''
  private mProgressDetailPositionRate = 0
  get progressDetailPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailPosition)
  }
  get progressDetailContainerPosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailContainerPosition)
  }
  get progressDetailTimePosition (): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailTimePosition)
  }
  get progressDetailImgStyle (): SafeStyle {
    const height = this.video.nativeElement.videoHeight * 160 / this.video.nativeElement.videoWidth
    return this.sanitization.bypassSecurityTrustStyle(
      `height: ${height}px;
       line-height: ${height}px;
       background-image: url("${this.thumbnails}");
       background-position: -${(Math.ceil(this.mProgressDetailPositionRate * 100) - 1) * 160}px 0;`
    )
  }
  get progressDetailTime (): string {
    return UshioComponent.formatDuration(this.mProgressDetailPositionRate * this.duration)
  }

  languages = this.service.i18n.languages
  contextMenuState = 'root'
  get version () {
    return this.service.version
  }
  get detailedVersion () {
    return `v${this.service.version} (${this.service.build})`
  }
  get videoResolution () {
    return `${this.video.nativeElement.videoWidth} x ${this.video.nativeElement.videoHeight}`
  }
  get videoDuration () {
    return this.video.nativeElement.duration.toFixed(6)
  }
  get videoCurrentTime () {
    return this.video.nativeElement.currentTime.toFixed(6)
  }

  private timeUpdate: Subscription
  private controlHoveredChange: Subscription
  private animationFrame: Subscription
  private subscriptions: Subscription[] = []
  private mouseSubscriptions: Subscription[] = []
  private keySubscriptions: Subscription[] = []
  private setAllControlPanelsPositionTimeout: number
  private mouseMove$ = fromEvent(document, 'mousemove')
  private mouseUp$ = fromEvent(document, 'mouseup')
  private touchMove$ = fromEvent(document, 'touchmove')
  private touchStart$ = fromEvent(document, 'touchstart')
  private touchEnd$ = merge(
    fromEvent(document, 'touchend'),
    fromEvent(document, 'touchcancel')
  )
  private mouseTouchUp$ = merge(this.mouseUp$, this.touchEnd$)

  t = this.service.i18n.t

  static mapSpeedToProgress (speed) {
    if (speed < .5) return 0
    else if (speed < 1.5) return (speed - .5) * 80
    else if (speed < 2.0) return 80 + (speed - 1.5) * 40
    else return 100
  }
  static mapProgressToSpeed (progress) {
    if (progress < .1) return .5
    else if (progress < .9) return .75 + .25 * Math.floor((progress - 0.1) * 5)
    else return 2
  }

  static formatDuration (duration: number) {
    const h = Math.floor(duration / 3600)
    const m = Math.floor(duration % 3600 / 60)
    const s = Math.floor(duration % 60)
    let str = ''
    if (h && h < 10) { str += `0${h}:` } else if (h) { str += `${h}:` }
    if (m < 10) { str += `0${m}:` } else { str += `${m}:` }
    if (s < 10) { str += `0${s}` } else { str += `${s}` }
    return str
  }

  constructor (
    private element: ElementRef,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitization: DomSanitizer,
    private service: UshioService
  ) {
    this.showLangMenu = this.showLangMenu.bind(this)
    this.onComponentClicked = this.onComponentClicked.bind(this)
    this.onDocumentClicked = this.onDocumentClicked.bind(this)
  }

  ngOnInit () {
    this.mPaused = this.video.nativeElement.paused
    this.mVolume = this.video.nativeElement.volume
    this.mPlaybackRate = this.video.nativeElement.playbackRate
  }

  ngAfterContentInit () {
    const mapPropsToObject = (props: string[], fn) => (sourceObj: any) => (
      props.reduce((agg, cur) => ({ ...agg, [cur]: fn(sourceObj, cur) }), {})
    )
    const onContentChildrenOrSlotChanged$ = (
      attr, contentChildren:
      QueryList<any>,
      slotChange$: Observable<HTMLElement[]>
    ) => {
      const contentChildrenMap = mapPropsToObject(attr, (obj, cur) => (obj[cur]))
      const slotMap = mapPropsToObject(attr, (obj, cur) => (obj.getAttribute(cur)))
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
      )
    }
    const subtitlesAttr = ['value', 'type', 'src', 'name', 'class', 'default', 'srclang']
    const subtitlesChange$ = onContentChildrenOrSlotChanged$(
      subtitlesAttr, this.subtitlesContentChildren, this.subtitlesSlotChange$)
    const sourcesAttr = ['src', 'type', 'name', 'shortname', 'default']
    const sourcesChange$ = onContentChildrenOrSlotChanged$(
      sourcesAttr, this.sourceContentChildren, this.sourcesSlotChange$)
    this.zone.runOutsideAngular(() => {
      this.subscriptions.push(subtitlesChange$.subscribe(async (subtitles) => {
        this.mSubtitles = subtitles
        await this.updateSubtitles()
        this.changeDetectorRef.detectChanges()
      }))
      this.subscriptions.push(sourcesChange$.subscribe((sources) => {
        this.mSources = sources
        this.updateSources()
        this.changeDetectorRef.detectChanges()
      }))
    })
  }

  onUnfocused () {
    this.keySubscriptions.forEach(sub => sub.unsubscribe())
    this.keySubscriptions = []
  }

  onFocused () {
    const onKeyDown$ = code => fromEvent(document, 'keydown').pipe(
      filter((e: KeyboardEvent) => this.focus && e.code === code),
      tap(e => {
        e.preventDefault()
        e.stopPropagation()
      })
    )
    this.zone.runOutsideAngular(() => {
      this.keySubscriptions.push(onKeyDown$('Space').subscribe(e => {
        this.togglePlay()
        this.changeDetectorRef.detectChanges()
      }))
      this.keySubscriptions.push(onKeyDown$('ArrowRight').subscribe(() => {
        this.mCurrentTime = this.mCurrentTime + 5 < this.duration ? this.mCurrentTime + 5 : this.duration
        this.video.nativeElement.currentTime = this.mCurrentTime
        this.changeDetectorRef.detectChanges()
      }))
      this.keySubscriptions.push(onKeyDown$('ArrowLeft').subscribe(() => {
        this.mCurrentTime = this.mCurrentTime - 5 > 0 ? this.mCurrentTime - 5 : 0
        this.video.nativeElement.currentTime = this.mCurrentTime
        this.changeDetectorRef.detectChanges()
      }))
      this.keySubscriptions.push(onKeyDown$('ArrowUp').subscribe(() => {
        this.mVolume = this.mVolume + 0.1 < 0.999996 ? this.mVolume + 0.1 : 1
        this.video.nativeElement.volume = this.mVolume
        this.changeDetectorRef.detectChanges()
      }))
      this.keySubscriptions.push(onKeyDown$('ArrowDown').subscribe(() => {
        this.mVolume = this.mVolume - 0.1 > 0.000004 ? this.mVolume - 0.1 : 0
        this.video.nativeElement.volume = this.mVolume
        this.changeDetectorRef.detectChanges()
      }))
    })
    const showVolumeHint$ = merge(onKeyDown$('ArrowUp'), onKeyDown$('ArrowDown'))
      .pipe(
        switchMap(
          () => merge(of(true), timer(1000).pipe(mapTo(false)))
        ),
        distinctUntilChanged()
      )
    this.zone.runOutsideAngular(() => {
      this.keySubscriptions.push(showVolumeHint$.subscribe(e => {
        this.showVolumeHint = e
        this.changeDetectorRef.detectChanges()
      }))
      this.setAllControlPanelsPosition()
    })
  }

  onControlDismiss () {
    this.mouseSubscriptions.forEach(sub => sub.unsubscribe())
    this.mouseSubscriptions = []
    if (this.controlHoveredChange) {
      this.controlHoveredChange.unsubscribe()
      this.controlHoveredChange = null
    }
  }

  onControlShown () {
    const ifMouseInArea = (e: MouseEvent, btnElement, popUpElement) => {
      const rect1 = popUpElement.getBoundingClientRect()
      const rect2 = btnElement.getBoundingClientRect()
      return (e.clientX > rect1.left &&
        e.clientX < rect1.right &&
        e.clientY > rect1.top &&
        e.clientY < rect1.bottom) || (e.clientX > rect2.left &&
        e.clientX < rect2.right &&
        e.clientY > rect2.top &&
        e.clientY < rect2.bottom)
    }
    const onControlBtnHoverStateChanged$ = (btns) => {
      return this.mouseMove$.pipe(
        switchMap((e: MouseEvent) => {
          for (const btn of btns) {
            if (ifMouseInArea(e, btn.btnElement, btn.popUpElement)) {
              return of(` btn-${btn.btnName}-hover`)
            }
          }
          return timer(150).pipe(
            mapTo('')
          )
        }),
        distinctUntilChanged()
      )
    }
    const mouseHoverProgressState$ = this.mouseMove$.pipe(
      filter(() => (this.interactMode === 'desktop')),
      map((e: MouseEvent) => {
        const rect = this.slider.nativeElement.getBoundingClientRect()
        const yCenter = (rect.top + rect.bottom) / 2
        if (Math.abs(e.clientY - yCenter) < 8 && e.clientX > rect.left && e.clientX < rect.right) {
          const left = e.clientX - rect.left
          const containerLeft = left < 80 ? 90 - left : left > rect.width - 80 ? rect.width - left - 70 : 10
          const timeLeft = left < 20 ? 30 - left : left > rect.width - 20 ? rect.width - left - 10 : 10
          return { left, containerLeft, timeLeft, width: rect.width }
        } else {
          return false
        }
      }),
      distinctUntilChanged((a, b) => {
        if (typeof a !== typeof b) {
          return false
        } else if (typeof a === 'object' && typeof b === 'object') {
          return a.left === b.left && a.containerLeft === b.containerLeft
            && a.timeLeft === b.timeLeft && a.width === b.width
        } else {
          return a === b
        }
      })
    )
    this.zone.runOutsideAngular(() => {
      this.mouseSubscriptions.push(mouseHoverProgressState$.subscribe(state => {
        if (typeof state === 'boolean') {
          this.showProgressDetail = state
        } else {
          this.showProgressDetail = true
          this.mProgressDetailPosition = `left: ${state.left}px`
          this.mProgressDetailContainerPosition = `left: ${state.containerLeft}px`
          this.mProgressDetailTimePosition = `left: ${state.timeLeft}px`
          this.mProgressDetailPositionRate = state.left / state.width
        }
        this.changeDetectorRef.detectChanges()
      }))
    })
    const mapToRate = (element, progress, total) => map(
      (moveEvent: MouseEvent | TouchEvent) => {
        const eventCoordinate = moveEvent instanceof TouchEvent
          ? moveEvent.changedTouches[0]
          : moveEvent
        const rect = element.getBoundingClientRect()
        let p = progress(eventCoordinate, rect)
        const t = total(rect)
        if (p < 0) p = 0
        else if (p > t) p = t
        return p / t
      }
    )
    const onMouseTouchDown$ = (element, progress, total) => {
      return merge(
        fromEvent(element, 'mousedown'),
        fromEvent(element, 'touchstart')
      ).pipe(
        mapToRate(element, progress, total)
      )
    }
    const onMouseTouchDrag$ = (element, progress, total) => {
      return merge(
        fromEvent(element, 'mousedown').pipe(
          mapToRate(element, progress, total),
          concatMap(() => {
            return this.mouseMove$.pipe(
              takeUntil(this.mouseUp$),
              mapToRate(element, progress, total)
            )
          })
        ),
        fromEvent(element, 'touchstart').pipe(
          mapToRate(element, progress, total),
          concatMap(() => {
            return this.touchMove$.pipe(
              takeUntil(this.touchEnd$),
              mapToRate(element, progress, total)
            )
          })
        )
      )
    }
    const thumbMouseTouchDown$ = onMouseTouchDown$(
      this.slider.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    )
    const thumbTouchDrag$ = onMouseTouchDrag$(
      this.slider.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    )
    this.zone.runOutsideAngular(() => {
      this.mouseSubscriptions.push(thumbMouseTouchDown$.subscribe(e => {
        this.thumbMouseDown = true
        this.timeUpdate.unsubscribe()
        this.mCurrentTime = e * this.duration
        this.changeDetectorRef.detectChanges()
      }))
      this.mouseSubscriptions.push(thumbTouchDrag$.subscribe(e => {
        this.mCurrentTime = e * this.duration
        this.changeDetectorRef.detectChanges()
      }))
      this.mouseSubscriptions.push(this.mouseTouchUp$.subscribe(() => {
        if (this.thumbMouseDown) {
          this.video.nativeElement.currentTime = this.mCurrentTime
          this.subscribeTimeUpdate()
          this.thumbMouseDown = false
          this.showControlProbablyChanged$.next(0)
          this.changeDetectorRef.detectChanges()
        }
      }))
    })
    const controlHoverStateChange$ = onControlBtnHoverStateChanged$([{
      btnElement: this.volumeBtn.nativeElement,
      popUpElement: this.volumePanel.nativeElement,
      btnName: 'volume'
    }, {
      btnElement: this.settingsBtn.nativeElement,
      popUpElement: this.settingsPanel.nativeElement,
      btnName: 'settings'
    }, {
      btnElement: this.sourceBtn.nativeElement,
      popUpElement: this.sourcePanel.nativeElement,
      btnName: 'source'
    }, {
      btnElement: this.subtitlesBtn.nativeElement,
      popUpElement: this.subtitlesPanel.nativeElement,
      btnName: 'subtitles'
    }])
    const subscribeControlHoveredChange = () => {
      this.zone.runOutsideAngular(() => {
        this.controlHoveredChange = controlHoverStateChange$.subscribe(e => {
          this.controlHoveredClass = e
          this.showControlProbablyChanged$.next(0)
          this.setAllControlPanelsPosition()
          this.changeDetectorRef.detectChanges()
        })
      })
    }
    subscribeControlHoveredChange()
    const volumeMouseTouchDown$ = onMouseTouchDown$(
      this.volumeBar.nativeElement,
      (moveEvent, rect) => (rect.bottom - moveEvent.clientY),
      (rect) => (rect.height)
    )
    const volumeTouchDrag$ = onMouseTouchDrag$(
      this.volumeBar.nativeElement,
      (moveEvent, rect) => (rect.bottom - moveEvent.clientY),
      (rect) => (rect.height)
    )
    this.zone.runOutsideAngular(() => {
      this.mouseSubscriptions.push(volumeMouseTouchDown$.subscribe(e => {
        if (!this.controlMouseDown) {
          this.controlMouseDown = true
          this.controlHoveredChange.unsubscribe()
        }
        this.video.nativeElement.muted = false
        this.video.nativeElement.volume = e
        this.changeDetectorRef.detectChanges()
      }))
      this.mouseSubscriptions.push(volumeTouchDrag$.subscribe(e => {
        this.video.nativeElement.volume = e
        this.changeDetectorRef.detectChanges()
      }))
      this.mouseSubscriptions.push(this.mouseTouchUp$.subscribe(() => {
        if (this.controlMouseDown) {
          subscribeControlHoveredChange()
          this.controlMouseDown = false
          this.showControlProbablyChanged$.next(0)
          this.changeDetectorRef.detectChanges()
        }
      }))
    })
    const speedMouseTouchDown$ = onMouseTouchDown$(
      this.speedBar.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    )
    const speedTouchDrag$ = onMouseTouchDrag$(
      this.speedBar.nativeElement,
      (moveEvent, rect) => (moveEvent.clientX - rect.left),
      (rect) => (rect.width)
    )
    this.zone.runOutsideAngular(() => {
      this.mouseSubscriptions.push(speedMouseTouchDown$.subscribe(e => {
        if (!this.controlMouseDown) {
          this.controlMouseDown = true
          this.controlHoveredChange.unsubscribe()
        }
        this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e)
        this.changeDetectorRef.detectChanges()
      }))
      this.mouseSubscriptions.push(speedTouchDrag$.subscribe(e => {
        this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e)
        this.changeDetectorRef.detectChanges()
      }))
    })
  }

  private subscribeTimeUpdate () {
    this.zone.runOutsideAngular(() => {
      this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
        .subscribe(() => {
          this.mCurrentTime = this.video.nativeElement.currentTime
          this.currentTimeChange.emit(this.mCurrentTime)
          this.updateFlyingSubtitles(this.mCurrentTime)
          this.changeDetectorRef.detectChanges()
        })
    })
  }

  ngAfterViewInit () {
    this.viewInit = true
    this.touchStart$.subscribe(() => {
      this.interactMode = 'mobile'
    })
    const desktopShowControlStateChange$ = this.mouseMove$.pipe(
      filter(() => (this.interactMode === 'desktop')),
      map((e: MouseEvent) => {
        const rect = this.video.nativeElement.getBoundingClientRect()
        return {
          showControl: e.clientX > rect.left &&
            e.clientX < rect.right &&
            e.clientY > rect.top &&
            e.clientY < rect.bottom,
          delaySwitch: e.clientY < rect.bottom - 46
        }
      })
    )
    const showControlStateChange$ = merge(
      desktopShowControlStateChange$,
      this.mobileShowControlStateChange$
    ).pipe(
      switchMap(e => {
        return e.showControl
          ? merge(
            of({
              showControl: true,
              noCursor: false
            }),
            e.delaySwitch ? timer(
              this.interactMode === 'desktop' ? 750 : 5000
            ).pipe(
              mapTo({
                showControl: false,
                noCursor: true
              })
            ) : NEVER
          )
          : of({
            showControl: false,
            noCursor: false
          })
      }),
      distinctUntilChanged((a, b) => (
        a.showControl === b.showControl && a.noCursor === b.noCursor
      ))
    )
    this.zone.runOutsideAngular(() => {
      this.subscriptions.push(showControlStateChange$.subscribe(state => {
        this.mShowControl = state.showControl
        this.showControlProbablyChanged$.next(0)
        this.mNoCursor = state.noCursor
        this.changeDetectorRef.detectChanges()
      }))
    })
    if (this.mPaused) this.video.nativeElement.pause()
    else this.video.nativeElement.play()
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'pause')
      .subscribe(() => {
        this.mPaused = true
        this.pausedChange.emit(true)
      }))
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'play')
      .subscribe(() => {
        this.mPaused = false
        this.pausedChange.emit(false)
      }))
    this.subscribeTimeUpdate()
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'waiting')
      .subscribe(() => {
        this.waiting = true
        this.waitingChange.emit(this.waiting)
      }))
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'playing')
      .subscribe(() => {
        this.waiting = false
        this.waitingChange.emit(this.waiting)
      }))
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'progress')
      .subscribe(() => {
        this.bufferedTime = ((timeRanges, currentTime) => {
          const length = timeRanges.length
          for (let i = 0; i < length; i++) {
            if (timeRanges.end(i) <= currentTime) {
              continue
            }
            if (timeRanges.start(i) <= currentTime) {
              return timeRanges.end(i)
            }
            return currentTime
          }
          return currentTime
        })(this.video.nativeElement.buffered, this.video.nativeElement.currentTime)
      }))
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'loadedmetadata')
      .subscribe(() => {
        this.duration = this.video.nativeElement.duration
        this.durationChange.emit(this.duration)
      }))
    this.video.nativeElement.volume = this.mVolume
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'volumechange')
      .subscribe(() => {
        this.mVolume = this.video.nativeElement.volume
        this.volumeChange.emit(this.mVolume)
      }))
    this.video.nativeElement.playbackRate = this.mPlaybackRate
    this.subscriptions.push(fromEvent(this.video.nativeElement, 'ratechange')
      .subscribe(() => {
        this.mPlaybackRate = this.video.nativeElement.playbackRate
        this.playbackRateChange.emit(this.mPlaybackRate)
      }))
    this.subscriptions.push(fromEvent(this.element.nativeElement, 'contextmenu')
      .subscribe((e: MouseEvent) => {
        e.preventDefault()
        const outer = this.element.nativeElement.getBoundingClientRect()
        const panel = this.contextMenu.nativeElement.getBoundingClientRect()
        if (e.clientX + panel.width + 20 > outer.right) {
          if (e.clientY + panel.height + 20 > outer.bottom) {
            this.mContextMenuPosition = `right: ${outer.right - e.clientX}px; bottom: ${outer.bottom - e.clientY}px`
          } else {
            this.mContextMenuPosition = `right: ${outer.right - e.clientX}px; top: ${e.clientY - outer.top}px`
          }
        } else {
          if (e.clientY + panel.height + 20 > outer.bottom) {
            this.mContextMenuPosition = `left: ${e.clientX - outer.left}px; bottom: ${outer.bottom - e.clientY}px`
          } else {
            this.mContextMenuPosition = `left: ${e.clientX - outer.left}px; top: ${e.clientY - outer.top}px`
          }
        }
        this.contextMenuState = 'root'
        this.showContextMenu = true
      }))
    this.zone.runOutsideAngular(() => {
      this.langContextMenuOption.nativeElement.addEventListener('click', this.showLangMenu, true)
      this.element.nativeElement.addEventListener('click', this.onComponentClicked, true)
      document.addEventListener('click', this.onDocumentClicked, true)
    })
    this.zone.runOutsideAngular(() => {
      this.showControlChange$.subscribe(showControl => {
        if (showControl) this.onControlShown()
        else this.onControlDismiss()
        this.showControlChange.emit(showControl)
      })
    })
  }

  // https://github.com/angular/angular/issues/17404
  ngOnDestroy () {
    clearTimeout(this.setAllControlPanelsPositionTimeout)
    this.onUnfocused()
    this.onControlDismiss()
    if (this.timeUpdate) {
      this.timeUpdate.unsubscribe()
      this.timeUpdate = null
    }
    this.subscriptions.forEach(sub => sub.unsubscribe())
    this.subscriptions = []
    this.langContextMenuOption.nativeElement.removeEventListener('click', this.showLangMenu, true)
    this.element.nativeElement.removeEventListener('click', this.onComponentClicked, true)
    document.removeEventListener('click', this.onDocumentClicked, true)
  }

  private updateSources () {
    if (this.mSources.length === 0) {
      this.sources = [{
        shortName: 'Default',
        name: 'Default',
        default: true,
        sources: [{ src: this.mSrc, type: undefined }]
      }]
    } else {
      const sm = {}
      this.mSources.forEach(source => {
        if (!source.shortname) {
          source.shortname = 'Untitled'
        }
        if (!sm[source.shortname]) {
          sm[source.shortname] = {
            shortName: source.shortname,
            name: source.name || 'Untitled',
            sources: []
          }
        }
        sm[source.shortname].sources.push(source)
        if (source.default !== undefined && source.default !== null) {
          sm[source.shortname].default = true
        }
      })
      this.sources = Object.values(sm)
    }
    const indexOfDefault = this.sources.findIndex(s => s.default)
    this.playingSource = indexOfDefault >= 0 ? indexOfDefault : 0
    if (this.viewInit) this.video.nativeElement.load()
  }

  private async updateSubtitles () {
    const parsedSubtitles = []
    for (const sub of this.mSubtitles) {
      let text = ''
      if (sub.value) text = sub.value
      else if (sub.src) {
        const resp = await fetch(sub.src)
        text = await resp.text()
      }
      const parsed = {
        name: sub.name || 'Untitled',
        class: sub.class || '',
        parsedSubtitles: undefined,
        enabled: sub.default !== undefined && sub.default !== null
          || sub.srclang === this.service.i18n.language
      }
      sub.type = sub.type || ''
      sub.type = sub.type.toLowerCase()
      if (sub.type !== 'text/vtt' && sub.type !== 'application/x-subrip') {
        console.warn('Unknown MIME type of subtitles, trying to infer subtitle format. Supported type: text/vtt, application/x-subrip.')
      }
      try {
        parsed.parsedSubtitles = this.service.parseSubtitles(text)
      } catch (e) {
        console.error(e)
      }
      parsedSubtitles.push(parsed)
    }
    this.subtitles = parsedSubtitles
    this.updateFlyingSubtitles()
  }

  private updateFlyingSubtitles (currentTime?) {
    if (currentTime === undefined) {
      currentTime = this.video.nativeElement.currentTime
    }
    currentTime *= 1000
    const flyingSubtitles = []
    this.enabledSubtitles.forEach(subtitles => {
      if (!subtitles.parsedSubtitles) return
      const flyingSubtitlesTrack = []
      subtitles.parsedSubtitles.forEach(subtitle => {
        if (currentTime > subtitle.startTime && currentTime < subtitle.endTime) {
          flyingSubtitlesTrack.push({
            ...subtitle,
            texts: subtitle.texts.map(text => this.sanitization.bypassSecurityTrustHtml(text))
          })
        }
      })
      if (flyingSubtitlesTrack.length) {
        flyingSubtitles.push({
          name: subtitles.name,
          class: subtitles.class,
          parsedSubtitles: flyingSubtitlesTrack
        })
      }
    })
    this.flyingSubtitles = flyingSubtitles
  }

  private setAllControlPanelsPosition () {
    this.zone.runOutsideAngular(() => {
      this.setAllControlPanelsPositionTimeout = setTimeout(() => {
        [{
          btn: this.settingsBtn,
          panel: this.settingsPanel,
          name: 'settings'
        }, {
          btn: this.sourceBtn,
          panel: this.sourcePanel,
          name: 'source'
        }, {
          btn: this.subtitlesBtn,
          panel: this.subtitlesPanel,
          name: 'subtitles'
        }, {
          btn: this.loopBtn,
          panel: this.loopPanel,
          name: 'loop'
        }, {
          btn: this.fullScreenBtn,
          panel: this.fullScreenPanel,
          name: 'fullscreen'
        }].forEach(item => this.setPanelPosition(item.btn, item.panel, item.name))
        this.changeDetectorRef.detectChanges()
      }, 0)
    })
  }

  private setPanelPosition (btn, panel, name) {
    if (!this.element || !panel || !btn) return
    const outerRect = this.element.nativeElement.getBoundingClientRect()
    const panelRect = panel.nativeElement.getBoundingClientRect()
    const btnRect = btn.nativeElement.getBoundingClientRect()
    if (panelRect.width / 2 - outerRect.right + btnRect.right > 0) {
      this.panelTranslations[name] = panelRect.width / 2 - outerRect.right + btnRect.right
    } else {
      this.panelTranslations[name] = 0
    }
  }

  onSlotChange (e) {
    this.subtitlesSlotUpdate$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SUBTITLES')
    )
    this.sourcesSlotUpdate$.next(
      e.target.assignedNodes().filter(node => node.nodeName === 'USHIO-SOURCE')
    )
    this.mInjectedStyles = e.target.assignedNodes()
      .filter(node => node.nodeName === 'STYLE').map(node => node.innerHTML)
  }

  onVideoMaskClicked () {
    if (this.interactMode === 'desktop') {
      this.togglePlay()
    } else {
      this.mobileShowControlStateChange$.next({
        showControl: !this.mShowControl,
        delaySwitch: true
      })
    }
  }

  onSelectSource (i) {
    if (i === this.playingSource) return
    const currentTime = this.mCurrentTime
    const paused = this.mPaused
    this.playingSource = i
    this.video.nativeElement.load()
    this.video.nativeElement.currentTime = currentTime
    if (!paused) this.video.nativeElement.play()
  }

  onCheckSubtitles (i) {
    this.subtitles[i].enabled = !this.subtitles[i].enabled
    this.updateFlyingSubtitles()
    this.changeDetectorRef.detectChanges()
  }

  togglePlay () {
    if (this.video.nativeElement.paused) this.video.nativeElement.play()
    else this.video.nativeElement.pause()
  }

  toggleMute () {
    if (this.interactMode === 'desktop') {
      this.video.nativeElement.muted = !(this.video.nativeElement.muted || this.video.nativeElement.volume === 0)
      this.mutedChange.emit(this.video.nativeElement.muted)
    } else if (this.video.nativeElement.muted) {
      this.video.nativeElement.muted = false
      this.mutedChange.emit(false)
    }
    if (!this.video.nativeElement.muted && this.video.nativeElement.volume === 0) {
      this.video.nativeElement.volume = Math.random()
    }
  }

  toggleLoop () {
    this.video.nativeElement.loop = !this.video.nativeElement.loop
    this.loopChange.emit(this.video.nativeElement.loop)
  }

  toggleFullscreen () {
    if (!this.isFullScreen) {
      this.element.nativeElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  showLangMenu () {
    this.contextMenuState = 'lang'
    this.showContextMenu = true
    this.changeDetectorRef.detectChanges()
  }

  onComponentClicked () {
    this.focus = true
    if (this.keySubscriptions.length === 0) {
      this.onFocused()
    }
  }

  onDocumentClicked () {
    this.focus = false
    if (this.showContextMenu) {
      this.showContextMenu = false
      this.changeDetectorRef.detectChanges()
    }
  }

  setLanguage (code) {
    this.service.i18n.setLanguage(code)
  }

  toggleShowStatisticInfoPanel () {
    this.showStatisticInfoPanel = !this.showStatisticInfoPanel
    if (this.showStatisticInfoPanel) {
      this.zone.runOutsideAngular(() => {
        const animationFrame$ = of(null, animationFrameScheduler).pipe(repeat())
        this.animationFrame = animationFrame$.subscribe(() => {
          if (!this.fpsStart) this.fpsStart = +new Date()
          this.fpsIndex++
          const fpsCurrent = +new Date()
          if (fpsCurrent - this.fpsStart > 1000) {
            this.fps = ((this.fpsIndex / (fpsCurrent - this.fpsStart)) * 1000).toFixed(2)
            this.fpsStart = +new Date()
            this.fpsIndex = 0
            this.changeDetectorRef.detectChanges()
          }
        })
      })
    } else {
      this.animationFrame.unsubscribe()
    }
  }

}
