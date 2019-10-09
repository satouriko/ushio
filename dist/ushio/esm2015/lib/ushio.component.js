/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
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
     * @param {?} sanitization
     * @param {?} service
     */
    constructor(element, sanitization, service) {
        this.element = element;
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
        this.subscriptions.push(subtitlesChange$.subscribe((/**
         * @param {?} subtitles
         * @return {?}
         */
        (subtitles) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.mSubtitles = subtitles;
            yield this.updateSubtitles();
        }))));
        /** @type {?} */
        const sourcesAttr = ['src', 'type', 'name', 'shortname', 'default'];
        /** @type {?} */
        const sourcesChange$ = onContentChildrenOrSlotChanged$(sourcesAttr, this.sourceContentChildren, this.sourcesSlotChange$);
        this.subscriptions.push(sourcesChange$.subscribe((/**
         * @param {?} sources
         * @return {?}
         */
        (sources) => {
            this.mSources = sources;
            this.updateSources();
        })));
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
                ? merge(of(true), e.delaySwitch ? timer(this.interactMode === 'desktop' ? 750 : 5000).pipe(mapTo(false)) : NEVER)
                : of(false);
        })), distinctUntilChanged());
        this.subscriptions.push(showControlStateChange$.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            this.mShowControl = state;
        })));
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
        })));
        this.subscriptions.push(mouseHoverProgressState$.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        state => {
            if (!state) {
                this.showProgressDetail = false;
            }
            else {
                this.showProgressDetail = true;
                this.mProgressDetailPosition = `left: ${state.left}px`;
                this.mProgressDetailContainerPosition = `left: ${state.containerLeft}px`;
                this.mProgressDetailTimePosition = `left: ${state.timeLeft}px`;
                this.mProgressDetailPositionRate = state.left / state.width;
            }
        })));
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
            this.timeUpdate = fromEvent(this.video.nativeElement, 'timeupdate')
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.mCurrentTime = this.video.nativeElement.currentTime;
                this.currentTimeChange.emit(this.mCurrentTime);
                this.updateFlyingSubtitles(this.mCurrentTime);
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
        this.subscriptions.push(thumbMouseTouchDown$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.thumbMouseDown = true;
            this.timeUpdate.unsubscribe();
            this.mCurrentTime = e * this.duration;
        })));
        this.subscriptions.push(thumbTouchDrag$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.mCurrentTime = e * this.duration;
        })));
        this.subscriptions.push(mouseTouchUp$.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.thumbMouseDown) {
                this.video.nativeElement.currentTime = this.mCurrentTime;
                subscribeTimeUpdate();
                this.thumbMouseDown = false;
            }
        })));
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
            this.controlHoveredChange = controlHoverStateChange$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.controlHoveredClass = e;
                this.setAllControlPanelsPosition();
            }));
        });
        subscribeControlHoveredChange();
        /** @type {?} */
        const hoverStateChange$ = merge(showControlStateChange$, controlHoverStateChange$).pipe(map((/**
         * @return {?}
         */
        () => this.showControl)), distinctUntilChanged());
        this.subscriptions.push(hoverStateChange$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.showControlChange.emit(e);
        })));
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
        })));
        this.subscriptions.push(volumeTouchDrag$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.video.nativeElement.volume = e;
        })));
        this.subscriptions.push(mouseTouchUp$.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.controlMouseDown) {
                subscribeControlHoveredChange();
                this.controlMouseDown = false;
            }
        })));
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
        })));
        this.subscriptions.push(speedTouchDrag$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
        })));
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
        this.subscriptions.push(onKeyDown$('Space').subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.togglePlay();
        })));
        this.subscriptions.push(onKeyDown$('ArrowRight').subscribe((/**
         * @return {?}
         */
        () => {
            this.mCurrentTime = this.mCurrentTime + 5 < this.duration ? this.mCurrentTime + 5 : this.duration;
            this.video.nativeElement.currentTime = this.mCurrentTime;
        })));
        this.subscriptions.push(onKeyDown$('ArrowLeft').subscribe((/**
         * @return {?}
         */
        () => {
            this.mCurrentTime = this.mCurrentTime - 5 > 0 ? this.mCurrentTime - 5 : 0;
            this.video.nativeElement.currentTime = this.mCurrentTime;
        })));
        this.subscriptions.push(onKeyDown$('ArrowUp').subscribe((/**
         * @return {?}
         */
        () => {
            this.mVolume = this.mVolume + 0.1 < 0.999996 ? this.mVolume + 0.1 : 1;
            this.video.nativeElement.volume = this.mVolume;
        })));
        this.subscriptions.push(onKeyDown$('ArrowDown').subscribe((/**
         * @return {?}
         */
        () => {
            this.mVolume = this.mVolume - 0.1 > 0.000004 ? this.mVolume - 0.1 : 0;
            this.video.nativeElement.volume = this.mVolume;
        })));
        /** @type {?} */
        const showVolumeHint$ = merge(onKeyDown$('ArrowUp'), onKeyDown$('ArrowDown'));
        /** @type {?} */
        const dismissVolumeHint$ = showVolumeHint$.pipe(switchMap((/**
         * @return {?}
         */
        () => timer(1000))));
        this.subscriptions.push(showVolumeHint$.subscribe((/**
         * @return {?}
         */
        () => {
            this.showVolumeHint = true;
        })));
        this.subscriptions.push(dismissVolumeHint$.subscribe((/**
         * @return {?}
         */
        () => {
            this.showVolumeHint = false;
        })));
        this.setAllControlPanelsPosition();
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
        this.langContextMenuOption.nativeElement.addEventListener('click', this.showLangMenu, true);
        this.element.nativeElement.addEventListener('click', this.onComponentClicked, true);
        document.addEventListener('click', this.onDocumentClicked, true);
        /** @type {?} */
        const animationFrame$ = of(null, animationFrameScheduler).pipe(repeat());
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
            }
        })));
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
    }
    /**
     * @return {?}
     */
    onComponentClicked() {
        this.focus = true;
        this.showContextMenu = false;
    }
    /**
     * @return {?}
     */
    onDocumentClicked() {
        this.focus = false;
        this.showContextMenu = false;
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
                template: "<div [className]=\"'ushio-player ' + interactMode + (showControl ? ' mouse-hover' : '') + pausedClass + waitingClass\">\n  <div [className]=\"'ushio-player-video-mask' + (showControl ? '' : ' no-cursor')\" (click)=\"onVideoMaskClicked()\">\n    <div [className]=\"'video-state-buff-wrap' + waitingClass\">\n      <img class=\"video-state-buff\" src=\"data:image/gif;base64,R0lGODlhIAAgALMIADc3N5eXl3l5eVdXV9PT0+3t7bS0tCcnJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0ZCQUZCNUYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0ZCQUZCNkYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRkJBRkIzRjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDRkJBRkI0RjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqThrevr+X3eBpOWVGZCJWgECMMZiRf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlRKuWMlgy4VivwSueOAFa8fVtHrN3ggEJIPB+X5/5PJSHQ7Czz97GQEYfoB2GAGJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWupOGta+v5fd4Gk5ZXZkYkaAR4wxmJE/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVGq5YCWDLhWK/Bq4Y4AVrx9W0es3eDAakQMD5fn/k8lIdDsLPP3sZAhh+gHYYAomEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJK6k4a0r6/l93gaTllVmRiZoBFjDGYkb9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUGrljJYcuFYr8BrvjgBWvH1bR6zd4AACSBwPl+f+TyUh0Ows8/exkDGH6AdhgDiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUmrqThravr+X3eBpOWVGZGJWgASMMZiQf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlQquWElhy4VivwKuuOAFa8fVtHrN3hwOpMHA+X5/5PJSHQ7Czz97GQAYfoB2GACJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWuoOGsa+v5fd4Gk5ZWZkYmaABowxmJC/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVDq5YCWHLhWK/A66Y4AVrx9W0es3eFAokAMD5fn/k8lIdDsLPP3sZBxh+gHYYB4mEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJq6g4ayr6/l93gaTllVmQidoABjDGYkP9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUCrliJYcuFYr8ArtjgBWvH1bR6zd4QCKTDwfl+f+TyUh0Ows8/exkFGH6AdhgFiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqDhrOvr+X3eBpOWVmZCJGgAKMMZiQP3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlR6uWElgy4VivweuOOAFa8fVtHrN3hgMpELB+X5/5PJSHQ7Czz97GQQYfoB2GASJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSSuoOGsK+v5fd4Gk5ZXZkInaAQ4wxmJH/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVFq5YiWDLhWK/Ba5Y4AVrx9W0es3eBAIkAsH5fn/k8lIdDsLPP3sZBhh+gHYYBomEeYAaiYOEVI9tEpOUlm2YmU4RADs=\" alt=\"buffering\">\n    </div>\n  </div>\n  <div class=\"ushio-player-video\">\n    <video #video\n      [attr.crossOrigin]=\"crossorigin\"\n      [attr.poster]=\"poster\"\n      [attr.autoplay]=\"autoplay\"\n      [attr.preload]=\"preload\"\n    >\n      Your browser is too old which doesn't support HTML5 video.\n      <source *ngFor=\"let source of sources[playingSource].sources\"\n              [src]=\"source.src\" [attr.type]=\"source.type\"\n      />\n    </video>\n  </div>\n  <div class=\"ushio-player-custom-mask\">\n    <slot (slotchange)=\"onSlotChange($event)\"></slot>\n  </div>\n  <div class=\"ushio-player-subtitle-container\">\n    <div *ngFor=\"let subtitles of flyingSubtitles\"\n         [className]=\"'ushio-player-subtitle-wrap ' + subtitles.class\">\n      <div *ngFor=\"let subtitle of subtitles.parsedSubtitles\" class=\"ushio-player-subtitle\">\n        <div *ngFor=\"let line of subtitle.texts\" class=\"subtitle-line\">\n          <span [innerHTML]=\"line\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"ushio-player-video-control-mask\"></div>\n  <div class=\"ushio-player-video-control-wrap\">\n    <div class=\"ushio-player-video-control\">\n      <div class=\"video-control-top\">\n        <div [className]=\"'video-progress' + thumbMouseDownClass\">\n          <div class=\"video-progress-slider\" #slider>\n            <div class=\"slider-track\">\n              <div class=\"slider-track-bar-wrap\">\n                <div class=\"bar-buffer\" [style]=\"bufferedProgress\"></div>\n                <div class=\"bar-normal\" [style]=\"playedProgress\"></div>\n              </div>\n              <div class=\"slider-track-thumb\" [style]=\"thumbPosition\">\n                <div class=\"thumb-dot\"></div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'video-progress-detail' + progressDetailClass\" [style]=\"progressDetailPosition\">\n            <div *ngIf=\"thumbnails\"\n                 class=\"video-progress-detail-container\" [style]=\"progressDetailContainerPosition\">\n              <div class=\"detail-img\" [style]=\"progressDetailImgStyle\"></div>\n            </div>\n            <div class=\"video-progress-detail-sign\">\n              <div class=\"sign-down\"></div>\n              <div class=\"sign-up\"></div>\n            </div>\n            <div class=\"video-progress-detail-time\" [style]=\"progressDetailTimePosition\">\n              {{progressDetailTime}}\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"video-control-bottom\">\n        <div class=\"video-control-bottom-left\">\n          <div [className]=\"'ushio-player-btn btn-start' + pausedClass\" (click)=\"togglePlay()\">\n            <span class=\"ushio-player-icon icon-play\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-play\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-pause\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-pause\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n          </div>\n          <div class=\"video-time-wrap\">\n            <span class=\"video-time-now\">{{currentTimeStr}}</span>\n            <span class=\"video-time-divider\">/</span>\n            <span class=\"video-time-total\">{{durationStr}}</span>\n          </div>\n        </div>\n        <div class=\"video-control-bottom-center\"></div>\n        <div [className]=\"'video-control-bottom-right' + controlHoveredClass\">\n          <div [className]=\"'ushio-player-btn btn-volume' + mutedClass + (volumeControl ? '' : ' hide')\"\n               #volumeBtn\n          >\n            <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"control-panel btn-volume-panel\" #volumePanel>\n              <div class=\"volume-num\">{{volume100}}</div>\n              <div class=\"volume-bar\" #volumeBar>\n                <div class=\"volume-bar-track\">\n                  <div class=\"volume-bar-track-wrap\">\n                    <div class=\"bar-normal\" [style]=\"volumeRate\"></div>\n                  </div>\n                  <div class=\"volume-bar-track-thumb\" [style]=\"volumeThumbPosition\">\n                    <div class=\"thumb-dot\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-source' + (sourceControl && sources.length > 1 ? '' : ' hide')\"\n               #sourceBtn\n          >\n            {{ sources[playingSource].shortName }}\n            <div class=\"btn-source-panel control-panel\" #sourcePanel [style]=\"sourcePanelPosition\">\n              <ul>\n                <li *ngFor=\"let source of sources; index as i\"\n                    (click)=\"onSelectSource(i)\"\n                    [className]=\"playingSource === i ? 'selected' : ''\"\n                >\n                  {{ source.name }}\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-subtitles' + subtitleEnabledClass + (subtitlesControl && subtitles.length > 0 ? '' : ' hide')\"\n               #subtitlesBtn\n          >\n            <span class=\"ushio-player-icon icon-subtitles-off\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-subtitles-on\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-subtitles-panel control-panel\" #subtitlesPanel [style]=\"subtitlesPanelPosition\">\n              <ul>\n                <li *ngFor=\"let subtitleTrack of subtitles; index as i\"\n                    (click)=\"onCheckSubtitles(i)\"\n                    [className]=\"subtitleTrack.enabled ? 'checked' : ''\"\n                >\n                  <span *ngIf=\"!subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-default\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-default\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span *ngIf=\"subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-selected\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-selected\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span>{{ subtitleTrack.name }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-settings' + (settingsControl ? '' : ' hide')\"\n               #settingsBtn\n          >\n            <span class=\"ushio-player-icon icon-settings\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-settings\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-settings-panel control-panel\" #settingsPanel [style]=\"settingsPanelPosition\">\n              <div class=\"panel-box settings-panel-speed\">\n                <div class=\"panel-box-title\">\n                  {{t('speed')}}\n                </div>\n                <div class=\"panel-box-content panel-speed-content speed-bar\" #speedBar>\n                  <div class=\"speed-track\">\n                    <div class=\"speed-track-wrap\"></div>\n                    <div class=\"speed-track-steps\">\n                      <div class=\"speed-track-steps-item step-item-0\" style=\"left: 0\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 20%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.75</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 40%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">{{t('normal')}}</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 60%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.25</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 80%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item step-item-100\" style=\"left: 100%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">2.0</div>\n                      </div>\n                    </div>\n                    <div class=\"speed-track-thumb\" [style]=\"speedThumbPosition\">\n                      <div class=\"thumb-dot\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-loop' + loopClass + (loopControl ? '' : ' hide')\"\n               (click)=\"toggleLoop()\"\n               #loopBtn\n          >\n            <span class=\"ushio-player-icon icon-loop-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-loop-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title btn-title-loop\" #loopPanel [style]=\"loopPanelPosition\">\n              {{ t('noLoop') }}\n            </div>\n            <div class=\"btn-title btn-title-noloop\" [style]=\"loopPanelPosition\">\n              {{ t('loop') }}\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-fullscreen' + fullscreenClass  + (fullscreenControl ? '' : ' hide')\"\n               (click)=\"toggleFullscreen()\"\n               #fullScreenBtn\n          >\n            <span class=\"ushio-player-icon icon-fullscreen-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-fullscreen-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title\" #fullScreenPanel [style]=\"fullScreenPanelPosition\">\n              {{ fullscreenClass === ' video-state-fullscreen' ? t('exitFullscreen') : t('fullscreen') }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [className]=\"'ushio-context-menu control-panel ' + contextMenuClass\"\n       #contextMenu\n       [style]=\"contextMenuPosition\"\n  >\n    <div class=\"ushio-context-menu-root\">\n      <ul>\n        <li (click)=\"toggleShowStatisticInfoPanel()\">{{t('statistic')}}</li>\n        <li #langContextMenuOption>{{t('language')}}</li>\n        <li>\n          <a target=\"_blank\" referrerpolicy=\"no-referrer\" href=\"https://github.com/rikakomoe/ushio\">\n            Ushio Player v{{version}}\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"ushio-context-menu-lang\">\n      <ul>\n        <li *ngFor=\"let lang of languages\" (click)=\"setLanguage(lang[0])\">{{lang[1]}}</li>\n      </ul>\n    </div>\n  </div>\n  <div [className]=\"'ushio-statistic-info control-panel' + statisticInfoPanelClass\">\n    <a class=\"dismiss\" (click)=\"toggleShowStatisticInfoPanel()\">[x]</a>\n    <table>\n      <tr><td>Player version</td><td>{{detailedVersion}}</td></tr>\n      <tr><td>Player FPS</td><td>{{fps}}</td></tr>\n      <tr><td>Video resolution</td><td>{{videoResolution}}</td></tr>\n      <tr><td>Video duration</td><td>{{videoDuration}}</td></tr>\n      <tr><td>Current time</td><td>{{videoCurrentTime}}</td></tr>\n    </table>\n  </div>\n  <div [className]=\"'ushio-volume-hint' + volumeHintClass\">\n    <span [className]=\"mutedClass\">\n      <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n      <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n    </span>\n    <span *ngIf=\"volume100\">{{volume100}}%</span>\n    <span *ngIf=\"!volume100\">{{t('mute')}}</span>\n  </div>\n  <div class=\"ushio-res\">\n    <div *ngFor=\"let style of injectedStyles\" [innerHTML]=\"style\"></div>\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <symbol id=\"ushio-play\">\n        <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n      </symbol>\n      <symbol id=\"ushio-pause\">\n        <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-max\">\n        <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-min\">\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n        <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-off\">\n        <path d=\"M15.172 18H4a2 2 0 0 1-2-2V6c0-.34.084-.658.233-.938l-.425-.426a1 1 0 1 1 1.414-1.414l15.556 15.556a1 1 0 0 1-1.414 1.414L15.172 18zM4.962 7.79C4.385 8.141 4 8.776 4 9.5v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .713-.958L4.962 7.79zM6.828 4H18a2 2 0 0 1 2 2v10c0 .34-.084.658-.233.938l-2.48-2.48A1 1 0 0 0 17 12.5h-1.672L14 11.172V10.5a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2h-3a2 2 0 0 0-1.977 1.695L6.828 4z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-on\">\n        <path d=\"M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 5.5a1 1 0 1 0 0-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2zm8 0a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2h-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-default\">\n        <path d=\"M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0-2h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-selected\">\n        <path d=\"M13 18.25l-1.8-1.8c-.6-.6-1.65-.6-2.25 0s-.6 1.5 0 2.25l2.85 2.85c.318.318.762.468 1.2.448.438.02.882-.13 1.2-.448l8.85-8.85c.6-.6.6-1.65 0-2.25s-1.65-.6-2.25 0l-7.8 7.8zM8 4h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-settings\">\n        <circle cx=\"11\" cy=\"11\" r=\"2\"></circle>\n        <path d=\"M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-on\">\n        <path d=\"M17 16H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .353.853H4v2a2 2 0 0 0 2 2h11a1 1 0 0 0 0-2zM19.793 8H18V6a2 2 0 0 0-2-2H5a1 1 0 0 0 0 2h11v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793A.5.5 0 0 0 19.793 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-off\">\n        <path d=\"M3.222 3.222a.999.999 0 1 0-1.414 1.414l11.435 11.435H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .354.854H4v2a2 2 0 0 0 2 2h9.243l2.121 2.121a.999.999 0 1 0 1.414-1.414L3.222 3.222zM19.793 8.071H18v-2a2 2 0 0 0-2-2H6.899l2 2H16v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793a.5.5 0 0 0-.353-.853z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-off\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 .5.5v1zm0-8a.5.5 0 0 1-.5.5H6v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm10 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H16v-1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-on\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm10 4a.5.5 0 0 1-.5.5H16v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 .5.5v1z\"></path>\n      </symbol>\n    </svg>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.ShadowDom,
                styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
            }] }
];
/** @nocollapse */
UshioComponent.ctorParameters = () => [
    { type: ElementRef },
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
    UshioComponent.prototype.sanitization;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXNoaW8vIiwic291cmNlcyI6WyJsaWIvdXNoaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFBRSxZQUFZLEVBQ3hCLEtBQUssRUFFRyxNQUFNLEVBQ2QsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUFFLFlBQVksRUFBYSxNQUFNLDJCQUEyQixDQUFBO0FBQ25FLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUN2QyxPQUFPLEVBQWdCLEtBQUssRUFDN0IsTUFBTSxNQUFNLENBQUE7QUFDYixPQUFPLEVBQ0wsU0FBUyxFQUFFLG9CQUFvQixFQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQ3RELE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBTXpELE1BQU0sT0FBTyxXQUFXOzs7WUFKdkIsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsY0FBYzthQUN6Qjs7O2tCQUVFLEtBQUs7bUJBQ0wsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7c0JBQ0wsS0FBSzs7OztJQUpOLDBCQUFxQjs7SUFDckIsMkJBQXFCOztJQUNyQixnQ0FBMEI7O0lBQzFCLDJCQUFxQjs7SUFDckIsOEJBQXlCOztBQU8zQixNQUFNLE9BQU8sY0FBYzs7O1lBSjFCLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7O29CQUVFLEtBQUs7a0JBQ0wsS0FBSzttQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JB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ZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LCBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHtcbiAgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsXG4gIGZyb21FdmVudCwgbWVyZ2UsIE5FVkVSLCBPYnNlcnZhYmxlLCBvZixcbiAgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCB0aW1lclxufSBmcm9tICdyeGpzJ1xuaW1wb3J0IHtcbiAgY29uY2F0TWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLCBtYXAsIG1hcFRvLCByZXBlYXQsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0YXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCB7IElTdWJ0aXRsZSwgVXNoaW9TZXJ2aWNlIH0gZnJvbSAnLi91c2hpby5zZXJ2aWNlJ1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3VzaGlvLXNvdXJjZSdcbn0pXG5leHBvcnQgY2xhc3MgVXNoaW9Tb3VyY2Uge1xuICBASW5wdXQoKSBzcmMhOiBzdHJpbmdcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIHNob3J0bmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndXNoaW8tc3VidGl0bGVzJ1xufSlcbmV4cG9ydCBjbGFzcyBVc2hpb1N1YnRpdGxlcyB7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmdcbiAgQElucHV0KCkgc3JjOiBzdHJpbmdcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ1xuICBASW5wdXQoKSBjbGFzczogc3RyaW5nXG4gIEBJbnB1dCgpIHNyY2xhbmc6IHN0cmluZ1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBTb3VyY2Uge1xuICBzaG9ydE5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc291cmNlczoge1xuICAgIHNyYzogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgfVtdXG4gIGRlZmF1bHQ/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBTdWJ0aXRsZXMge1xuICBuYW1lOiBzdHJpbmdcbiAgY2xhc3M6IHN0cmluZ1xuICBwYXJzZWRTdWJ0aXRsZXM6IElTdWJ0aXRsZVtdXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXNoaW8tcGxheWVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzaGlvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNoaW8uY29tcG9uZW50LnN0eWwnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tXG59KVxuZXhwb3J0IGNsYXNzIFVzaGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgbUluamVjdGVkU3R5bGVzID0gW11cbiAgZ2V0IGluamVjdGVkU3R5bGVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5tSW5qZWN0ZWRTdHlsZXMubWFwKFxuICAgICAgc3R5bGUgPT4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoYFxuICAgICAgPHN0eWxlPlxuICAgICAgICR7c3R5bGV9XG4gICAgICA8L3N0eWxlPlxuICAgIGApKVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHNyYyAoc3JjKSB7XG4gICAgdGhpcy5tU3JjID0gc3JjXG4gICAgdGhpcy51cGRhdGVTb3VyY2VzKClcbiAgfVxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU3JjXG4gIH1cbiAgQElucHV0KCkgcG9zdGVyXG4gIEBJbnB1dCgpIGNyb3Nzb3JpZ2luXG4gIEBJbnB1dCgpIGF1dG9wbGF5XG4gIEBJbnB1dCgpIHByZWxvYWQgPSAnbWV0YWRhdGEnXG4gIEBJbnB1dCgpIHNldCBsYW5nIChsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlcnZpY2UuaTE4bi5zZXRMYW5ndWFnZShsYW5nKVxuICB9XG4gIEBJbnB1dCgpIHRodW1ibmFpbHNcblxuICBwcml2YXRlIG1TcmNcbiAgcHJpdmF0ZSBtU291cmNlcyA9IFtdXG4gIHNvdXJjZXM6IFNvdXJjZVtdID0gW11cbiAgcGxheWluZ1NvdXJjZSA9IDBcblxuICBwcml2YXRlIG1TdWJ0aXRsZXMgPSBbXVxuICBzdWJ0aXRsZXM6IFN1YnRpdGxlc1tdID0gW11cbiAgZ2V0IGVuYWJsZWRTdWJ0aXRsZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN1YnRpdGxlcy5maWx0ZXIocyA9PiBzLmVuYWJsZWQpXG4gIH1cbiAgZmx5aW5nU3VidGl0bGVzOiBTdWJ0aXRsZXNbXSA9IFtdXG5cbiAgcHJpdmF0ZSBtVm9sdW1lID0gMVxuICBASW5wdXQoKSBzZXQgdm9sdW1lICh2b2x1bWUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdm9sdW1lXG4gIH1cbiAgZ2V0IHZvbHVtZTEwMCAoKSB7XG4gICAgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCkgcmV0dXJuIDBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLm1Wb2x1bWUgKiAxMDApXG4gIH1cbiAgQE91dHB1dCgpIHZvbHVtZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG5cbiAgcHJpdmF0ZSBtUGxheWJhY2tSYXRlID0gMVxuICBASW5wdXQoKSBzZXQgcGxheWJhY2tSYXRlIChwbGF5YmFja1JhdGUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlXG4gIH1cbiAgQE91dHB1dCgpIHBsYXliYWNrUmF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG5cbiAgcHJpdmF0ZSBtVm9sdW1lQ29udHJvbCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHZvbHVtZUNvbnRyb2wgKHZvbHVtZUNvbnRyb2wpIHtcbiAgICB0aGlzLm1Wb2x1bWVDb250cm9sID0gdm9sdW1lQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgdm9sdW1lQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVZvbHVtZUNvbnRyb2xcbiAgfVxuICBwcml2YXRlIG1Tb3VyY2VDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgc291cmNlQ29udHJvbCAoc291cmNlQ29udHJvbCkge1xuICAgIHRoaXMubVNvdXJjZUNvbnRyb2wgPSBzb3VyY2VDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBzb3VyY2VDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU291cmNlQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbVN1YnRpdGxlc0NvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzdWJ0aXRsZXNDb250cm9sIChzdWJ0aXRsZXNDb250cm9sKSB7XG4gICAgdGhpcy5tU3VidGl0bGVzQ29udHJvbCA9IHN1YnRpdGxlc0NvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHN1YnRpdGxlc0NvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1TdWJ0aXRsZXNDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtU2V0dGluZ3NDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgc2V0dGluZ3NDb250cm9sIChzZXR0aW5nc0NvbnRyb2wpIHtcbiAgICB0aGlzLm1TZXR0aW5nc0NvbnRyb2wgPSBzZXR0aW5nc0NvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHNldHRpbmdzQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVNldHRpbmdzQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbUxvb3BDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgbG9vcENvbnRyb2wgKGxvb3BDb250cm9sKSB7XG4gICAgdGhpcy5tTG9vcENvbnRyb2wgPSBsb29wQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgbG9vcENvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1Mb29wQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbUZ1bGxzY3JlZW5Db250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgZnVsbHNjcmVlbkNvbnRyb2wgKGZ1bGxzY3JlZW5Db250cm9sKSB7XG4gICAgdGhpcy5tRnVsbHNjcmVlbkNvbnRyb2wgPSBmdWxsc2NyZWVuQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgZnVsbHNjcmVlbkNvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1GdWxsc2NyZWVuQ29udHJvbFxuICB9XG5cbiAgQFZpZXdDaGlsZCgndmlkZW8nLCB7IHN0YXRpYzogdHJ1ZSB9KSB2aWRlb1xuICBAVmlld0NoaWxkKCdzbGlkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzbGlkZXJcbiAgQFZpZXdDaGlsZCgndm9sdW1lQmFyJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lQmFyXG4gIEBWaWV3Q2hpbGQoJ3ZvbHVtZVBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lUGFuZWxcbiAgQFZpZXdDaGlsZCgndm9sdW1lQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lQnRuXG4gIEBWaWV3Q2hpbGQoJ3NldHRpbmdzUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXR0aW5nc1BhbmVsXG4gIEBWaWV3Q2hpbGQoJ3NldHRpbmdzQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0dGluZ3NCdG5cbiAgQFZpZXdDaGlsZCgnc3BlZWRCYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzcGVlZEJhclxuICBAVmlld0NoaWxkKCdzb3VyY2VQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHNvdXJjZVBhbmVsXG4gIEBWaWV3Q2hpbGQoJ3NvdXJjZUJ0bicsIHsgc3RhdGljOiB0cnVlIH0pIHNvdXJjZUJ0blxuICBAVmlld0NoaWxkKCdzdWJ0aXRsZXNQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHN1YnRpdGxlc1BhbmVsXG4gIEBWaWV3Q2hpbGQoJ3N1YnRpdGxlc0J0bicsIHsgc3RhdGljOiB0cnVlIH0pIHN1YnRpdGxlc0J0blxuICBAVmlld0NoaWxkKCdsb29wQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgbG9vcEJ0blxuICBAVmlld0NoaWxkKCdsb29wUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBsb29wUGFuZWxcbiAgQFZpZXdDaGlsZCgnZnVsbFNjcmVlbkJ0bicsIHsgc3RhdGljOiB0cnVlIH0pIGZ1bGxTY3JlZW5CdG5cbiAgQFZpZXdDaGlsZCgnZnVsbFNjcmVlblBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgZnVsbFNjcmVlblBhbmVsXG4gIEBWaWV3Q2hpbGQoJ2NvbnRleHRNZW51JywgeyBzdGF0aWM6IHRydWUgfSkgY29udGV4dE1lbnVcbiAgQFZpZXdDaGlsZCgnbGFuZ0NvbnRleHRNZW51T3B0aW9uJywgeyBzdGF0aWM6IHRydWUgfSkgbGFuZ0NvbnRleHRNZW51T3B0aW9uXG5cbiAgQENvbnRlbnRDaGlsZHJlbihVc2hpb1NvdXJjZSkgc291cmNlQ29udGVudENoaWxkcmVuITogUXVlcnlMaXN0PFVzaGlvU291cmNlPlxuICBAQ29udGVudENoaWxkcmVuKFVzaGlvU3VidGl0bGVzKSBzdWJ0aXRsZXNDb250ZW50Q2hpbGRyZW4hOiBRdWVyeUxpc3Q8VXNoaW9TdWJ0aXRsZXM+XG4gIHByaXZhdGUgc3VidGl0bGVzU2xvdFVwZGF0ZSQgPSBuZXcgU3ViamVjdDxIVE1MRWxlbWVudFtdPigpXG4gIHByaXZhdGUgc291cmNlc1Nsb3RVcGRhdGUkID0gbmV3IFN1YmplY3Q8SFRNTEVsZW1lbnRbXT4oKVxuICBwcml2YXRlIHN1YnRpdGxlc1Nsb3RDaGFuZ2UkID0gdGhpcy5zdWJ0aXRsZXNTbG90VXBkYXRlJC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gIHByaXZhdGUgc291cmNlc1Nsb3RDaGFuZ2UkID0gdGhpcy5zb3VyY2VzU2xvdFVwZGF0ZSQuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICBwcml2YXRlIG1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkID0gbmV3IFN1YmplY3Q8eyBzaG93Q29udHJvbDogYm9vbGVhbiwgZGVsYXlTd2l0Y2g6IGJvb2xlYW4gfT4oKVxuXG4gIGludGVyYWN0TW9kZTogJ2Rlc2t0b3AnIHwgJ21vYmlsZScgPSAnZGVza3RvcCdcbiAgcHJpdmF0ZSBmb2N1cyA9IGZhbHNlXG4gIHByaXZhdGUgbVNob3dDb250cm9sID0gZmFsc2VcbiAgcHJpdmF0ZSB0aHVtYk1vdXNlRG93biA9IGZhbHNlXG4gIHByaXZhdGUgY29udHJvbE1vdXNlRG93biA9IGZhbHNlXG4gIGNvbnRyb2xIb3ZlcmVkQ2xhc3MgPSAnJ1xuICBwcml2YXRlIHNob3dDb250ZXh0TWVudSA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1N0YXRpc3RpY0luZm9QYW5lbCA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1ZvbHVtZUhpbnQgPSBmYWxzZVxuICBwcml2YXRlIHNob3dQcm9ncmVzc0RldGFpbCA9IGZhbHNlXG4gIGdldCBpc0Z1bGxTY3JlZW4gKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbFxuICB9XG4gIGdldCBtb3VzZURvd24gKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRodW1iTW91c2VEb3duIHx8IHRoaXMuY29udHJvbE1vdXNlRG93blxuICB9XG4gIGdldCBzaG93Q29udHJvbCAoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMubVNob3dDb250cm9sIHx8IHRoaXMuY29udHJvbEhvdmVyZWRDbGFzcyB8fCB0aGlzLm1vdXNlRG93bilcbiAgfVxuICBAT3V0cHV0KCkgc2hvd0NvbnRyb2xDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgZ2V0IHRodW1iTW91c2VEb3duQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJNb3VzZURvd24gPyAnIHRodW1iLW1vdXNlLWRvd24nIDogJydcbiAgfVxuICBnZXQgcGF1c2VkQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubVBhdXNlZCA/ICcgdmlkZW8tc3RhdGUtcGF1c2UnIDogJyB2aWRlby1zdGF0ZS1wbGF5J1xuICB9XG4gIGdldCB3YWl0aW5nQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMud2FpdGluZyAmJiAhdGhpcy5tUGF1c2VkID8gJyB2aWRlby1zdGF0ZS13YWl0aW5nJyA6ICcnXG4gIH1cbiAgZ2V0IG11dGVkQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgfHwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9PT0gMClcbiAgICAgID8gJyB2aWRlby1zdGF0ZS1tdXRlZCcgOiAnIHZpZGVvLXN0YXRlLXZvbHVtZSdcbiAgfVxuICBnZXQgbG9vcENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcCA/ICcgdmlkZW8tc3RhdGUtbG9vcCcgOiAnIHZpZGVvLXN0YXRlLW5vbG9vcCdcbiAgfVxuICBnZXQgc3VidGl0bGVFbmFibGVkQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZFN1YnRpdGxlcy5sZW5ndGggPiAwID8gJyB2aWRlby1zdGF0ZS1zdWJ0aXRsZXMnIDogJyB2aWRlby1zdGF0ZS1ub3N1YnRpdGxlcydcbiAgfVxuICBnZXQgZnVsbHNjcmVlbkNsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzRnVsbFNjcmVlbiA/ICcgdmlkZW8tc3RhdGUtZnVsbHNjcmVlbicgOiAnIHZpZGVvLXN0YXRlLW5vZnVsbHNjcmVlbidcbiAgfVxuICBnZXQgY29udGV4dE1lbnVDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0TWVudVN0YXRlICsgKHRoaXMuc2hvd0NvbnRleHRNZW51ID8gJyBhY3RpdmUnIDogJycpXG4gIH1cbiAgZ2V0IHN0YXRpc3RpY0luZm9QYW5lbENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNob3dTdGF0aXN0aWNJbmZvUGFuZWwgPyAnIGFjdGl2ZScgOiAnJ1xuICB9XG4gIGdldCB2b2x1bWVIaW50Q2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1ZvbHVtZUhpbnQgPyAnIGFjdGl2ZScgOiAnJ1xuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNob3dQcm9ncmVzc0RldGFpbCA/ICcgYWN0aXZlJyA6ICcnXG4gIH1cblxuICBwcml2YXRlIG1QYXVzZWQgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBwYXVzZWQgKHBhdXNlZCkge1xuICAgIGlmIChwYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gIH1cbiAgQE91dHB1dCgpIHBhdXNlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBwcml2YXRlIG1DdXJyZW50VGltZSA9IDBcbiAgQElucHV0KCkgc2V0IGN1cnJlbnRUaW1lIChjdXJyZW50VGltZSkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lXG4gIH1cbiAgQE91dHB1dCgpIGN1cnJlbnRUaW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgcHJpdmF0ZSBkdXJhdGlvbiA9IDBcbiAgQE91dHB1dCgpIGR1cmF0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgcHJpdmF0ZSBidWZmZXJlZFRpbWUgPSAwXG4gIHByaXZhdGUgd2FpdGluZyA9IGZhbHNlXG4gIEBPdXRwdXQoKSB3YWl0aW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIEBJbnB1dCgpIHNldCBsb29wIChsb29wKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3AgPSBsb29wXG4gIH1cbiAgQE91dHB1dCgpIGxvb3BDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgc2V0IG11dGVkIChtdXRlZCkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCA9IG11dGVkXG4gIH1cbiAgQE91dHB1dCgpIG11dGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG5cbiAgZnBzID0gJzAuMDAnXG4gIHByaXZhdGUgZnBzU3RhcnQgPSAwXG4gIHByaXZhdGUgZnBzSW5kZXggPSAwXG5cbiAgZ2V0IGN1cnJlbnRUaW1lU3RyICgpOiBzdHJpbmcge1xuICAgIHJldHVybiBVc2hpb0NvbXBvbmVudC5mb3JtYXREdXJhdGlvbih0aGlzLm1DdXJyZW50VGltZSlcbiAgfVxuICBnZXQgZHVyYXRpb25TdHIgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFVzaGlvQ29tcG9uZW50LmZvcm1hdER1cmF0aW9uKHRoaXMuZHVyYXRpb24pXG4gIH1cbiAgZ2V0IGJ1ZmZlcmVkUHJvZ3Jlc3MgKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHNjYWxlWCgke3RoaXMuYnVmZmVyZWRUaW1lIC8gdGhpcy5kdXJhdGlvbn0pYFxuICAgIClcbiAgfVxuICBnZXQgcGxheWVkUHJvZ3Jlc3MgKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHNjYWxlWCgke3RoaXMubUN1cnJlbnRUaW1lIC8gdGhpcy5kdXJhdGlvbn0pYFxuICAgIClcbiAgfVxuICBnZXQgdGh1bWJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGxlZnQ6ICR7dGhpcy5tQ3VycmVudFRpbWUgLyB0aGlzLmR1cmF0aW9uICogMTAwfSVgXG4gICAgKVxuICB9XG4gIGdldCB2b2x1bWVSYXRlICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiBzY2FsZVkoJHt0aGlzLnZvbHVtZTEwMCAvIDEwMH0pYFxuICAgIClcbiAgfVxuICBnZXQgdm9sdW1lVGh1bWJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGJvdHRvbTogJHt0aGlzLnZvbHVtZTEwMH0lYFxuICAgIClcbiAgfVxuICBnZXQgc3BlZWRUaHVtYlBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgbGVmdDogJHtVc2hpb0NvbXBvbmVudC5tYXBTcGVlZFRvUHJvZ3Jlc3ModGhpcy5tUGxheWJhY2tSYXRlKX0lYFxuICAgIClcbiAgfVxuICBwcml2YXRlIHBhbmVsVHJhbnNsYXRpb25zID0ge1xuICAgIHNldHRpbmdzOiAwLFxuICAgIHNvdXJjZTogMCxcbiAgICBzdWJ0aXRsZXM6IDAsXG4gICAgbG9vcDogMCxcbiAgICBmdWxsc2NyZWVuOiAwXG4gIH1cbiAgZ2V0IHNldHRpbmdzUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuc2V0dGluZ3N9cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgZ2V0IHNvdXJjZVBhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLnNvdXJjZX1weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgc3VidGl0bGVzUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuc3VidGl0bGVzfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBsb29wUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMubG9vcH1weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgZnVsbFNjcmVlblBhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLmZ1bGxzY3JlZW59cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgcHJpdmF0ZSBtQ29udGV4dE1lbnVQb3NpdGlvbiA9ICcnXG4gIGdldCBjb250ZXh0TWVudVBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbilcbiAgfVxuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uID0gJydcbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbiA9ICcnXG4gIHByaXZhdGUgbVByb2dyZXNzRGV0YWlsVGltZVBvc2l0aW9uID0gJydcbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgPSAwXG4gIGdldCBwcm9ncmVzc0RldGFpbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvbilcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMubVByb2dyZXNzRGV0YWlsQ29udGFpbmVyUG9zaXRpb24pXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsVGltZVBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tUHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24pXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsSW1nU3R5bGUgKCk6IFNhZmVTdHlsZSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvSGVpZ2h0ICogMTYwIC8gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvV2lkdGhcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGhlaWdodDogJHtoZWlnaHR9cHg7XG4gICAgICAgbGluZS1oZWlnaHQ6ICR7aGVpZ2h0fXB4O1xuICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7dGhpcy50aHVtYm5haWxzfVwiKTtcbiAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtJHsoTWF0aC5jZWlsKHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb25SYXRlICogMTAwKSAtIDEpICogMTYwfXB4IDA7YFxuICAgIClcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxUaW1lICgpOiBzdHJpbmcge1xuICAgIHJldHVybiBVc2hpb0NvbXBvbmVudC5mb3JtYXREdXJhdGlvbih0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSAqIHRoaXMuZHVyYXRpb24pXG4gIH1cblxuICBsYW5ndWFnZXMgPSB0aGlzLnNlcnZpY2UuaTE4bi5sYW5ndWFnZXNcbiAgY29udGV4dE1lbnVTdGF0ZSA9ICdyb290J1xuICBnZXQgdmVyc2lvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS52ZXJzaW9uXG4gIH1cbiAgZ2V0IGRldGFpbGVkVmVyc2lvbiAoKSB7XG4gICAgcmV0dXJuIGB2JHt0aGlzLnNlcnZpY2UudmVyc2lvbn0gKCR7dGhpcy5zZXJ2aWNlLmJ1aWxkfSlgXG4gIH1cbiAgZ2V0IHZpZGVvUmVzb2x1dGlvbiAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52aWRlb1dpZHRofSB4ICR7dGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvSGVpZ2h0fWBcbiAgfVxuICBnZXQgdmlkZW9EdXJhdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5kdXJhdGlvbi50b0ZpeGVkKDYpXG4gIH1cbiAgZ2V0IHZpZGVvQ3VycmVudFRpbWUgKCkge1xuICAgIHJldHVybiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUudG9GaXhlZCg2KVxuICB9XG5cbiAgcHJpdmF0ZSB0aW1lVXBkYXRlOiBTdWJzY3JpcHRpb25cbiAgcHJpdmF0ZSBjb250cm9sSG92ZXJlZENoYW5nZTogU3Vic2NyaXB0aW9uXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXVxuXG4gIHQgPSB0aGlzLnNlcnZpY2UuaTE4bi50XG5cbiAgc3RhdGljIG1hcFNwZWVkVG9Qcm9ncmVzcyAoc3BlZWQpIHtcbiAgICBpZiAoc3BlZWQgPCAuNSkgcmV0dXJuIDBcbiAgICBlbHNlIGlmIChzcGVlZCA8IDEuNSkgcmV0dXJuIChzcGVlZCAtIC41KSAqIDgwXG4gICAgZWxzZSBpZiAoc3BlZWQgPCAyLjApIHJldHVybiA4MCArIChzcGVlZCAtIDEuNSkgKiA0MFxuICAgIGVsc2UgcmV0dXJuIDEwMFxuICB9XG4gIHN0YXRpYyBtYXBQcm9ncmVzc1RvU3BlZWQgKHByb2dyZXNzKSB7XG4gICAgaWYgKHByb2dyZXNzIDwgLjEpIHJldHVybiAuNVxuICAgIGVsc2UgaWYgKHByb2dyZXNzIDwgLjkpIHJldHVybiAuNzUgKyAuMjUgKiBNYXRoLmZsb29yKChwcm9ncmVzcyAtIDAuMSkgKiA1KVxuICAgIGVsc2UgcmV0dXJuIDJcbiAgfVxuXG4gIHN0YXRpYyBmb3JtYXREdXJhdGlvbiAoZHVyYXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IGggPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gMzYwMClcbiAgICBjb25zdCBtID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDM2MDAgLyA2MClcbiAgICBjb25zdCBzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDYwKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChoICYmIGggPCAxMCkgeyBzdHIgKz0gYDAke2h9OmAgfSBlbHNlIGlmIChoKSB7IHN0ciArPSBgJHtofTpgIH1cbiAgICBpZiAobSA8IDEwKSB7IHN0ciArPSBgMCR7bX06YCB9IGVsc2UgeyBzdHIgKz0gYCR7bX06YCB9XG4gICAgaWYgKHMgPCAxMCkgeyBzdHIgKz0gYDAke3N9YCB9IGVsc2UgeyBzdHIgKz0gYCR7c31gIH1cbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgc2FuaXRpemF0aW9uOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBVc2hpb1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zaG93TGFuZ01lbnUgPSB0aGlzLnNob3dMYW5nTWVudS5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkNvbXBvbmVudENsaWNrZWQgPSB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkRvY3VtZW50Q2xpY2tlZCA9IHRoaXMub25Eb2N1bWVudENsaWNrZWQuYmluZCh0aGlzKVxuICB9XG5cbiAgbmdPbkluaXQgKCkge1xuICAgIHRoaXMubVBhdXNlZCA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZWRcbiAgICB0aGlzLm1Wb2x1bWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lXG4gICAgdGhpcy5tUGxheWJhY2tSYXRlID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0ICgpIHtcbiAgICBjb25zdCBtYXBQcm9wc1RvT2JqZWN0ID0gKHByb3BzOiBzdHJpbmdbXSwgZm4pID0+IChzb3VyY2VPYmo6IGFueSkgPT4gKFxuICAgICAgcHJvcHMucmVkdWNlKChhZ2csIGN1cikgPT4gKHsgLi4uYWdnLCBbY3VyXTogZm4oc291cmNlT2JqLCBjdXIpIH0pLCB7fSlcbiAgICApXG4gICAgY29uc3Qgb25Db250ZW50Q2hpbGRyZW5PclNsb3RDaGFuZ2VkJCA9IChcbiAgICAgIGF0dHIsIGNvbnRlbnRDaGlsZHJlbjpcbiAgICAgIFF1ZXJ5TGlzdDxhbnk+LFxuICAgICAgc2xvdENoYW5nZSQ6IE9ic2VydmFibGU8SFRNTEVsZW1lbnRbXT5cbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnRDaGlsZHJlbk1hcCA9IG1hcFByb3BzVG9PYmplY3QoYXR0ciwgKG9iaiwgY3VyKSA9PiAob2JqW2N1cl0pKVxuICAgICAgY29uc3Qgc2xvdE1hcCA9IG1hcFByb3BzVG9PYmplY3QoYXR0ciwgKG9iaiwgY3VyKSA9PiAob2JqLmdldEF0dHJpYnV0ZShjdXIpKSlcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgb2YoY29udGVudENoaWxkcmVuLnRvQXJyYXkoKS5tYXAoY29udGVudENoaWxkcmVuTWFwKSksXG4gICAgICAgIGNvbnRlbnRDaGlsZHJlbi5jaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgbWFwKChjb250ZW50czogUXVlcnlMaXN0PGFueT4pID0+IChjb250ZW50cy50b0FycmF5KCkubWFwKGNvbnRlbnRDaGlsZHJlbk1hcCkpKVxuICAgICAgICApLFxuICAgICAgICBzbG90Q2hhbmdlJC5waXBlKFxuICAgICAgICAgIG1hcCgoY29udGVudHM6IEhUTUxFbGVtZW50W10pID0+IChcbiAgICAgICAgICAgIGNvbnRlbnRzLm1hcChzbG90TWFwKVxuICAgICAgICAgICkpXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgY29uc3Qgc3VidGl0bGVzQXR0ciA9IFsndmFsdWUnLCAndHlwZScsICdzcmMnLCAnbmFtZScsICdjbGFzcycsICdkZWZhdWx0JywgJ3NyY2xhbmcnXVxuICAgIGNvbnN0IHN1YnRpdGxlc0NoYW5nZSQgPSBvbkNvbnRlbnRDaGlsZHJlbk9yU2xvdENoYW5nZWQkKFxuICAgICAgc3VidGl0bGVzQXR0ciwgdGhpcy5zdWJ0aXRsZXNDb250ZW50Q2hpbGRyZW4sIHRoaXMuc3VidGl0bGVzU2xvdENoYW5nZSQpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3VidGl0bGVzQ2hhbmdlJC5zdWJzY3JpYmUoYXN5bmMgKHN1YnRpdGxlcykgPT4ge1xuICAgICAgdGhpcy5tU3VidGl0bGVzID0gc3VidGl0bGVzXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVN1YnRpdGxlcygpXG4gICAgfSkpXG4gICAgY29uc3Qgc291cmNlc0F0dHIgPSBbJ3NyYycsICd0eXBlJywgJ25hbWUnLCAnc2hvcnRuYW1lJywgJ2RlZmF1bHQnXVxuICAgIGNvbnN0IHNvdXJjZXNDaGFuZ2UkID0gb25Db250ZW50Q2hpbGRyZW5PclNsb3RDaGFuZ2VkJChcbiAgICAgIHNvdXJjZXNBdHRyLCB0aGlzLnNvdXJjZUNvbnRlbnRDaGlsZHJlbiwgdGhpcy5zb3VyY2VzU2xvdENoYW5nZSQpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc291cmNlc0NoYW5nZSQuc3Vic2NyaWJlKChzb3VyY2VzKSA9PiB7XG4gICAgICB0aGlzLm1Tb3VyY2VzID0gc291cmNlc1xuICAgICAgdGhpcy51cGRhdGVTb3VyY2VzKClcbiAgICB9KSlcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCAoKSB7XG4gICAgY29uc3QgbW91c2VNb3ZlJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpXG4gICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJylcbiAgICBjb25zdCB0b3VjaE1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2htb3ZlJylcbiAgICBjb25zdCB0b3VjaFN0YXJ0JCA9IGZyb21FdmVudChkb2N1bWVudCwgJ3RvdWNoc3RhcnQnKVxuICAgIGNvbnN0IHRvdWNoRW5kJCA9IG1lcmdlKFxuICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hlbmQnKSxcbiAgICAgIGZyb21FdmVudChkb2N1bWVudCwgJ3RvdWNoY2FuY2VsJylcbiAgICApXG4gICAgY29uc3QgbW91c2VUb3VjaFVwJCA9IG1lcmdlKG1vdXNlVXAkLCB0b3VjaEVuZCQpXG4gICAgdG91Y2hTdGFydCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW50ZXJhY3RNb2RlID0gJ21vYmlsZSdcbiAgICB9KVxuICAgIGNvbnN0IGlmTW91c2VJbkFyZWEgPSAoZTogTW91c2VFdmVudCwgYnRuRWxlbWVudCwgcG9wVXBFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCByZWN0MSA9IHBvcFVwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgY29uc3QgcmVjdDIgPSBidG5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICByZXR1cm4gKGUuY2xpZW50WCA+IHJlY3QxLmxlZnQgJiZcbiAgICAgICAgZS5jbGllbnRYIDwgcmVjdDEucmlnaHQgJiZcbiAgICAgICAgZS5jbGllbnRZID4gcmVjdDEudG9wICYmXG4gICAgICAgIGUuY2xpZW50WSA8IHJlY3QxLmJvdHRvbSkgfHwgKGUuY2xpZW50WCA+IHJlY3QyLmxlZnQgJiZcbiAgICAgICAgZS5jbGllbnRYIDwgcmVjdDIucmlnaHQgJiZcbiAgICAgICAgZS5jbGllbnRZID4gcmVjdDIudG9wICYmXG4gICAgICAgIGUuY2xpZW50WSA8IHJlY3QyLmJvdHRvbSlcbiAgICB9XG4gICAgY29uc3Qgb25Db250cm9sQnRuSG92ZXJTdGF0ZUNoYW5nZWQkID0gKGJ0bnMpID0+IHtcbiAgICAgIHJldHVybiBtb3VzZU1vdmUkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIGZvciAoY29uc3QgYnRuIG9mIGJ0bnMpIHtcbiAgICAgICAgICAgIGlmIChpZk1vdXNlSW5BcmVhKGUsIGJ0bi5idG5FbGVtZW50LCBidG4ucG9wVXBFbGVtZW50KSkge1xuICAgICAgICAgICAgICByZXR1cm4gb2YoYCBidG4tJHtidG4uYnRuTmFtZX0taG92ZXJgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGltZXIoMTUwKS5waXBlKFxuICAgICAgICAgICAgbWFwVG8oJycpXG4gICAgICAgICAgKVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCBkZXNrdG9wU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBtb3VzZU1vdmUkLnBpcGUoXG4gICAgICBmaWx0ZXIoKCkgPT4gKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpKSxcbiAgICAgIG1hcCgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2hvd0NvbnRyb2w6IGUuY2xpZW50WCA+IHJlY3QubGVmdCAmJlxuICAgICAgICAgICAgZS5jbGllbnRYIDwgcmVjdC5yaWdodCAmJlxuICAgICAgICAgICAgZS5jbGllbnRZID4gcmVjdC50b3AgJiZcbiAgICAgICAgICAgIGUuY2xpZW50WSA8IHJlY3QuYm90dG9tLFxuICAgICAgICAgIGRlbGF5U3dpdGNoOiBlLmNsaWVudFkgPCByZWN0LmJvdHRvbSAtIDQ2XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIGNvbnN0IHNob3dDb250cm9sU3RhdGVDaGFuZ2UkID0gbWVyZ2UoXG4gICAgICBkZXNrdG9wU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQsXG4gICAgICB0aGlzLm1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGUgPT4ge1xuICAgICAgICByZXR1cm4gZS5zaG93Q29udHJvbFxuICAgICAgICAgID8gbWVyZ2UoXG4gICAgICAgICAgICBvZih0cnVlKSxcbiAgICAgICAgICAgIGUuZGVsYXlTd2l0Y2ggPyB0aW1lcihcbiAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdE1vZGUgPT09ICdkZXNrdG9wJyA/IDc1MCA6IDUwMDBcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgbWFwVG8oZmFsc2UpXG4gICAgICAgICAgICApIDogTkVWRVJcbiAgICAgICAgICApXG4gICAgICAgICAgOiBvZihmYWxzZSlcbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzaG93Q29udHJvbFN0YXRlQ2hhbmdlJC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgdGhpcy5tU2hvd0NvbnRyb2wgPSBzdGF0ZVxuICAgIH0pKVxuICAgIGNvbnN0IG1vdXNlSG92ZXJQcm9ncmVzc1N0YXRlJCA9IG1vdXNlTW92ZSQucGlwZShcbiAgICAgIGZpbHRlcigoKSA9PiAodGhpcy5pbnRlcmFjdE1vZGUgPT09ICdkZXNrdG9wJykpLFxuICAgICAgbWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHlDZW50ZXIgPSAocmVjdC50b3AgKyByZWN0LmJvdHRvbSkgLyAyXG4gICAgICAgIGlmIChNYXRoLmFicyhlLmNsaWVudFkgLSB5Q2VudGVyKSA8IDggJiYgZS5jbGllbnRYID4gcmVjdC5sZWZ0ICYmIGUuY2xpZW50WCA8IHJlY3QucmlnaHQpIHtcbiAgICAgICAgICBjb25zdCBsZWZ0ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0XG4gICAgICAgICAgY29uc3QgY29udGFpbmVyTGVmdCA9IGxlZnQgPCA4MCA/IDkwIC0gbGVmdCA6IGxlZnQgPiByZWN0LndpZHRoIC0gODAgPyByZWN0LndpZHRoIC0gbGVmdCAtIDcwIDogMTBcbiAgICAgICAgICBjb25zdCB0aW1lTGVmdCA9IGxlZnQgPCAyMCA/IDMwIC0gbGVmdCA6IGxlZnQgPiByZWN0LndpZHRoIC0gMjAgPyByZWN0LndpZHRoIC0gbGVmdCAtIDEwIDogMTBcbiAgICAgICAgICByZXR1cm4geyBsZWZ0LCBjb250YWluZXJMZWZ0LCB0aW1lTGVmdCwgd2lkdGg6IHJlY3Qud2lkdGggfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtb3VzZUhvdmVyUHJvZ3Jlc3NTdGF0ZSQuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NEZXRhaWwgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NEZXRhaWwgPSB0cnVlXG4gICAgICAgIHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb24gPSBgbGVmdDogJHtzdGF0ZS5sZWZ0fXB4YFxuICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uID0gYGxlZnQ6ICR7c3RhdGUuY29udGFpbmVyTGVmdH1weGBcbiAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24gPSBgbGVmdDogJHtzdGF0ZS50aW1lTGVmdH1weGBcbiAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgPSBzdGF0ZS5sZWZ0IC8gc3RhdGUud2lkdGhcbiAgICAgIH1cbiAgICB9KSlcbiAgICBpZiAodGhpcy5tUGF1c2VkKSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2UoKVxuICAgIGVsc2UgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICdwYXVzZScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tUGF1c2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLnBhdXNlZENoYW5nZS5lbWl0KHRydWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncGxheScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tUGF1c2VkID0gZmFsc2VcbiAgICAgICAgdGhpcy5wYXVzZWRDaGFuZ2UuZW1pdChmYWxzZSlcbiAgICAgIH0pKVxuICAgIGNvbnN0IHN1YnNjcmliZVRpbWVVcGRhdGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRpbWVVcGRhdGUgPSBmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAndGltZXVwZGF0ZScpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubUN1cnJlbnRUaW1lID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lXG4gICAgICAgICAgdGhpcy5jdXJyZW50VGltZUNoYW5nZS5lbWl0KHRoaXMubUN1cnJlbnRUaW1lKVxuICAgICAgICAgIHRoaXMudXBkYXRlRmx5aW5nU3VidGl0bGVzKHRoaXMubUN1cnJlbnRUaW1lKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBzdWJzY3JpYmVUaW1lVXBkYXRlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAnd2FpdGluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gdHJ1ZVxuICAgICAgICB0aGlzLndhaXRpbmdDaGFuZ2UuZW1pdCh0aGlzLndhaXRpbmcpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncGxheWluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gZmFsc2VcbiAgICAgICAgdGhpcy53YWl0aW5nQ2hhbmdlLmVtaXQodGhpcy53YWl0aW5nKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3Byb2dyZXNzJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlcmVkVGltZSA9ICgodGltZVJhbmdlcywgY3VycmVudFRpbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aW1lUmFuZ2VzLmxlbmd0aFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aW1lUmFuZ2VzLmVuZChpKSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVSYW5nZXMuc3RhcnQoaSkgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRpbWVSYW5nZXMuZW5kKGkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRpbWVcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lXG4gICAgICAgIH0pKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5idWZmZXJlZCwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ2xvYWRlZG1ldGFkYXRhJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmR1cmF0aW9uXG4gICAgICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmR1cmF0aW9uKVxuICAgICAgfSkpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd2b2x1bWVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWVcbiAgICAgICAgdGhpcy52b2x1bWVDaGFuZ2UuZW1pdCh0aGlzLm1Wb2x1bWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gdGhpcy5tUGxheWJhY2tSYXRlXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3JhdGVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVBsYXliYWNrUmF0ZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGVcbiAgICAgICAgdGhpcy5wbGF5YmFja1JhdGVDaGFuZ2UuZW1pdCh0aGlzLm1QbGF5YmFja1JhdGUpXG4gICAgICB9KSlcbiAgICBjb25zdCBtYXBUb1JhdGUgPSAoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSA9PiBtYXAoXG4gICAgICAobW92ZUV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBldmVudENvb3JkaW5hdGUgPSBtb3ZlRXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50XG4gICAgICAgICAgPyBtb3ZlRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgICAgICA6IG1vdmVFdmVudFxuICAgICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgcCA9IHByb2dyZXNzKGV2ZW50Q29vcmRpbmF0ZSwgcmVjdClcbiAgICAgICAgY29uc3QgdCA9IHRvdGFsKHJlY3QpXG4gICAgICAgIGlmIChwIDwgMCkgcCA9IDBcbiAgICAgICAgZWxzZSBpZiAocCA+IHQpIHAgPSB0XG4gICAgICAgIHJldHVybiBwIC8gdFxuICAgICAgfVxuICAgIClcbiAgICBjb25zdCBvbk1vdXNlVG91Y2hEb3duJCA9IChlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpID0+IHtcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKSxcbiAgICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaHN0YXJ0JylcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgIClcbiAgICB9XG4gICAgY29uc3Qgb25Nb3VzZVRvdWNoRHJhZyQgPSAoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSA9PiB7XG4gICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSxcbiAgICAgICAgICBjb25jYXRNYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG1vdXNlTW92ZSQucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKG1vdXNlVXAkKSxcbiAgICAgICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnKS5waXBlKFxuICAgICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpLFxuICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdG91Y2hNb3ZlJC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwodG91Y2hFbmQkKSxcbiAgICAgICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IHRodW1iTW91c2VUb3VjaERvd24kID0gb25Nb3VzZVRvdWNoRG93biQoXG4gICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgY29uc3QgdGh1bWJUb3VjaERyYWckID0gb25Nb3VzZVRvdWNoRHJhZyQoXG4gICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGh1bWJNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy50aHVtYk1vdXNlRG93biA9IHRydWVcbiAgICAgIHRoaXMudGltZVVwZGF0ZS51bnN1YnNjcmliZSgpXG4gICAgICB0aGlzLm1DdXJyZW50VGltZSA9IGUgKiB0aGlzLmR1cmF0aW9uXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGh1bWJUb3VjaERyYWckLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMubUN1cnJlbnRUaW1lID0gZSAqIHRoaXMuZHVyYXRpb25cbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtb3VzZVRvdWNoVXAkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy50aHVtYk1vdXNlRG93bikge1xuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgICAgICBzdWJzY3JpYmVUaW1lVXBkYXRlKClcbiAgICAgICAgdGhpcy50aHVtYk1vdXNlRG93biA9IGZhbHNlXG4gICAgICB9XG4gICAgfSkpXG4gICAgY29uc3QgY29udHJvbEhvdmVyU3RhdGVDaGFuZ2UkID0gb25Db250cm9sQnRuSG92ZXJTdGF0ZUNoYW5nZWQkKFt7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnZvbHVtZUJ0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnZvbHVtZVBhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAndm9sdW1lJ1xuICAgIH0sIHtcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMuc2V0dGluZ3NCdG4ubmF0aXZlRWxlbWVudCxcbiAgICAgIHBvcFVwRWxlbWVudDogdGhpcy5zZXR0aW5nc1BhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc2V0dGluZ3MnXG4gICAgfSwge1xuICAgICAgYnRuRWxlbWVudDogdGhpcy5zb3VyY2VCdG4ubmF0aXZlRWxlbWVudCxcbiAgICAgIHBvcFVwRWxlbWVudDogdGhpcy5zb3VyY2VQYW5lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgYnRuTmFtZTogJ3NvdXJjZSdcbiAgICB9LCB7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnN1YnRpdGxlc0J0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnN1YnRpdGxlc1BhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc3VidGl0bGVzJ1xuICAgIH1dKVxuICAgIGNvbnN0IHN1YnNjcmliZUNvbnRyb2xIb3ZlcmVkQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZSA9IGNvbnRyb2xIb3ZlclN0YXRlQ2hhbmdlJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgIHRoaXMuY29udHJvbEhvdmVyZWRDbGFzcyA9IGVcbiAgICAgICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICAgICAgfSlcbiAgICB9XG4gICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgIGNvbnN0IGhvdmVyU3RhdGVDaGFuZ2UkID0gbWVyZ2Uoc2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQsIGNvbnRyb2xIb3ZlclN0YXRlQ2hhbmdlJCkucGlwZShcbiAgICAgIG1hcCgoKSA9PiB0aGlzLnNob3dDb250cm9sKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goaG92ZXJTdGF0ZUNoYW5nZSQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5zaG93Q29udHJvbENoYW5nZS5lbWl0KGUpXG4gICAgfSkpXG4gICAgY29uc3Qgdm9sdW1lTW91c2VUb3VjaERvd24kID0gb25Nb3VzZVRvdWNoRG93biQoXG4gICAgICB0aGlzLnZvbHVtZUJhci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKHJlY3QuYm90dG9tIC0gbW92ZUV2ZW50LmNsaWVudFkpLFxuICAgICAgKHJlY3QpID0+IChyZWN0LmhlaWdodClcbiAgICApXG4gICAgY29uc3Qgdm9sdW1lVG91Y2hEcmFnJCA9IG9uTW91c2VUb3VjaERyYWckKFxuICAgICAgdGhpcy52b2x1bWVCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChyZWN0LmJvdHRvbSAtIG1vdmVFdmVudC5jbGllbnRZKSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC5oZWlnaHQpXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHZvbHVtZU1vdXNlVG91Y2hEb3duJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICB0aGlzLmNvbnRyb2xNb3VzZURvd24gPSB0cnVlXG4gICAgICAgIHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UudW5zdWJzY3JpYmUoKVxuICAgICAgfVxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gZmFsc2VcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSBlXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godm9sdW1lVG91Y2hEcmFnJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gZVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1vdXNlVG91Y2hVcCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xNb3VzZURvd24pIHtcbiAgICAgICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgICAgICB0aGlzLmNvbnRyb2xNb3VzZURvd24gPSBmYWxzZVxuICAgICAgfVxuICAgIH0pKVxuICAgIGNvbnN0IHNwZWVkTW91c2VUb3VjaERvd24kID0gb25Nb3VzZVRvdWNoRG93biQoXG4gICAgICB0aGlzLnNwZWVkQmFyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAobW92ZUV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQpLFxuICAgICAgKHJlY3QpID0+IChyZWN0LndpZHRoKVxuICAgIClcbiAgICBjb25zdCBzcGVlZFRvdWNoRHJhZyQgPSBvbk1vdXNlVG91Y2hEcmFnJChcbiAgICAgIHRoaXMuc3BlZWRCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNwZWVkTW91c2VUb3VjaERvd24kLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGlmICghdGhpcy5jb250cm9sTW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IHRydWVcbiAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZS51bnN1YnNjcmliZSgpXG4gICAgICB9XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gVXNoaW9Db21wb25lbnQubWFwUHJvZ3Jlc3NUb1NwZWVkKGUpXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3BlZWRUb3VjaERyYWckLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGUgPSBVc2hpb0NvbXBvbmVudC5tYXBQcm9ncmVzc1RvU3BlZWQoZSlcbiAgICB9KSlcbiAgICBjb25zdCBvbktleURvd24kID0gY29kZSA9PiBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykucGlwZShcbiAgICAgIGZpbHRlcigoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5mb2N1cyAmJiBlLmNvZGUgPT09IGNvZGUpLFxuICAgICAgdGFwKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgfSlcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnU3BhY2UnKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLnRvZ2dsZVBsYXkoKVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93UmlnaHQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZSArIDUgPCB0aGlzLmR1cmF0aW9uID8gdGhpcy5tQ3VycmVudFRpbWUgKyA1IDogdGhpcy5kdXJhdGlvblxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWVcbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChvbktleURvd24kKCdBcnJvd0xlZnQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZSAtIDUgPiAwID8gdGhpcy5tQ3VycmVudFRpbWUgLSA1IDogMFxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWVcbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChvbktleURvd24kKCdBcnJvd1VwJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMubVZvbHVtZSArIDAuMSA8IDAuOTk5OTk2ID8gdGhpcy5tVm9sdW1lICsgMC4xIDogMVxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93RG93bicpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1Wb2x1bWUgPSB0aGlzLm1Wb2x1bWUgLSAwLjEgPiAwLjAwMDAwNCA/IHRoaXMubVZvbHVtZSAtIDAuMSA6IDBcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSB0aGlzLm1Wb2x1bWVcbiAgICB9KSlcbiAgICBjb25zdCBzaG93Vm9sdW1lSGludCQgPSBtZXJnZShvbktleURvd24kKCdBcnJvd1VwJyksIG9uS2V5RG93biQoJ0Fycm93RG93bicpKVxuICAgIGNvbnN0IGRpc21pc3NWb2x1bWVIaW50JCA9IHNob3dWb2x1bWVIaW50JC5waXBlKHN3aXRjaE1hcCgoKSA9PiB0aW1lcigxMDAwKSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc2hvd1ZvbHVtZUhpbnQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNob3dWb2x1bWVIaW50ID0gdHJ1ZVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGRpc21pc3NWb2x1bWVIaW50JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93Vm9sdW1lSGludCA9IGZhbHNlXG4gICAgfSkpXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2NvbnRleHRtZW51JylcbiAgICAgIC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IG91dGVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRleHRNZW51Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgaWYgKGUuY2xpZW50WCArIHBhbmVsLndpZHRoICsgMjAgPiBvdXRlci5yaWdodCkge1xuICAgICAgICAgIGlmIChlLmNsaWVudFkgKyBwYW5lbC5oZWlnaHQgKyAyMCA+IG91dGVyLmJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbiA9IGByaWdodDogJHtvdXRlci5yaWdodCAtIGUuY2xpZW50WH1weDsgYm90dG9tOiAke291dGVyLmJvdHRvbSAtIGUuY2xpZW50WX1weGBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbiA9IGByaWdodDogJHtvdXRlci5yaWdodCAtIGUuY2xpZW50WH1weDsgdG9wOiAke2UuY2xpZW50WSAtIG91dGVyLnRvcH1weGBcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGUuY2xpZW50WSArIHBhbmVsLmhlaWdodCArIDIwID4gb3V0ZXIuYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYGxlZnQ6ICR7ZS5jbGllbnRYIC0gb3V0ZXIubGVmdH1weDsgYm90dG9tOiAke291dGVyLmJvdHRvbSAtIGUuY2xpZW50WX1weGBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbiA9IGBsZWZ0OiAke2UuY2xpZW50WCAtIG91dGVyLmxlZnR9cHg7IHRvcDogJHtlLmNsaWVudFkgLSBvdXRlci50b3B9cHhgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVTdGF0ZSA9ICdyb290J1xuICAgICAgICB0aGlzLnNob3dDb250ZXh0TWVudSA9IHRydWVcbiAgICAgIH0pKVxuICAgIHRoaXMubGFuZ0NvbnRleHRNZW51T3B0aW9uLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dMYW5nTWVudSwgdHJ1ZSlcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Db21wb25lbnRDbGlja2VkLCB0cnVlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICBjb25zdCBhbmltYXRpb25GcmFtZSQgPSBvZihudWxsLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikucGlwZShyZXBlYXQoKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChhbmltYXRpb25GcmFtZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5mcHNTdGFydCkgdGhpcy5mcHNTdGFydCA9ICtuZXcgRGF0ZSgpXG4gICAgICB0aGlzLmZwc0luZGV4KytcbiAgICAgIGNvbnN0IGZwc0N1cnJlbnQgPSArbmV3IERhdGUoKVxuICAgICAgaWYgKGZwc0N1cnJlbnQgLSB0aGlzLmZwc1N0YXJ0ID4gMTAwMCkge1xuICAgICAgICB0aGlzLmZwcyA9ICgodGhpcy5mcHNJbmRleCAvIChmcHNDdXJyZW50IC0gdGhpcy5mcHNTdGFydCkpICogMTAwMCkudG9GaXhlZCgyKVxuICAgICAgICB0aGlzLmZwc1N0YXJ0ID0gK25ldyBEYXRlKClcbiAgICAgICAgdGhpcy5mcHNJbmRleCA9IDBcbiAgICAgIH1cbiAgICB9KSlcbiAgfVxuXG4gIG5nT25EZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy50aW1lVXBkYXRlKSB0aGlzLnRpbWVVcGRhdGUudW5zdWJzY3JpYmUoKVxuICAgIGlmICh0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlKSB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpXG4gICAgdGhpcy5sYW5nQ29udGV4dE1lbnVPcHRpb24ubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd0xhbmdNZW51LCB0cnVlKVxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbXBvbmVudENsaWNrZWQsIHRydWUpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGlja2VkLCB0cnVlKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTb3VyY2VzICgpIHtcbiAgICBpZiAodGhpcy5tU291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuc291cmNlcyA9IFt7XG4gICAgICAgIHNob3J0TmFtZTogJ0RlZmF1bHQnLFxuICAgICAgICBuYW1lOiAnRGVmYXVsdCcsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIHNvdXJjZXM6IFt7IHNyYzogdGhpcy5tU3JjLCB0eXBlOiB1bmRlZmluZWQgfV1cbiAgICAgIH1dXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNtID0ge31cbiAgICAgIHRoaXMubVNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuICAgICAgICBpZiAoIXNvdXJjZS5zaG9ydG5hbWUpIHtcbiAgICAgICAgICBzb3VyY2Uuc2hvcnRuYW1lID0gJ1VudGl0bGVkJ1xuICAgICAgICB9XG4gICAgICAgIGlmICghc21bc291cmNlLnNob3J0bmFtZV0pIHtcbiAgICAgICAgICBzbVtzb3VyY2Uuc2hvcnRuYW1lXSA9IHtcbiAgICAgICAgICAgIHNob3J0TmFtZTogc291cmNlLnNob3J0bmFtZSxcbiAgICAgICAgICAgIG5hbWU6IHNvdXJjZS5uYW1lIHx8ICdVbnRpdGxlZCcsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzbVtzb3VyY2Uuc2hvcnRuYW1lXS5zb3VyY2VzLnB1c2goc291cmNlKVxuICAgICAgICBpZiAoc291cmNlLmRlZmF1bHQgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UuZGVmYXVsdCAhPT0gbnVsbCkge1xuICAgICAgICAgIHNtW3NvdXJjZS5zaG9ydG5hbWVdLmRlZmF1bHQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNvdXJjZXMgPSBPYmplY3QudmFsdWVzKHNtKVxuICAgIH1cbiAgICBjb25zdCBpbmRleE9mRGVmYXVsdCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgocyA9PiBzLmRlZmF1bHQpXG4gICAgdGhpcy5wbGF5aW5nU291cmNlID0gaW5kZXhPZkRlZmF1bHQgPj0gMCA/IGluZGV4T2ZEZWZhdWx0IDogMFxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1cGRhdGVTdWJ0aXRsZXMgKCkge1xuICAgIGNvbnN0IHBhcnNlZFN1YnRpdGxlcyA9IFtdXG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5tU3VidGl0bGVzKSB7XG4gICAgICBsZXQgdGV4dCA9ICcnXG4gICAgICBpZiAoc3ViLnZhbHVlKSB0ZXh0ID0gc3ViLnZhbHVlXG4gICAgICBlbHNlIGlmIChzdWIuc3JjKSB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChzdWIuc3JjKVxuICAgICAgICB0ZXh0ID0gYXdhaXQgcmVzcC50ZXh0KClcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhcnNlZCA9IHtcbiAgICAgICAgbmFtZTogc3ViLm5hbWUgfHwgJ1VudGl0bGVkJyxcbiAgICAgICAgY2xhc3M6IHN1Yi5jbGFzcyB8fCAnJyxcbiAgICAgICAgcGFyc2VkU3VidGl0bGVzOiB1bmRlZmluZWQsXG4gICAgICAgIGVuYWJsZWQ6IHN1Yi5kZWZhdWx0ICE9PSB1bmRlZmluZWQgJiYgc3ViLmRlZmF1bHQgIT09IG51bGxcbiAgICAgICAgICB8fCBzdWIuc3JjbGFuZyA9PT0gdGhpcy5zZXJ2aWNlLmkxOG4ubGFuZ3VhZ2VcbiAgICAgIH1cbiAgICAgIHN1Yi50eXBlID0gc3ViLnR5cGUgfHwgJydcbiAgICAgIHN1Yi50eXBlID0gc3ViLnR5cGUudG9Mb3dlckNhc2UoKVxuICAgICAgaWYgKHN1Yi50eXBlICE9PSAndGV4dC92dHQnICYmIHN1Yi50eXBlICE9PSAnYXBwbGljYXRpb24veC1zdWJyaXAnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignVW5rbm93biBNSU1FIHR5cGUgb2Ygc3VidGl0bGVzLCB0cnlpbmcgdG8gaW5mZXIgc3VidGl0bGUgZm9ybWF0LiBTdXBwb3J0ZWQgdHlwZTogdGV4dC92dHQsIGFwcGxpY2F0aW9uL3gtc3VicmlwLicpXG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBwYXJzZWQucGFyc2VkU3VidGl0bGVzID0gdGhpcy5zZXJ2aWNlLnBhcnNlU3VidGl0bGVzKHRleHQpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIH1cbiAgICAgIHBhcnNlZFN1YnRpdGxlcy5wdXNoKHBhcnNlZClcbiAgICB9XG4gICAgdGhpcy5zdWJ0aXRsZXMgPSBwYXJzZWRTdWJ0aXRsZXNcbiAgICB0aGlzLnVwZGF0ZUZseWluZ1N1YnRpdGxlcygpXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZseWluZ1N1YnRpdGxlcyAoY3VycmVudFRpbWU/KSB7XG4gICAgaWYgKGN1cnJlbnRUaW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnRUaW1lID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lXG4gICAgfVxuICAgIGN1cnJlbnRUaW1lICo9IDEwMDBcbiAgICBjb25zdCBmbHlpbmdTdWJ0aXRsZXMgPSBbXVxuICAgIHRoaXMuZW5hYmxlZFN1YnRpdGxlcy5mb3JFYWNoKHN1YnRpdGxlcyA9PiB7XG4gICAgICBpZiAoIXN1YnRpdGxlcy5wYXJzZWRTdWJ0aXRsZXMpIHJldHVyblxuICAgICAgY29uc3QgZmx5aW5nU3VidGl0bGVzVHJhY2sgPSBbXVxuICAgICAgc3VidGl0bGVzLnBhcnNlZFN1YnRpdGxlcy5mb3JFYWNoKHN1YnRpdGxlID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID4gc3VidGl0bGUuc3RhcnRUaW1lICYmIGN1cnJlbnRUaW1lIDwgc3VidGl0bGUuZW5kVGltZSkge1xuICAgICAgICAgIGZseWluZ1N1YnRpdGxlc1RyYWNrLnB1c2goe1xuICAgICAgICAgICAgLi4uc3VidGl0bGUsXG4gICAgICAgICAgICB0ZXh0czogc3VidGl0bGUudGV4dHMubWFwKHRleHQgPT4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGV4dCkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChmbHlpbmdTdWJ0aXRsZXNUcmFjay5sZW5ndGgpIHtcbiAgICAgICAgZmx5aW5nU3VidGl0bGVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHN1YnRpdGxlcy5uYW1lLFxuICAgICAgICAgIGNsYXNzOiBzdWJ0aXRsZXMuY2xhc3MsXG4gICAgICAgICAgcGFyc2VkU3VidGl0bGVzOiBmbHlpbmdTdWJ0aXRsZXNUcmFja1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5mbHlpbmdTdWJ0aXRsZXMgPSBmbHlpbmdTdWJ0aXRsZXNcbiAgfVxuXG4gIHByaXZhdGUgc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIFt7XG4gICAgICAgIGJ0bjogdGhpcy5zZXR0aW5nc0J0bixcbiAgICAgICAgcGFuZWw6IHRoaXMuc2V0dGluZ3NQYW5lbCxcbiAgICAgICAgbmFtZTogJ3NldHRpbmdzJ1xuICAgICAgfSwge1xuICAgICAgICBidG46IHRoaXMuc291cmNlQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5zb3VyY2VQYW5lbCxcbiAgICAgICAgbmFtZTogJ3NvdXJjZSdcbiAgICAgIH0sIHtcbiAgICAgICAgYnRuOiB0aGlzLnN1YnRpdGxlc0J0bixcbiAgICAgICAgcGFuZWw6IHRoaXMuc3VidGl0bGVzUGFuZWwsXG4gICAgICAgIG5hbWU6ICdzdWJ0aXRsZXMnXG4gICAgICB9LCB7XG4gICAgICAgIGJ0bjogdGhpcy5sb29wQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5sb29wUGFuZWwsXG4gICAgICAgIG5hbWU6ICdsb29wJ1xuICAgICAgfSwge1xuICAgICAgICBidG46IHRoaXMuZnVsbFNjcmVlbkJ0bixcbiAgICAgICAgcGFuZWw6IHRoaXMuZnVsbFNjcmVlblBhbmVsLFxuICAgICAgICBuYW1lOiAnZnVsbHNjcmVlbidcbiAgICAgIH1dLmZvckVhY2goaXRlbSA9PiB0aGlzLnNldFBhbmVsUG9zaXRpb24oaXRlbS5idG4sIGl0ZW0ucGFuZWwsIGl0ZW0ubmFtZSkpXG4gICAgfSwgMClcbiAgfVxuXG4gIHByaXZhdGUgc2V0UGFuZWxQb3NpdGlvbiAoYnRuLCBwYW5lbCwgbmFtZSkge1xuICAgIGlmICghdGhpcy5lbGVtZW50IHx8ICFwYW5lbCB8fCAhYnRuKSByZXR1cm5cbiAgICBjb25zdCBvdXRlclJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBjb25zdCBidG5SZWN0ID0gYnRuLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAocGFuZWxSZWN0LndpZHRoIC8gMiAtIG91dGVyUmVjdC5yaWdodCArIGJ0blJlY3QucmlnaHQgPiAwKSB7XG4gICAgICB0aGlzLnBhbmVsVHJhbnNsYXRpb25zW25hbWVdID0gcGFuZWxSZWN0LndpZHRoIC8gMiAtIG91dGVyUmVjdC5yaWdodCArIGJ0blJlY3QucmlnaHRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbFRyYW5zbGF0aW9uc1tuYW1lXSA9IDBcbiAgICB9XG4gIH1cblxuICBvblNsb3RDaGFuZ2UgKGUpIHtcbiAgICB0aGlzLnN1YnRpdGxlc1Nsb3RVcGRhdGUkLm5leHQoXG4gICAgICBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKCkuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ1VTSElPLVNVQlRJVExFUycpXG4gICAgKVxuICAgIHRoaXMuc291cmNlc1Nsb3RVcGRhdGUkLm5leHQoXG4gICAgICBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKCkuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ1VTSElPLVNPVVJDRScpXG4gICAgKVxuICAgIHRoaXMubUluamVjdGVkU3R5bGVzID0gZS50YXJnZXQuYXNzaWduZWROb2RlcygpXG4gICAgICAuZmlsdGVyKG5vZGUgPT4gbm9kZS5ub2RlTmFtZSA9PT0gJ1NUWUxFJykubWFwKG5vZGUgPT4gbm9kZS5pbm5lckhUTUwpXG4gIH1cblxuICBvblZpZGVvTWFza0NsaWNrZWQgKCkge1xuICAgIGlmICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkLm5leHQoe1xuICAgICAgICBzaG93Q29udHJvbDogIXRoaXMubVNob3dDb250cm9sLFxuICAgICAgICBkZWxheVN3aXRjaDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvblNlbGVjdFNvdXJjZSAoaSkge1xuICAgIGlmIChpID09PSB0aGlzLnBsYXlpbmdTb3VyY2UpIHJldHVyblxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWVcbiAgICBjb25zdCBwYXVzZWQgPSB0aGlzLm1QYXVzZWRcbiAgICB0aGlzLnBsYXlpbmdTb3VyY2UgPSBpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmxvYWQoKVxuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lXG4gICAgaWYgKCFwYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5KClcbiAgfVxuXG4gIG9uQ2hlY2tTdWJ0aXRsZXMgKGkpIHtcbiAgICB0aGlzLnN1YnRpdGxlc1tpXS5lbmFibGVkID0gIXRoaXMuc3VidGl0bGVzW2ldLmVuYWJsZWRcbiAgICB0aGlzLnVwZGF0ZUZseWluZ1N1YnRpdGxlcygpXG4gIH1cblxuICB0b2dnbGVQbGF5ICgpIHtcbiAgICBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICAgIGVsc2UgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlKClcbiAgfVxuXG4gIHRvZ2dsZU11dGUgKCkge1xuICAgIGlmICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSAhKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCB8fCB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID09PSAwKVxuICAgICAgdGhpcy5tdXRlZENoYW5nZS5lbWl0KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZClcbiAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCkge1xuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gZmFsc2VcbiAgICAgIHRoaXMubXV0ZWRDaGFuZ2UuZW1pdChmYWxzZSlcbiAgICB9XG4gICAgaWYgKCF0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgJiYgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9PT0gMCkge1xuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IE1hdGgucmFuZG9tKClcbiAgICB9XG4gIH1cblxuICB0b2dnbGVMb29wICgpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcCA9ICF0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcFxuICAgIHRoaXMubG9vcENoYW5nZS5lbWl0KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wKVxuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzRnVsbFNjcmVlbikge1xuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpXG4gICAgfVxuICB9XG5cbiAgc2hvd0xhbmdNZW51ICgpIHtcbiAgICB0aGlzLmNvbnRleHRNZW51U3RhdGUgPSAnbGFuZydcbiAgICB0aGlzLnNob3dDb250ZXh0TWVudSA9IHRydWVcbiAgfVxuXG4gIG9uQ29tcG9uZW50Q2xpY2tlZCAoKSB7XG4gICAgdGhpcy5mb2N1cyA9IHRydWVcbiAgICB0aGlzLnNob3dDb250ZXh0TWVudSA9IGZhbHNlXG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2tlZCAoKSB7XG4gICAgdGhpcy5mb2N1cyA9IGZhbHNlXG4gICAgdGhpcy5zaG93Q29udGV4dE1lbnUgPSBmYWxzZVxuICB9XG5cbiAgc2V0TGFuZ3VhZ2UgKGNvZGUpIHtcbiAgICB0aGlzLnNlcnZpY2UuaTE4bi5zZXRMYW5ndWFnZShjb2RlKVxuICB9XG5cbiAgdG9nZ2xlU2hvd1N0YXRpc3RpY0luZm9QYW5lbCAoKSB7XG4gICAgdGhpcy5zaG93U3RhdGlzdGljSW5mb1BhbmVsID0gIXRoaXMuc2hvd1N0YXRpc3RpY0luZm9QYW5lbFxuICB9XG5cbn1cbiJdfQ==