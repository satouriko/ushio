/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, Input, NgZone, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animationFrameScheduler, fromEvent, merge, NEVER, of, Subject, timer } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, map, mapTo, repeat, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UshioService } from './ushio.service';
export class UshioSource {
}
UshioSource.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'ushio-source'
            },] }
];
UshioSource.propDecorators = {
    src: [{ type: Input }],
    type: [{ type: Input }],
    shortname: [{ type: Input }],
    name: [{ type: Input }],
    default: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    UshioSource.prototype.src;
    /** @type {?} */
    UshioSource.prototype.type;
    /** @type {?} */
    UshioSource.prototype.shortname;
    /** @type {?} */
    UshioSource.prototype.name;
    /** @type {?} */
    UshioSource.prototype.default;
}
export class UshioSubtitles {
}
UshioSubtitles.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'ushio-subtitles'
            },] }
];
UshioSubtitles.propDecorators = {
    value: [{ type: Input }],
    src: [{ type: Input }],
    type: [{ type: Input }],
    name: [{ type: Input }],
    class: [{ type: Input }],
    srclang: [{ type: Input }],
    default: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    UshioSubtitles.prototype.value;
    /** @type {?} */
    UshioSubtitles.prototype.src;
    /** @type {?} */
    UshioSubtitles.prototype.type;
    /** @type {?} */
    UshioSubtitles.prototype.name;
    /** @type {?} */
    UshioSubtitles.prototype.class;
    /** @type {?} */
    UshioSubtitles.prototype.srclang;
    /** @type {?} */
    UshioSubtitles.prototype.default;
}
/**
 * @record
 */
function Source() { }
if (false) {
    /** @type {?} */
    Source.prototype.shortName;
    /** @type {?} */
    Source.prototype.name;
    /** @type {?} */
    Source.prototype.sources;
    /** @type {?|undefined} */
    Source.prototype.default;
}
/**
 * @record
 */
function Subtitles() { }
if (false) {
    /** @type {?} */
    Subtitles.prototype.name;
    /** @type {?} */
    Subtitles.prototype.class;
    /** @type {?} */
    Subtitles.prototype.parsedSubtitles;
    /** @type {?} */
    Subtitles.prototype.enabled;
}
export class UshioComponent {
    /**
     * @param {?} element
     * @param {?} zone
     * @param {?} changeDetectorRef
     * @param {?} sanitization
     * @param {?} service
     */
    constructor(element, zone, changeDetectorRef, sanitization, service) {
        this.element = element;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.sanitization = sanitization;
        this.service = service;
        this.mInjectedStyles = [];
        this.preload = 'metadata';
        this.mSources = [];
        this.sources = [];
        this.playingSource = 0;
        this.mSubtitles = [];
        this.subtitles = [];
        this.flyingSubtitles = [];
        this.mVolume = 1;
        this.volumeChange = new EventEmitter();
        this.mPlaybackRate = 1;
        this.playbackRateChange = new EventEmitter();
        this.mVolumeControl = true;
        this.mSourceControl = true;
        this.mSubtitlesControl = true;
        this.mSettingsControl = true;
        this.mLoopControl = true;
        this.mFullscreenControl = true;
        this.subtitlesSlotUpdate$ = new Subject();
        this.sourcesSlotUpdate$ = new Subject();
        this.subtitlesSlotChange$ = this.subtitlesSlotUpdate$.asObservable().pipe(distinctUntilChanged());
        this.sourcesSlotChange$ = this.sourcesSlotUpdate$.asObservable().pipe(distinctUntilChanged());
        this.mobileShowControlStateChange$ = new Subject();
        this.interactMode = 'desktop';
        this.focus = false;
        this.mShowControl = false;
        this.mNoCursor = false;
        this.thumbMouseDown = false;
        this.controlMouseDown = false;
        this.controlHoveredClass = '';
        this.showContextMenu = false;
        this.showStatisticInfoPanel = false;
        this.showVolumeHint = false;
        this.showProgressDetail = false;
        this.showControlChange = new EventEmitter();
        this.mPaused = true;
        this.pausedChange = new EventEmitter();
        this.mCurrentTime = 0;
        this.currentTimeChange = new EventEmitter();
        this.duration = 0;
        this.durationChange = new EventEmitter();
        this.bufferedTime = 0;
        this.waiting = false;
        this.waitingChange = new EventEmitter();
        this.loopChange = new EventEmitter();
        this.mutedChange = new EventEmitter();
        this.fps = '0.00';
        this.fpsStart = 0;
        this.fpsIndex = 0;
        this.panelTranslations = {
            settings: 0,
            source: 0,
            subtitles: 0,
            loop: 0,
            fullscreen: 0
        };
        this.mContextMenuPosition = '';
        this.mProgressDetailPosition = '';
        this.mProgressDetailContainerPosition = '';
        this.mProgressDetailTimePosition = '';
        this.mProgressDetailPositionRate = 0;
        this.languages = this.service.i18n.languages;
        this.contextMenuState = 'root';
        this.subscriptions = [];
        this.t = this.service.i18n.t;
        this.showLangMenu = this.showLangMenu.bind(this);
        this.onComponentClicked = this.onComponentClicked.bind(this);
        this.onDocumentClicked = this.onDocumentClicked.bind(this);
    }
    /**
     * @return {?}
     */
    get injectedStyles() {
        return this.mInjectedStyles.map((/**
         * @param {?} style
         * @return {?}
         */
        style => this.sanitization.bypassSecurityTrustHtml(`
      <style>
       ${style}
      </style>
    `)));
    }
    /**
     * @param {?} src
     * @return {?}
     */
    set src(src) {
        this.mSrc = src;
        this.updateSources();
    }
    /**
     * @return {?}
     */
    get src() {
        return this.mSrc;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    set lang(lang) {
        this.service.i18n.setLanguage(lang);
    }
    /**
     * @return {?}
     */
    get enabledSubtitles() {
        return this.subtitles.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.enabled));
    }
    /**
     * @param {?} volume
     * @return {?}
     */
    set volume(volume) {
        this.video.nativeElement.volume = volume;
    }
    /**
     * @return {?}
     */
    get volume100() {
        if (this.video.nativeElement.muted)
            return 0;
        return Math.round(this.mVolume * 100);
    }
    /**
     * @param {?} playbackRate
     * @return {?}
     */
    set playbackRate(playbackRate) {
        this.video.nativeElement.playbackRate = playbackRate;
    }
    /**
     * @param {?} volumeControl
     * @return {?}
     */
    set volumeControl(volumeControl) {
        this.mVolumeControl = volumeControl;
        this.setAllControlPanelsPosition();
    }
    /**
     * @return {?}
     */
    get volumeControl() {
        return this.mVolumeControl;
    }
    /**
     * @param {?} sourceControl
     * @return {?}
     */
    set sourceControl(sourceControl) {
        this.mSourceControl = sourceControl;
        this.setAllControlPanelsPosition();
    }
    /**
     * @return {?}
     */
    get sourceControl() {
        return this.mSourceControl;
    }
    /**
     * @param {?} subtitlesControl
     * @return {?}
     */
    set subtitlesControl(subtitlesControl) {
        this.mSubtitlesControl = subtitlesControl;
        this.setAllControlPanelsPosition();
    }
    /**
     * @return {?}
     */
    get subtitlesControl() {
        return this.mSubtitlesControl;
    }
    /**
     * @param {?} settingsControl
     * @return {?}
     */
    set settingsControl(settingsControl) {
        this.mSettingsControl = settingsControl;
        this.setAllControlPanelsPosition();
    }
    /**
     * @return {?}
     */
    get settingsControl() {
        return this.mSettingsControl;
    }
    /**
     * @param {?} loopControl
     * @return {?}
     */
    set loopControl(loopControl) {
        this.mLoopControl = loopControl;
        this.setAllControlPanelsPosition();
    }
    /**
     * @return {?}
     */
    get loopControl() {
        return this.mLoopControl;
    }
    /**
     * @param {?} fullscreenControl
     * @return {?}
     */
    set fullscreenControl(fullscreenControl) {
        this.mFullscreenControl = fullscreenControl;
        this.setAllControlPanelsPosition();
    }
    /**
     * @return {?}
     */
    get fullscreenControl() {
        return this.mFullscreenControl;
    }
    /**
     * @return {?}
     */
    get isFullScreen() {
        return document.fullscreenElement !== null;
    }
    /**
     * @return {?}
     */
    get mouseDown() {
        return this.thumbMouseDown || this.controlMouseDown;
    }
    /**
     * @return {?}
     */
    get showControl() {
        return !!(this.mShowControl || this.controlHoveredClass || this.mouseDown);
    }
    /**
     * @return {?}
     */
    get noCursor() {
        return !this.showControl && this.mNoCursor;
    }
    /**
     * @return {?}
     */
    get thumbMouseDownClass() {
        return this.thumbMouseDown ? ' thumb-mouse-down' : '';
    }
    /**
     * @return {?}
     */
    get pausedClass() {
        return this.mPaused ? ' video-state-pause' : ' video-state-play';
    }
    /**
     * @return {?}
     */
    get waitingClass() {
        return this.waiting && !this.mPaused ? ' video-state-waiting' : '';
    }
    /**
     * @return {?}
     */
    get mutedClass() {
        return (this.video.nativeElement.muted || this.video.nativeElement.volume === 0)
            ? ' video-state-muted' : ' video-state-volume';
    }
    /**
     * @return {?}
     */
    get loopClass() {
        return this.video.nativeElement.loop ? ' video-state-loop' : ' video-state-noloop';
    }
    /**
     * @return {?}
     */
    get subtitleEnabledClass() {
        return this.enabledSubtitles.length > 0 ? ' video-state-subtitles' : ' video-state-nosubtitles';
    }
    /**
     * @return {?}
     */
    get fullscreenClass() {
        return this.isFullScreen ? ' video-state-fullscreen' : ' video-state-nofullscreen';
    }
    /**
     * @return {?}
     */
    get contextMenuClass() {
        return this.contextMenuState + (this.showContextMenu ? ' active' : '');
    }
    /**
     * @return {?}
     */
    get statisticInfoPanelClass() {
        return this.showStatisticInfoPanel ? ' active' : '';
    }
    /**
     * @return {?}
     */
    get volumeHintClass() {
        return this.showVolumeHint ? ' active' : '';
    }
    /**
     * @return {?}
     */
    get progressDetailClass() {
        return this.showProgressDetail ? ' active' : '';
    }
    /**
     * @param {?} paused
     * @return {?}
     */
    set paused(paused) {
        if (paused)
            this.video.nativeElement.pause();
        else
            this.video.nativeElement.play();
    }
    /**
     * @param {?} currentTime
     * @return {?}
     */
    set currentTime(currentTime) {
        this.video.nativeElement.currentTime = currentTime;
    }
    /**
     * @param {?} loop
     * @return {?}
     */
    set loop(loop) {
        this.video.nativeElement.loop = loop;
    }
    /**
     * @param {?} muted
     * @return {?}
     */
    set muted(muted) {
        this.video.nativeElement.muted = muted;
    }
    /**
     * @return {?}
     */
    get currentTimeStr() {
        return UshioComponent.formatDuration(this.mCurrentTime);
    }
    /**
     * @return {?}
     */
    get durationStr() {
        return UshioComponent.formatDuration(this.duration);
    }
    /**
     * @return {?}
     */
    get bufferedProgress() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: scaleX(${this.bufferedTime / this.duration})`);
    }
    /**
     * @return {?}
     */
    get playedProgress() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: scaleX(${this.mCurrentTime / this.duration})`);
    }
    /**
     * @return {?}
     */
    get thumbPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`left: ${this.mCurrentTime / this.duration * 100}%`);
    }
    /**
     * @return {?}
     */
    get volumeRate() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: scaleY(${this.volume100 / 100})`);
    }
    /**
     * @return {?}
     */
    get volumeThumbPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`bottom: ${this.volume100}%`);
    }
    /**
     * @return {?}
     */
    get speedThumbPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`left: ${UshioComponent.mapSpeedToProgress(this.mPlaybackRate)}%`);
    }
    /**
     * @return {?}
     */
    get settingsPanelPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: translateX(calc(${-this.panelTranslations.settings}px - 50%))`);
    }
    /**
     * @return {?}
     */
    get sourcePanelPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: translateX(calc(${-this.panelTranslations.source}px - 50%))`);
    }
    /**
     * @return {?}
     */
    get subtitlesPanelPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: translateX(calc(${-this.panelTranslations.subtitles}px - 50%))`);
    }
    /**
     * @return {?}
     */
    get loopPanelPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: translateX(calc(${-this.panelTranslations.loop}px - 50%))`);
    }
    /**
     * @return {?}
     */
    get fullScreenPanelPosition() {
        return this.sanitization.bypassSecurityTrustStyle(`transform: translateX(calc(${-this.panelTranslations.fullscreen}px - 50%))`);
    }
    /**
     * @return {?}
     */
    get contextMenuPosition() {
        return this.sanitization.bypassSecurityTrustStyle(this.mContextMenuPosition);
    }
    /**
     * @return {?}
     */
    get progressDetailPosition() {
        return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailPosition);
    }
    /**
     * @return {?}
     */
    get progressDetailContainerPosition() {
        return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailContainerPosition);
    }
    /**
     * @return {?}
     */
    get progressDetailTimePosition() {
        return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailTimePosition);
    }
    /**
     * @return {?}
     */
    get progressDetailImgStyle() {
        /** @type {?} */
        const height = this.video.nativeElement.videoHeight * 160 / this.video.nativeElement.videoWidth;
        return this.sanitization.bypassSecurityTrustStyle(`height: ${height}px;
       line-height: ${height}px;
       background-image: url("${this.thumbnails}");
       background-position: -${(Math.ceil(this.mProgressDetailPositionRate * 100) - 1) * 160}px 0;`);
    }
    /**
     * @return {?}
     */
    get progressDetailTime() {
        return UshioComponent.formatDuration(this.mProgressDetailPositionRate * this.duration);
    }
    /**
     * @return {?}
     */
    get version() {
        return this.service.version;
    }
    /**
     * @return {?}
     */
    get detailedVersion() {
        return `v${this.service.version} (${this.service.build})`;
    }
    /**
     * @return {?}
     */
    get videoResolution() {
        return `${this.video.nativeElement.videoWidth} x ${this.video.nativeElement.videoHeight}`;
    }
    /**
     * @return {?}
     */
    get videoDuration() {
        return this.video.nativeElement.duration.toFixed(6);
    }
    /**
     * @return {?}
     */
    get videoCurrentTime() {
        return this.video.nativeElement.currentTime.toFixed(6);
    }
    /**
     * @param {?} speed
     * @return {?}
     */
    static mapSpeedToProgress(speed) {
        if (speed < .5)
            return 0;
        else if (speed < 1.5)
            return (speed - .5) * 80;
        else if (speed < 2.0)
            return 80 + (speed - 1.5) * 40;
        else
            return 100;
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    static mapProgressToSpeed(progress) {
        if (progress < .1)
            return .5;
        else if (progress < .9)
            return .75 + .25 * Math.floor((progress - 0.1) * 5);
        else
            return 2;
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    static formatDuration(duration) {
        /** @type {?} */
        const h = Math.floor(duration / 3600);
        /** @type {?} */
        const m = Math.floor(duration % 3600 / 60);
        /** @type {?} */
        const s = Math.floor(duration % 60);
        /** @type {?} */
        let str = '';
        if (h && h < 10) {
            str += `0${h}:`;
        }
        else if (h) {
            str += `${h}:`;
        }
        if (m < 10) {
            str += `0${m}:`;
        }
        else {
            str += `${m}:`;
        }
        if (s < 10) {
            str += `0${s}`;
        }
        else {
            str += `${s}`;
        }
        return str;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mPaused = this.video.nativeElement.paused;
        this.mVolume = this.video.nativeElement.volume;
        this.mPlaybackRate = this.video.nativeElement.playbackRate;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const mapPropsToObject = (/**
         * @param {?} props
         * @param {?} fn
         * @return {?}
         */
        (props, fn) => (/**
         * @param {?} sourceObj
         * @return {?}
         */
        (sourceObj) => (props.reduce((/**
         * @param {?} agg
         * @param {?} cur
         * @return {?}
         */
        (agg, cur) => (Object.assign({}, agg, { [cur]: fn(sourceObj, cur) }))), {}))));
        /** @type {?} */
        const onContentChildrenOrSlotChanged$ = (/**
         * @param {?} attr
         * @param {?} contentChildren
         * @param {?} slotChange$
         * @return {?}
         */
        (attr, contentChildren, slotChange$) => {
            /** @type {?} */
            const contentChildrenMap = mapPropsToObject(attr, (/**
             * @param {?} obj
             * @param {?} cur
             * @return {?}
             */
            (obj, cur) => (obj[cur])));
            /** @type {?} */
            const slotMap = mapPropsToObject(attr, (/**
             * @param {?} obj
             * @param {?} cur
             * @return {?}
             */
            (obj, cur) => (obj.getAttribute(cur))));
            return merge(of(contentChildren.toArray().map(contentChildrenMap)), contentChildren.changes.pipe(map((/**
             * @param {?} contents
             * @return {?}
             */
            (contents) => (contents.toArray().map(contentChildrenMap))))), slotChange$.pipe(map((/**
             * @param {?} contents
             * @return {?}
             */
            (contents) => (contents.map(slotMap))))));
        });
        /** @type {?} */
        const subtitlesAttr = ['value', 'type', 'src', 'name', 'class', 'default', 'srclang'];
        /** @type {?} */
        const subtitlesChange$ = onContentChildrenOrSlotChanged$(subtitlesAttr, this.subtitlesContentChildren, this.subtitlesSlotChange$);
        /** @type {?} */
        const sourcesAttr = ['src', 'type', 'name', 'shortname', 'default'];
        /** @type {?} */
        const sourcesChange$ = onContentChildrenOrSlotChanged$(sourcesAttr, this.sourceContentChildren, this.sourcesSlotChange$);
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(subtitlesChange$.subscribe((/**
             * @param {?} subtitles
             * @return {?}
             */
            (subtitles) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                this.mSubtitles = subtitles;
                yield this.updateSubtitles();
                this.changeDetectorRef.detectChanges();
            }))));
            this.subscriptions.push(sourcesChange$.subscribe((/**
             * @param {?} sources
             * @return {?}
             */
            (sources) => {
                this.mSources = sources;
                this.updateSources();
                this.changeDetectorRef.detectChanges();
            })));
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const mouseMove$ = fromEvent(document, 'mousemove');
        /** @type {?} */
        const mouseUp$ = fromEvent(document, 'mouseup');
        /** @type {?} */
        const touchMove$ = fromEvent(document, 'touchmove');
        /** @type {?} */
        const touchStart$ = fromEvent(document, 'touchstart');
        /** @type {?} */
        const touchEnd$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'touchcancel'));
        /** @type {?} */
        const mouseTouchUp$ = merge(mouseUp$, touchEnd$);
        touchStart$.subscribe((/**
         * @return {?}
         */
        () => {
            this.interactMode = 'mobile';
        }));
        /** @type {?} */
        const ifMouseInArea = (/**
         * @param {?} e
         * @param {?} btnElement
         * @param {?} popUpElement
         * @return {?}
         */
        (e, btnElement, popUpElement) => {
            /** @type {?} */
            const rect1 = popUpElement.getBoundingClientRect();
            /** @type {?} */
            const rect2 = btnElement.getBoundingClientRect();
            return (e.clientX > rect1.left &&
                e.clientX < rect1.right &&
                e.clientY > rect1.top &&
                e.clientY < rect1.bottom) || (e.clientX > rect2.left &&
                e.clientX < rect2.right &&
                e.clientY > rect2.top &&
                e.clientY < rect2.bottom);
        });
        /** @type {?} */
        const onControlBtnHoverStateChanged$ = (/**
         * @param {?} btns
         * @return {?}
         */
        (btns) => {
            return mouseMove$.pipe(switchMap((/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                for (const btn of btns) {
                    if (ifMouseInArea(e, btn.btnElement, btn.popUpElement)) {
                        return of(` btn-${btn.btnName}-hover`);
                    }
                }
                return timer(150).pipe(mapTo(''));
            })), distinctUntilChanged());
        });
        /** @type {?} */
        const desktopShowControlStateChange$ = mouseMove$.pipe(filter((/**
         * @return {?}
         */
        () => (this.interactMode === 'desktop'))), map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const rect = this.video.nativeElement.getBoundingClientRect();
            return {
                showControl: e.clientX > rect.left &&
                    e.clientX < rect.right &&
                    e.clientY > rect.top &&
                    e.clientY < rect.bottom,
                delaySwitch: e.clientY < rect.bottom - 46
            };
        })));
        /** @type {?} */
        const showControlStateChange$ = merge(desktopShowControlStateChange$, this.mobileShowControlStateChange$).pipe(switchMap((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            return e.showControl
                ? merge(of({
                    showControl: true,
                    noCursor: false
                }), e.delaySwitch ? timer(this.interactMode === 'desktop' ? 750 : 5000).pipe(mapTo({
                    showControl: false,
                    noCursor: true
                })) : NEVER)
                : of({
                    showControl: false,
                    noCursor: false
                });
        })), distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => (a.showControl === b.showControl && a.noCursor === b.noCursor))));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(showControlStateChange$.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            state => {
                this.mShowControl = state.showControl;
                this.mNoCursor = state.noCursor;
                this.changeDetectorRef.detectChanges();
            })));
        }));
        /** @type {?} */
        const mouseHoverProgressState$ = mouseMove$.pipe(filter((/**
         * @return {?}
         */
        () => (this.interactMode === 'desktop'))), map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const rect = this.slider.nativeElement.getBoundingClientRect();
            /** @type {?} */
            const yCenter = (rect.top + rect.bottom) / 2;
            if (Math.abs(e.clientY - yCenter) < 8 && e.clientX > rect.left && e.clientX < rect.right) {
                /** @type {?} */
                const left = e.clientX - rect.left;
                /** @type {?} */
                const containerLeft = left < 80 ? 90 - left : left > rect.width - 80 ? rect.width - left - 70 : 10;
                /** @type {?} */
                const timeLeft = left < 20 ? 30 - left : left > rect.width - 20 ? rect.width - left - 10 : 10;
                return { left, containerLeft, timeLeft, width: rect.width };
            }
            else {
                return false;
            }
        })), distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            if (typeof a !== typeof b) {
                return false;
            }
            else if (typeof a === 'object' && typeof b === 'object') {
                return a.left === b.left && a.containerLeft === b.containerLeft
                    && a.timeLeft === b.timeLeft && a.width === b.width;
            }
            else {
                return a === b;
            }
        })));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(mouseHoverProgressState$.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            state => {
                if (typeof state === 'boolean') {
                    this.showProgressDetail = state;
                }
                else {
                    this.showProgressDetail = true;
                    this.mProgressDetailPosition = `left: ${state.left}px`;
                    this.mProgressDetailContainerPosition = `left: ${state.containerLeft}px`;
                    this.mProgressDetailTimePosition = `left: ${state.timeLeft}px`;
                    this.mProgressDetailPositionRate = state.left / state.width;
                }
                this.changeDetectorRef.detectChanges();
            })));
        }));
        if (this.mPaused)
            this.video.nativeElement.pause();
        else
            this.video.nativeElement.play();
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'pause')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.mPaused = true;
            this.pausedChange.emit(true);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'play')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.mPaused = false;
            this.pausedChange.emit(false);
        })));
        /** @type {?} */
        const subscribeTimeUpdate = (/**
         * @return {?}
         */
        () => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    this.mCurrentTime = this.video.nativeElement.currentTime;
                    this.currentTimeChange.emit(this.mCurrentTime);
                    this.updateFlyingSubtitles(this.mCurrentTime);
                    this.changeDetectorRef.detectChanges();
                }));
            }));
        });
        subscribeTimeUpdate();
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'waiting')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.waiting = true;
            this.waitingChange.emit(this.waiting);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'playing')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.waiting = false;
            this.waitingChange.emit(this.waiting);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'progress')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.bufferedTime = ((/**
             * @param {?} timeRanges
             * @param {?} currentTime
             * @return {?}
             */
            (timeRanges, currentTime) => {
                /** @type {?} */
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
            }))(this.video.nativeElement.buffered, this.video.nativeElement.currentTime);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'loadedmetadata')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.duration = this.video.nativeElement.duration;
            this.durationChange.emit(this.duration);
        })));
        this.video.nativeElement.volume = this.mVolume;
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'volumechange')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.mVolume = this.video.nativeElement.volume;
            this.volumeChange.emit(this.mVolume);
        })));
        this.video.nativeElement.playbackRate = this.mPlaybackRate;
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'ratechange')
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.mPlaybackRate = this.video.nativeElement.playbackRate;
            this.playbackRateChange.emit(this.mPlaybackRate);
        })));
        /** @type {?} */
        const mapToRate = (/**
         * @param {?} element
         * @param {?} progress
         * @param {?} total
         * @return {?}
         */
        (element, progress, total) => map((/**
         * @param {?} moveEvent
         * @return {?}
         */
        (moveEvent) => {
            /** @type {?} */
            const eventCoordinate = moveEvent instanceof TouchEvent
                ? moveEvent.changedTouches[0]
                : moveEvent;
            /** @type {?} */
            const rect = element.getBoundingClientRect();
            /** @type {?} */
            let p = progress(eventCoordinate, rect);
            /** @type {?} */
            const t = total(rect);
            if (p < 0)
                p = 0;
            else if (p > t)
                p = t;
            return p / t;
        })));
        /** @type {?} */
        const onMouseTouchDown$ = (/**
         * @param {?} element
         * @param {?} progress
         * @param {?} total
         * @return {?}
         */
        (element, progress, total) => {
            return merge(fromEvent(element, 'mousedown'), fromEvent(element, 'touchstart')).pipe(mapToRate(element, progress, total));
        });
        /** @type {?} */
        const onMouseTouchDrag$ = (/**
         * @param {?} element
         * @param {?} progress
         * @param {?} total
         * @return {?}
         */
        (element, progress, total) => {
            return merge(fromEvent(element, 'mousedown').pipe(mapToRate(element, progress, total), concatMap((/**
             * @return {?}
             */
            () => {
                return mouseMove$.pipe(takeUntil(mouseUp$), mapToRate(element, progress, total));
            }))), fromEvent(element, 'touchstart').pipe(mapToRate(element, progress, total), concatMap((/**
             * @return {?}
             */
            () => {
                return touchMove$.pipe(takeUntil(touchEnd$), mapToRate(element, progress, total));
            }))));
        });
        /** @type {?} */
        const thumbMouseTouchDown$ = onMouseTouchDown$(this.slider.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        (moveEvent, rect) => (moveEvent.clientX - rect.left)), (/**
         * @param {?} rect
         * @return {?}
         */
        (rect) => (rect.width)));
        /** @type {?} */
        const thumbTouchDrag$ = onMouseTouchDrag$(this.slider.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        (moveEvent, rect) => (moveEvent.clientX - rect.left)), (/**
         * @param {?} rect
         * @return {?}
         */
        (rect) => (rect.width)));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(thumbMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.thumbMouseDown = true;
                this.timeUpdate.unsubscribe();
                this.mCurrentTime = e * this.duration;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(thumbTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.mCurrentTime = e * this.duration;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(mouseTouchUp$.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.thumbMouseDown) {
                    this.video.nativeElement.currentTime = this.mCurrentTime;
                    subscribeTimeUpdate();
                    this.thumbMouseDown = false;
                    this.changeDetectorRef.detectChanges();
                }
            })));
        }));
        /** @type {?} */
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
            }]);
        /** @type {?} */
        const subscribeControlHoveredChange = (/**
         * @return {?}
         */
        () => {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.controlHoveredChange = controlHoverStateChange$.subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    this.controlHoveredClass = e;
                    this.setAllControlPanelsPosition();
                    this.changeDetectorRef.detectChanges();
                }));
            }));
        });
        subscribeControlHoveredChange();
        /** @type {?} */
        const hoverStateChange$ = merge(showControlStateChange$, controlHoverStateChange$).pipe(map((/**
         * @return {?}
         */
        () => this.showControl)), distinctUntilChanged());
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(hoverStateChange$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.showControlChange.emit(e);
            })));
        }));
        /** @type {?} */
        const volumeMouseTouchDown$ = onMouseTouchDown$(this.volumeBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        (moveEvent, rect) => (rect.bottom - moveEvent.clientY)), (/**
         * @param {?} rect
         * @return {?}
         */
        (rect) => (rect.height)));
        /** @type {?} */
        const volumeTouchDrag$ = onMouseTouchDrag$(this.volumeBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        (moveEvent, rect) => (rect.bottom - moveEvent.clientY)), (/**
         * @param {?} rect
         * @return {?}
         */
        (rect) => (rect.height)));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(volumeMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                if (!this.controlMouseDown) {
                    this.controlMouseDown = true;
                    this.controlHoveredChange.unsubscribe();
                }
                this.video.nativeElement.muted = false;
                this.video.nativeElement.volume = e;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(volumeTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.video.nativeElement.volume = e;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(mouseTouchUp$.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.controlMouseDown) {
                    subscribeControlHoveredChange();
                    this.controlMouseDown = false;
                    this.changeDetectorRef.detectChanges();
                }
            })));
        }));
        /** @type {?} */
        const speedMouseTouchDown$ = onMouseTouchDown$(this.speedBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        (moveEvent, rect) => (moveEvent.clientX - rect.left)), (/**
         * @param {?} rect
         * @return {?}
         */
        (rect) => (rect.width)));
        /** @type {?} */
        const speedTouchDrag$ = onMouseTouchDrag$(this.speedBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        (moveEvent, rect) => (moveEvent.clientX - rect.left)), (/**
         * @param {?} rect
         * @return {?}
         */
        (rect) => (rect.width)));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(speedMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                if (!this.controlMouseDown) {
                    this.controlMouseDown = true;
                    this.controlHoveredChange.unsubscribe();
                }
                this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(speedTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
                this.changeDetectorRef.detectChanges();
            })));
        }));
        /** @type {?} */
        const onKeyDown$ = (/**
         * @param {?} code
         * @return {?}
         */
        code => fromEvent(document, 'keydown').pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        (e) => this.focus && e.code === code)), tap((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            e.preventDefault();
            e.stopPropagation();
        }))));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(onKeyDown$('Space').subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.togglePlay();
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(onKeyDown$('ArrowRight').subscribe((/**
             * @return {?}
             */
            () => {
                this.mCurrentTime = this.mCurrentTime + 5 < this.duration ? this.mCurrentTime + 5 : this.duration;
                this.video.nativeElement.currentTime = this.mCurrentTime;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(onKeyDown$('ArrowLeft').subscribe((/**
             * @return {?}
             */
            () => {
                this.mCurrentTime = this.mCurrentTime - 5 > 0 ? this.mCurrentTime - 5 : 0;
                this.video.nativeElement.currentTime = this.mCurrentTime;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(onKeyDown$('ArrowUp').subscribe((/**
             * @return {?}
             */
            () => {
                this.mVolume = this.mVolume + 0.1 < 0.999996 ? this.mVolume + 0.1 : 1;
                this.video.nativeElement.volume = this.mVolume;
                this.changeDetectorRef.detectChanges();
            })));
            this.subscriptions.push(onKeyDown$('ArrowDown').subscribe((/**
             * @return {?}
             */
            () => {
                this.mVolume = this.mVolume - 0.1 > 0.000004 ? this.mVolume - 0.1 : 0;
                this.video.nativeElement.volume = this.mVolume;
                this.changeDetectorRef.detectChanges();
            })));
        }));
        /** @type {?} */
        const showVolumeHint$ = merge(onKeyDown$('ArrowUp'), onKeyDown$('ArrowDown'))
            .pipe(switchMap((/**
         * @return {?}
         */
        () => merge(of(true), timer(1000).pipe(mapTo(false))))), distinctUntilChanged());
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(showVolumeHint$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.showVolumeHint = e;
                this.changeDetectorRef.detectChanges();
            })));
            this.setAllControlPanelsPosition();
        }));
        this.subscriptions.push(fromEvent(this.element.nativeElement, 'contextmenu')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            e.preventDefault();
            /** @type {?} */
            const outer = this.element.nativeElement.getBoundingClientRect();
            /** @type {?} */
            const panel = this.contextMenu.nativeElement.getBoundingClientRect();
            if (e.clientX + panel.width + 20 > outer.right) {
                if (e.clientY + panel.height + 20 > outer.bottom) {
                    this.mContextMenuPosition = `right: ${outer.right - e.clientX}px; bottom: ${outer.bottom - e.clientY}px`;
                }
                else {
                    this.mContextMenuPosition = `right: ${outer.right - e.clientX}px; top: ${e.clientY - outer.top}px`;
                }
            }
            else {
                if (e.clientY + panel.height + 20 > outer.bottom) {
                    this.mContextMenuPosition = `left: ${e.clientX - outer.left}px; bottom: ${outer.bottom - e.clientY}px`;
                }
                else {
                    this.mContextMenuPosition = `left: ${e.clientX - outer.left}px; top: ${e.clientY - outer.top}px`;
                }
            }
            this.contextMenuState = 'root';
            this.showContextMenu = true;
        })));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.langContextMenuOption.nativeElement.addEventListener('click', this.showLangMenu, true);
            this.element.nativeElement.addEventListener('click', this.onComponentClicked, true);
            document.addEventListener('click', this.onDocumentClicked, true);
        }));
        /** @type {?} */
        const animationFrame$ = of(null, animationFrameScheduler).pipe(repeat());
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.subscriptions.push(animationFrame$.subscribe((/**
             * @return {?}
             */
            () => {
                if (!this.fpsStart)
                    this.fpsStart = +new Date();
                this.fpsIndex++;
                /** @type {?} */
                const fpsCurrent = +new Date();
                if (fpsCurrent - this.fpsStart > 1000) {
                    this.fps = ((this.fpsIndex / (fpsCurrent - this.fpsStart)) * 1000).toFixed(2);
                    this.fpsStart = +new Date();
                    this.fpsIndex = 0;
                    this.changeDetectorRef.detectChanges();
                }
            })));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.timeUpdate)
            this.timeUpdate.unsubscribe();
        if (this.controlHoveredChange)
            this.controlHoveredChange.unsubscribe();
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.langContextMenuOption.nativeElement.removeEventListener('click', this.showLangMenu, true);
        this.element.nativeElement.removeEventListener('click', this.onComponentClicked, true);
        document.removeEventListener('click', this.onDocumentClicked, true);
    }
    /**
     * @private
     * @return {?}
     */
    updateSources() {
        if (this.mSources.length === 0) {
            this.sources = [{
                    shortName: 'Default',
                    name: 'Default',
                    default: true,
                    sources: [{ src: this.mSrc, type: undefined }]
                }];
        }
        else {
            /** @type {?} */
            const sm = {};
            this.mSources.forEach((/**
             * @param {?} source
             * @return {?}
             */
            source => {
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
                if (source.default !== undefined && source.default !== null) {
                    sm[source.shortname].default = true;
                }
            }));
            this.sources = Object.values(sm);
        }
        /** @type {?} */
        const indexOfDefault = this.sources.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        s => s.default));
        this.playingSource = indexOfDefault >= 0 ? indexOfDefault : 0;
    }
    /**
     * @private
     * @return {?}
     */
    updateSubtitles() {
        return tslib_1.__awaiter(this, void 0, void 0, /** @this {!UshioComponent} */ function* () {
            /** @type {?} */
            const parsedSubtitles = [];
            for (const sub of this.mSubtitles) {
                /** @type {?} */
                let text = '';
                if (sub.value)
                    text = sub.value;
                else if (sub.src) {
                    /** @type {?} */
                    const resp = yield fetch(sub.src);
                    text = yield resp.text();
                }
                /** @type {?} */
                const parsed = {
                    name: sub.name || 'Untitled',
                    class: sub.class || '',
                    parsedSubtitles: undefined,
                    enabled: sub.default !== undefined && sub.default !== null
                        || sub.srclang === this.service.i18n.language
                };
                sub.type = sub.type || '';
                sub.type = sub.type.toLowerCase();
                if (sub.type !== 'text/vtt' && sub.type !== 'application/x-subrip') {
                    console.warn('Unknown MIME type of subtitles, trying to infer subtitle format. Supported type: text/vtt, application/x-subrip.');
                }
                try {
                    parsed.parsedSubtitles = this.service.parseSubtitles(text);
                }
                catch (e) {
                    console.error(e);
                }
                parsedSubtitles.push(parsed);
            }
            this.subtitles = parsedSubtitles;
            this.updateFlyingSubtitles();
        });
    }
    /**
     * @private
     * @param {?=} currentTime
     * @return {?}
     */
    updateFlyingSubtitles(currentTime) {
        if (currentTime === undefined) {
            currentTime = this.video.nativeElement.currentTime;
        }
        currentTime *= 1000;
        /** @type {?} */
        const flyingSubtitles = [];
        this.enabledSubtitles.forEach((/**
         * @param {?} subtitles
         * @return {?}
         */
        subtitles => {
            if (!subtitles.parsedSubtitles)
                return;
            /** @type {?} */
            const flyingSubtitlesTrack = [];
            subtitles.parsedSubtitles.forEach((/**
             * @param {?} subtitle
             * @return {?}
             */
            subtitle => {
                if (currentTime > subtitle.startTime && currentTime < subtitle.endTime) {
                    flyingSubtitlesTrack.push(Object.assign({}, subtitle, { texts: subtitle.texts.map((/**
                         * @param {?} text
                         * @return {?}
                         */
                        text => this.sanitization.bypassSecurityTrustHtml(text))) }));
                }
            }));
            if (flyingSubtitlesTrack.length) {
                flyingSubtitles.push({
                    name: subtitles.name,
                    class: subtitles.class,
                    parsedSubtitles: flyingSubtitlesTrack
                });
            }
        }));
        this.flyingSubtitles = flyingSubtitles;
    }
    /**
     * @private
     * @return {?}
     */
    setAllControlPanelsPosition() {
        setTimeout((/**
         * @return {?}
         */
        () => {
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
                }].forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => this.setPanelPosition(item.btn, item.panel, item.name)));
            this.changeDetectorRef.detectChanges();
        }), 0);
    }
    /**
     * @private
     * @param {?} btn
     * @param {?} panel
     * @param {?} name
     * @return {?}
     */
    setPanelPosition(btn, panel, name) {
        if (!this.element || !panel || !btn)
            return;
        /** @type {?} */
        const outerRect = this.element.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const panelRect = panel.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const btnRect = btn.nativeElement.getBoundingClientRect();
        if (panelRect.width / 2 - outerRect.right + btnRect.right > 0) {
            this.panelTranslations[name] = panelRect.width / 2 - outerRect.right + btnRect.right;
        }
        else {
            this.panelTranslations[name] = 0;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSlotChange(e) {
        this.subtitlesSlotUpdate$.next(e.target.assignedNodes().filter((/**
         * @param {?} node
         * @return {?}
         */
        node => node.nodeName === 'USHIO-SUBTITLES')));
        this.sourcesSlotUpdate$.next(e.target.assignedNodes().filter((/**
         * @param {?} node
         * @return {?}
         */
        node => node.nodeName === 'USHIO-SOURCE')));
        this.mInjectedStyles = e.target.assignedNodes()
            .filter((/**
         * @param {?} node
         * @return {?}
         */
        node => node.nodeName === 'STYLE')).map((/**
         * @param {?} node
         * @return {?}
         */
        node => node.innerHTML));
    }
    /**
     * @return {?}
     */
    onVideoMaskClicked() {
        if (this.interactMode === 'desktop') {
            this.togglePlay();
        }
        else {
            this.mobileShowControlStateChange$.next({
                showControl: !this.mShowControl,
                delaySwitch: true
            });
        }
    }
    /**
     * @param {?} i
     * @return {?}
     */
    onSelectSource(i) {
        if (i === this.playingSource)
            return;
        /** @type {?} */
        const currentTime = this.mCurrentTime;
        /** @type {?} */
        const paused = this.mPaused;
        this.playingSource = i;
        this.video.nativeElement.load();
        this.video.nativeElement.currentTime = currentTime;
        if (!paused)
            this.video.nativeElement.play();
    }
    /**
     * @param {?} i
     * @return {?}
     */
    onCheckSubtitles(i) {
        this.subtitles[i].enabled = !this.subtitles[i].enabled;
        this.updateFlyingSubtitles();
    }
    /**
     * @return {?}
     */
    togglePlay() {
        if (this.video.nativeElement.paused)
            this.video.nativeElement.play();
        else
            this.video.nativeElement.pause();
    }
    /**
     * @return {?}
     */
    toggleMute() {
        if (this.interactMode === 'desktop') {
            this.video.nativeElement.muted = !(this.video.nativeElement.muted || this.video.nativeElement.volume === 0);
            this.mutedChange.emit(this.video.nativeElement.muted);
        }
        else if (this.video.nativeElement.muted) {
            this.video.nativeElement.muted = false;
            this.mutedChange.emit(false);
        }
        if (!this.video.nativeElement.muted && this.video.nativeElement.volume === 0) {
            this.video.nativeElement.volume = Math.random();
        }
    }
    /**
     * @return {?}
     */
    toggleLoop() {
        this.video.nativeElement.loop = !this.video.nativeElement.loop;
        this.loopChange.emit(this.video.nativeElement.loop);
    }
    /**
     * @return {?}
     */
    toggleFullscreen() {
        if (!this.isFullScreen) {
            this.element.nativeElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    }
    /**
     * @return {?}
     */
    showLangMenu() {
        this.contextMenuState = 'lang';
        this.showContextMenu = true;
        this.changeDetectorRef.detectChanges();
    }
    /**
     * @return {?}
     */
    onComponentClicked() {
        this.focus = true;
    }
    /**
     * @return {?}
     */
    onDocumentClicked() {
        this.focus = false;
        if (this.showContextMenu) {
            this.showContextMenu = false;
            this.changeDetectorRef.detectChanges();
        }
    }
    /**
     * @param {?} code
     * @return {?}
     */
    setLanguage(code) {
        this.service.i18n.setLanguage(code);
    }
    /**
     * @return {?}
     */
    toggleShowStatisticInfoPanel() {
        this.showStatisticInfoPanel = !this.showStatisticInfoPanel;
    }
}
UshioComponent.decorators = [
    { type: Component, args: [{
                selector: 'ushio-player',
                template: "<div [className]=\"'ushio-player ' + interactMode + (showControl ? ' mouse-hover' : '') + pausedClass + waitingClass\">\n  <div [className]=\"'ushio-player-video-mask' + (noCursor ? ' no-cursor' : '')\" (click)=\"onVideoMaskClicked()\">\n    <div [className]=\"'video-state-buff-wrap' + waitingClass\">\n      <img class=\"video-state-buff\" src=\"data:image/gif;base64,R0lGODlhIAAgALMIADc3N5eXl3l5eVdXV9PT0+3t7bS0tCcnJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0ZCQUZCNUYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0ZCQUZCNkYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRkJBRkIzRjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDRkJBRkI0RjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqThrevr+X3eBpOWVGZCJWgECMMZiRf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlRKuWMlgy4VivwSueOAFa8fVtHrN3ggEJIPB+X5/5PJSHQ7Czz97GQEYfoB2GAGJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWupOGta+v5fd4Gk5ZXZkYkaAR4wxmJE/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVGq5YCWDLhWK/Bq4Y4AVrx9W0es3eDAakQMD5fn/k8lIdDsLPP3sZAhh+gHYYAomEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJK6k4a0r6/l93gaTllVmRiZoBFjDGYkb9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUGrljJYcuFYr8BrvjgBWvH1bR6zd4AACSBwPl+f+TyUh0Ows8/exkDGH6AdhgDiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUmrqThravr+X3eBpOWVGZGJWgASMMZiQf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlQquWElhy4VivwKuuOAFa8fVtHrN3hwOpMHA+X5/5PJSHQ7Czz97GQAYfoB2GACJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWuoOGsa+v5fd4Gk5ZWZkYmaABowxmJC/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVDq5YCWHLhWK/A66Y4AVrx9W0es3eFAokAMD5fn/k8lIdDsLPP3sZBxh+gHYYB4mEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJq6g4ayr6/l93gaTllVmQidoABjDGYkP9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUCrliJYcuFYr8ArtjgBWvH1bR6zd4QCKTDwfl+f+TyUh0Ows8/exkFGH6AdhgFiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqDhrOvr+X3eBpOWVmZCJGgAKMMZiQP3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlR6uWElgy4VivweuOOAFa8fVtHrN3hgMpELB+X5/5PJSHQ7Czz97GQQYfoB2GASJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSSuoOGsK+v5fd4Gk5ZXZkInaAQ4wxmJH/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVFq5YiWDLhWK/Ba5Y4AVrx9W0es3eBAIkAsH5fn/k8lIdDsLPP3sZBhh+gHYYBomEeYAaiYOEVI9tEpOUlm2YmU4RADs=\" alt=\"buffering\">\n    </div>\n  </div>\n  <div class=\"ushio-player-video\">\n    <video #video\n      [attr.crossOrigin]=\"crossorigin\"\n      [attr.poster]=\"poster\"\n      [attr.autoplay]=\"autoplay\"\n      [attr.preload]=\"preload\"\n    >\n      Your browser is too old which doesn't support HTML5 video.\n      <source *ngFor=\"let source of sources[playingSource].sources\"\n              [src]=\"source.src\" [attr.type]=\"source.type\"\n      />\n    </video>\n  </div>\n  <div class=\"ushio-player-custom-mask\">\n    <slot (slotchange)=\"onSlotChange($event)\"></slot>\n  </div>\n  <div class=\"ushio-player-subtitle-container\">\n    <div *ngFor=\"let subtitles of flyingSubtitles\"\n         [className]=\"'ushio-player-subtitle-wrap ' + subtitles.class\">\n      <div *ngFor=\"let subtitle of subtitles.parsedSubtitles\" class=\"ushio-player-subtitle\">\n        <div *ngFor=\"let line of subtitle.texts\" class=\"subtitle-line\">\n          <span [innerHTML]=\"line\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"ushio-player-video-control-mask\"></div>\n  <div class=\"ushio-player-video-control-wrap\">\n    <div class=\"ushio-player-video-control\">\n      <div class=\"video-control-top\">\n        <div [className]=\"'video-progress' + thumbMouseDownClass\">\n          <div class=\"video-progress-slider\" #slider>\n            <div class=\"slider-track\">\n              <div class=\"slider-track-bar-wrap\">\n                <div class=\"bar-buffer\" [style]=\"bufferedProgress\"></div>\n                <div class=\"bar-normal\" [style]=\"playedProgress\"></div>\n              </div>\n              <div class=\"slider-track-thumb\" [style]=\"thumbPosition\">\n                <div class=\"thumb-dot\"></div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'video-progress-detail' + progressDetailClass\" [style]=\"progressDetailPosition\">\n            <div *ngIf=\"thumbnails\"\n                 class=\"video-progress-detail-container\" [style]=\"progressDetailContainerPosition\">\n              <div class=\"detail-img\" [style]=\"progressDetailImgStyle\"></div>\n            </div>\n            <div class=\"video-progress-detail-sign\">\n              <div class=\"sign-down\"></div>\n              <div class=\"sign-up\"></div>\n            </div>\n            <div class=\"video-progress-detail-time\" [style]=\"progressDetailTimePosition\">\n              {{progressDetailTime}}\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"video-control-bottom\">\n        <div class=\"video-control-bottom-left\">\n          <div [className]=\"'ushio-player-btn btn-start' + pausedClass\" (click)=\"togglePlay()\">\n            <span class=\"ushio-player-icon icon-play\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-play\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-pause\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-pause\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n          </div>\n          <div class=\"video-time-wrap\">\n            <span class=\"video-time-now\">{{currentTimeStr}}</span>\n            <span class=\"video-time-divider\">/</span>\n            <span class=\"video-time-total\">{{durationStr}}</span>\n          </div>\n        </div>\n        <div class=\"video-control-bottom-center\"></div>\n        <div [className]=\"'video-control-bottom-right' + controlHoveredClass\">\n          <div [className]=\"'ushio-player-btn btn-volume' + mutedClass + (volumeControl ? '' : ' hide')\"\n               #volumeBtn\n          >\n            <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"control-panel btn-volume-panel\" #volumePanel>\n              <div class=\"volume-num\">{{volume100}}</div>\n              <div class=\"volume-bar\" #volumeBar>\n                <div class=\"volume-bar-track\">\n                  <div class=\"volume-bar-track-wrap\">\n                    <div class=\"bar-normal\" [style]=\"volumeRate\"></div>\n                  </div>\n                  <div class=\"volume-bar-track-thumb\" [style]=\"volumeThumbPosition\">\n                    <div class=\"thumb-dot\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-source' + (sourceControl && sources.length > 1 ? '' : ' hide')\"\n               #sourceBtn\n          >\n            {{ sources[playingSource].shortName }}\n            <div class=\"btn-source-panel control-panel\" #sourcePanel [style]=\"sourcePanelPosition\">\n              <ul>\n                <li *ngFor=\"let source of sources; index as i\"\n                    (click)=\"onSelectSource(i)\"\n                    [className]=\"playingSource === i ? 'selected' : ''\"\n                >\n                  {{ source.name }}\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-subtitles' + subtitleEnabledClass + (subtitlesControl && subtitles.length > 0 ? '' : ' hide')\"\n               #subtitlesBtn\n          >\n            <span class=\"ushio-player-icon icon-subtitles-off\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-subtitles-on\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-subtitles-panel control-panel\" #subtitlesPanel [style]=\"subtitlesPanelPosition\">\n              <ul>\n                <li *ngFor=\"let subtitleTrack of subtitles; index as i\"\n                    (click)=\"onCheckSubtitles(i)\"\n                    [className]=\"subtitleTrack.enabled ? 'checked' : ''\"\n                >\n                  <span *ngIf=\"!subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-default\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-default\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span *ngIf=\"subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-selected\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-selected\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span>{{ subtitleTrack.name }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-settings' + (settingsControl ? '' : ' hide')\"\n               #settingsBtn\n          >\n            <span class=\"ushio-player-icon icon-settings\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-settings\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-settings-panel control-panel\" #settingsPanel [style]=\"settingsPanelPosition\">\n              <div class=\"panel-box settings-panel-speed\">\n                <div class=\"panel-box-title\">\n                  {{t('speed')}}\n                </div>\n                <div class=\"panel-box-content panel-speed-content speed-bar\" #speedBar>\n                  <div class=\"speed-track\">\n                    <div class=\"speed-track-wrap\"></div>\n                    <div class=\"speed-track-steps\">\n                      <div class=\"speed-track-steps-item step-item-0\" style=\"left: 0\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 20%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.75</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 40%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">{{t('normal')}}</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 60%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.25</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 80%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item step-item-100\" style=\"left: 100%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">2.0</div>\n                      </div>\n                    </div>\n                    <div class=\"speed-track-thumb\" [style]=\"speedThumbPosition\">\n                      <div class=\"thumb-dot\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-loop' + loopClass + (loopControl ? '' : ' hide')\"\n               (click)=\"toggleLoop()\"\n               #loopBtn\n          >\n            <span class=\"ushio-player-icon icon-loop-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-loop-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title btn-title-loop\" #loopPanel [style]=\"loopPanelPosition\">\n              {{ t('noLoop') }}\n            </div>\n            <div class=\"btn-title btn-title-noloop\" [style]=\"loopPanelPosition\">\n              {{ t('loop') }}\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-fullscreen' + fullscreenClass  + (fullscreenControl ? '' : ' hide')\"\n               (click)=\"toggleFullscreen()\"\n               #fullScreenBtn\n          >\n            <span class=\"ushio-player-icon icon-fullscreen-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-fullscreen-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title\" #fullScreenPanel [style]=\"fullScreenPanelPosition\">\n              {{ fullscreenClass === ' video-state-fullscreen' ? t('exitFullscreen') : t('fullscreen') }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [className]=\"'ushio-context-menu control-panel ' + contextMenuClass\"\n       #contextMenu\n       [style]=\"contextMenuPosition\"\n  >\n    <div class=\"ushio-context-menu-root\">\n      <ul>\n        <li (click)=\"toggleShowStatisticInfoPanel()\">{{t('statistic')}}</li>\n        <li #langContextMenuOption>{{t('language')}}</li>\n        <li>\n          <a target=\"_blank\" referrerpolicy=\"no-referrer\" href=\"https://github.com/rikakomoe/ushio\">\n            Ushio Player v{{version}}\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"ushio-context-menu-lang\">\n      <ul>\n        <li *ngFor=\"let lang of languages\" (click)=\"setLanguage(lang[0])\">{{lang[1]}}</li>\n      </ul>\n    </div>\n  </div>\n  <div [className]=\"'ushio-statistic-info control-panel' + statisticInfoPanelClass\">\n    <a class=\"dismiss\" (click)=\"toggleShowStatisticInfoPanel()\">[x]</a>\n    <table>\n      <tr><td>Player version</td><td>{{detailedVersion}}</td></tr>\n      <tr><td>Player FPS</td><td>{{fps}}</td></tr>\n      <tr><td>Video resolution</td><td>{{videoResolution}}</td></tr>\n      <tr><td>Video duration</td><td>{{videoDuration}}</td></tr>\n      <tr><td>Current time</td><td>{{videoCurrentTime}}</td></tr>\n    </table>\n  </div>\n  <div [className]=\"'ushio-volume-hint' + volumeHintClass\">\n    <span [className]=\"mutedClass\">\n      <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n      <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n    </span>\n    <span *ngIf=\"volume100\">{{volume100}}%</span>\n    <span *ngIf=\"!volume100\">{{t('mute')}}</span>\n  </div>\n  <div class=\"ushio-res\">\n    <div *ngFor=\"let style of injectedStyles\" [innerHTML]=\"style\"></div>\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <symbol id=\"ushio-play\">\n        <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n      </symbol>\n      <symbol id=\"ushio-pause\">\n        <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-max\">\n        <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-min\">\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n        <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-off\">\n        <path d=\"M15.172 18H4a2 2 0 0 1-2-2V6c0-.34.084-.658.233-.938l-.425-.426a1 1 0 1 1 1.414-1.414l15.556 15.556a1 1 0 0 1-1.414 1.414L15.172 18zM4.962 7.79C4.385 8.141 4 8.776 4 9.5v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .713-.958L4.962 7.79zM6.828 4H18a2 2 0 0 1 2 2v10c0 .34-.084.658-.233.938l-2.48-2.48A1 1 0 0 0 17 12.5h-1.672L14 11.172V10.5a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2h-3a2 2 0 0 0-1.977 1.695L6.828 4z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-on\">\n        <path d=\"M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 5.5a1 1 0 1 0 0-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2zm8 0a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2h-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-default\">\n        <path d=\"M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0-2h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-selected\">\n        <path d=\"M13 18.25l-1.8-1.8c-.6-.6-1.65-.6-2.25 0s-.6 1.5 0 2.25l2.85 2.85c.318.318.762.468 1.2.448.438.02.882-.13 1.2-.448l8.85-8.85c.6-.6.6-1.65 0-2.25s-1.65-.6-2.25 0l-7.8 7.8zM8 4h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-settings\">\n        <circle cx=\"11\" cy=\"11\" r=\"2\"></circle>\n        <path d=\"M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-on\">\n        <path d=\"M17 16H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .353.853H4v2a2 2 0 0 0 2 2h11a1 1 0 0 0 0-2zM19.793 8H18V6a2 2 0 0 0-2-2H5a1 1 0 0 0 0 2h11v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793A.5.5 0 0 0 19.793 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-off\">\n        <path d=\"M3.222 3.222a.999.999 0 1 0-1.414 1.414l11.435 11.435H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .354.854H4v2a2 2 0 0 0 2 2h9.243l2.121 2.121a.999.999 0 1 0 1.414-1.414L3.222 3.222zM19.793 8.071H18v-2a2 2 0 0 0-2-2H6.899l2 2H16v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793a.5.5 0 0 0-.353-.853z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-off\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 .5.5v1zm0-8a.5.5 0 0 1-.5.5H6v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm10 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H16v-1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-on\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm10 4a.5.5 0 0 1-.5.5H16v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 .5.5v1z\"></path>\n      </symbol>\n    </svg>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.ShadowDom,
                styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
            }] }
];
/** @nocollapse */
UshioComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: UshioService }
];
UshioComponent.propDecorators = {
    src: [{ type: Input }],
    poster: [{ type: Input }],
    crossorigin: [{ type: Input }],
    autoplay: [{ type: Input }],
    preload: [{ type: Input }],
    lang: [{ type: Input }],
    thumbnails: [{ type: Input }],
    volume: [{ type: Input }],
    volumeChange: [{ type: Output }],
    playbackRate: [{ type: Input }],
    playbackRateChange: [{ type: Output }],
    volumeControl: [{ type: Input }],
    sourceControl: [{ type: Input }],
    subtitlesControl: [{ type: Input }],
    settingsControl: [{ type: Input }],
    loopControl: [{ type: Input }],
    fullscreenControl: [{ type: Input }],
    video: [{ type: ViewChild, args: ['video', { static: true },] }],
    slider: [{ type: ViewChild, args: ['slider', { static: true },] }],
    volumeBar: [{ type: ViewChild, args: ['volumeBar', { static: true },] }],
    volumePanel: [{ type: ViewChild, args: ['volumePanel', { static: true },] }],
    volumeBtn: [{ type: ViewChild, args: ['volumeBtn', { static: true },] }],
    settingsPanel: [{ type: ViewChild, args: ['settingsPanel', { static: true },] }],
    settingsBtn: [{ type: ViewChild, args: ['settingsBtn', { static: true },] }],
    speedBar: [{ type: ViewChild, args: ['speedBar', { static: true },] }],
    sourcePanel: [{ type: ViewChild, args: ['sourcePanel', { static: true },] }],
    sourceBtn: [{ type: ViewChild, args: ['sourceBtn', { static: true },] }],
    subtitlesPanel: [{ type: ViewChild, args: ['subtitlesPanel', { static: true },] }],
    subtitlesBtn: [{ type: ViewChild, args: ['subtitlesBtn', { static: true },] }],
    loopBtn: [{ type: ViewChild, args: ['loopBtn', { static: true },] }],
    loopPanel: [{ type: ViewChild, args: ['loopPanel', { static: true },] }],
    fullScreenBtn: [{ type: ViewChild, args: ['fullScreenBtn', { static: true },] }],
    fullScreenPanel: [{ type: ViewChild, args: ['fullScreenPanel', { static: true },] }],
    contextMenu: [{ type: ViewChild, args: ['contextMenu', { static: true },] }],
    langContextMenuOption: [{ type: ViewChild, args: ['langContextMenuOption', { static: true },] }],
    sourceContentChildren: [{ type: ContentChildren, args: [UshioSource,] }],
    subtitlesContentChildren: [{ type: ContentChildren, args: [UshioSubtitles,] }],
    showControlChange: [{ type: Output }],
    paused: [{ type: Input }],
    pausedChange: [{ type: Output }],
    currentTime: [{ type: Input }],
    currentTimeChange: [{ type: Output }],
    durationChange: [{ type: Output }],
    waitingChange: [{ type: Output }],
    loop: [{ type: Input }],
    loopChange: [{ type: Output }],
    muted: [{ type: Input }],
    mutedChange: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mInjectedStyles;
    /** @type {?} */
    UshioComponent.prototype.poster;
    /** @type {?} */
    UshioComponent.prototype.crossorigin;
    /** @type {?} */
    UshioComponent.prototype.autoplay;
    /** @type {?} */
    UshioComponent.prototype.preload;
    /** @type {?} */
    UshioComponent.prototype.thumbnails;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mSrc;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mSources;
    /** @type {?} */
    UshioComponent.prototype.sources;
    /** @type {?} */
    UshioComponent.prototype.playingSource;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mSubtitles;
    /** @type {?} */
    UshioComponent.prototype.subtitles;
    /** @type {?} */
    UshioComponent.prototype.flyingSubtitles;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mVolume;
    /** @type {?} */
    UshioComponent.prototype.volumeChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mPlaybackRate;
    /** @type {?} */
    UshioComponent.prototype.playbackRateChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mVolumeControl;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mSourceControl;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mSubtitlesControl;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mSettingsControl;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mLoopControl;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mFullscreenControl;
    /** @type {?} */
    UshioComponent.prototype.video;
    /** @type {?} */
    UshioComponent.prototype.slider;
    /** @type {?} */
    UshioComponent.prototype.volumeBar;
    /** @type {?} */
    UshioComponent.prototype.volumePanel;
    /** @type {?} */
    UshioComponent.prototype.volumeBtn;
    /** @type {?} */
    UshioComponent.prototype.settingsPanel;
    /** @type {?} */
    UshioComponent.prototype.settingsBtn;
    /** @type {?} */
    UshioComponent.prototype.speedBar;
    /** @type {?} */
    UshioComponent.prototype.sourcePanel;
    /** @type {?} */
    UshioComponent.prototype.sourceBtn;
    /** @type {?} */
    UshioComponent.prototype.subtitlesPanel;
    /** @type {?} */
    UshioComponent.prototype.subtitlesBtn;
    /** @type {?} */
    UshioComponent.prototype.loopBtn;
    /** @type {?} */
    UshioComponent.prototype.loopPanel;
    /** @type {?} */
    UshioComponent.prototype.fullScreenBtn;
    /** @type {?} */
    UshioComponent.prototype.fullScreenPanel;
    /** @type {?} */
    UshioComponent.prototype.contextMenu;
    /** @type {?} */
    UshioComponent.prototype.langContextMenuOption;
    /** @type {?} */
    UshioComponent.prototype.sourceContentChildren;
    /** @type {?} */
    UshioComponent.prototype.subtitlesContentChildren;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.subtitlesSlotUpdate$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.sourcesSlotUpdate$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.subtitlesSlotChange$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.sourcesSlotChange$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mobileShowControlStateChange$;
    /** @type {?} */
    UshioComponent.prototype.interactMode;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.focus;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mShowControl;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mNoCursor;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.thumbMouseDown;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.controlMouseDown;
    /** @type {?} */
    UshioComponent.prototype.controlHoveredClass;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.showContextMenu;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.showStatisticInfoPanel;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.showVolumeHint;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.showProgressDetail;
    /** @type {?} */
    UshioComponent.prototype.showControlChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mPaused;
    /** @type {?} */
    UshioComponent.prototype.pausedChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mCurrentTime;
    /** @type {?} */
    UshioComponent.prototype.currentTimeChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.duration;
    /** @type {?} */
    UshioComponent.prototype.durationChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.bufferedTime;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.waiting;
    /** @type {?} */
    UshioComponent.prototype.waitingChange;
    /** @type {?} */
    UshioComponent.prototype.loopChange;
    /** @type {?} */
    UshioComponent.prototype.mutedChange;
    /** @type {?} */
    UshioComponent.prototype.fps;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.fpsStart;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.fpsIndex;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.panelTranslations;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mContextMenuPosition;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mProgressDetailPosition;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mProgressDetailContainerPosition;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mProgressDetailTimePosition;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mProgressDetailPositionRate;
    /** @type {?} */
    UshioComponent.prototype.languages;
    /** @type {?} */
    UshioComponent.prototype.contextMenuState;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.timeUpdate;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.controlHoveredChange;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.subscriptions;
    /** @type {?} */
    UshioComponent.prototype.t;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.element;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.sanitization;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXNoaW8vIiwic291cmNlcyI6WyJsaWIvdXNoaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVVLGlCQUFpQixFQUNoQyxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQUUsWUFBWSxFQUN4QixLQUFLLEVBQUUsTUFBTSxFQUVMLE1BQU0sRUFDZCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUE7QUFDbkUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQ3ZDLE9BQU8sRUFBZ0IsS0FBSyxFQUM3QixNQUFNLE1BQU0sQ0FBQTtBQUNiLE9BQU8sRUFDTCxTQUFTLEVBQUUsb0JBQW9CLEVBQy9CLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFDdEQsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFNekQsTUFBTSxPQUFPLFdBQVc7OztZQUp2QixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7a0JBRUUsS0FBSzttQkFDTCxLQUFLO3dCQUNMLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLOzs7O0lBSk4sMEJBQXFCOztJQUNyQiwyQkFBcUI7O0lBQ3JCLGdDQUEwQjs7SUFDMUIsMkJBQXFCOztJQUNyQiw4QkFBeUI7O0FBTzNCLE1BQU0sT0FBTyxjQUFjOzs7WUFKMUIsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7b0JBRUUsS0FBSztrQkFDTCxLQUFLO21C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a0NBQW9COzs7OztJQXNDcEIsMkNBTUM7Ozs7O0lBMEJELDhDQUFpQzs7Ozs7SUFJakMsaURBQW9DOzs7OztJQUNwQywwREFBNkM7Ozs7O0lBQzdDLHFEQUF3Qzs7Ozs7SUFDeEMscURBQXVDOztJQXVCdkMsbUNBQXVDOztJQUN2QywwQ0FBeUI7Ozs7O0lBaUJ6QixvQ0FBZ0M7Ozs7O0lBQ2hDLDhDQUEwQzs7Ozs7SUFDMUMsdUNBQTBDOztJQUUxQywyQkFBdUI7Ozs7O0lBMEJyQixpQ0FBMkI7Ozs7O0lBQzNCLDhCQUFvQjs7Ozs7SUFDcEIsMkNBQTRDOzs7OztJQUM1QyxzQ0FBa0M7Ozs7O0lBQ2xDLGlDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LCBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHtcbiAgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsXG4gIGZyb21FdmVudCwgbWVyZ2UsIE5FVkVSLCBPYnNlcnZhYmxlLCBvZixcbiAgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCB0aW1lclxufSBmcm9tICdyeGpzJ1xuaW1wb3J0IHtcbiAgY29uY2F0TWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLCBtYXAsIG1hcFRvLCByZXBlYXQsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0YXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCB7IElTdWJ0aXRsZSwgVXNoaW9TZXJ2aWNlIH0gZnJvbSAnLi91c2hpby5zZXJ2aWNlJ1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3VzaGlvLXNvdXJjZSdcbn0pXG5leHBvcnQgY2xhc3MgVXNoaW9Tb3VyY2Uge1xuICBASW5wdXQoKSBzcmMhOiBzdHJpbmdcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIHNob3J0bmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndXNoaW8tc3VidGl0bGVzJ1xufSlcbmV4cG9ydCBjbGFzcyBVc2hpb1N1YnRpdGxlcyB7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmdcbiAgQElucHV0KCkgc3JjOiBzdHJpbmdcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ1xuICBASW5wdXQoKSBjbGFzczogc3RyaW5nXG4gIEBJbnB1dCgpIHNyY2xhbmc6IHN0cmluZ1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBTb3VyY2Uge1xuICBzaG9ydE5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc291cmNlczoge1xuICAgIHNyYzogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgfVtdXG4gIGRlZmF1bHQ/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBTdWJ0aXRsZXMge1xuICBuYW1lOiBzdHJpbmdcbiAgY2xhc3M6IHN0cmluZ1xuICBwYXJzZWRTdWJ0aXRsZXM6IElTdWJ0aXRsZVtdXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXNoaW8tcGxheWVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzaGlvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNoaW8uY29tcG9uZW50LnN0eWwnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tXG59KVxuZXhwb3J0IGNsYXNzIFVzaGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgbUluamVjdGVkU3R5bGVzID0gW11cbiAgZ2V0IGluamVjdGVkU3R5bGVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5tSW5qZWN0ZWRTdHlsZXMubWFwKFxuICAgICAgc3R5bGUgPT4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoYFxuICAgICAgPHN0eWxlPlxuICAgICAgICR7c3R5bGV9XG4gICAgICA8L3N0eWxlPlxuICAgIGApKVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHNyYyAoc3JjKSB7XG4gICAgdGhpcy5tU3JjID0gc3JjXG4gICAgdGhpcy51cGRhdGVTb3VyY2VzKClcbiAgfVxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU3JjXG4gIH1cbiAgQElucHV0KCkgcG9zdGVyXG4gIEBJbnB1dCgpIGNyb3Nzb3JpZ2luXG4gIEBJbnB1dCgpIGF1dG9wbGF5XG4gIEBJbnB1dCgpIHByZWxvYWQgPSAnbWV0YWRhdGEnXG4gIEBJbnB1dCgpIHNldCBsYW5nIChsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlcnZpY2UuaTE4bi5zZXRMYW5ndWFnZShsYW5nKVxuICB9XG4gIEBJbnB1dCgpIHRodW1ibmFpbHNcblxuICBwcml2YXRlIG1TcmNcbiAgcHJpdmF0ZSBtU291cmNlcyA9IFtdXG4gIHNvdXJjZXM6IFNvdXJjZVtdID0gW11cbiAgcGxheWluZ1NvdXJjZSA9IDBcblxuICBwcml2YXRlIG1TdWJ0aXRsZXMgPSBbXVxuICBzdWJ0aXRsZXM6IFN1YnRpdGxlc1tdID0gW11cbiAgZ2V0IGVuYWJsZWRTdWJ0aXRsZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN1YnRpdGxlcy5maWx0ZXIocyA9PiBzLmVuYWJsZWQpXG4gIH1cbiAgZmx5aW5nU3VidGl0bGVzOiBTdWJ0aXRsZXNbXSA9IFtdXG5cbiAgcHJpdmF0ZSBtVm9sdW1lID0gMVxuICBASW5wdXQoKSBzZXQgdm9sdW1lICh2b2x1bWUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdm9sdW1lXG4gIH1cbiAgZ2V0IHZvbHVtZTEwMCAoKSB7XG4gICAgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCkgcmV0dXJuIDBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLm1Wb2x1bWUgKiAxMDApXG4gIH1cbiAgQE91dHB1dCgpIHZvbHVtZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG5cbiAgcHJpdmF0ZSBtUGxheWJhY2tSYXRlID0gMVxuICBASW5wdXQoKSBzZXQgcGxheWJhY2tSYXRlIChwbGF5YmFja1JhdGUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlXG4gIH1cbiAgQE91dHB1dCgpIHBsYXliYWNrUmF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG5cbiAgcHJpdmF0ZSBtVm9sdW1lQ29udHJvbCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHZvbHVtZUNvbnRyb2wgKHZvbHVtZUNvbnRyb2wpIHtcbiAgICB0aGlzLm1Wb2x1bWVDb250cm9sID0gdm9sdW1lQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgdm9sdW1lQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVZvbHVtZUNvbnRyb2xcbiAgfVxuICBwcml2YXRlIG1Tb3VyY2VDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgc291cmNlQ29udHJvbCAoc291cmNlQ29udHJvbCkge1xuICAgIHRoaXMubVNvdXJjZUNvbnRyb2wgPSBzb3VyY2VDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBzb3VyY2VDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU291cmNlQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbVN1YnRpdGxlc0NvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzdWJ0aXRsZXNDb250cm9sIChzdWJ0aXRsZXNDb250cm9sKSB7XG4gICAgdGhpcy5tU3VidGl0bGVzQ29udHJvbCA9IHN1YnRpdGxlc0NvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHN1YnRpdGxlc0NvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1TdWJ0aXRsZXNDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtU2V0dGluZ3NDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgc2V0dGluZ3NDb250cm9sIChzZXR0aW5nc0NvbnRyb2wpIHtcbiAgICB0aGlzLm1TZXR0aW5nc0NvbnRyb2wgPSBzZXR0aW5nc0NvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHNldHRpbmdzQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVNldHRpbmdzQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbUxvb3BDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgbG9vcENvbnRyb2wgKGxvb3BDb250cm9sKSB7XG4gICAgdGhpcy5tTG9vcENvbnRyb2wgPSBsb29wQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgbG9vcENvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1Mb29wQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbUZ1bGxzY3JlZW5Db250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgZnVsbHNjcmVlbkNvbnRyb2wgKGZ1bGxzY3JlZW5Db250cm9sKSB7XG4gICAgdGhpcy5tRnVsbHNjcmVlbkNvbnRyb2wgPSBmdWxsc2NyZWVuQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgZnVsbHNjcmVlbkNvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1GdWxsc2NyZWVuQ29udHJvbFxuICB9XG5cbiAgQFZpZXdDaGlsZCgndmlkZW8nLCB7IHN0YXRpYzogdHJ1ZSB9KSB2aWRlb1xuICBAVmlld0NoaWxkKCdzbGlkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzbGlkZXJcbiAgQFZpZXdDaGlsZCgndm9sdW1lQmFyJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lQmFyXG4gIEBWaWV3Q2hpbGQoJ3ZvbHVtZVBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lUGFuZWxcbiAgQFZpZXdDaGlsZCgndm9sdW1lQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lQnRuXG4gIEBWaWV3Q2hpbGQoJ3NldHRpbmdzUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXR0aW5nc1BhbmVsXG4gIEBWaWV3Q2hpbGQoJ3NldHRpbmdzQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0dGluZ3NCdG5cbiAgQFZpZXdDaGlsZCgnc3BlZWRCYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzcGVlZEJhclxuICBAVmlld0NoaWxkKCdzb3VyY2VQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHNvdXJjZVBhbmVsXG4gIEBWaWV3Q2hpbGQoJ3NvdXJjZUJ0bicsIHsgc3RhdGljOiB0cnVlIH0pIHNvdXJjZUJ0blxuICBAVmlld0NoaWxkKCdzdWJ0aXRsZXNQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHN1YnRpdGxlc1BhbmVsXG4gIEBWaWV3Q2hpbGQoJ3N1YnRpdGxlc0J0bicsIHsgc3RhdGljOiB0cnVlIH0pIHN1YnRpdGxlc0J0blxuICBAVmlld0NoaWxkKCdsb29wQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgbG9vcEJ0blxuICBAVmlld0NoaWxkKCdsb29wUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBsb29wUGFuZWxcbiAgQFZpZXdDaGlsZCgnZnVsbFNjcmVlbkJ0bicsIHsgc3RhdGljOiB0cnVlIH0pIGZ1bGxTY3JlZW5CdG5cbiAgQFZpZXdDaGlsZCgnZnVsbFNjcmVlblBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgZnVsbFNjcmVlblBhbmVsXG4gIEBWaWV3Q2hpbGQoJ2NvbnRleHRNZW51JywgeyBzdGF0aWM6IHRydWUgfSkgY29udGV4dE1lbnVcbiAgQFZpZXdDaGlsZCgnbGFuZ0NvbnRleHRNZW51T3B0aW9uJywgeyBzdGF0aWM6IHRydWUgfSkgbGFuZ0NvbnRleHRNZW51T3B0aW9uXG5cbiAgQENvbnRlbnRDaGlsZHJlbihVc2hpb1NvdXJjZSkgc291cmNlQ29udGVudENoaWxkcmVuITogUXVlcnlMaXN0PFVzaGlvU291cmNlPlxuICBAQ29udGVudENoaWxkcmVuKFVzaGlvU3VidGl0bGVzKSBzdWJ0aXRsZXNDb250ZW50Q2hpbGRyZW4hOiBRdWVyeUxpc3Q8VXNoaW9TdWJ0aXRsZXM+XG4gIHByaXZhdGUgc3VidGl0bGVzU2xvdFVwZGF0ZSQgPSBuZXcgU3ViamVjdDxIVE1MRWxlbWVudFtdPigpXG4gIHByaXZhdGUgc291cmNlc1Nsb3RVcGRhdGUkID0gbmV3IFN1YmplY3Q8SFRNTEVsZW1lbnRbXT4oKVxuICBwcml2YXRlIHN1YnRpdGxlc1Nsb3RDaGFuZ2UkID0gdGhpcy5zdWJ0aXRsZXNTbG90VXBkYXRlJC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gIHByaXZhdGUgc291cmNlc1Nsb3RDaGFuZ2UkID0gdGhpcy5zb3VyY2VzU2xvdFVwZGF0ZSQuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICBwcml2YXRlIG1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkID0gbmV3IFN1YmplY3Q8eyBzaG93Q29udHJvbDogYm9vbGVhbiwgZGVsYXlTd2l0Y2g6IGJvb2xlYW4gfT4oKVxuXG4gIGludGVyYWN0TW9kZTogJ2Rlc2t0b3AnIHwgJ21vYmlsZScgPSAnZGVza3RvcCdcbiAgcHJpdmF0ZSBmb2N1cyA9IGZhbHNlXG4gIHByaXZhdGUgbVNob3dDb250cm9sID0gZmFsc2VcbiAgcHJpdmF0ZSBtTm9DdXJzb3IgPSBmYWxzZVxuICBwcml2YXRlIHRodW1iTW91c2VEb3duID0gZmFsc2VcbiAgcHJpdmF0ZSBjb250cm9sTW91c2VEb3duID0gZmFsc2VcbiAgY29udHJvbEhvdmVyZWRDbGFzcyA9ICcnXG4gIHByaXZhdGUgc2hvd0NvbnRleHRNZW51ID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93U3RhdGlzdGljSW5mb1BhbmVsID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93Vm9sdW1lSGludCA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1Byb2dyZXNzRGV0YWlsID0gZmFsc2VcbiAgZ2V0IGlzRnVsbFNjcmVlbiAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ICE9PSBudWxsXG4gIH1cbiAgZ2V0IG1vdXNlRG93biAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJNb3VzZURvd24gfHwgdGhpcy5jb250cm9sTW91c2VEb3duXG4gIH1cbiAgZ2V0IHNob3dDb250cm9sICgpIHtcbiAgICByZXR1cm4gISEodGhpcy5tU2hvd0NvbnRyb2wgfHwgdGhpcy5jb250cm9sSG92ZXJlZENsYXNzIHx8IHRoaXMubW91c2VEb3duKVxuICB9XG4gIGdldCBub0N1cnNvciAoKSB7XG4gICAgcmV0dXJuICF0aGlzLnNob3dDb250cm9sICYmIHRoaXMubU5vQ3Vyc29yXG4gIH1cbiAgQE91dHB1dCgpIHNob3dDb250cm9sQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIGdldCB0aHVtYk1vdXNlRG93bkNsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRodW1iTW91c2VEb3duID8gJyB0aHVtYi1tb3VzZS1kb3duJyA6ICcnXG4gIH1cbiAgZ2V0IHBhdXNlZENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1QYXVzZWQgPyAnIHZpZGVvLXN0YXRlLXBhdXNlJyA6ICcgdmlkZW8tc3RhdGUtcGxheSdcbiAgfVxuICBnZXQgd2FpdGluZ0NsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLndhaXRpbmcgJiYgIXRoaXMubVBhdXNlZCA/ICcgdmlkZW8tc3RhdGUtd2FpdGluZycgOiAnJ1xuICB9XG4gIGdldCBtdXRlZENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkIHx8IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPT09IDApXG4gICAgICA/ICcgdmlkZW8tc3RhdGUtbXV0ZWQnIDogJyB2aWRlby1zdGF0ZS12b2x1bWUnXG4gIH1cbiAgZ2V0IGxvb3BDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3AgPyAnIHZpZGVvLXN0YXRlLWxvb3AnIDogJyB2aWRlby1zdGF0ZS1ub2xvb3AnXG4gIH1cbiAgZ2V0IHN1YnRpdGxlRW5hYmxlZENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVuYWJsZWRTdWJ0aXRsZXMubGVuZ3RoID4gMCA/ICcgdmlkZW8tc3RhdGUtc3VidGl0bGVzJyA6ICcgdmlkZW8tc3RhdGUtbm9zdWJ0aXRsZXMnXG4gIH1cbiAgZ2V0IGZ1bGxzY3JlZW5DbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0Z1bGxTY3JlZW4gPyAnIHZpZGVvLXN0YXRlLWZ1bGxzY3JlZW4nIDogJyB2aWRlby1zdGF0ZS1ub2Z1bGxzY3JlZW4nXG4gIH1cbiAgZ2V0IGNvbnRleHRNZW51Q2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dE1lbnVTdGF0ZSArICh0aGlzLnNob3dDb250ZXh0TWVudSA/ICcgYWN0aXZlJyA6ICcnKVxuICB9XG4gIGdldCBzdGF0aXN0aWNJbmZvUGFuZWxDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaG93U3RhdGlzdGljSW5mb1BhbmVsID8gJyBhY3RpdmUnIDogJydcbiAgfVxuICBnZXQgdm9sdW1lSGludENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNob3dWb2x1bWVIaW50ID8gJyBhY3RpdmUnIDogJydcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaG93UHJvZ3Jlc3NEZXRhaWwgPyAnIGFjdGl2ZScgOiAnJ1xuICB9XG5cbiAgcHJpdmF0ZSBtUGF1c2VkID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgcGF1c2VkIChwYXVzZWQpIHtcbiAgICBpZiAocGF1c2VkKSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2UoKVxuICAgIGVsc2UgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICB9XG4gIEBPdXRwdXQoKSBwYXVzZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgcHJpdmF0ZSBtQ3VycmVudFRpbWUgPSAwXG4gIEBJbnB1dCgpIHNldCBjdXJyZW50VGltZSAoY3VycmVudFRpbWUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZVxuICB9XG4gIEBPdXRwdXQoKSBjdXJyZW50VGltZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG4gIHByaXZhdGUgZHVyYXRpb24gPSAwXG4gIEBPdXRwdXQoKSBkdXJhdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG4gIHByaXZhdGUgYnVmZmVyZWRUaW1lID0gMFxuICBwcml2YXRlIHdhaXRpbmcgPSBmYWxzZVxuICBAT3V0cHV0KCkgd2FpdGluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBASW5wdXQoKSBzZXQgbG9vcCAobG9vcCkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wID0gbG9vcFxuICB9XG4gIEBPdXRwdXQoKSBsb29wQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIEBJbnB1dCgpIHNldCBtdXRlZCAobXV0ZWQpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBtdXRlZFxuICB9XG4gIEBPdXRwdXQoKSBtdXRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuXG4gIGZwcyA9ICcwLjAwJ1xuICBwcml2YXRlIGZwc1N0YXJ0ID0gMFxuICBwcml2YXRlIGZwc0luZGV4ID0gMFxuXG4gIGdldCBjdXJyZW50VGltZVN0ciAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVXNoaW9Db21wb25lbnQuZm9ybWF0RHVyYXRpb24odGhpcy5tQ3VycmVudFRpbWUpXG4gIH1cbiAgZ2V0IGR1cmF0aW9uU3RyICgpOiBzdHJpbmcge1xuICAgIHJldHVybiBVc2hpb0NvbXBvbmVudC5mb3JtYXREdXJhdGlvbih0aGlzLmR1cmF0aW9uKVxuICB9XG4gIGdldCBidWZmZXJlZFByb2dyZXNzICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiBzY2FsZVgoJHt0aGlzLmJ1ZmZlcmVkVGltZSAvIHRoaXMuZHVyYXRpb259KWBcbiAgICApXG4gIH1cbiAgZ2V0IHBsYXllZFByb2dyZXNzICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiBzY2FsZVgoJHt0aGlzLm1DdXJyZW50VGltZSAvIHRoaXMuZHVyYXRpb259KWBcbiAgICApXG4gIH1cbiAgZ2V0IHRodW1iUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGBsZWZ0OiAke3RoaXMubUN1cnJlbnRUaW1lIC8gdGhpcy5kdXJhdGlvbiAqIDEwMH0lYFxuICAgIClcbiAgfVxuICBnZXQgdm9sdW1lUmF0ZSAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogc2NhbGVZKCR7dGhpcy52b2x1bWUxMDAgLyAxMDB9KWBcbiAgICApXG4gIH1cbiAgZ2V0IHZvbHVtZVRodW1iUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGBib3R0b206ICR7dGhpcy52b2x1bWUxMDB9JWBcbiAgICApXG4gIH1cbiAgZ2V0IHNwZWVkVGh1bWJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGxlZnQ6ICR7VXNoaW9Db21wb25lbnQubWFwU3BlZWRUb1Byb2dyZXNzKHRoaXMubVBsYXliYWNrUmF0ZSl9JWBcbiAgICApXG4gIH1cbiAgcHJpdmF0ZSBwYW5lbFRyYW5zbGF0aW9ucyA9IHtcbiAgICBzZXR0aW5nczogMCxcbiAgICBzb3VyY2U6IDAsXG4gICAgc3VidGl0bGVzOiAwLFxuICAgIGxvb3A6IDAsXG4gICAgZnVsbHNjcmVlbjogMFxuICB9XG4gIGdldCBzZXR0aW5nc1BhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLnNldHRpbmdzfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBzb3VyY2VQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5zb3VyY2V9cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgZ2V0IHN1YnRpdGxlc1BhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLnN1YnRpdGxlc31weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgbG9vcFBhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLmxvb3B9cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgZ2V0IGZ1bGxTY3JlZW5QYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5mdWxsc2NyZWVufXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIHByaXZhdGUgbUNvbnRleHRNZW51UG9zaXRpb24gPSAnJ1xuICBnZXQgY29udGV4dE1lbnVQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24pXG4gIH1cbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvbiA9ICcnXG4gIHByaXZhdGUgbVByb2dyZXNzRGV0YWlsQ29udGFpbmVyUG9zaXRpb24gPSAnJ1xuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbFRpbWVQb3NpdGlvbiA9ICcnXG4gIHByaXZhdGUgbVByb2dyZXNzRGV0YWlsUG9zaXRpb25SYXRlID0gMFxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb24pXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsQ29udGFpbmVyUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Qcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uKVxuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbFRpbWVQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMubVByb2dyZXNzRGV0YWlsVGltZVBvc2l0aW9uKVxuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbEltZ1N0eWxlICgpOiBTYWZlU3R5bGUge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52aWRlb0hlaWdodCAqIDE2MCAvIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52aWRlb1dpZHRoXG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGBoZWlnaHQ6ICR7aGVpZ2h0fXB4O1xuICAgICAgIGxpbmUtaGVpZ2h0OiAke2hlaWdodH1weDtcbiAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIke3RoaXMudGh1bWJuYWlsc31cIik7XG4gICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLSR7KE1hdGguY2VpbCh0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSAqIDEwMCkgLSAxKSAqIDE2MH1weCAwO2BcbiAgICApXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsVGltZSAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVXNoaW9Db21wb25lbnQuZm9ybWF0RHVyYXRpb24odGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgKiB0aGlzLmR1cmF0aW9uKVxuICB9XG5cbiAgbGFuZ3VhZ2VzID0gdGhpcy5zZXJ2aWNlLmkxOG4ubGFuZ3VhZ2VzXG4gIGNvbnRleHRNZW51U3RhdGUgPSAncm9vdCdcbiAgZ2V0IHZlcnNpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UudmVyc2lvblxuICB9XG4gIGdldCBkZXRhaWxlZFZlcnNpb24gKCkge1xuICAgIHJldHVybiBgdiR7dGhpcy5zZXJ2aWNlLnZlcnNpb259ICgke3RoaXMuc2VydmljZS5idWlsZH0pYFxuICB9XG4gIGdldCB2aWRlb1Jlc29sdXRpb24gKCkge1xuICAgIHJldHVybiBgJHt0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9XaWR0aH0geCAke3RoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52aWRlb0hlaWdodH1gXG4gIH1cbiAgZ2V0IHZpZGVvRHVyYXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuZHVyYXRpb24udG9GaXhlZCg2KVxuICB9XG4gIGdldCB2aWRlb0N1cnJlbnRUaW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lLnRvRml4ZWQoNilcbiAgfVxuXG4gIHByaXZhdGUgdGltZVVwZGF0ZTogU3Vic2NyaXB0aW9uXG4gIHByaXZhdGUgY29udHJvbEhvdmVyZWRDaGFuZ2U6IFN1YnNjcmlwdGlvblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW11cblxuICB0ID0gdGhpcy5zZXJ2aWNlLmkxOG4udFxuXG4gIHN0YXRpYyBtYXBTcGVlZFRvUHJvZ3Jlc3MgKHNwZWVkKSB7XG4gICAgaWYgKHNwZWVkIDwgLjUpIHJldHVybiAwXG4gICAgZWxzZSBpZiAoc3BlZWQgPCAxLjUpIHJldHVybiAoc3BlZWQgLSAuNSkgKiA4MFxuICAgIGVsc2UgaWYgKHNwZWVkIDwgMi4wKSByZXR1cm4gODAgKyAoc3BlZWQgLSAxLjUpICogNDBcbiAgICBlbHNlIHJldHVybiAxMDBcbiAgfVxuICBzdGF0aWMgbWFwUHJvZ3Jlc3NUb1NwZWVkIChwcm9ncmVzcykge1xuICAgIGlmIChwcm9ncmVzcyA8IC4xKSByZXR1cm4gLjVcbiAgICBlbHNlIGlmIChwcm9ncmVzcyA8IC45KSByZXR1cm4gLjc1ICsgLjI1ICogTWF0aC5mbG9vcigocHJvZ3Jlc3MgLSAwLjEpICogNSlcbiAgICBlbHNlIHJldHVybiAyXG4gIH1cblxuICBzdGF0aWMgZm9ybWF0RHVyYXRpb24gKGR1cmF0aW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCBoID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDM2MDApXG4gICAgY29uc3QgbSA9IE1hdGguZmxvb3IoZHVyYXRpb24gJSAzNjAwIC8gNjApXG4gICAgY29uc3QgcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gJSA2MClcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoaCAmJiBoIDwgMTApIHsgc3RyICs9IGAwJHtofTpgIH0gZWxzZSBpZiAoaCkgeyBzdHIgKz0gYCR7aH06YCB9XG4gICAgaWYgKG0gPCAxMCkgeyBzdHIgKz0gYDAke219OmAgfSBlbHNlIHsgc3RyICs9IGAke219OmAgfVxuICAgIGlmIChzIDwgMTApIHsgc3RyICs9IGAwJHtzfWAgfSBlbHNlIHsgc3RyICs9IGAke3N9YCB9XG4gICAgcmV0dXJuIHN0clxuICB9XG5cbiAgY29uc3RydWN0b3IgKFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHNhbml0aXphdGlvbjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgc2VydmljZTogVXNoaW9TZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc2hvd0xhbmdNZW51ID0gdGhpcy5zaG93TGFuZ01lbnUuYmluZCh0aGlzKVxuICAgIHRoaXMub25Db21wb25lbnRDbGlja2VkID0gdGhpcy5vbkNvbXBvbmVudENsaWNrZWQuYmluZCh0aGlzKVxuICAgIHRoaXMub25Eb2N1bWVudENsaWNrZWQgPSB0aGlzLm9uRG9jdW1lbnRDbGlja2VkLmJpbmQodGhpcylcbiAgfVxuXG4gIG5nT25Jbml0ICgpIHtcbiAgICB0aGlzLm1QYXVzZWQgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2VkXG4gICAgdGhpcy5tVm9sdW1lID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZVxuICAgIHRoaXMubVBsYXliYWNrUmF0ZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGVcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCAoKSB7XG4gICAgY29uc3QgbWFwUHJvcHNUb09iamVjdCA9IChwcm9wczogc3RyaW5nW10sIGZuKSA9PiAoc291cmNlT2JqOiBhbnkpID0+IChcbiAgICAgIHByb3BzLnJlZHVjZSgoYWdnLCBjdXIpID0+ICh7IC4uLmFnZywgW2N1cl06IGZuKHNvdXJjZU9iaiwgY3VyKSB9KSwge30pXG4gICAgKVxuICAgIGNvbnN0IG9uQ29udGVudENoaWxkcmVuT3JTbG90Q2hhbmdlZCQgPSAoXG4gICAgICBhdHRyLCBjb250ZW50Q2hpbGRyZW46XG4gICAgICBRdWVyeUxpc3Q8YW55PixcbiAgICAgIHNsb3RDaGFuZ2UkOiBPYnNlcnZhYmxlPEhUTUxFbGVtZW50W10+XG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50Q2hpbGRyZW5NYXAgPSBtYXBQcm9wc1RvT2JqZWN0KGF0dHIsIChvYmosIGN1cikgPT4gKG9ialtjdXJdKSlcbiAgICAgIGNvbnN0IHNsb3RNYXAgPSBtYXBQcm9wc1RvT2JqZWN0KGF0dHIsIChvYmosIGN1cikgPT4gKG9iai5nZXRBdHRyaWJ1dGUoY3VyKSkpXG4gICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgIG9mKGNvbnRlbnRDaGlsZHJlbi50b0FycmF5KCkubWFwKGNvbnRlbnRDaGlsZHJlbk1hcCkpLFxuICAgICAgICBjb250ZW50Q2hpbGRyZW4uY2hhbmdlcy5waXBlKFxuICAgICAgICAgIG1hcCgoY29udGVudHM6IFF1ZXJ5TGlzdDxhbnk+KSA9PiAoY29udGVudHMudG9BcnJheSgpLm1hcChjb250ZW50Q2hpbGRyZW5NYXApKSlcbiAgICAgICAgKSxcbiAgICAgICAgc2xvdENoYW5nZSQucGlwZShcbiAgICAgICAgICBtYXAoKGNvbnRlbnRzOiBIVE1MRWxlbWVudFtdKSA9PiAoXG4gICAgICAgICAgICBjb250ZW50cy5tYXAoc2xvdE1hcClcbiAgICAgICAgICApKVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IHN1YnRpdGxlc0F0dHIgPSBbJ3ZhbHVlJywgJ3R5cGUnLCAnc3JjJywgJ25hbWUnLCAnY2xhc3MnLCAnZGVmYXVsdCcsICdzcmNsYW5nJ11cbiAgICBjb25zdCBzdWJ0aXRsZXNDaGFuZ2UkID0gb25Db250ZW50Q2hpbGRyZW5PclNsb3RDaGFuZ2VkJChcbiAgICAgIHN1YnRpdGxlc0F0dHIsIHRoaXMuc3VidGl0bGVzQ29udGVudENoaWxkcmVuLCB0aGlzLnN1YnRpdGxlc1Nsb3RDaGFuZ2UkKVxuICAgIGNvbnN0IHNvdXJjZXNBdHRyID0gWydzcmMnLCAndHlwZScsICduYW1lJywgJ3Nob3J0bmFtZScsICdkZWZhdWx0J11cbiAgICBjb25zdCBzb3VyY2VzQ2hhbmdlJCA9IG9uQ29udGVudENoaWxkcmVuT3JTbG90Q2hhbmdlZCQoXG4gICAgICBzb3VyY2VzQXR0ciwgdGhpcy5zb3VyY2VDb250ZW50Q2hpbGRyZW4sIHRoaXMuc291cmNlc1Nsb3RDaGFuZ2UkKVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJ0aXRsZXNDaGFuZ2UkLnN1YnNjcmliZShhc3luYyAoc3VidGl0bGVzKSA9PiB7XG4gICAgICAgIHRoaXMubVN1YnRpdGxlcyA9IHN1YnRpdGxlc1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZVN1YnRpdGxlcygpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNvdXJjZXNDaGFuZ2UkLnN1YnNjcmliZSgoc291cmNlcykgPT4ge1xuICAgICAgICB0aGlzLm1Tb3VyY2VzID0gc291cmNlc1xuICAgICAgICB0aGlzLnVwZGF0ZVNvdXJjZXMoKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgfSlcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCAoKSB7XG4gICAgY29uc3QgbW91c2VNb3ZlJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpXG4gICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJylcbiAgICBjb25zdCB0b3VjaE1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2htb3ZlJylcbiAgICBjb25zdCB0b3VjaFN0YXJ0JCA9IGZyb21FdmVudChkb2N1bWVudCwgJ3RvdWNoc3RhcnQnKVxuICAgIGNvbnN0IHRvdWNoRW5kJCA9IG1lcmdlKFxuICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hlbmQnKSxcbiAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ3RvdWNoY2FuY2VsJylcbiAgICApXG4gICAgY29uc3QgbW91c2VUb3VjaFVwJCA9IG1lcmdlKG1vdXNlVXAkLCB0b3VjaEVuZCQpXG4gICAgdG91Y2hTdGFydCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW50ZXJhY3RNb2RlID0gJ21vYmlsZSdcbiAgICB9KVxuICAgIGNvbnN0IGlmTW91c2VJbkFyZWEgPSAoZTogTW91c2VFdmVudCwgYnRuRWxlbWVudCwgcG9wVXBFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCByZWN0MSA9IHBvcFVwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgY29uc3QgcmVjdDIgPSBidG5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICByZXR1cm4gKGUuY2xpZW50WCA+IHJlY3QxLmxlZnQgJiZcbiAgICAgICAgZS5jbGllbnRYIDwgcmVjdDEucmlnaHQgJiZcbiAgICAgICAgZS5jbGllbnRZID4gcmVjdDEudG9wICYmXG4gICAgICAgIGUuY2xpZW50WSA8IHJlY3QxLmJvdHRvbSkgfHwgKGUuY2xpZW50WCA+IHJlY3QyLmxlZnQgJiZcbiAgICAgICAgZS5jbGllbnRYIDwgcmVjdDIucmlnaHQgJiZcbiAgICAgICAgZS5jbGllbnRZID4gcmVjdDIudG9wICYmXG4gICAgICAgIGUuY2xpZW50WSA8IHJlY3QyLmJvdHRvbSlcbiAgICB9XG4gICAgY29uc3Qgb25Db250cm9sQnRuSG92ZXJTdGF0ZUNoYW5nZWQkID0gKGJ0bnMpID0+IHtcbiAgICAgIHJldHVybiBtb3VzZU1vdmUkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgYnRuIG9mIGJ0bnMpIHtcbiAgICAgICAgICAgIGlmIChpZk1vdXNlSW5BcmVhKGUsIGJ0bi5idG5FbGVtZW50LCBidG4ucG9wVXBFbGVtZW50KSkge1xuICAgICAgICAgICAgICByZXR1cm4gb2YoYCBidG4tJHtidG4uYnRuTmFtZX0taG92ZXJgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGltZXIoMTUwKS5waXBlKFxuICAgICAgICAgICAgbWFwVG8oJycpXG4gICAgICAgICAgKVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCBkZXNrdG9wU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBtb3VzZU1vdmUkLnBpcGUoXG4gICAgICBmaWx0ZXIoKCkgPT4gKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpKSxcbiAgICAgIG1hcCgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2hvd0NvbnRyb2w6IGUuY2xpZW50WCA+IHJlY3QubGVmdCAmJlxuICAgICAgICAgICAgZS5jbGllbnRYIDwgcmVjdC5yaWdodCAmJlxuICAgICAgICAgICAgZS5jbGllbnRZID4gcmVjdC50b3AgJiZcbiAgICAgICAgICAgIGUuY2xpZW50WSA8IHJlY3QuYm90dG9tLFxuICAgICAgICAgIGRlbGF5U3dpdGNoOiBlLmNsaWVudFkgPCByZWN0LmJvdHRvbSAtIDQ2XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIGNvbnN0IHNob3dDb250cm9sU3RhdGVDaGFuZ2UkID0gbWVyZ2UoXG4gICAgICBkZXNrdG9wU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQsXG4gICAgICB0aGlzLm1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGUgPT4ge1xuICAgICAgICByZXR1cm4gZS5zaG93Q29udHJvbFxuICAgICAgICAgID8gbWVyZ2UoXG4gICAgICAgICAgICBvZih7XG4gICAgICAgICAgICAgIHNob3dDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAgICBub0N1cnNvcjogZmFsc2VcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZS5kZWxheVN3aXRjaCA/IHRpbWVyKFxuICAgICAgICAgICAgICB0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnID8gNzUwIDogNTAwMFxuICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICBtYXBUbyh7XG4gICAgICAgICAgICAgICAgc2hvd0NvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5vQ3Vyc29yOiB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApIDogTkVWRVJcbiAgICAgICAgICApXG4gICAgICAgICAgOiBvZih7XG4gICAgICAgICAgICBzaG93Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBub0N1cnNvcjogZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgfSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoYSwgYikgPT4gKFxuICAgICAgICBhLnNob3dDb250cm9sID09PSBiLnNob3dDb250cm9sICYmIGEubm9DdXJzb3IgPT09IGIubm9DdXJzb3JcbiAgICAgICkpXG4gICAgKVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzaG93Q29udHJvbFN0YXRlQ2hhbmdlJC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLm1TaG93Q29udHJvbCA9IHN0YXRlLnNob3dDb250cm9sXG4gICAgICAgIHRoaXMubU5vQ3Vyc29yID0gc3RhdGUubm9DdXJzb3JcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3QgbW91c2VIb3ZlclByb2dyZXNzU3RhdGUkID0gbW91c2VNb3ZlJC5waXBlKFxuICAgICAgZmlsdGVyKCgpID0+ICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSksXG4gICAgICBtYXAoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgeUNlbnRlciA9IChyZWN0LnRvcCArIHJlY3QuYm90dG9tKSAvIDJcbiAgICAgICAgaWYgKE1hdGguYWJzKGUuY2xpZW50WSAtIHlDZW50ZXIpIDwgOCAmJiBlLmNsaWVudFggPiByZWN0LmxlZnQgJiYgZS5jbGllbnRYIDwgcmVjdC5yaWdodCkge1xuICAgICAgICAgIGNvbnN0IGxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnRcbiAgICAgICAgICBjb25zdCBjb250YWluZXJMZWZ0ID0gbGVmdCA8IDgwID8gOTAgLSBsZWZ0IDogbGVmdCA+IHJlY3Qud2lkdGggLSA4MCA/IHJlY3Qud2lkdGggLSBsZWZ0IC0gNzAgOiAxMFxuICAgICAgICAgIGNvbnN0IHRpbWVMZWZ0ID0gbGVmdCA8IDIwID8gMzAgLSBsZWZ0IDogbGVmdCA+IHJlY3Qud2lkdGggLSAyMCA/IHJlY3Qud2lkdGggLSBsZWZ0IC0gMTAgOiAxMFxuICAgICAgICAgIHJldHVybiB7IGxlZnQsIGNvbnRhaW5lckxlZnQsIHRpbWVMZWZ0LCB3aWR0aDogcmVjdC53aWR0aCB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBhICE9PSB0eXBlb2YgYikge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gYS5sZWZ0ID09PSBiLmxlZnQgJiYgYS5jb250YWluZXJMZWZ0ID09PSBiLmNvbnRhaW5lckxlZnRcbiAgICAgICAgICAgICYmIGEudGltZUxlZnQgPT09IGIudGltZUxlZnQgJiYgYS53aWR0aCA9PT0gYi53aWR0aFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhID09PSBiXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtb3VzZUhvdmVyUHJvZ3Jlc3NTdGF0ZSQuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NEZXRhaWwgPSBzdGF0ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzRGV0YWlsID0gdHJ1ZVxuICAgICAgICAgIHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb24gPSBgbGVmdDogJHtzdGF0ZS5sZWZ0fXB4YFxuICAgICAgICAgIHRoaXMubVByb2dyZXNzRGV0YWlsQ29udGFpbmVyUG9zaXRpb24gPSBgbGVmdDogJHtzdGF0ZS5jb250YWluZXJMZWZ0fXB4YFxuICAgICAgICAgIHRoaXMubVByb2dyZXNzRGV0YWlsVGltZVBvc2l0aW9uID0gYGxlZnQ6ICR7c3RhdGUudGltZUxlZnR9cHhgXG4gICAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgPSBzdGF0ZS5sZWZ0IC8gc3RhdGUud2lkdGhcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgfSlcbiAgICBpZiAodGhpcy5tUGF1c2VkKSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2UoKVxuICAgIGVsc2UgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICdwYXVzZScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tUGF1c2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLnBhdXNlZENoYW5nZS5lbWl0KHRydWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncGxheScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tUGF1c2VkID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYXVzZWRDaGFuZ2UuZW1pdChmYWxzZSlcbiAgICAgIH0pKVxuICAgIGNvbnN0IHN1YnNjcmliZVRpbWVVcGRhdGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnRpbWVVcGRhdGUgPSBmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAndGltZXVwZGF0ZScpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1DdXJyZW50VGltZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZUNoYW5nZS5lbWl0KHRoaXMubUN1cnJlbnRUaW1lKVxuICAgICAgICAgICAgdGhpcy51cGRhdGVGbHlpbmdTdWJ0aXRsZXModGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBzdWJzY3JpYmVUaW1lVXBkYXRlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAnd2FpdGluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gdHJ1ZVxuICAgICAgICB0aGlzLndhaXRpbmdDaGFuZ2UuZW1pdCh0aGlzLndhaXRpbmcpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncGxheWluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gZmFsc2VcbiAgICAgICAgdGhpcy53YWl0aW5nQ2hhbmdlLmVtaXQodGhpcy53YWl0aW5nKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3Byb2dyZXNzJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlcmVkVGltZSA9ICgodGltZVJhbmdlcywgY3VycmVudFRpbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aW1lUmFuZ2VzLmxlbmd0aFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aW1lUmFuZ2VzLmVuZChpKSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVSYW5nZXMuc3RhcnQoaSkgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRpbWVSYW5nZXMuZW5kKGkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRpbWVcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lXG4gICAgICAgIH0pKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5idWZmZXJlZCwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ2xvYWRlZG1ldGFkYXRhJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmR1cmF0aW9uXG4gICAgICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmR1cmF0aW9uKVxuICAgICAgfSkpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd2b2x1bWVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWVcbiAgICAgICAgdGhpcy52b2x1bWVDaGFuZ2UuZW1pdCh0aGlzLm1Wb2x1bWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gdGhpcy5tUGxheWJhY2tSYXRlXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3JhdGVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVBsYXliYWNrUmF0ZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGVcbiAgICAgICAgdGhpcy5wbGF5YmFja1JhdGVDaGFuZ2UuZW1pdCh0aGlzLm1QbGF5YmFja1JhdGUpXG4gICAgICB9KSlcbiAgICBjb25zdCBtYXBUb1JhdGUgPSAoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSA9PiBtYXAoXG4gICAgICAobW92ZUV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBldmVudENvb3JkaW5hdGUgPSBtb3ZlRXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50XG4gICAgICAgICAgPyBtb3ZlRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgICAgICA6IG1vdmVFdmVudFxuICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgcCA9IHByb2dyZXNzKGV2ZW50Q29vcmRpbmF0ZSwgcmVjdClcbiAgICAgICAgY29uc3QgdCA9IHRvdGFsKHJlY3QpXG4gICAgICAgIGlmIChwIDwgMCkgcCA9IDBcbiAgICAgICAgZWxzZSBpZiAocCA+IHQpIHAgPSB0XG4gICAgICAgIHJldHVybiBwIC8gdFxuICAgICAgfVxuICAgIClcbiAgICBjb25zdCBvbk1vdXNlVG91Y2hEb3duJCA9IChlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpID0+IHtcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKSxcbiAgICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaHN0YXJ0JylcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgIClcbiAgICB9XG4gICAgY29uc3Qgb25Nb3VzZVRvdWNoRHJhZyQgPSAoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSA9PiB7XG4gICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSxcbiAgICAgICAgICBjb25jYXRNYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG1vdXNlTW92ZSQucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKG1vdXNlVXAkKSxcbiAgICAgICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnKS5waXBlKFxuICAgICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpLFxuICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdG91Y2hNb3ZlJC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwodG91Y2hFbmQkKSxcbiAgICAgICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IHRodW1iTW91c2VUb3VjaERvd24kID0gb25Nb3VzZVRvdWNoRG93biQoXG4gICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgY29uc3QgdGh1bWJUb3VjaERyYWckID0gb25Nb3VzZVRvdWNoRHJhZyQoXG4gICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRodW1iTW91c2VUb3VjaERvd24kLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy50aHVtYk1vdXNlRG93biA9IHRydWVcbiAgICAgICAgdGhpcy50aW1lVXBkYXRlLnVuc3Vic2NyaWJlKClcbiAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSBlICogdGhpcy5kdXJhdGlvblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aHVtYlRvdWNoRHJhZyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICB0aGlzLm1DdXJyZW50VGltZSA9IGUgKiB0aGlzLmR1cmF0aW9uXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1vdXNlVG91Y2hVcCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudGh1bWJNb3VzZURvd24pIHtcbiAgICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgICAgICAgIHN1YnNjcmliZVRpbWVVcGRhdGUoKVxuICAgICAgICAgIHRoaXMudGh1bWJNb3VzZURvd24gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3QgY29udHJvbEhvdmVyU3RhdGVDaGFuZ2UkID0gb25Db250cm9sQnRuSG92ZXJTdGF0ZUNoYW5nZWQkKFt7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnZvbHVtZUJ0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnZvbHVtZVBhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAndm9sdW1lJ1xuICAgIH0sIHtcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMuc2V0dGluZ3NCdG4ubmF0aXZlRWxlbWVudCxcbiAgICAgIHBvcFVwRWxlbWVudDogdGhpcy5zZXR0aW5nc1BhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc2V0dGluZ3MnXG4gICAgfSwge1xuICAgICAgYnRuRWxlbWVudDogdGhpcy5zb3VyY2VCdG4ubmF0aXZlRWxlbWVudCxcbiAgICAgIHBvcFVwRWxlbWVudDogdGhpcy5zb3VyY2VQYW5lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgYnRuTmFtZTogJ3NvdXJjZSdcbiAgICB9LCB7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnN1YnRpdGxlc0J0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnN1YnRpdGxlc1BhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc3VidGl0bGVzJ1xuICAgIH1dKVxuICAgIGNvbnN0IHN1YnNjcmliZUNvbnRyb2xIb3ZlcmVkQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZSA9IGNvbnRyb2xIb3ZlclN0YXRlQ2hhbmdlJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENsYXNzID0gZVxuICAgICAgICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgIGNvbnN0IGhvdmVyU3RhdGVDaGFuZ2UkID0gbWVyZ2Uoc2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQsIGNvbnRyb2xIb3ZlclN0YXRlQ2hhbmdlJCkucGlwZShcbiAgICAgIG1hcCgoKSA9PiB0aGlzLnNob3dDb250cm9sKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGhvdmVyU3RhdGVDaGFuZ2UkLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy5zaG93Q29udHJvbENoYW5nZS5lbWl0KGUpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGNvbnN0IHZvbHVtZU1vdXNlVG91Y2hEb3duJCA9IG9uTW91c2VUb3VjaERvd24kKFxuICAgICAgdGhpcy52b2x1bWVCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChyZWN0LmJvdHRvbSAtIG1vdmVFdmVudC5jbGllbnRZKSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC5oZWlnaHQpXG4gICAgKVxuICAgIGNvbnN0IHZvbHVtZVRvdWNoRHJhZyQgPSBvbk1vdXNlVG91Y2hEcmFnJChcbiAgICAgIHRoaXMudm9sdW1lQmFyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAocmVjdC5ib3R0b20gLSBtb3ZlRXZlbnQuY2xpZW50WSksXG4gICAgICAocmVjdCkgPT4gKHJlY3QuaGVpZ2h0KVxuICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godm9sdW1lTW91c2VUb3VjaERvd24kLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2xNb3VzZURvd24pIHtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xNb3VzZURvd24gPSB0cnVlXG4gICAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZS51bnN1YnNjcmliZSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IGVcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godm9sdW1lVG91Y2hEcmFnJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSBlXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1vdXNlVG91Y2hVcCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICAgIHN1YnNjcmliZUNvbnRyb2xIb3ZlcmVkQ2hhbmdlKClcbiAgICAgICAgICB0aGlzLmNvbnRyb2xNb3VzZURvd24gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3Qgc3BlZWRNb3VzZVRvdWNoRG93biQgPSBvbk1vdXNlVG91Y2hEb3duJChcbiAgICAgIHRoaXMuc3BlZWRCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIGNvbnN0IHNwZWVkVG91Y2hEcmFnJCA9IG9uTW91c2VUb3VjaERyYWckKFxuICAgICAgdGhpcy5zcGVlZEJhci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNwZWVkTW91c2VUb3VjaERvd24kLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2xNb3VzZURvd24pIHtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xNb3VzZURvd24gPSB0cnVlXG4gICAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZS51bnN1YnNjcmliZSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZSA9IFVzaGlvQ29tcG9uZW50Lm1hcFByb2dyZXNzVG9TcGVlZChlKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzcGVlZFRvdWNoRHJhZyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gVXNoaW9Db21wb25lbnQubWFwUHJvZ3Jlc3NUb1NwZWVkKGUpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGNvbnN0IG9uS2V5RG93biQgPSBjb2RlID0+IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5waXBlKFxuICAgICAgZmlsdGVyKChlOiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmZvY3VzICYmIGUuY29kZSA9PT0gY29kZSksXG4gICAgICB0YXAoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICB9KVxuICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnU3BhY2UnKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlUGxheSgpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93UmlnaHQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1DdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lICsgNSA8IHRoaXMuZHVyYXRpb24gPyB0aGlzLm1DdXJyZW50VGltZSArIDUgOiB0aGlzLmR1cmF0aW9uXG4gICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93TGVmdCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubUN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWUgLSA1ID4gMCA/IHRoaXMubUN1cnJlbnRUaW1lIC0gNSA6IDBcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWVcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnQXJyb3dVcCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMubVZvbHVtZSArIDAuMSA8IDAuOTk5OTk2ID8gdGhpcy5tVm9sdW1lICsgMC4xIDogMVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy5tVm9sdW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93RG93bicpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMubVZvbHVtZSAtIDAuMSA+IDAuMDAwMDA0ID8gdGhpcy5tVm9sdW1lIC0gMC4xIDogMFxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy5tVm9sdW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGNvbnN0IHNob3dWb2x1bWVIaW50JCA9IG1lcmdlKG9uS2V5RG93biQoJ0Fycm93VXAnKSwgb25LZXlEb3duJCgnQXJyb3dEb3duJykpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAgICgpID0+IG1lcmdlKG9mKHRydWUpLCB0aW1lcigxMDAwKS5waXBlKG1hcFRvKGZhbHNlKSkpXG4gICAgICAgICksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc2hvd1ZvbHVtZUhpbnQkLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy5zaG93Vm9sdW1lSGludCA9IGVcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICAgIH0pXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY29udGV4dG1lbnUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3Qgb3V0ZXIgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGV4dE1lbnUubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBpZiAoZS5jbGllbnRYICsgcGFuZWwud2lkdGggKyAyMCA+IG91dGVyLnJpZ2h0KSB7XG4gICAgICAgICAgaWYgKGUuY2xpZW50WSArIHBhbmVsLmhlaWdodCArIDIwID4gb3V0ZXIuYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYHJpZ2h0OiAke291dGVyLnJpZ2h0IC0gZS5jbGllbnRYfXB4OyBib3R0b206ICR7b3V0ZXIuYm90dG9tIC0gZS5jbGllbnRZfXB4YFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYHJpZ2h0OiAke291dGVyLnJpZ2h0IC0gZS5jbGllbnRYfXB4OyB0b3A6ICR7ZS5jbGllbnRZIC0gb3V0ZXIudG9wfXB4YFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZS5jbGllbnRZICsgcGFuZWwuaGVpZ2h0ICsgMjAgPiBvdXRlci5ib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgbGVmdDogJHtlLmNsaWVudFggLSBvdXRlci5sZWZ0fXB4OyBib3R0b206ICR7b3V0ZXIuYm90dG9tIC0gZS5jbGllbnRZfXB4YFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYGxlZnQ6ICR7ZS5jbGllbnRYIC0gb3V0ZXIubGVmdH1weDsgdG9wOiAke2UuY2xpZW50WSAtIG91dGVyLnRvcH1weGBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVN0YXRlID0gJ3Jvb3QnXG4gICAgICAgIHRoaXMuc2hvd0NvbnRleHRNZW51ID0gdHJ1ZVxuICAgICAgfSkpXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubGFuZ0NvbnRleHRNZW51T3B0aW9uLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dMYW5nTWVudSwgdHJ1ZSlcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbXBvbmVudENsaWNrZWQsIHRydWUpXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrZWQsIHRydWUpXG4gICAgfSlcbiAgICBjb25zdCBhbmltYXRpb25GcmFtZSQgPSBvZihudWxsLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikucGlwZShyZXBlYXQoKSlcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goYW5pbWF0aW9uRnJhbWUkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5mcHNTdGFydCkgdGhpcy5mcHNTdGFydCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgIHRoaXMuZnBzSW5kZXgrK1xuICAgICAgICBjb25zdCBmcHNDdXJyZW50ID0gK25ldyBEYXRlKClcbiAgICAgICAgaWYgKGZwc0N1cnJlbnQgLSB0aGlzLmZwc1N0YXJ0ID4gMTAwMCkge1xuICAgICAgICAgIHRoaXMuZnBzID0gKCh0aGlzLmZwc0luZGV4IC8gKGZwc0N1cnJlbnQgLSB0aGlzLmZwc1N0YXJ0KSkgKiAxMDAwKS50b0ZpeGVkKDIpXG4gICAgICAgICAgdGhpcy5mcHNTdGFydCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgICAgdGhpcy5mcHNJbmRleCA9IDBcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9KVxuICB9XG5cbiAgbmdPbkRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLnRpbWVVcGRhdGUpIHRoaXMudGltZVVwZGF0ZS51bnN1YnNjcmliZSgpXG4gICAgaWYgKHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UpIHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UudW5zdWJzY3JpYmUoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSlcbiAgICB0aGlzLmxhbmdDb250ZXh0TWVudU9wdGlvbi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93TGFuZ01lbnUsIHRydWUpXG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrZWQsIHRydWUpXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNvdXJjZXMgKCkge1xuICAgIGlmICh0aGlzLm1Tb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zb3VyY2VzID0gW3tcbiAgICAgICAgc2hvcnROYW1lOiAnRGVmYXVsdCcsXG4gICAgICAgIG5hbWU6ICdEZWZhdWx0JyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgc291cmNlczogW3sgc3JjOiB0aGlzLm1TcmMsIHR5cGU6IHVuZGVmaW5lZCB9XVxuICAgICAgfV1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc20gPSB7fVxuICAgICAgdGhpcy5tU291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG4gICAgICAgIGlmICghc291cmNlLnNob3J0bmFtZSkge1xuICAgICAgICAgIHNvdXJjZS5zaG9ydG5hbWUgPSAnVW50aXRsZWQnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzbVtzb3VyY2Uuc2hvcnRuYW1lXSkge1xuICAgICAgICAgIHNtW3NvdXJjZS5zaG9ydG5hbWVdID0ge1xuICAgICAgICAgICAgc2hvcnROYW1lOiBzb3VyY2Uuc2hvcnRuYW1lLFxuICAgICAgICAgICAgbmFtZTogc291cmNlLm5hbWUgfHwgJ1VudGl0bGVkJyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNtW3NvdXJjZS5zaG9ydG5hbWVdLnNvdXJjZXMucHVzaChzb3VyY2UpXG4gICAgICAgIGlmIChzb3VyY2UuZGVmYXVsdCAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZS5kZWZhdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgc21bc291cmNlLnNob3J0bmFtZV0uZGVmYXVsdCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuc291cmNlcyA9IE9iamVjdC52YWx1ZXMoc20pXG4gICAgfVxuICAgIGNvbnN0IGluZGV4T2ZEZWZhdWx0ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChzID0+IHMuZGVmYXVsdClcbiAgICB0aGlzLnBsYXlpbmdTb3VyY2UgPSBpbmRleE9mRGVmYXVsdCA+PSAwID8gaW5kZXhPZkRlZmF1bHQgOiAwXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVwZGF0ZVN1YnRpdGxlcyAoKSB7XG4gICAgY29uc3QgcGFyc2VkU3VidGl0bGVzID0gW11cbiAgICBmb3IgKGNvbnN0IHN1YiBvZiB0aGlzLm1TdWJ0aXRsZXMpIHtcbiAgICAgIGxldCB0ZXh0ID0gJydcbiAgICAgIGlmIChzdWIudmFsdWUpIHRleHQgPSBzdWIudmFsdWVcbiAgICAgIGVsc2UgaWYgKHN1Yi5zcmMpIHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHN1Yi5zcmMpXG4gICAgICAgIHRleHQgPSBhd2FpdCByZXNwLnRleHQoKVxuICAgICAgfVxuICAgICAgY29uc3QgcGFyc2VkID0ge1xuICAgICAgICBuYW1lOiBzdWIubmFtZSB8fCAnVW50aXRsZWQnLFxuICAgICAgICBjbGFzczogc3ViLmNsYXNzIHx8ICcnLFxuICAgICAgICBwYXJzZWRTdWJ0aXRsZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgZW5hYmxlZDogc3ViLmRlZmF1bHQgIT09IHVuZGVmaW5lZCAmJiBzdWIuZGVmYXVsdCAhPT0gbnVsbFxuICAgICAgICAgIHx8IHN1Yi5zcmNsYW5nID09PSB0aGlzLnNlcnZpY2UuaTE4bi5sYW5ndWFnZVxuICAgICAgfVxuICAgICAgc3ViLnR5cGUgPSBzdWIudHlwZSB8fCAnJ1xuICAgICAgc3ViLnR5cGUgPSBzdWIudHlwZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoc3ViLnR5cGUgIT09ICd0ZXh0L3Z0dCcgJiYgc3ViLnR5cGUgIT09ICdhcHBsaWNhdGlvbi94LXN1YnJpcCcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIE1JTUUgdHlwZSBvZiBzdWJ0aXRsZXMsIHRyeWluZyB0byBpbmZlciBzdWJ0aXRsZSBmb3JtYXQuIFN1cHBvcnRlZCB0eXBlOiB0ZXh0L3Z0dCwgYXBwbGljYXRpb24veC1zdWJyaXAuJylcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZC5wYXJzZWRTdWJ0aXRsZXMgPSB0aGlzLnNlcnZpY2UucGFyc2VTdWJ0aXRsZXModGV4dClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgfVxuICAgICAgcGFyc2VkU3VidGl0bGVzLnB1c2gocGFyc2VkKVxuICAgIH1cbiAgICB0aGlzLnN1YnRpdGxlcyA9IHBhcnNlZFN1YnRpdGxlc1xuICAgIHRoaXMudXBkYXRlRmx5aW5nU3VidGl0bGVzKClcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmx5aW5nU3VidGl0bGVzIChjdXJyZW50VGltZT8pIHtcbiAgICBpZiAoY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudFRpbWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWVcbiAgICB9XG4gICAgY3VycmVudFRpbWUgKj0gMTAwMFxuICAgIGNvbnN0IGZseWluZ1N1YnRpdGxlcyA9IFtdXG4gICAgdGhpcy5lbmFibGVkU3VidGl0bGVzLmZvckVhY2goc3VidGl0bGVzID0+IHtcbiAgICAgIGlmICghc3VidGl0bGVzLnBhcnNlZFN1YnRpdGxlcykgcmV0dXJuXG4gICAgICBjb25zdCBmbHlpbmdTdWJ0aXRsZXNUcmFjayA9IFtdXG4gICAgICBzdWJ0aXRsZXMucGFyc2VkU3VidGl0bGVzLmZvckVhY2goc3VidGl0bGUgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFRpbWUgPiBzdWJ0aXRsZS5zdGFydFRpbWUgJiYgY3VycmVudFRpbWUgPCBzdWJ0aXRsZS5lbmRUaW1lKSB7XG4gICAgICAgICAgZmx5aW5nU3VidGl0bGVzVHJhY2sucHVzaCh7XG4gICAgICAgICAgICAuLi5zdWJ0aXRsZSxcbiAgICAgICAgICAgIHRleHRzOiBzdWJ0aXRsZS50ZXh0cy5tYXAodGV4dCA9PiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0ZXh0KSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGZseWluZ1N1YnRpdGxlc1RyYWNrLmxlbmd0aCkge1xuICAgICAgICBmbHlpbmdTdWJ0aXRsZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogc3VidGl0bGVzLm5hbWUsXG4gICAgICAgICAgY2xhc3M6IHN1YnRpdGxlcy5jbGFzcyxcbiAgICAgICAgICBwYXJzZWRTdWJ0aXRsZXM6IGZseWluZ1N1YnRpdGxlc1RyYWNrXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmZseWluZ1N1YnRpdGxlcyA9IGZseWluZ1N1YnRpdGxlc1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24gKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgW3tcbiAgICAgICAgYnRuOiB0aGlzLnNldHRpbmdzQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5zZXR0aW5nc1BhbmVsLFxuICAgICAgICBuYW1lOiAnc2V0dGluZ3MnXG4gICAgICB9LCB7XG4gICAgICAgIGJ0bjogdGhpcy5zb3VyY2VCdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLnNvdXJjZVBhbmVsLFxuICAgICAgICBuYW1lOiAnc291cmNlJ1xuICAgICAgfSwge1xuICAgICAgICBidG46IHRoaXMuc3VidGl0bGVzQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5zdWJ0aXRsZXNQYW5lbCxcbiAgICAgICAgbmFtZTogJ3N1YnRpdGxlcydcbiAgICAgIH0sIHtcbiAgICAgICAgYnRuOiB0aGlzLmxvb3BCdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLmxvb3BQYW5lbCxcbiAgICAgICAgbmFtZTogJ2xvb3AnXG4gICAgICB9LCB7XG4gICAgICAgIGJ0bjogdGhpcy5mdWxsU2NyZWVuQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5mdWxsU2NyZWVuUGFuZWwsXG4gICAgICAgIG5hbWU6ICdmdWxsc2NyZWVuJ1xuICAgICAgfV0uZm9yRWFjaChpdGVtID0+IHRoaXMuc2V0UGFuZWxQb3NpdGlvbihpdGVtLmJ0biwgaXRlbS5wYW5lbCwgaXRlbS5uYW1lKSlcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgfSwgMClcbiAgfVxuXG4gIHByaXZhdGUgc2V0UGFuZWxQb3NpdGlvbiAoYnRuLCBwYW5lbCwgbmFtZSkge1xuICAgIGlmICghdGhpcy5lbGVtZW50IHx8ICFwYW5lbCB8fCAhYnRuKSByZXR1cm5cbiAgICBjb25zdCBvdXRlclJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBjb25zdCBidG5SZWN0ID0gYnRuLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAocGFuZWxSZWN0LndpZHRoIC8gMiAtIG91dGVyUmVjdC5yaWdodCArIGJ0blJlY3QucmlnaHQgPiAwKSB7XG4gICAgICB0aGlzLnBhbmVsVHJhbnNsYXRpb25zW25hbWVdID0gcGFuZWxSZWN0LndpZHRoIC8gMiAtIG91dGVyUmVjdC5yaWdodCArIGJ0blJlY3QucmlnaHRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbFRyYW5zbGF0aW9uc1tuYW1lXSA9IDBcbiAgICB9XG4gIH1cblxuICBvblNsb3RDaGFuZ2UgKGUpIHtcbiAgICB0aGlzLnN1YnRpdGxlc1Nsb3RVcGRhdGUkLm5leHQoXG4gICAgICBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKCkuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ1VTSElPLVNVQlRJVExFUycpXG4gICAgKVxuICAgIHRoaXMuc291cmNlc1Nsb3RVcGRhdGUkLm5leHQoXG4gICAgICBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKCkuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ1VTSElPLVNPVVJDRScpXG4gICAgKVxuICAgIHRoaXMubUluamVjdGVkU3R5bGVzID0gZS50YXJnZXQuYXNzaWduZWROb2RlcygpXG4gICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ1NUWUxFJykubWFwKG5vZGUgPT4gbm9kZS5pbm5lckhUTUwpXG4gIH1cblxuICBvblZpZGVvTWFza0NsaWNrZWQgKCkge1xuICAgIGlmICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkLm5leHQoe1xuICAgICAgICBzaG93Q29udHJvbDogIXRoaXMubVNob3dDb250cm9sLFxuICAgICAgICBkZWxheVN3aXRjaDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvblNlbGVjdFNvdXJjZSAoaSkge1xuICAgIGlmIChpID09PSB0aGlzLnBsYXlpbmdTb3VyY2UpIHJldHVyblxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWVcbiAgICBjb25zdCBwYXVzZWQgPSB0aGlzLm1QYXVzZWRcbiAgICB0aGlzLnBsYXlpbmdTb3VyY2UgPSBpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmxvYWQoKVxuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lXG4gICAgaWYgKCFwYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5KClcbiAgfVxuXG4gIG9uQ2hlY2tTdWJ0aXRsZXMgKGkpIHtcbiAgICB0aGlzLnN1YnRpdGxlc1tpXS5lbmFibGVkID0gIXRoaXMuc3VidGl0bGVzW2ldLmVuYWJsZWRcbiAgICB0aGlzLnVwZGF0ZUZseWluZ1N1YnRpdGxlcygpXG4gIH1cblxuICB0b2dnbGVQbGF5ICgpIHtcbiAgICBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICAgIGVsc2UgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlKClcbiAgfVxuXG4gIHRvZ2dsZU11dGUgKCkge1xuICAgIGlmICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSAhKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCB8fCB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID09PSAwKVxuICAgICAgdGhpcy5tdXRlZENoYW5nZS5lbWl0KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZClcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCkge1xuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gZmFsc2VcbiAgICAgIHRoaXMubXV0ZWRDaGFuZ2UuZW1pdChmYWxzZSlcbiAgICB9XG4gICAgaWYgKCF0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgJiYgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9PT0gMCkge1xuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IE1hdGgucmFuZG9tKClcbiAgICB9XG4gIH1cblxuICB0b2dnbGVMb29wICgpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcCA9ICF0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcFxuICAgIHRoaXMubG9vcENoYW5nZS5lbWl0KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wKVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzRnVsbFNjcmVlbikge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpXG4gICAgfVxuICB9XG5cbiAgc2hvd0xhbmdNZW51ICgpIHtcbiAgICB0aGlzLmNvbnRleHRNZW51U3RhdGUgPSAnbGFuZydcbiAgICB0aGlzLnNob3dDb250ZXh0TWVudSA9IHRydWVcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICB9XG5cbiAgb25Db21wb25lbnRDbGlja2VkICgpIHtcbiAgICB0aGlzLmZvY3VzID0gdHJ1ZVxuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrZWQgKCkge1xuICAgIHRoaXMuZm9jdXMgPSBmYWxzZVxuICAgIGlmICh0aGlzLnNob3dDb250ZXh0TWVudSkge1xuICAgICAgdGhpcy5zaG93Q29udGV4dE1lbnUgPSBmYWxzZVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICB9XG4gIH1cblxuICBzZXRMYW5ndWFnZSAoY29kZSkge1xuICAgIHRoaXMuc2VydmljZS5pMThuLnNldExhbmd1YWdlKGNvZGUpXG4gIH1cblxuICB0b2dnbGVTaG93U3RhdGlzdGljSW5mb1BhbmVsICgpIHtcbiAgICB0aGlzLnNob3dTdGF0aXN0aWNJbmZvUGFuZWwgPSAhdGhpcy5zaG93U3RhdGlzdGljSW5mb1BhbmVsXG4gIH1cblxufVxuIl19