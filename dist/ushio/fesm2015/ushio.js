import { Injectable, ɵɵdefineInjectable, Directive, Input, EventEmitter, Component, ViewEncapsulation, ElementRef, NgZone, ChangeDetectorRef, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, fromEvent, merge, of, timer, NEVER, animationFrameScheduler } from 'rxjs';
import { distinctUntilChanged, map, filter, tap, switchMap, mapTo, concatMap, takeUntil, repeat } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ISubtitle() { }
if (false) {
    /** @type {?} */
    ISubtitle.prototype.startTime;
    /** @type {?} */
    ISubtitle.prototype.endTime;
    /** @type {?} */
    ISubtitle.prototype.texts;
}
class UshioI18nProvider {
    constructor() {
        this.lang = 'en';
        this.i18nSource = {
            en: {
                lang: 'English',
                speed: 'Speed',
                normal: 'Normal',
                loop: 'Loop',
                noLoop: 'No Loop',
                fullscreen: 'Fullscreen',
                exitFullscreen: 'Exit fullscreen',
                statistic: 'Video statistic',
                language: 'Language',
                mute: 'Mute'
            },
            'zh-Hans': {
                lang: '简体中文',
                speed: '播放速度',
                normal: '正常',
                loop: '循环播放',
                noLoop: '关闭循环',
                fullscreen: '全屏播放',
                exitFullscreen: '退出全屏',
                statistic: '视频统计信息',
                language: '语言',
                mute: '静音'
            }
        };
        for (const langCode of navigator.languages) {
            if (this.setLanguage(langCode))
                break;
        }
        this.t = this.t.bind(this);
    }
    /**
     * @return {?}
     */
    get languages() {
        return Object.entries(this.i18nSource).map((/**
         * @param {?} entry
         * @return {?}
         */
        entry => [entry[0], entry[1].lang]));
    }
    /**
     * @return {?}
     */
    get language() {
        return this.lang;
    }
    /**
     * @param {?} langCode
     * @return {?}
     */
    setLanguage(langCode) {
        if (this.i18nSource[langCode]) {
            this.lang = langCode;
            return true;
        }
        return false;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    t(key) {
        return this.i18nSource[this.lang][key];
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    UshioI18nProvider.prototype.lang;
    /**
     * @type {?}
     * @private
     */
    UshioI18nProvider.prototype.i18nSource;
}
class UshioService {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.timeStampRegex = /^(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})( --> )(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})/;
        this.i18n = new UshioI18nProvider();
    }
    /**
     * @return {?}
     */
    get version() {
        return UshioService.version;
    }
    /**
     * @return {?}
     */
    get build() {
        return UshioService.build;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    parseSubtitles(input) {
        /** @type {?} */
        const trim = (/**
         * @param {?} str
         * @return {?}
         */
        (str) => str.trim()
            .replace(/^[^\S\n]+/gm, '')
            .replace(/\u0000/g, '\uFFFD')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/\n{3,}/g, '\n\n'));
        /** @type {?} */
        const origin = trim(input)
            .split('\n');
        /** @type {?} */
        const splitSubtitles = [];
        /** @type {?} */
        let cachedSubtitle = null;
        /** @type {?} */
        let state = 'root';
        /** @type {?} */
        const processLine = (/**
         * @param {?} line
         * @return {?}
         */
        (line) => {
            switch (state) {
                case 'note':
                /* falls through */
                case 'title':
                    if (line === '') {
                        state = 'root';
                    }
                    return;
                case 'root':
                    if (line.match(/^WEBVTT/)) {
                        state = 'title';
                        return;
                    }
                    else if (line.match(/^NOTE/)) {
                        state = 'note';
                        return;
                    }
                    else if (line === '')
                        return [line];
                    else if (!line.match(/-->/)) {
                        state = 'timeline';
                        return;
                    }
                /* falls through */
                case 'timeline':
                    /** @type {?} */
                    const match = this.timeStampRegex.exec(line);
                    if (match) {
                        cachedSubtitle = {
                            startTime: 1000 * (60 * (60 * +match[1] + +match[3]) + +match[5]) + +match[7] || 0,
                            endTime: 1000 * (60 * (60 * +match[9] + +match[11]) + +match[13]) + +match[15] || 0,
                            texts: []
                        };
                        state = 'text';
                        return;
                    }
                    else {
                        throw new Error(`unexpected timeline token: ${line}`);
                    }
                case 'text':
                    if (line === '') {
                        state = 'root';
                        if (cachedSubtitle) {
                            splitSubtitles.push(cachedSubtitle);
                            cachedSubtitle = null;
                        }
                    }
                    else if (cachedSubtitle) {
                        cachedSubtitle.texts.push(line);
                    }
            }
        });
        origin.forEach((/**
         * @param {?} line
         * @return {?}
         */
        line => processLine(line)));
        if (cachedSubtitle)
            splitSubtitles.push(cachedSubtitle);
        return splitSubtitles;
    }
}
UshioService.version = '4.1.1';
UshioService.build = 'NG Build';
UshioService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
UshioService.ctorParameters = () => [];
/** @nocollapse */ UshioService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UshioService_Factory() { return new UshioService(); }, token: UshioService, providedIn: "root" });
if (false) {
    /** @type {?} */
    UshioService.version;
    /** @type {?} */
    UshioService.build;
    /**
     * @type {?}
     * @private
     */
    UshioService.prototype.timeStampRegex;
    /** @type {?} */
    UshioService.prototype.i18n;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UshioSource {
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
class UshioSubtitles {
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
class UshioComponent {
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
        this.showControlProbablyChanged$ = new Subject();
        this.showControlChange$ = this.showControlProbablyChanged$.asObservable().pipe(map((/**
         * @return {?}
         */
        () => this.showControl)), distinctUntilChanged());
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
        this.mouseSubscriptions = [];
        this.keySubscriptions = [];
        this.mouseMove$ = fromEvent(document, 'mousemove');
        this.mouseUp$ = fromEvent(document, 'mouseup');
        this.touchMove$ = fromEvent(document, 'touchmove');
        this.touchStart$ = fromEvent(document, 'touchstart');
        this.touchEnd$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'touchcancel'));
        this.mouseTouchUp$ = merge(this.mouseUp$, this.touchEnd$);
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
            (subtitles) => __awaiter(this, void 0, void 0, function* () {
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
    onUnfocused() {
        this.keySubscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.keySubscriptions = [];
    }
    /**
     * @return {?}
     */
    onFocused() {
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
            this.keySubscriptions.push(onKeyDown$('Space').subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.togglePlay();
                this.changeDetectorRef.detectChanges();
            })));
            this.keySubscriptions.push(onKeyDown$('ArrowRight').subscribe((/**
             * @return {?}
             */
            () => {
                this.mCurrentTime = this.mCurrentTime + 5 < this.duration ? this.mCurrentTime + 5 : this.duration;
                this.video.nativeElement.currentTime = this.mCurrentTime;
                this.changeDetectorRef.detectChanges();
            })));
            this.keySubscriptions.push(onKeyDown$('ArrowLeft').subscribe((/**
             * @return {?}
             */
            () => {
                this.mCurrentTime = this.mCurrentTime - 5 > 0 ? this.mCurrentTime - 5 : 0;
                this.video.nativeElement.currentTime = this.mCurrentTime;
                this.changeDetectorRef.detectChanges();
            })));
            this.keySubscriptions.push(onKeyDown$('ArrowUp').subscribe((/**
             * @return {?}
             */
            () => {
                this.mVolume = this.mVolume + 0.1 < 0.999996 ? this.mVolume + 0.1 : 1;
                this.video.nativeElement.volume = this.mVolume;
                this.changeDetectorRef.detectChanges();
            })));
            this.keySubscriptions.push(onKeyDown$('ArrowDown').subscribe((/**
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
            this.keySubscriptions.push(showVolumeHint$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.showVolumeHint = e;
                this.changeDetectorRef.detectChanges();
            })));
            this.setAllControlPanelsPosition();
        }));
    }
    /**
     * @return {?}
     */
    onControlDismiss() {
        this.mouseSubscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.mouseSubscriptions = [];
        if (this.controlHoveredChange) {
            this.controlHoveredChange.unsubscribe();
            this.controlHoveredChange = null;
        }
    }
    /**
     * @return {?}
     */
    onControlShown() {
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
            return this.mouseMove$.pipe(switchMap((/**
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
        const mouseHoverProgressState$ = this.mouseMove$.pipe(filter((/**
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
            this.mouseSubscriptions.push(mouseHoverProgressState$.subscribe((/**
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
                return this.mouseMove$.pipe(takeUntil(this.mouseUp$), mapToRate(element, progress, total));
            }))), fromEvent(element, 'touchstart').pipe(mapToRate(element, progress, total), concatMap((/**
             * @return {?}
             */
            () => {
                return this.touchMove$.pipe(takeUntil(this.touchEnd$), mapToRate(element, progress, total));
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
            this.mouseSubscriptions.push(thumbMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.thumbMouseDown = true;
                this.timeUpdate.unsubscribe();
                this.mCurrentTime = e * this.duration;
                this.changeDetectorRef.detectChanges();
            })));
            this.mouseSubscriptions.push(thumbTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.mCurrentTime = e * this.duration;
                this.changeDetectorRef.detectChanges();
            })));
            this.mouseSubscriptions.push(this.mouseTouchUp$.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.thumbMouseDown) {
                    this.video.nativeElement.currentTime = this.mCurrentTime;
                    this.subscribeTimeUpdate();
                    this.thumbMouseDown = false;
                    this.showControlProbablyChanged$.next(0);
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
                    this.showControlProbablyChanged$.next(0);
                    this.setAllControlPanelsPosition();
                    this.changeDetectorRef.detectChanges();
                }));
            }));
        });
        subscribeControlHoveredChange();
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
            this.mouseSubscriptions.push(volumeMouseTouchDown$.subscribe((/**
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
            this.mouseSubscriptions.push(volumeTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.video.nativeElement.volume = e;
                this.changeDetectorRef.detectChanges();
            })));
            this.mouseSubscriptions.push(this.mouseTouchUp$.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.controlMouseDown) {
                    subscribeControlHoveredChange();
                    this.controlMouseDown = false;
                    this.showControlProbablyChanged$.next(0);
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
            this.mouseSubscriptions.push(speedMouseTouchDown$.subscribe((/**
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
            this.mouseSubscriptions.push(speedTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
                this.changeDetectorRef.detectChanges();
            })));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    subscribeTimeUpdate() {
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.touchStart$.subscribe((/**
         * @return {?}
         */
        () => {
            this.interactMode = 'mobile';
        }));
        /** @type {?} */
        const desktopShowControlStateChange$ = this.mouseMove$.pipe(filter((/**
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
                this.showControlProbablyChanged$.next(0);
                this.mNoCursor = state.noCursor;
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
        this.subscribeTimeUpdate();
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
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.showControlChange$.subscribe((/**
             * @param {?} showControl
             * @return {?}
             */
            showControl => {
                if (showControl)
                    this.onControlShown();
                else
                    this.onControlDismiss();
                this.showControlChange.emit(showControl);
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        clearTimeout(this.setAllControlPanelsPositionTimeout);
        this.onUnfocused();
        this.onControlDismiss();
        if (this.timeUpdate) {
            this.timeUpdate.unsubscribe();
            this.timeUpdate = null;
        }
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
        this.subscriptions = [];
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
        return __awaiter(this, void 0, void 0, /** @this {!UshioComponent} */ function* () {
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
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.setAllControlPanelsPositionTimeout = setTimeout((/**
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
        }));
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
        this.changeDetectorRef.detectChanges();
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
        if (this.keySubscriptions.length === 0) {
            this.onFocused();
        }
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
        if (this.showStatisticInfoPanel) {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const animationFrame$ = of(null, animationFrameScheduler).pipe(repeat());
                this.animationFrame = animationFrame$.subscribe((/**
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
                }));
            }));
        }
        else {
            this.animationFrame.unsubscribe();
        }
    }
}
UshioComponent.decorators = [
    { type: Component, args: [{
                selector: 'ushio-player',
                template: "<div [className]=\"'ushio-player ' + interactMode + (showControl ? ' mouse-hover' : '') + pausedClass + waitingClass\">\n  <div [className]=\"'ushio-player-video-mask' + (noCursor ? ' no-cursor' : '')\" (click)=\"onVideoMaskClicked()\">\n    <div [className]=\"'video-state-buff-wrap' + waitingClass\">\n      <img class=\"video-state-buff\" src=\"data:image/gif;base64,R0lGODlhIAAgALMIADc3N5eXl3l5eVdXV9PT0+3t7bS0tCcnJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0ZCQUZCNUYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0ZCQUZCNkYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRkJBRkIzRjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDRkJBRkI0RjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqThrevr+X3eBpOWVGZCJWgECMMZiRf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlRKuWMlgy4VivwSueOAFa8fVtHrN3ggEJIPB+X5/5PJSHQ7Czz97GQEYfoB2GAGJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWupOGta+v5fd4Gk5ZXZkYkaAR4wxmJE/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVGq5YCWDLhWK/Bq4Y4AVrx9W0es3eDAakQMD5fn/k8lIdDsLPP3sZAhh+gHYYAomEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJK6k4a0r6/l93gaTllVmRiZoBFjDGYkb9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUGrljJYcuFYr8BrvjgBWvH1bR6zd4AACSBwPl+f+TyUh0Ows8/exkDGH6AdhgDiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUmrqThravr+X3eBpOWVGZGJWgASMMZiQf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlQquWElhy4VivwKuuOAFa8fVtHrN3hwOpMHA+X5/5PJSHQ7Czz97GQAYfoB2GACJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWuoOGsa+v5fd4Gk5ZWZkYmaABowxmJC/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVDq5YCWHLhWK/A66Y4AVrx9W0es3eFAokAMD5fn/k8lIdDsLPP3sZBxh+gHYYB4mEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJq6g4ayr6/l93gaTllVmQidoABjDGYkP9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUCrliJYcuFYr8ArtjgBWvH1bR6zd4QCKTDwfl+f+TyUh0Ows8/exkFGH6AdhgFiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqDhrOvr+X3eBpOWVmZCJGgAKMMZiQP3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlR6uWElgy4VivweuOOAFa8fVtHrN3hgMpELB+X5/5PJSHQ7Czz97GQQYfoB2GASJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSSuoOGsK+v5fd4Gk5ZXZkInaAQ4wxmJH/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVFq5YiWDLhWK/Ba5Y4AVrx9W0es3eBAIkAsH5fn/k8lIdDsLPP3sZBhh+gHYYBomEeYAaiYOEVI9tEpOUlm2YmU4RADs=\" alt=\"buffering\">\n    </div>\n  </div>\n  <div class=\"ushio-player-video\">\n    <video #video\n      [attr.crossOrigin]=\"crossorigin\"\n      [attr.poster]=\"poster\"\n      [attr.autoplay]=\"autoplay\"\n      [attr.preload]=\"preload\"\n    >\n      Your browser is too old which doesn't support HTML5 video.\n      <source *ngFor=\"let source of sources[playingSource].sources\"\n              [src]=\"source.src\" [attr.type]=\"source.type\"\n      />\n    </video>\n  </div>\n  <div class=\"ushio-player-custom-mask\">\n    <slot (slotchange)=\"onSlotChange($event)\"></slot>\n  </div>\n  <div class=\"ushio-player-subtitle-container\">\n    <div *ngFor=\"let subtitles of flyingSubtitles\"\n         [className]=\"'ushio-player-subtitle-wrap ' + subtitles.class\">\n      <div *ngFor=\"let subtitle of subtitles.parsedSubtitles\" class=\"ushio-player-subtitle\">\n        <div *ngFor=\"let line of subtitle.texts\" class=\"subtitle-line\">\n          <span [innerHTML]=\"line\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"ushio-player-video-control-mask\"></div>\n  <div class=\"ushio-player-video-control-wrap\">\n    <div class=\"ushio-player-video-control\">\n      <div class=\"video-control-top\">\n        <div [className]=\"'video-progress' + thumbMouseDownClass\">\n          <div class=\"video-progress-slider\" #slider>\n            <div class=\"slider-track\">\n              <div class=\"slider-track-bar-wrap\">\n                <div class=\"bar-buffer\" [style]=\"bufferedProgress\"></div>\n                <div class=\"bar-normal\" [style]=\"playedProgress\"></div>\n              </div>\n              <div class=\"slider-track-thumb\" [style]=\"thumbPosition\">\n                <div class=\"thumb-dot\"></div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'video-progress-detail' + progressDetailClass\" [style]=\"progressDetailPosition\">\n            <div *ngIf=\"thumbnails\"\n                 class=\"video-progress-detail-container\" [style]=\"progressDetailContainerPosition\">\n              <div class=\"detail-img\" [style]=\"progressDetailImgStyle\"></div>\n            </div>\n            <div class=\"video-progress-detail-sign\">\n              <div class=\"sign-down\"></div>\n              <div class=\"sign-up\"></div>\n            </div>\n            <div class=\"video-progress-detail-time\" [style]=\"progressDetailTimePosition\">\n              {{progressDetailTime}}\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"video-control-bottom\">\n        <div class=\"video-control-bottom-left\">\n          <div [className]=\"'ushio-player-btn btn-start' + pausedClass\" (click)=\"togglePlay()\">\n            <span class=\"ushio-player-icon icon-play\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-play\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-pause\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-pause\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n          </div>\n          <div class=\"video-time-wrap\">\n            <span class=\"video-time-now\">{{currentTimeStr}}</span>\n            <span class=\"video-time-divider\">/</span>\n            <span class=\"video-time-total\">{{durationStr}}</span>\n          </div>\n        </div>\n        <div class=\"video-control-bottom-center\"></div>\n        <div [className]=\"'video-control-bottom-right' + controlHoveredClass\">\n          <div [className]=\"'ushio-player-btn btn-volume' + mutedClass + (volumeControl ? '' : ' hide')\"\n               #volumeBtn\n          >\n            <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"control-panel btn-volume-panel\" #volumePanel>\n              <div class=\"volume-num\">{{volume100}}</div>\n              <div class=\"volume-bar\" #volumeBar>\n                <div class=\"volume-bar-track\">\n                  <div class=\"volume-bar-track-wrap\">\n                    <div class=\"bar-normal\" [style]=\"volumeRate\"></div>\n                  </div>\n                  <div class=\"volume-bar-track-thumb\" [style]=\"volumeThumbPosition\">\n                    <div class=\"thumb-dot\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-source' + (sourceControl && sources.length > 1 ? '' : ' hide')\"\n               #sourceBtn\n          >\n            {{ sources[playingSource].shortName }}\n            <div class=\"btn-source-panel control-panel\" #sourcePanel [style]=\"sourcePanelPosition\">\n              <ul>\n                <li *ngFor=\"let source of sources; index as i\"\n                    (click)=\"onSelectSource(i)\"\n                    [className]=\"playingSource === i ? 'selected' : ''\"\n                >\n                  {{ source.name }}\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-subtitles' + subtitleEnabledClass + (subtitlesControl && subtitles.length > 0 ? '' : ' hide')\"\n               #subtitlesBtn\n          >\n            <span class=\"ushio-player-icon icon-subtitles-off\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-subtitles-on\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-subtitles-panel control-panel\" #subtitlesPanel [style]=\"subtitlesPanelPosition\">\n              <ul>\n                <li *ngFor=\"let subtitleTrack of subtitles; index as i\"\n                    (click)=\"onCheckSubtitles(i)\"\n                    [className]=\"subtitleTrack.enabled ? 'checked' : ''\"\n                >\n                  <span *ngIf=\"!subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-default\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-default\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span *ngIf=\"subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-selected\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-selected\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span>{{ subtitleTrack.name }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-settings' + (settingsControl ? '' : ' hide')\"\n               #settingsBtn\n          >\n            <span class=\"ushio-player-icon icon-settings\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-settings\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-settings-panel control-panel\" #settingsPanel [style]=\"settingsPanelPosition\">\n              <div class=\"panel-box settings-panel-speed\">\n                <div class=\"panel-box-title\">\n                  {{t('speed')}}\n                </div>\n                <div class=\"panel-box-content panel-speed-content speed-bar\" #speedBar>\n                  <div class=\"speed-track\">\n                    <div class=\"speed-track-wrap\"></div>\n                    <div class=\"speed-track-steps\">\n                      <div class=\"speed-track-steps-item step-item-0\" style=\"left: 0\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 20%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.75</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 40%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">{{t('normal')}}</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 60%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.25</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 80%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item step-item-100\" style=\"left: 100%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">2.0</div>\n                      </div>\n                    </div>\n                    <div class=\"speed-track-thumb\" [style]=\"speedThumbPosition\">\n                      <div class=\"thumb-dot\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-loop' + loopClass + (loopControl ? '' : ' hide')\"\n               (click)=\"toggleLoop()\"\n               #loopBtn\n          >\n            <span class=\"ushio-player-icon icon-loop-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-loop-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title btn-title-loop\" #loopPanel [style]=\"loopPanelPosition\">\n              {{ t('noLoop') }}\n            </div>\n            <div class=\"btn-title btn-title-noloop\" [style]=\"loopPanelPosition\">\n              {{ t('loop') }}\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-fullscreen' + fullscreenClass  + (fullscreenControl ? '' : ' hide')\"\n               (click)=\"toggleFullscreen()\"\n               #fullScreenBtn\n          >\n            <span class=\"ushio-player-icon icon-fullscreen-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-fullscreen-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title\" #fullScreenPanel [style]=\"fullScreenPanelPosition\">\n              {{ fullscreenClass === ' video-state-fullscreen' ? t('exitFullscreen') : t('fullscreen') }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [className]=\"'ushio-context-menu control-panel ' + contextMenuClass\"\n       #contextMenu\n       [style]=\"contextMenuPosition\"\n  >\n    <div class=\"ushio-context-menu-root\">\n      <ul>\n        <li (click)=\"toggleShowStatisticInfoPanel()\">{{t('statistic')}}</li>\n        <li #langContextMenuOption>{{t('language')}}</li>\n        <li>\n          <a target=\"_blank\" referrerpolicy=\"no-referrer\" href=\"https://github.com/rikakomoe/ushio\">\n            Ushio Player v{{version}}\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"ushio-context-menu-lang\">\n      <ul>\n        <li *ngFor=\"let lang of languages\" (click)=\"setLanguage(lang[0])\">{{lang[1]}}</li>\n      </ul>\n    </div>\n  </div>\n  <div [className]=\"'ushio-statistic-info control-panel' + statisticInfoPanelClass\">\n    <a class=\"dismiss\" (click)=\"toggleShowStatisticInfoPanel()\">[x]</a>\n    <table>\n      <tr><td>Player version</td><td>{{detailedVersion}}</td></tr>\n      <tr><td>Player FPS</td><td>{{fps}}</td></tr>\n      <tr><td>Video resolution</td><td>{{videoResolution}}</td></tr>\n      <tr><td>Video duration</td><td>{{videoDuration}}</td></tr>\n      <tr><td>Current time</td><td>{{videoCurrentTime}}</td></tr>\n    </table>\n  </div>\n  <div [className]=\"'ushio-volume-hint' + volumeHintClass\">\n    <span [className]=\"mutedClass\">\n      <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n      <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n    </span>\n    <span *ngIf=\"volume100\">{{volume100}}%</span>\n    <span *ngIf=\"!volume100\">{{t('mute')}}</span>\n  </div>\n  <div class=\"ushio-res\">\n    <div *ngFor=\"let style of injectedStyles\" [innerHTML]=\"style\"></div>\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <symbol id=\"ushio-play\">\n        <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n      </symbol>\n      <symbol id=\"ushio-pause\">\n        <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-max\">\n        <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-min\">\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n        <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-off\">\n        <path d=\"M15.172 18H4a2 2 0 0 1-2-2V6c0-.34.084-.658.233-.938l-.425-.426a1 1 0 1 1 1.414-1.414l15.556 15.556a1 1 0 0 1-1.414 1.414L15.172 18zM4.962 7.79C4.385 8.141 4 8.776 4 9.5v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .713-.958L4.962 7.79zM6.828 4H18a2 2 0 0 1 2 2v10c0 .34-.084.658-.233.938l-2.48-2.48A1 1 0 0 0 17 12.5h-1.672L14 11.172V10.5a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2h-3a2 2 0 0 0-1.977 1.695L6.828 4z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-on\">\n        <path d=\"M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 5.5a1 1 0 1 0 0-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2zm8 0a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2h-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-default\">\n        <path d=\"M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0-2h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-selected\">\n        <path d=\"M13 18.25l-1.8-1.8c-.6-.6-1.65-.6-2.25 0s-.6 1.5 0 2.25l2.85 2.85c.318.318.762.468 1.2.448.438.02.882-.13 1.2-.448l8.85-8.85c.6-.6.6-1.65 0-2.25s-1.65-.6-2.25 0l-7.8 7.8zM8 4h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-settings\">\n        <circle cx=\"11\" cy=\"11\" r=\"2\"></circle>\n        <path d=\"M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-on\">\n        <path d=\"M17 16H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .353.853H4v2a2 2 0 0 0 2 2h11a1 1 0 0 0 0-2zM19.793 8H18V6a2 2 0 0 0-2-2H5a1 1 0 0 0 0 2h11v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793A.5.5 0 0 0 19.793 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-off\">\n        <path d=\"M3.222 3.222a.999.999 0 1 0-1.414 1.414l11.435 11.435H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .354.854H4v2a2 2 0 0 0 2 2h9.243l2.121 2.121a.999.999 0 1 0 1.414-1.414L3.222 3.222zM19.793 8.071H18v-2a2 2 0 0 0-2-2H6.899l2 2H16v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793a.5.5 0 0 0-.353-.853z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-off\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 .5.5v1zm0-8a.5.5 0 0 1-.5.5H6v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm10 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H16v-1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-on\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm10 4a.5.5 0 0 1-.5.5H16v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 .5.5v1z\"></path>\n      </symbol>\n    </svg>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.ShadowDom,
                styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:visible;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
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
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.showControlProbablyChanged$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.showControlChange$;
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
    UshioComponent.prototype.animationFrame;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mouseSubscriptions;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.keySubscriptions;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.setAllControlPanelsPositionTimeout;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mouseMove$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mouseUp$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.touchMove$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.touchStart$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.touchEnd$;
    /**
     * @type {?}
     * @private
     */
    UshioComponent.prototype.mouseTouchUp$;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UshioModule {
}
UshioModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { UshioComponent, UshioModule, UshioService, UshioSource, UshioSubtitles };
//# sourceMappingURL=ushio.js.map
