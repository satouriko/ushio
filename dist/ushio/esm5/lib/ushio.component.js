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
var UshioSource = /** @class */ (function () {
    function UshioSource() {
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
    return UshioSource;
}());
export { UshioSource };
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
var UshioSubtitles = /** @class */ (function () {
    function UshioSubtitles() {
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
    return UshioSubtitles;
}());
export { UshioSubtitles };
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
var UshioComponent = /** @class */ (function () {
    function UshioComponent(element, zone, changeDetectorRef, sanitization, service) {
        var _this = this;
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
        function () { return _this.showControl; })), distinctUntilChanged());
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
    Object.defineProperty(UshioComponent.prototype, "injectedStyles", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.mInjectedStyles.map((/**
             * @param {?} style
             * @return {?}
             */
            function (style) { return _this.sanitization.bypassSecurityTrustHtml("\n      <style>\n       " + style + "\n      </style>\n    "); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "src", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mSrc;
        },
        set: /**
         * @param {?} src
         * @return {?}
         */
        function (src) {
            this.mSrc = src;
            this.updateSources();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "lang", {
        set: /**
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            this.service.i18n.setLanguage(lang);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "enabledSubtitles", {
        get: /**
         * @return {?}
         */
        function () {
            return this.subtitles.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.enabled; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "volume", {
        set: /**
         * @param {?} volume
         * @return {?}
         */
        function (volume) {
            this.video.nativeElement.volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "volume100", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.video.nativeElement.muted)
                return 0;
            return Math.round(this.mVolume * 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "playbackRate", {
        set: /**
         * @param {?} playbackRate
         * @return {?}
         */
        function (playbackRate) {
            this.video.nativeElement.playbackRate = playbackRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "volumeControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mVolumeControl;
        },
        set: /**
         * @param {?} volumeControl
         * @return {?}
         */
        function (volumeControl) {
            this.mVolumeControl = volumeControl;
            this.setAllControlPanelsPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "sourceControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mSourceControl;
        },
        set: /**
         * @param {?} sourceControl
         * @return {?}
         */
        function (sourceControl) {
            this.mSourceControl = sourceControl;
            this.setAllControlPanelsPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "subtitlesControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mSubtitlesControl;
        },
        set: /**
         * @param {?} subtitlesControl
         * @return {?}
         */
        function (subtitlesControl) {
            this.mSubtitlesControl = subtitlesControl;
            this.setAllControlPanelsPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "settingsControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mSettingsControl;
        },
        set: /**
         * @param {?} settingsControl
         * @return {?}
         */
        function (settingsControl) {
            this.mSettingsControl = settingsControl;
            this.setAllControlPanelsPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "loopControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mLoopControl;
        },
        set: /**
         * @param {?} loopControl
         * @return {?}
         */
        function (loopControl) {
            this.mLoopControl = loopControl;
            this.setAllControlPanelsPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "fullscreenControl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mFullscreenControl;
        },
        set: /**
         * @param {?} fullscreenControl
         * @return {?}
         */
        function (fullscreenControl) {
            this.mFullscreenControl = fullscreenControl;
            this.setAllControlPanelsPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "isFullScreen", {
        get: /**
         * @return {?}
         */
        function () {
            return document.fullscreenElement !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "mouseDown", {
        get: /**
         * @return {?}
         */
        function () {
            return this.thumbMouseDown || this.controlMouseDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "showControl", {
        get: /**
         * @return {?}
         */
        function () {
            return !!(this.mShowControl || this.mouseDown);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "noCursor", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.showControl && this.mNoCursor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "thumbMouseDownClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.thumbMouseDown ? ' thumb-mouse-down' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "pausedClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mPaused ? ' video-state-pause' : ' video-state-play';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "waitingClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.waiting && !this.mPaused ? ' video-state-waiting' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "mutedClass", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.video.nativeElement.muted || this.video.nativeElement.volume === 0)
                ? ' video-state-muted' : ' video-state-volume';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "loopClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.video.nativeElement.loop ? ' video-state-loop' : ' video-state-noloop';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "subtitleEnabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.enabledSubtitles.length > 0 ? ' video-state-subtitles' : ' video-state-nosubtitles';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "fullscreenClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isFullScreen ? ' video-state-fullscreen' : ' video-state-nofullscreen';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "contextMenuClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.contextMenuState + (this.showContextMenu ? ' active' : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "statisticInfoPanelClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showStatisticInfoPanel ? ' active' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "volumeHintClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showVolumeHint ? ' active' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "progressDetailClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showProgressDetail ? ' active' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "paused", {
        set: /**
         * @param {?} paused
         * @return {?}
         */
        function (paused) {
            if (paused)
                this.video.nativeElement.pause();
            else
                this.video.nativeElement.play();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "currentTime", {
        set: /**
         * @param {?} currentTime
         * @return {?}
         */
        function (currentTime) {
            this.video.nativeElement.currentTime = currentTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "loop", {
        set: /**
         * @param {?} loop
         * @return {?}
         */
        function (loop) {
            this.video.nativeElement.loop = loop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "muted", {
        set: /**
         * @param {?} muted
         * @return {?}
         */
        function (muted) {
            this.video.nativeElement.muted = muted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "currentTimeStr", {
        get: /**
         * @return {?}
         */
        function () {
            return UshioComponent.formatDuration(this.mCurrentTime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "durationStr", {
        get: /**
         * @return {?}
         */
        function () {
            return UshioComponent.formatDuration(this.duration);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "bufferedProgress", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: scaleX(" + this.bufferedTime / this.duration + ")");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "playedProgress", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: scaleX(" + this.mCurrentTime / this.duration + ")");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "thumbPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("left: " + this.mCurrentTime / this.duration * 100 + "%");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "volumeRate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: scaleY(" + this.volume100 / 100 + ")");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "volumeThumbPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("bottom: " + this.volume100 + "%");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "speedThumbPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("left: " + UshioComponent.mapSpeedToProgress(this.mPlaybackRate) + "%");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "settingsPanelPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: translateX(calc(" + -this.panelTranslations.settings + "px - 50%))");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "sourcePanelPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: translateX(calc(" + -this.panelTranslations.source + "px - 50%))");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "subtitlesPanelPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: translateX(calc(" + -this.panelTranslations.subtitles + "px - 50%))");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "loopPanelPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: translateX(calc(" + -this.panelTranslations.loop + "px - 50%))");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "fullScreenPanelPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle("transform: translateX(calc(" + -this.panelTranslations.fullscreen + "px - 50%))");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "contextMenuPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle(this.mContextMenuPosition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "progressDetailPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailPosition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "progressDetailContainerPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailContainerPosition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "progressDetailTimePosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitization.bypassSecurityTrustStyle(this.mProgressDetailTimePosition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "progressDetailImgStyle", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var height = this.video.nativeElement.videoHeight * 160 / this.video.nativeElement.videoWidth;
            return this.sanitization.bypassSecurityTrustStyle("height: " + height + "px;\n       line-height: " + height + "px;\n       background-image: url(\"" + this.thumbnails + "\");\n       background-position: -" + (Math.ceil(this.mProgressDetailPositionRate * 100) - 1) * 160 + "px 0;");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "progressDetailTime", {
        get: /**
         * @return {?}
         */
        function () {
            return UshioComponent.formatDuration(this.mProgressDetailPositionRate * this.duration);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "version", {
        get: /**
         * @return {?}
         */
        function () {
            return this.service.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "detailedVersion", {
        get: /**
         * @return {?}
         */
        function () {
            return "v" + this.service.version + " (" + this.service.build + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "videoResolution", {
        get: /**
         * @return {?}
         */
        function () {
            return this.video.nativeElement.videoWidth + " x " + this.video.nativeElement.videoHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "videoDuration", {
        get: /**
         * @return {?}
         */
        function () {
            return this.video.nativeElement.duration.toFixed(6);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UshioComponent.prototype, "videoCurrentTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this.video.nativeElement.currentTime.toFixed(6);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} speed
     * @return {?}
     */
    UshioComponent.mapSpeedToProgress = /**
     * @param {?} speed
     * @return {?}
     */
    function (speed) {
        if (speed < .5)
            return 0;
        else if (speed < 1.5)
            return (speed - .5) * 80;
        else if (speed < 2.0)
            return 80 + (speed - 1.5) * 40;
        else
            return 100;
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    UshioComponent.mapProgressToSpeed = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        if (progress < .1)
            return .5;
        else if (progress < .9)
            return .75 + .25 * Math.floor((progress - 0.1) * 5);
        else
            return 2;
    };
    /**
     * @param {?} duration
     * @return {?}
     */
    UshioComponent.formatDuration = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        /** @type {?} */
        var h = Math.floor(duration / 3600);
        /** @type {?} */
        var m = Math.floor(duration % 3600 / 60);
        /** @type {?} */
        var s = Math.floor(duration % 60);
        /** @type {?} */
        var str = '';
        if (h && h < 10) {
            str += "0" + h + ":";
        }
        else if (h) {
            str += h + ":";
        }
        if (m < 10) {
            str += "0" + m + ":";
        }
        else {
            str += m + ":";
        }
        if (s < 10) {
            str += "0" + s;
        }
        else {
            str += "" + s;
        }
        return str;
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.mPaused = this.video.nativeElement.paused;
        this.mVolume = this.video.nativeElement.volume;
        this.mPlaybackRate = this.video.nativeElement.playbackRate;
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mapPropsToObject = (/**
         * @param {?} props
         * @param {?} fn
         * @return {?}
         */
        function (props, fn) { return (/**
         * @param {?} sourceObj
         * @return {?}
         */
        function (sourceObj) { return (props.reduce((/**
         * @param {?} agg
         * @param {?} cur
         * @return {?}
         */
        function (agg, cur) {
            var _a;
            return (tslib_1.__assign({}, agg, (_a = {}, _a[cur] = fn(sourceObj, cur), _a)));
        }), {})); }); });
        /** @type {?} */
        var onContentChildrenOrSlotChanged$ = (/**
         * @param {?} attr
         * @param {?} contentChildren
         * @param {?} slotChange$
         * @return {?}
         */
        function (attr, contentChildren, slotChange$) {
            /** @type {?} */
            var contentChildrenMap = mapPropsToObject(attr, (/**
             * @param {?} obj
             * @param {?} cur
             * @return {?}
             */
            function (obj, cur) { return (obj[cur]); }));
            /** @type {?} */
            var slotMap = mapPropsToObject(attr, (/**
             * @param {?} obj
             * @param {?} cur
             * @return {?}
             */
            function (obj, cur) { return (obj.getAttribute(cur)); }));
            return merge(of(contentChildren.toArray().map(contentChildrenMap)), contentChildren.changes.pipe(map((/**
             * @param {?} contents
             * @return {?}
             */
            function (contents) { return (contents.toArray().map(contentChildrenMap)); }))), slotChange$.pipe(map((/**
             * @param {?} contents
             * @return {?}
             */
            function (contents) { return (contents.map(slotMap)); }))));
        });
        /** @type {?} */
        var subtitlesAttr = ['value', 'type', 'src', 'name', 'class', 'default', 'srclang'];
        /** @type {?} */
        var subtitlesChange$ = onContentChildrenOrSlotChanged$(subtitlesAttr, this.subtitlesContentChildren, this.subtitlesSlotChange$);
        /** @type {?} */
        var sourcesAttr = ['src', 'type', 'name', 'shortname', 'default'];
        /** @type {?} */
        var sourcesChange$ = onContentChildrenOrSlotChanged$(sourcesAttr, this.sourceContentChildren, this.sourcesSlotChange$);
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.subscriptions.push(subtitlesChange$.subscribe((/**
             * @param {?} subtitles
             * @return {?}
             */
            function (subtitles) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.mSubtitles = subtitles;
                            return [4 /*yield*/, this.updateSubtitles()];
                        case 1:
                            _a.sent();
                            this.changeDetectorRef.detectChanges();
                            return [2 /*return*/];
                    }
                });
            }); })));
            _this.subscriptions.push(sourcesChange$.subscribe((/**
             * @param {?} sources
             * @return {?}
             */
            function (sources) {
                _this.mSources = sources;
                _this.updateSources();
                _this.changeDetectorRef.detectChanges();
            })));
        }));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onUnfocused = /**
     * @return {?}
     */
    function () {
        this.keySubscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.keySubscriptions = [];
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onFocused = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var onKeyDown$ = (/**
         * @param {?} code
         * @return {?}
         */
        function (code) { return fromEvent(document, 'keydown').pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.focus && e.code === code; })), tap((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        }))); });
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.keySubscriptions.push(onKeyDown$('Space').subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.togglePlay();
                _this.changeDetectorRef.detectChanges();
            })));
            _this.keySubscriptions.push(onKeyDown$('ArrowRight').subscribe((/**
             * @return {?}
             */
            function () {
                _this.mCurrentTime = _this.mCurrentTime + 5 < _this.duration ? _this.mCurrentTime + 5 : _this.duration;
                _this.video.nativeElement.currentTime = _this.mCurrentTime;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.keySubscriptions.push(onKeyDown$('ArrowLeft').subscribe((/**
             * @return {?}
             */
            function () {
                _this.mCurrentTime = _this.mCurrentTime - 5 > 0 ? _this.mCurrentTime - 5 : 0;
                _this.video.nativeElement.currentTime = _this.mCurrentTime;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.keySubscriptions.push(onKeyDown$('ArrowUp').subscribe((/**
             * @return {?}
             */
            function () {
                _this.mVolume = _this.mVolume + 0.1 < 0.999996 ? _this.mVolume + 0.1 : 1;
                _this.video.nativeElement.volume = _this.mVolume;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.keySubscriptions.push(onKeyDown$('ArrowDown').subscribe((/**
             * @return {?}
             */
            function () {
                _this.mVolume = _this.mVolume - 0.1 > 0.000004 ? _this.mVolume - 0.1 : 0;
                _this.video.nativeElement.volume = _this.mVolume;
                _this.changeDetectorRef.detectChanges();
            })));
        }));
        /** @type {?} */
        var showVolumeHint$ = merge(onKeyDown$('ArrowUp'), onKeyDown$('ArrowDown'))
            .pipe(switchMap((/**
         * @return {?}
         */
        function () { return merge(of(true), timer(1000).pipe(mapTo(false))); })), distinctUntilChanged());
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.keySubscriptions.push(showVolumeHint$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.showVolumeHint = e;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.setAllControlPanelsPosition();
        }));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onControlDismiss = /**
     * @return {?}
     */
    function () {
        this.mouseSubscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.mouseSubscriptions = [];
        if (this.controlHoveredChange) {
            this.controlHoveredChange.unsubscribe();
            this.controlHoveredChange = null;
        }
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onControlShown = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ifMouseInArea = (/**
         * @param {?} e
         * @param {?} btnElement
         * @param {?} popUpElement
         * @return {?}
         */
        function (e, btnElement, popUpElement) {
            /** @type {?} */
            var rect1 = popUpElement.getBoundingClientRect();
            /** @type {?} */
            var rect2 = btnElement.getBoundingClientRect();
            return (e.clientX > rect1.left &&
                e.clientX < rect1.right &&
                e.clientY > rect1.top &&
                e.clientY < rect1.bottom) || (e.clientX > rect2.left &&
                e.clientX < rect2.right &&
                e.clientY > rect2.top &&
                e.clientY < rect2.bottom);
        });
        /** @type {?} */
        var onControlBtnHoverStateChanged$ = (/**
         * @param {?} btns
         * @return {?}
         */
        function (btns) {
            return _this.mouseMove$.pipe(switchMap((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                var e_1, _a;
                try {
                    for (var btns_1 = tslib_1.__values(btns), btns_1_1 = btns_1.next(); !btns_1_1.done; btns_1_1 = btns_1.next()) {
                        var btn = btns_1_1.value;
                        if (ifMouseInArea(e, btn.btnElement, btn.popUpElement)) {
                            return of(" btn-" + btn.btnName + "-hover");
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (btns_1_1 && !btns_1_1.done && (_a = btns_1.return)) _a.call(btns_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return timer(150).pipe(mapTo(''));
            })), distinctUntilChanged());
        });
        /** @type {?} */
        var mouseHoverProgressState$ = this.mouseMove$.pipe(filter((/**
         * @return {?}
         */
        function () { return (_this.interactMode === 'desktop'); })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var rect = _this.slider.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var yCenter = (rect.top + rect.bottom) / 2;
            if (Math.abs(e.clientY - yCenter) < 8 && e.clientX > rect.left && e.clientX < rect.right) {
                /** @type {?} */
                var left = e.clientX - rect.left;
                /** @type {?} */
                var containerLeft = left < 80 ? 90 - left : left > rect.width - 80 ? rect.width - left - 70 : 10;
                /** @type {?} */
                var timeLeft = left < 20 ? 30 - left : left > rect.width - 20 ? rect.width - left - 10 : 10;
                return { left: left, containerLeft: containerLeft, timeLeft: timeLeft, width: rect.width };
            }
            else {
                return false;
            }
        })), distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
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
        function () {
            _this.mouseSubscriptions.push(mouseHoverProgressState$.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                if (typeof state === 'boolean') {
                    _this.showProgressDetail = state;
                }
                else {
                    _this.showProgressDetail = true;
                    _this.mProgressDetailPosition = "left: " + state.left + "px";
                    _this.mProgressDetailContainerPosition = "left: " + state.containerLeft + "px";
                    _this.mProgressDetailTimePosition = "left: " + state.timeLeft + "px";
                    _this.mProgressDetailPositionRate = state.left / state.width;
                }
                _this.changeDetectorRef.detectChanges();
            })));
        }));
        /** @type {?} */
        var mapToRate = (/**
         * @param {?} element
         * @param {?} progress
         * @param {?} total
         * @return {?}
         */
        function (element, progress, total) { return map((/**
         * @param {?} moveEvent
         * @return {?}
         */
        function (moveEvent) {
            /** @type {?} */
            var eventCoordinate = moveEvent instanceof TouchEvent
                ? moveEvent.changedTouches[0]
                : moveEvent;
            /** @type {?} */
            var rect = element.getBoundingClientRect();
            /** @type {?} */
            var p = progress(eventCoordinate, rect);
            /** @type {?} */
            var t = total(rect);
            if (p < 0)
                p = 0;
            else if (p > t)
                p = t;
            return p / t;
        })); });
        /** @type {?} */
        var onMouseTouchDown$ = (/**
         * @param {?} element
         * @param {?} progress
         * @param {?} total
         * @return {?}
         */
        function (element, progress, total) {
            return merge(fromEvent(element, 'mousedown'), fromEvent(element, 'touchstart')).pipe(mapToRate(element, progress, total));
        });
        /** @type {?} */
        var onMouseTouchDrag$ = (/**
         * @param {?} element
         * @param {?} progress
         * @param {?} total
         * @return {?}
         */
        function (element, progress, total) {
            return merge(fromEvent(element, 'mousedown').pipe(mapToRate(element, progress, total), concatMap((/**
             * @return {?}
             */
            function () {
                return _this.mouseMove$.pipe(takeUntil(_this.mouseUp$), mapToRate(element, progress, total));
            }))), fromEvent(element, 'touchstart').pipe(mapToRate(element, progress, total), concatMap((/**
             * @return {?}
             */
            function () {
                return _this.touchMove$.pipe(takeUntil(_this.touchEnd$), mapToRate(element, progress, total));
            }))));
        });
        /** @type {?} */
        var thumbMouseTouchDown$ = onMouseTouchDown$(this.slider.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        function (moveEvent, rect) { return (moveEvent.clientX - rect.left); }), (/**
         * @param {?} rect
         * @return {?}
         */
        function (rect) { return (rect.width); }));
        /** @type {?} */
        var thumbTouchDrag$ = onMouseTouchDrag$(this.slider.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        function (moveEvent, rect) { return (moveEvent.clientX - rect.left); }), (/**
         * @param {?} rect
         * @return {?}
         */
        function (rect) { return (rect.width); }));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.mouseSubscriptions.push(thumbMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.thumbMouseDown = true;
                _this.timeUpdate.unsubscribe();
                _this.mCurrentTime = e * _this.duration;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.mouseSubscriptions.push(thumbTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.mCurrentTime = e * _this.duration;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.mouseSubscriptions.push(_this.mouseTouchUp$.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.thumbMouseDown) {
                    _this.video.nativeElement.currentTime = _this.mCurrentTime;
                    _this.subscribeTimeUpdate();
                    _this.thumbMouseDown = false;
                    _this.showControlProbablyChanged$.next(0);
                    _this.changeDetectorRef.detectChanges();
                }
            })));
        }));
        /** @type {?} */
        var controlHoverStateChange$ = onControlBtnHoverStateChanged$([{
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
        var subscribeControlHoveredChange = (/**
         * @return {?}
         */
        function () {
            _this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.controlHoveredChange = controlHoverStateChange$.subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    _this.controlHoveredClass = e;
                    _this.setAllControlPanelsPosition();
                    _this.changeDetectorRef.detectChanges();
                }));
            }));
        });
        subscribeControlHoveredChange();
        /** @type {?} */
        var volumeMouseTouchDown$ = onMouseTouchDown$(this.volumeBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        function (moveEvent, rect) { return (rect.bottom - moveEvent.clientY); }), (/**
         * @param {?} rect
         * @return {?}
         */
        function (rect) { return (rect.height); }));
        /** @type {?} */
        var volumeTouchDrag$ = onMouseTouchDrag$(this.volumeBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        function (moveEvent, rect) { return (rect.bottom - moveEvent.clientY); }), (/**
         * @param {?} rect
         * @return {?}
         */
        function (rect) { return (rect.height); }));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.mouseSubscriptions.push(volumeMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (!_this.controlMouseDown) {
                    _this.controlMouseDown = true;
                    _this.controlHoveredChange.unsubscribe();
                }
                _this.video.nativeElement.muted = false;
                _this.video.nativeElement.volume = e;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.mouseSubscriptions.push(volumeTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.video.nativeElement.volume = e;
                _this.changeDetectorRef.detectChanges();
            })));
            _this.mouseSubscriptions.push(_this.mouseTouchUp$.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.controlMouseDown) {
                    subscribeControlHoveredChange();
                    _this.controlMouseDown = false;
                    _this.showControlProbablyChanged$.next(0);
                    _this.changeDetectorRef.detectChanges();
                }
            })));
        }));
        /** @type {?} */
        var speedMouseTouchDown$ = onMouseTouchDown$(this.speedBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        function (moveEvent, rect) { return (moveEvent.clientX - rect.left); }), (/**
         * @param {?} rect
         * @return {?}
         */
        function (rect) { return (rect.width); }));
        /** @type {?} */
        var speedTouchDrag$ = onMouseTouchDrag$(this.speedBar.nativeElement, (/**
         * @param {?} moveEvent
         * @param {?} rect
         * @return {?}
         */
        function (moveEvent, rect) { return (moveEvent.clientX - rect.left); }), (/**
         * @param {?} rect
         * @return {?}
         */
        function (rect) { return (rect.width); }));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.mouseSubscriptions.push(speedMouseTouchDown$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (!_this.controlMouseDown) {
                    _this.controlMouseDown = true;
                    _this.controlHoveredChange.unsubscribe();
                }
                _this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
                _this.changeDetectorRef.detectChanges();
            })));
            _this.mouseSubscriptions.push(speedTouchDrag$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
                _this.changeDetectorRef.detectChanges();
            })));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    UshioComponent.prototype.subscribeTimeUpdate = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.timeUpdate = fromEvent(_this.video.nativeElement, 'timeupdate')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.mCurrentTime = _this.video.nativeElement.currentTime;
                _this.currentTimeChange.emit(_this.mCurrentTime);
                _this.updateFlyingSubtitles(_this.mCurrentTime);
                _this.changeDetectorRef.detectChanges();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.touchStart$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.interactMode = 'mobile';
        }));
        /** @type {?} */
        var desktopShowControlStateChange$ = this.mouseMove$.pipe(filter((/**
         * @return {?}
         */
        function () { return (_this.interactMode === 'desktop'); })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var rect = _this.video.nativeElement.getBoundingClientRect();
            return {
                showControl: e.clientX > rect.left &&
                    e.clientX < rect.right &&
                    e.clientY > rect.top &&
                    e.clientY < rect.bottom,
                delaySwitch: e.clientY < rect.bottom - 46
            };
        })));
        /** @type {?} */
        var showControlStateChange$ = merge(desktopShowControlStateChange$, this.mobileShowControlStateChange$).pipe(switchMap((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            return e.showControl
                ? merge(of({
                    showControl: true,
                    noCursor: false
                }), e.delaySwitch ? timer(_this.interactMode === 'desktop' ? 750 : 5000).pipe(mapTo({
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
        function (a, b) { return (a.showControl === b.showControl && a.noCursor === b.noCursor); })));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.subscriptions.push(showControlStateChange$.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                _this.mShowControl = state.showControl;
                _this.showControlProbablyChanged$.next(0);
                _this.mNoCursor = state.noCursor;
                _this.changeDetectorRef.detectChanges();
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
        function () {
            _this.mPaused = true;
            _this.pausedChange.emit(true);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'play')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.mPaused = false;
            _this.pausedChange.emit(false);
        })));
        this.subscribeTimeUpdate();
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'waiting')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.waiting = true;
            _this.waitingChange.emit(_this.waiting);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'playing')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.waiting = false;
            _this.waitingChange.emit(_this.waiting);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'progress')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.bufferedTime = ((/**
             * @param {?} timeRanges
             * @param {?} currentTime
             * @return {?}
             */
            function (timeRanges, currentTime) {
                /** @type {?} */
                var length = timeRanges.length;
                for (var i = 0; i < length; i++) {
                    if (timeRanges.end(i) <= currentTime) {
                        continue;
                    }
                    if (timeRanges.start(i) <= currentTime) {
                        return timeRanges.end(i);
                    }
                    return currentTime;
                }
                return currentTime;
            }))(_this.video.nativeElement.buffered, _this.video.nativeElement.currentTime);
        })));
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'loadedmetadata')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.duration = _this.video.nativeElement.duration;
            _this.durationChange.emit(_this.duration);
        })));
        this.video.nativeElement.volume = this.mVolume;
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'volumechange')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.mVolume = _this.video.nativeElement.volume;
            _this.volumeChange.emit(_this.mVolume);
        })));
        this.video.nativeElement.playbackRate = this.mPlaybackRate;
        this.subscriptions.push(fromEvent(this.video.nativeElement, 'ratechange')
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.mPlaybackRate = _this.video.nativeElement.playbackRate;
            _this.playbackRateChange.emit(_this.mPlaybackRate);
        })));
        this.subscriptions.push(fromEvent(this.element.nativeElement, 'contextmenu')
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.preventDefault();
            /** @type {?} */
            var outer = _this.element.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var panel = _this.contextMenu.nativeElement.getBoundingClientRect();
            if (e.clientX + panel.width + 20 > outer.right) {
                if (e.clientY + panel.height + 20 > outer.bottom) {
                    _this.mContextMenuPosition = "right: " + (outer.right - e.clientX) + "px; bottom: " + (outer.bottom - e.clientY) + "px";
                }
                else {
                    _this.mContextMenuPosition = "right: " + (outer.right - e.clientX) + "px; top: " + (e.clientY - outer.top) + "px";
                }
            }
            else {
                if (e.clientY + panel.height + 20 > outer.bottom) {
                    _this.mContextMenuPosition = "left: " + (e.clientX - outer.left) + "px; bottom: " + (outer.bottom - e.clientY) + "px";
                }
                else {
                    _this.mContextMenuPosition = "left: " + (e.clientX - outer.left) + "px; top: " + (e.clientY - outer.top) + "px";
                }
            }
            _this.contextMenuState = 'root';
            _this.showContextMenu = true;
        })));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.langContextMenuOption.nativeElement.addEventListener('click', _this.showLangMenu, true);
            _this.element.nativeElement.addEventListener('click', _this.onComponentClicked, true);
            document.addEventListener('click', _this.onDocumentClicked, true);
        }));
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.showControlChange$.subscribe((/**
             * @param {?} showControl
             * @return {?}
             */
            function (showControl) {
                if (showControl)
                    _this.onControlShown();
                else
                    _this.onControlDismiss();
                _this.showControlChange.emit(showControl);
            }));
        }));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
        function (sub) { return sub.unsubscribe(); }));
        this.subscriptions = [];
        this.langContextMenuOption.nativeElement.removeEventListener('click', this.showLangMenu, true);
        this.element.nativeElement.removeEventListener('click', this.onComponentClicked, true);
        document.removeEventListener('click', this.onDocumentClicked, true);
    };
    /**
     * @private
     * @return {?}
     */
    UshioComponent.prototype.updateSources = /**
     * @private
     * @return {?}
     */
    function () {
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
            var sm_1 = {};
            this.mSources.forEach((/**
             * @param {?} source
             * @return {?}
             */
            function (source) {
                if (!source.shortname) {
                    source.shortname = 'Untitled';
                }
                if (!sm_1[source.shortname]) {
                    sm_1[source.shortname] = {
                        shortName: source.shortname,
                        name: source.name || 'Untitled',
                        sources: []
                    };
                }
                sm_1[source.shortname].sources.push(source);
                if (source.default !== undefined && source.default !== null) {
                    sm_1[source.shortname].default = true;
                }
            }));
            this.sources = Object.values(sm_1);
        }
        /** @type {?} */
        var indexOfDefault = this.sources.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.default; }));
        this.playingSource = indexOfDefault >= 0 ? indexOfDefault : 0;
    };
    /**
     * @private
     * @return {?}
     */
    UshioComponent.prototype.updateSubtitles = /**
     * @private
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parsedSubtitles, _a, _b, sub, text, resp, parsed, e_2_1;
            var e_2, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        parsedSubtitles = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, 10, 11]);
                        _a = tslib_1.__values(this.mSubtitles), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 8];
                        sub = _b.value;
                        text = '';
                        if (!sub.value) return [3 /*break*/, 3];
                        text = sub.value;
                        return [3 /*break*/, 6];
                    case 3:
                        if (!sub.src) return [3 /*break*/, 6];
                        return [4 /*yield*/, fetch(sub.src)];
                    case 4:
                        resp = _d.sent();
                        return [4 /*yield*/, resp.text()];
                    case 5:
                        text = _d.sent();
                        _d.label = 6;
                    case 6:
                        parsed = {
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
                        _d.label = 7;
                    case 7:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 11:
                        this.subtitles = parsedSubtitles;
                        this.updateFlyingSubtitles();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?=} currentTime
     * @return {?}
     */
    UshioComponent.prototype.updateFlyingSubtitles = /**
     * @private
     * @param {?=} currentTime
     * @return {?}
     */
    function (currentTime) {
        var _this = this;
        if (currentTime === undefined) {
            currentTime = this.video.nativeElement.currentTime;
        }
        currentTime *= 1000;
        /** @type {?} */
        var flyingSubtitles = [];
        this.enabledSubtitles.forEach((/**
         * @param {?} subtitles
         * @return {?}
         */
        function (subtitles) {
            if (!subtitles.parsedSubtitles)
                return;
            /** @type {?} */
            var flyingSubtitlesTrack = [];
            subtitles.parsedSubtitles.forEach((/**
             * @param {?} subtitle
             * @return {?}
             */
            function (subtitle) {
                if (currentTime > subtitle.startTime && currentTime < subtitle.endTime) {
                    flyingSubtitlesTrack.push(tslib_1.__assign({}, subtitle, { texts: subtitle.texts.map((/**
                         * @param {?} text
                         * @return {?}
                         */
                        function (text) { return _this.sanitization.bypassSecurityTrustHtml(text); })) }));
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
    };
    /**
     * @private
     * @return {?}
     */
    UshioComponent.prototype.setAllControlPanelsPosition = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            [{
                    btn: _this.settingsBtn,
                    panel: _this.settingsPanel,
                    name: 'settings'
                }, {
                    btn: _this.sourceBtn,
                    panel: _this.sourcePanel,
                    name: 'source'
                }, {
                    btn: _this.subtitlesBtn,
                    panel: _this.subtitlesPanel,
                    name: 'subtitles'
                }, {
                    btn: _this.loopBtn,
                    panel: _this.loopPanel,
                    name: 'loop'
                }, {
                    btn: _this.fullScreenBtn,
                    panel: _this.fullScreenPanel,
                    name: 'fullscreen'
                }].forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.setPanelPosition(item.btn, item.panel, item.name); }));
            _this.changeDetectorRef.detectChanges();
        }), 0);
    };
    /**
     * @private
     * @param {?} btn
     * @param {?} panel
     * @param {?} name
     * @return {?}
     */
    UshioComponent.prototype.setPanelPosition = /**
     * @private
     * @param {?} btn
     * @param {?} panel
     * @param {?} name
     * @return {?}
     */
    function (btn, panel, name) {
        if (!this.element || !panel || !btn)
            return;
        /** @type {?} */
        var outerRect = this.element.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var panelRect = panel.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var btnRect = btn.nativeElement.getBoundingClientRect();
        if (panelRect.width / 2 - outerRect.right + btnRect.right > 0) {
            this.panelTranslations[name] = panelRect.width / 2 - outerRect.right + btnRect.right;
        }
        else {
            this.panelTranslations[name] = 0;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    UshioComponent.prototype.onSlotChange = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.subtitlesSlotUpdate$.next(e.target.assignedNodes().filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.nodeName === 'USHIO-SUBTITLES'; })));
        this.sourcesSlotUpdate$.next(e.target.assignedNodes().filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.nodeName === 'USHIO-SOURCE'; })));
        this.mInjectedStyles = e.target.assignedNodes()
            .filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.nodeName === 'STYLE'; })).map((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.innerHTML; }));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onVideoMaskClicked = /**
     * @return {?}
     */
    function () {
        if (this.interactMode === 'desktop') {
            this.togglePlay();
        }
        else {
            this.mobileShowControlStateChange$.next({
                showControl: !this.mShowControl,
                delaySwitch: true
            });
        }
    };
    /**
     * @param {?} i
     * @return {?}
     */
    UshioComponent.prototype.onSelectSource = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        if (i === this.playingSource)
            return;
        /** @type {?} */
        var currentTime = this.mCurrentTime;
        /** @type {?} */
        var paused = this.mPaused;
        this.playingSource = i;
        this.video.nativeElement.load();
        this.video.nativeElement.currentTime = currentTime;
        if (!paused)
            this.video.nativeElement.play();
    };
    /**
     * @param {?} i
     * @return {?}
     */
    UshioComponent.prototype.onCheckSubtitles = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        this.subtitles[i].enabled = !this.subtitles[i].enabled;
        this.updateFlyingSubtitles();
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.togglePlay = /**
     * @return {?}
     */
    function () {
        if (this.video.nativeElement.paused)
            this.video.nativeElement.play();
        else
            this.video.nativeElement.pause();
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.toggleMute = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.toggleLoop = /**
     * @return {?}
     */
    function () {
        this.video.nativeElement.loop = !this.video.nativeElement.loop;
        this.loopChange.emit(this.video.nativeElement.loop);
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.toggleFullscreen = /**
     * @return {?}
     */
    function () {
        if (!this.isFullScreen) {
            this.element.nativeElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.showLangMenu = /**
     * @return {?}
     */
    function () {
        this.contextMenuState = 'lang';
        this.showContextMenu = true;
        this.changeDetectorRef.detectChanges();
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onComponentClicked = /**
     * @return {?}
     */
    function () {
        this.focus = true;
        if (this.keySubscriptions.length === 0) {
            this.onFocused();
        }
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onDocumentClicked = /**
     * @return {?}
     */
    function () {
        this.focus = false;
        if (this.showContextMenu) {
            this.showContextMenu = false;
            this.changeDetectorRef.detectChanges();
        }
    };
    /**
     * @param {?} code
     * @return {?}
     */
    UshioComponent.prototype.setLanguage = /**
     * @param {?} code
     * @return {?}
     */
    function (code) {
        this.service.i18n.setLanguage(code);
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.toggleShowStatisticInfoPanel = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.showStatisticInfoPanel = !this.showStatisticInfoPanel;
        if (this.showStatisticInfoPanel) {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var animationFrame$ = of(null, animationFrameScheduler).pipe(repeat());
                _this.animationFrame = animationFrame$.subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (!_this.fpsStart)
                        _this.fpsStart = +new Date();
                    _this.fpsIndex++;
                    /** @type {?} */
                    var fpsCurrent = +new Date();
                    if (fpsCurrent - _this.fpsStart > 1000) {
                        _this.fps = ((_this.fpsIndex / (fpsCurrent - _this.fpsStart)) * 1000).toFixed(2);
                        _this.fpsStart = +new Date();
                        _this.fpsIndex = 0;
                        _this.changeDetectorRef.detectChanges();
                    }
                }));
            }));
        }
        else {
            this.animationFrame.unsubscribe();
        }
    };
    UshioComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ushio-player',
                    template: "<div [className]=\"'ushio-player ' + interactMode + (showControl ? ' mouse-hover' : '') + pausedClass + waitingClass\">\n  <div [className]=\"'ushio-player-video-mask' + (noCursor ? ' no-cursor' : '')\" (click)=\"onVideoMaskClicked()\">\n    <div [className]=\"'video-state-buff-wrap' + waitingClass\">\n      <img class=\"video-state-buff\" src=\"data:image/gif;base64,R0lGODlhIAAgALMIADc3N5eXl3l5eVdXV9PT0+3t7bS0tCcnJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0ZCQUZCNUYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0ZCQUZCNkYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRkJBRkIzRjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDRkJBRkI0RjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqThrevr+X3eBpOWVGZCJWgECMMZiRf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlRKuWMlgy4VivwSueOAFa8fVtHrN3ggEJIPB+X5/5PJSHQ7Czz97GQEYfoB2GAGJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWupOGta+v5fd4Gk5ZXZkYkaAR4wxmJE/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVGq5YCWDLhWK/Bq4Y4AVrx9W0es3eDAakQMD5fn/k8lIdDsLPP3sZAhh+gHYYAomEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJK6k4a0r6/l93gaTllVmRiZoBFjDGYkb9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUGrljJYcuFYr8BrvjgBWvH1bR6zd4AACSBwPl+f+TyUh0Ows8/exkDGH6AdhgDiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUmrqThravr+X3eBpOWVGZGJWgASMMZiQf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlQquWElhy4VivwKuuOAFa8fVtHrN3hwOpMHA+X5/5PJSHQ7Czz97GQAYfoB2GACJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWuoOGsa+v5fd4Gk5ZWZkYmaABowxmJC/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVDq5YCWHLhWK/A66Y4AVrx9W0es3eFAokAMD5fn/k8lIdDsLPP3sZBxh+gHYYB4mEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJq6g4ayr6/l93gaTllVmQidoABjDGYkP9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUCrliJYcuFYr8ArtjgBWvH1bR6zd4QCKTDwfl+f+TyUh0Ows8/exkFGH6AdhgFiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqDhrOvr+X3eBpOWVmZCJGgAKMMZiQP3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlR6uWElgy4VivweuOOAFa8fVtHrN3hgMpELB+X5/5PJSHQ7Czz97GQQYfoB2GASJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSSuoOGsK+v5fd4Gk5ZXZkInaAQ4wxmJH/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVFq5YiWDLhWK/Ba5Y4AVrx9W0es3eBAIkAsH5fn/k8lIdDsLPP3sZBhh+gHYYBomEeYAaiYOEVI9tEpOUlm2YmU4RADs=\" alt=\"buffering\">\n    </div>\n  </div>\n  <div class=\"ushio-player-video\">\n    <video #video\n      [attr.crossOrigin]=\"crossorigin\"\n      [attr.poster]=\"poster\"\n      [attr.autoplay]=\"autoplay\"\n      [attr.preload]=\"preload\"\n    >\n      Your browser is too old which doesn't support HTML5 video.\n      <source *ngFor=\"let source of sources[playingSource].sources\"\n              [src]=\"source.src\" [attr.type]=\"source.type\"\n      />\n    </video>\n  </div>\n  <div class=\"ushio-player-custom-mask\">\n    <slot (slotchange)=\"onSlotChange($event)\"></slot>\n  </div>\n  <div class=\"ushio-player-subtitle-container\">\n    <div *ngFor=\"let subtitles of flyingSubtitles\"\n         [className]=\"'ushio-player-subtitle-wrap ' + subtitles.class\">\n      <div *ngFor=\"let subtitle of subtitles.parsedSubtitles\" class=\"ushio-player-subtitle\">\n        <div *ngFor=\"let line of subtitle.texts\" class=\"subtitle-line\">\n          <span [innerHTML]=\"line\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"ushio-player-video-control-mask\"></div>\n  <div class=\"ushio-player-video-control-wrap\">\n    <div class=\"ushio-player-video-control\">\n      <div class=\"video-control-top\">\n        <div [className]=\"'video-progress' + thumbMouseDownClass\">\n          <div class=\"video-progress-slider\" #slider>\n            <div class=\"slider-track\">\n              <div class=\"slider-track-bar-wrap\">\n                <div class=\"bar-buffer\" [style]=\"bufferedProgress\"></div>\n                <div class=\"bar-normal\" [style]=\"playedProgress\"></div>\n              </div>\n              <div class=\"slider-track-thumb\" [style]=\"thumbPosition\">\n                <div class=\"thumb-dot\"></div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'video-progress-detail' + progressDetailClass\" [style]=\"progressDetailPosition\">\n            <div *ngIf=\"thumbnails\"\n                 class=\"video-progress-detail-container\" [style]=\"progressDetailContainerPosition\">\n              <div class=\"detail-img\" [style]=\"progressDetailImgStyle\"></div>\n            </div>\n            <div class=\"video-progress-detail-sign\">\n              <div class=\"sign-down\"></div>\n              <div class=\"sign-up\"></div>\n            </div>\n            <div class=\"video-progress-detail-time\" [style]=\"progressDetailTimePosition\">\n              {{progressDetailTime}}\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"video-control-bottom\">\n        <div class=\"video-control-bottom-left\">\n          <div [className]=\"'ushio-player-btn btn-start' + pausedClass\" (click)=\"togglePlay()\">\n            <span class=\"ushio-player-icon icon-play\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-play\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-pause\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-pause\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n          </div>\n          <div class=\"video-time-wrap\">\n            <span class=\"video-time-now\">{{currentTimeStr}}</span>\n            <span class=\"video-time-divider\">/</span>\n            <span class=\"video-time-total\">{{durationStr}}</span>\n          </div>\n        </div>\n        <div class=\"video-control-bottom-center\"></div>\n        <div [className]=\"'video-control-bottom-right' + controlHoveredClass\">\n          <div [className]=\"'ushio-player-btn btn-volume' + mutedClass + (volumeControl ? '' : ' hide')\"\n               #volumeBtn\n          >\n            <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"control-panel btn-volume-panel\" #volumePanel>\n              <div class=\"volume-num\">{{volume100}}</div>\n              <div class=\"volume-bar\" #volumeBar>\n                <div class=\"volume-bar-track\">\n                  <div class=\"volume-bar-track-wrap\">\n                    <div class=\"bar-normal\" [style]=\"volumeRate\"></div>\n                  </div>\n                  <div class=\"volume-bar-track-thumb\" [style]=\"volumeThumbPosition\">\n                    <div class=\"thumb-dot\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-source' + (sourceControl && sources.length > 1 ? '' : ' hide')\"\n               #sourceBtn\n          >\n            {{ sources[playingSource].shortName }}\n            <div class=\"btn-source-panel control-panel\" #sourcePanel [style]=\"sourcePanelPosition\">\n              <ul>\n                <li *ngFor=\"let source of sources; index as i\"\n                    (click)=\"onSelectSource(i)\"\n                    [className]=\"playingSource === i ? 'selected' : ''\"\n                >\n                  {{ source.name }}\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-subtitles' + subtitleEnabledClass + (subtitlesControl && subtitles.length > 0 ? '' : ' hide')\"\n               #subtitlesBtn\n          >\n            <span class=\"ushio-player-icon icon-subtitles-off\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-subtitles-on\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-subtitles-panel control-panel\" #subtitlesPanel [style]=\"subtitlesPanelPosition\">\n              <ul>\n                <li *ngFor=\"let subtitleTrack of subtitles; index as i\"\n                    (click)=\"onCheckSubtitles(i)\"\n                    [className]=\"subtitleTrack.enabled ? 'checked' : ''\"\n                >\n                  <span *ngIf=\"!subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-default\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-default\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span *ngIf=\"subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-selected\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-selected\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span>{{ subtitleTrack.name }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-settings' + (settingsControl ? '' : ' hide')\"\n               #settingsBtn\n          >\n            <span class=\"ushio-player-icon icon-settings\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-settings\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-settings-panel control-panel\" #settingsPanel [style]=\"settingsPanelPosition\">\n              <div class=\"panel-box settings-panel-speed\">\n                <div class=\"panel-box-title\">\n                  {{t('speed')}}\n                </div>\n                <div class=\"panel-box-content panel-speed-content speed-bar\" #speedBar>\n                  <div class=\"speed-track\">\n                    <div class=\"speed-track-wrap\"></div>\n                    <div class=\"speed-track-steps\">\n                      <div class=\"speed-track-steps-item step-item-0\" style=\"left: 0\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 20%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.75</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 40%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">{{t('normal')}}</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 60%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.25</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 80%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item step-item-100\" style=\"left: 100%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">2.0</div>\n                      </div>\n                    </div>\n                    <div class=\"speed-track-thumb\" [style]=\"speedThumbPosition\">\n                      <div class=\"thumb-dot\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-loop' + loopClass + (loopControl ? '' : ' hide')\"\n               (click)=\"toggleLoop()\"\n               #loopBtn\n          >\n            <span class=\"ushio-player-icon icon-loop-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-loop-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title btn-title-loop\" #loopPanel [style]=\"loopPanelPosition\">\n              {{ t('noLoop') }}\n            </div>\n            <div class=\"btn-title btn-title-noloop\" [style]=\"loopPanelPosition\">\n              {{ t('loop') }}\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-fullscreen' + fullscreenClass  + (fullscreenControl ? '' : ' hide')\"\n               (click)=\"toggleFullscreen()\"\n               #fullScreenBtn\n          >\n            <span class=\"ushio-player-icon icon-fullscreen-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-fullscreen-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title\" #fullScreenPanel [style]=\"fullScreenPanelPosition\">\n              {{ fullscreenClass === ' video-state-fullscreen' ? t('exitFullscreen') : t('fullscreen') }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [className]=\"'ushio-context-menu control-panel ' + contextMenuClass\"\n       #contextMenu\n       [style]=\"contextMenuPosition\"\n  >\n    <div class=\"ushio-context-menu-root\">\n      <ul>\n        <li (click)=\"toggleShowStatisticInfoPanel()\">{{t('statistic')}}</li>\n        <li #langContextMenuOption>{{t('language')}}</li>\n        <li>\n          <a target=\"_blank\" referrerpolicy=\"no-referrer\" href=\"https://github.com/rikakomoe/ushio\">\n            Ushio Player v{{version}}\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"ushio-context-menu-lang\">\n      <ul>\n        <li *ngFor=\"let lang of languages\" (click)=\"setLanguage(lang[0])\">{{lang[1]}}</li>\n      </ul>\n    </div>\n  </div>\n  <div [className]=\"'ushio-statistic-info control-panel' + statisticInfoPanelClass\">\n    <a class=\"dismiss\" (click)=\"toggleShowStatisticInfoPanel()\">[x]</a>\n    <table>\n      <tr><td>Player version</td><td>{{detailedVersion}}</td></tr>\n      <tr><td>Player FPS</td><td>{{fps}}</td></tr>\n      <tr><td>Video resolution</td><td>{{videoResolution}}</td></tr>\n      <tr><td>Video duration</td><td>{{videoDuration}}</td></tr>\n      <tr><td>Current time</td><td>{{videoCurrentTime}}</td></tr>\n    </table>\n  </div>\n  <div [className]=\"'ushio-volume-hint' + volumeHintClass\">\n    <span [className]=\"mutedClass\">\n      <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n      <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n    </span>\n    <span *ngIf=\"volume100\">{{volume100}}%</span>\n    <span *ngIf=\"!volume100\">{{t('mute')}}</span>\n  </div>\n  <div class=\"ushio-res\">\n    <div *ngFor=\"let style of injectedStyles\" [innerHTML]=\"style\"></div>\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <symbol id=\"ushio-play\">\n        <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n      </symbol>\n      <symbol id=\"ushio-pause\">\n        <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-max\">\n        <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-min\">\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n        <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-off\">\n        <path d=\"M15.172 18H4a2 2 0 0 1-2-2V6c0-.34.084-.658.233-.938l-.425-.426a1 1 0 1 1 1.414-1.414l15.556 15.556a1 1 0 0 1-1.414 1.414L15.172 18zM4.962 7.79C4.385 8.141 4 8.776 4 9.5v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .713-.958L4.962 7.79zM6.828 4H18a2 2 0 0 1 2 2v10c0 .34-.084.658-.233.938l-2.48-2.48A1 1 0 0 0 17 12.5h-1.672L14 11.172V10.5a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2h-3a2 2 0 0 0-1.977 1.695L6.828 4z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-on\">\n        <path d=\"M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 5.5a1 1 0 1 0 0-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2zm8 0a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2h-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-default\">\n        <path d=\"M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0-2h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-selected\">\n        <path d=\"M13 18.25l-1.8-1.8c-.6-.6-1.65-.6-2.25 0s-.6 1.5 0 2.25l2.85 2.85c.318.318.762.468 1.2.448.438.02.882-.13 1.2-.448l8.85-8.85c.6-.6.6-1.65 0-2.25s-1.65-.6-2.25 0l-7.8 7.8zM8 4h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-settings\">\n        <circle cx=\"11\" cy=\"11\" r=\"2\"></circle>\n        <path d=\"M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-on\">\n        <path d=\"M17 16H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .353.853H4v2a2 2 0 0 0 2 2h11a1 1 0 0 0 0-2zM19.793 8H18V6a2 2 0 0 0-2-2H5a1 1 0 0 0 0 2h11v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793A.5.5 0 0 0 19.793 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-off\">\n        <path d=\"M3.222 3.222a.999.999 0 1 0-1.414 1.414l11.435 11.435H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .354.854H4v2a2 2 0 0 0 2 2h9.243l2.121 2.121a.999.999 0 1 0 1.414-1.414L3.222 3.222zM19.793 8.071H18v-2a2 2 0 0 0-2-2H6.899l2 2H16v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793a.5.5 0 0 0-.353-.853z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-off\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 .5.5v1zm0-8a.5.5 0 0 1-.5.5H6v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm10 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H16v-1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-on\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm10 4a.5.5 0 0 1-.5.5H16v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 .5.5v1z\"></path>\n      </symbol>\n    </svg>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.ShadowDom,
                    styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
                }] }
    ];
    /** @nocollapse */
    UshioComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: UshioService }
    ]; };
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
    return UshioComponent;
}());
export { UshioComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXNoaW8vIiwic291cmNlcyI6WyJsaWIvdXNoaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVVLGlCQUFpQixFQUNoQyxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQUUsWUFBWSxFQUN4QixLQUFLLEVBQUUsTUFBTSxFQUVMLE1BQU0sRUFDZCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUE7QUFDbkUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQ3ZDLE9BQU8sRUFBZ0IsS0FBSyxFQUM3QixNQUFNLE1BQU0sQ0FBQTtBQUNiLE9BQU8sRUFDTCxTQUFTLEVBQUUsb0JBQW9CLEVBQy9CLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFDdEQsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFekQ7SUFBQTtJQVVBLENBQUM7O2dCQVZBLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7c0JBRUUsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOztJQUNSLGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBTlksV0FBVzs7O0lBQ3RCLDBCQUFxQjs7SUFDckIsMkJBQXFCOztJQUNyQixnQ0FBMEI7O0lBQzFCLDJCQUFxQjs7SUFDckIsOEJBQXlCOztBQUczQjtJQUFBO0lBWUEsQ0FBQzs7Z0JBWkEsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsaUJB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IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInXG5pbXBvcnQge1xuICBhbmltYXRpb25GcmFtZVNjaGVkdWxlcixcbiAgZnJvbUV2ZW50LCBtZXJnZSwgTkVWRVIsIE9ic2VydmFibGUsIG9mLFxuICBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRpbWVyXG59IGZyb20gJ3J4anMnXG5pbXBvcnQge1xuICBjb25jYXRNYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsIG1hcCwgbWFwVG8sIHJlcGVhdCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRhcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0IHsgSVN1YnRpdGxlLCBVc2hpb1NlcnZpY2UgfSBmcm9tICcuL3VzaGlvLnNlcnZpY2UnXG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndXNoaW8tc291cmNlJ1xufSlcbmV4cG9ydCBjbGFzcyBVc2hpb1NvdXJjZSB7XG4gIEBJbnB1dCgpIHNyYyE6IHN0cmluZ1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmdcbiAgQElucHV0KCkgc2hvcnRuYW1lOiBzdHJpbmdcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIGRlZmF1bHQ6IGJvb2xlYW5cbn1cblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICd1c2hpby1zdWJ0aXRsZXMnXG59KVxuZXhwb3J0IGNsYXNzIFVzaGlvU3VidGl0bGVzIHtcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZ1xuICBASW5wdXQoKSBzcmM6IHN0cmluZ1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmdcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmdcbiAgQElucHV0KCkgc3JjbGFuZzogc3RyaW5nXG4gIEBJbnB1dCgpIGRlZmF1bHQ6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFNvdXJjZSB7XG4gIHNob3J0TmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzb3VyY2VzOiB7XG4gICAgc3JjOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICB9W11cbiAgZGVmYXVsdD86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFN1YnRpdGxlcyB7XG4gIG5hbWU6IHN0cmluZ1xuICBjbGFzczogc3RyaW5nXG4gIHBhcnNlZFN1YnRpdGxlczogSVN1YnRpdGxlW11cbiAgZW5hYmxlZDogYm9vbGVhblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1c2hpby1wbGF5ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdXNoaW8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi91c2hpby5jb21wb25lbnQuc3R5bCddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb21cbn0pXG5leHBvcnQgY2xhc3MgVXNoaW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBtSW5qZWN0ZWRTdHlsZXMgPSBbXVxuICBnZXQgaW5qZWN0ZWRTdHlsZXMgKCkge1xuICAgIHJldHVybiB0aGlzLm1JbmplY3RlZFN0eWxlcy5tYXAoXG4gICAgICBzdHlsZSA9PiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChgXG4gICAgICA8c3R5bGU+XG4gICAgICAgJHtzdHlsZX1cbiAgICAgIDwvc3R5bGU+XG4gICAgYCkpXG4gIH1cblxuICBASW5wdXQoKSBzZXQgc3JjIChzcmMpIHtcbiAgICB0aGlzLm1TcmMgPSBzcmNcbiAgICB0aGlzLnVwZGF0ZVNvdXJjZXMoKVxuICB9XG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLm1TcmNcbiAgfVxuICBASW5wdXQoKSBwb3N0ZXJcbiAgQElucHV0KCkgY3Jvc3NvcmlnaW5cbiAgQElucHV0KCkgYXV0b3BsYXlcbiAgQElucHV0KCkgcHJlbG9hZCA9ICdtZXRhZGF0YSdcbiAgQElucHV0KCkgc2V0IGxhbmcgKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuc2VydmljZS5pMThuLnNldExhbmd1YWdlKGxhbmcpXG4gIH1cbiAgQElucHV0KCkgdGh1bWJuYWlsc1xuXG4gIHByaXZhdGUgbVNyY1xuICBwcml2YXRlIG1Tb3VyY2VzID0gW11cbiAgc291cmNlczogU291cmNlW10gPSBbXVxuICBwbGF5aW5nU291cmNlID0gMFxuXG4gIHByaXZhdGUgbVN1YnRpdGxlcyA9IFtdXG4gIHN1YnRpdGxlczogU3VidGl0bGVzW10gPSBbXVxuICBnZXQgZW5hYmxlZFN1YnRpdGxlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidGl0bGVzLmZpbHRlcihzID0+IHMuZW5hYmxlZClcbiAgfVxuICBmbHlpbmdTdWJ0aXRsZXM6IFN1YnRpdGxlc1tdID0gW11cblxuICBwcml2YXRlIG1Wb2x1bWUgPSAxXG4gIEBJbnB1dCgpIHNldCB2b2x1bWUgKHZvbHVtZSkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSB2b2x1bWVcbiAgfVxuICBnZXQgdm9sdW1lMTAwICgpIHtcbiAgICBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkKSByZXR1cm4gMFxuICAgIHJldHVybiBNYXRoLnJvdW5kKHRoaXMubVZvbHVtZSAqIDEwMClcbiAgfVxuICBAT3V0cHV0KCkgdm9sdW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcblxuICBwcml2YXRlIG1QbGF5YmFja1JhdGUgPSAxXG4gIEBJbnB1dCgpIHNldCBwbGF5YmFja1JhdGUgKHBsYXliYWNrUmF0ZSkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGVcbiAgfVxuICBAT3V0cHV0KCkgcGxheWJhY2tSYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcblxuICBwcml2YXRlIG1Wb2x1bWVDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgdm9sdW1lQ29udHJvbCAodm9sdW1lQ29udHJvbCkge1xuICAgIHRoaXMubVZvbHVtZUNvbnRyb2wgPSB2b2x1bWVDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCB2b2x1bWVDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tVm9sdW1lQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbVNvdXJjZUNvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzb3VyY2VDb250cm9sIChzb3VyY2VDb250cm9sKSB7XG4gICAgdGhpcy5tU291cmNlQ29udHJvbCA9IHNvdXJjZUNvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHNvdXJjZUNvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1Tb3VyY2VDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtU3VidGl0bGVzQ29udHJvbCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHN1YnRpdGxlc0NvbnRyb2wgKHN1YnRpdGxlc0NvbnRyb2wpIHtcbiAgICB0aGlzLm1TdWJ0aXRsZXNDb250cm9sID0gc3VidGl0bGVzQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgc3VidGl0bGVzQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVN1YnRpdGxlc0NvbnRyb2xcbiAgfVxuICBwcml2YXRlIG1TZXR0aW5nc0NvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzZXR0aW5nc0NvbnRyb2wgKHNldHRpbmdzQ29udHJvbCkge1xuICAgIHRoaXMubVNldHRpbmdzQ29udHJvbCA9IHNldHRpbmdzQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgc2V0dGluZ3NDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU2V0dGluZ3NDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtTG9vcENvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBsb29wQ29udHJvbCAobG9vcENvbnRyb2wpIHtcbiAgICB0aGlzLm1Mb29wQ29udHJvbCA9IGxvb3BDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBsb29wQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubUxvb3BDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtRnVsbHNjcmVlbkNvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBmdWxsc2NyZWVuQ29udHJvbCAoZnVsbHNjcmVlbkNvbnRyb2wpIHtcbiAgICB0aGlzLm1GdWxsc2NyZWVuQ29udHJvbCA9IGZ1bGxzY3JlZW5Db250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBmdWxsc2NyZWVuQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubUZ1bGxzY3JlZW5Db250cm9sXG4gIH1cblxuICBAVmlld0NoaWxkKCd2aWRlbycsIHsgc3RhdGljOiB0cnVlIH0pIHZpZGVvXG4gIEBWaWV3Q2hpbGQoJ3NsaWRlcicsIHsgc3RhdGljOiB0cnVlIH0pIHNsaWRlclxuICBAVmlld0NoaWxkKCd2b2x1bWVCYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSB2b2x1bWVCYXJcbiAgQFZpZXdDaGlsZCgndm9sdW1lUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSB2b2x1bWVQYW5lbFxuICBAVmlld0NoaWxkKCd2b2x1bWVCdG4nLCB7IHN0YXRpYzogdHJ1ZSB9KSB2b2x1bWVCdG5cbiAgQFZpZXdDaGlsZCgnc2V0dGluZ3NQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHNldHRpbmdzUGFuZWxcbiAgQFZpZXdDaGlsZCgnc2V0dGluZ3NCdG4nLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXR0aW5nc0J0blxuICBAVmlld0NoaWxkKCdzcGVlZEJhcicsIHsgc3RhdGljOiB0cnVlIH0pIHNwZWVkQmFyXG4gIEBWaWV3Q2hpbGQoJ3NvdXJjZVBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgc291cmNlUGFuZWxcbiAgQFZpZXdDaGlsZCgnc291cmNlQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc291cmNlQnRuXG4gIEBWaWV3Q2hpbGQoJ3N1YnRpdGxlc1BhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgc3VidGl0bGVzUGFuZWxcbiAgQFZpZXdDaGlsZCgnc3VidGl0bGVzQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc3VidGl0bGVzQnRuXG4gIEBWaWV3Q2hpbGQoJ2xvb3BCdG4nLCB7IHN0YXRpYzogdHJ1ZSB9KSBsb29wQnRuXG4gIEBWaWV3Q2hpbGQoJ2xvb3BQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIGxvb3BQYW5lbFxuICBAVmlld0NoaWxkKCdmdWxsU2NyZWVuQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgZnVsbFNjcmVlbkJ0blxuICBAVmlld0NoaWxkKCdmdWxsU2NyZWVuUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmdWxsU2NyZWVuUGFuZWxcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZXh0TWVudVxuICBAVmlld0NoaWxkKCdsYW5nQ29udGV4dE1lbnVPcHRpb24nLCB7IHN0YXRpYzogdHJ1ZSB9KSBsYW5nQ29udGV4dE1lbnVPcHRpb25cblxuICBAQ29udGVudENoaWxkcmVuKFVzaGlvU291cmNlKSBzb3VyY2VDb250ZW50Q2hpbGRyZW4hOiBRdWVyeUxpc3Q8VXNoaW9Tb3VyY2U+XG4gIEBDb250ZW50Q2hpbGRyZW4oVXNoaW9TdWJ0aXRsZXMpIHN1YnRpdGxlc0NvbnRlbnRDaGlsZHJlbiE6IFF1ZXJ5TGlzdDxVc2hpb1N1YnRpdGxlcz5cbiAgcHJpdmF0ZSBzdWJ0aXRsZXNTbG90VXBkYXRlJCA9IG5ldyBTdWJqZWN0PEhUTUxFbGVtZW50W10+KClcbiAgcHJpdmF0ZSBzb3VyY2VzU2xvdFVwZGF0ZSQgPSBuZXcgU3ViamVjdDxIVE1MRWxlbWVudFtdPigpXG4gIHByaXZhdGUgc3VidGl0bGVzU2xvdENoYW5nZSQgPSB0aGlzLnN1YnRpdGxlc1Nsb3RVcGRhdGUkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgcHJpdmF0ZSBzb3VyY2VzU2xvdENoYW5nZSQgPSB0aGlzLnNvdXJjZXNTbG90VXBkYXRlJC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gIHByaXZhdGUgbW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBuZXcgU3ViamVjdDx7IHNob3dDb250cm9sOiBib29sZWFuLCBkZWxheVN3aXRjaDogYm9vbGVhbiB9PigpXG4gIHByaXZhdGUgc2hvd0NvbnRyb2xQcm9iYWJseUNoYW5nZWQkID0gbmV3IFN1YmplY3QoKVxuICBwcml2YXRlIHNob3dDb250cm9sQ2hhbmdlJCA9IHRoaXMuc2hvd0NvbnRyb2xQcm9iYWJseUNoYW5nZWQkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgbWFwKCgpID0+IHRoaXMuc2hvd0NvbnRyb2wpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgKVxuXG4gIGludGVyYWN0TW9kZTogJ2Rlc2t0b3AnIHwgJ21vYmlsZScgPSAnZGVza3RvcCdcbiAgcHJpdmF0ZSBmb2N1cyA9IGZhbHNlXG4gIHByaXZhdGUgbVNob3dDb250cm9sID0gZmFsc2VcbiAgcHJpdmF0ZSBtTm9DdXJzb3IgPSBmYWxzZVxuICBwcml2YXRlIHRodW1iTW91c2VEb3duID0gZmFsc2VcbiAgcHJpdmF0ZSBjb250cm9sTW91c2VEb3duID0gZmFsc2VcbiAgY29udHJvbEhvdmVyZWRDbGFzcyA9ICcnXG4gIHByaXZhdGUgc2hvd0NvbnRleHRNZW51ID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93U3RhdGlzdGljSW5mb1BhbmVsID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93Vm9sdW1lSGludCA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1Byb2dyZXNzRGV0YWlsID0gZmFsc2VcbiAgZ2V0IGlzRnVsbFNjcmVlbiAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ICE9PSBudWxsXG4gIH1cbiAgZ2V0IG1vdXNlRG93biAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJNb3VzZURvd24gfHwgdGhpcy5jb250cm9sTW91c2VEb3duXG4gIH1cbiAgZ2V0IHNob3dDb250cm9sICgpIHtcbiAgICByZXR1cm4gISEodGhpcy5tU2hvd0NvbnRyb2wgfHwgdGhpcy5tb3VzZURvd24pXG4gIH1cbiAgZ2V0IG5vQ3Vyc29yICgpIHtcbiAgICByZXR1cm4gIXRoaXMuc2hvd0NvbnRyb2wgJiYgdGhpcy5tTm9DdXJzb3JcbiAgfVxuICBAT3V0cHV0KCkgc2hvd0NvbnRyb2xDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgZ2V0IHRodW1iTW91c2VEb3duQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJNb3VzZURvd24gPyAnIHRodW1iLW1vdXNlLWRvd24nIDogJydcbiAgfVxuICBnZXQgcGF1c2VkQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubVBhdXNlZCA/ICcgdmlkZW8tc3RhdGUtcGF1c2UnIDogJyB2aWRlby1zdGF0ZS1wbGF5J1xuICB9XG4gIGdldCB3YWl0aW5nQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMud2FpdGluZyAmJiAhdGhpcy5tUGF1c2VkID8gJyB2aWRlby1zdGF0ZS13YWl0aW5nJyA6ICcnXG4gIH1cbiAgZ2V0IG11dGVkQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgfHwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9PT0gMClcbiAgICAgID8gJyB2aWRlby1zdGF0ZS1tdXRlZCcgOiAnIHZpZGVvLXN0YXRlLXZvbHVtZSdcbiAgfVxuICBnZXQgbG9vcENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcCA/ICcgdmlkZW8tc3RhdGUtbG9vcCcgOiAnIHZpZGVvLXN0YXRlLW5vbG9vcCdcbiAgfVxuICBnZXQgc3VidGl0bGVFbmFibGVkQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZFN1YnRpdGxlcy5sZW5ndGggPiAwID8gJyB2aWRlby1zdGF0ZS1zdWJ0aXRsZXMnIDogJyB2aWRlby1zdGF0ZS1ub3N1YnRpdGxlcydcbiAgfVxuICBnZXQgZnVsbHNjcmVlbkNsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzRnVsbFNjcmVlbiA/ICcgdmlkZW8tc3RhdGUtZnVsbHNjcmVlbicgOiAnIHZpZGVvLXN0YXRlLW5vZnVsbHNjcmVlbidcbiAgfVxuICBnZXQgY29udGV4dE1lbnVDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0TWVudVN0YXRlICsgKHRoaXMuc2hvd0NvbnRleHRNZW51ID8gJyBhY3RpdmUnIDogJycpXG4gIH1cbiAgZ2V0IHN0YXRpc3RpY0luZm9QYW5lbENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNob3dTdGF0aXN0aWNJbmZvUGFuZWwgPyAnIGFjdGl2ZScgOiAnJ1xuICB9XG4gIGdldCB2b2x1bWVIaW50Q2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1ZvbHVtZUhpbnQgPyAnIGFjdGl2ZScgOiAnJ1xuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbENsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNob3dQcm9ncmVzc0RldGFpbCA/ICcgYWN0aXZlJyA6ICcnXG4gIH1cblxuICBwcml2YXRlIG1QYXVzZWQgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBwYXVzZWQgKHBhdXNlZCkge1xuICAgIGlmIChwYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gIH1cbiAgQE91dHB1dCgpIHBhdXNlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBwcml2YXRlIG1DdXJyZW50VGltZSA9IDBcbiAgQElucHV0KCkgc2V0IGN1cnJlbnRUaW1lIChjdXJyZW50VGltZSkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lXG4gIH1cbiAgQE91dHB1dCgpIGN1cnJlbnRUaW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgcHJpdmF0ZSBkdXJhdGlvbiA9IDBcbiAgQE91dHB1dCgpIGR1cmF0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgcHJpdmF0ZSBidWZmZXJlZFRpbWUgPSAwXG4gIHByaXZhdGUgd2FpdGluZyA9IGZhbHNlXG4gIEBPdXRwdXQoKSB3YWl0aW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIEBJbnB1dCgpIHNldCBsb29wIChsb29wKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3AgPSBsb29wXG4gIH1cbiAgQE91dHB1dCgpIGxvb3BDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgc2V0IG11dGVkIChtdXRlZCkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCA9IG11dGVkXG4gIH1cbiAgQE91dHB1dCgpIG11dGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG5cbiAgZnBzID0gJzAuMDAnXG4gIHByaXZhdGUgZnBzU3RhcnQgPSAwXG4gIHByaXZhdGUgZnBzSW5kZXggPSAwXG5cbiAgZ2V0IGN1cnJlbnRUaW1lU3RyICgpOiBzdHJpbmcge1xuICAgIHJldHVybiBVc2hpb0NvbXBvbmVudC5mb3JtYXREdXJhdGlvbih0aGlzLm1DdXJyZW50VGltZSlcbiAgfVxuICBnZXQgZHVyYXRpb25TdHIgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFVzaGlvQ29tcG9uZW50LmZvcm1hdER1cmF0aW9uKHRoaXMuZHVyYXRpb24pXG4gIH1cbiAgZ2V0IGJ1ZmZlcmVkUHJvZ3Jlc3MgKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHNjYWxlWCgke3RoaXMuYnVmZmVyZWRUaW1lIC8gdGhpcy5kdXJhdGlvbn0pYFxuICAgIClcbiAgfVxuICBnZXQgcGxheWVkUHJvZ3Jlc3MgKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHNjYWxlWCgke3RoaXMubUN1cnJlbnRUaW1lIC8gdGhpcy5kdXJhdGlvbn0pYFxuICAgIClcbiAgfVxuICBnZXQgdGh1bWJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGxlZnQ6ICR7dGhpcy5tQ3VycmVudFRpbWUgLyB0aGlzLmR1cmF0aW9uICogMTAwfSVgXG4gICAgKVxuICB9XG4gIGdldCB2b2x1bWVSYXRlICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiBzY2FsZVkoJHt0aGlzLnZvbHVtZTEwMCAvIDEwMH0pYFxuICAgIClcbiAgfVxuICBnZXQgdm9sdW1lVGh1bWJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGJvdHRvbTogJHt0aGlzLnZvbHVtZTEwMH0lYFxuICAgIClcbiAgfVxuICBnZXQgc3BlZWRUaHVtYlBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgbGVmdDogJHtVc2hpb0NvbXBvbmVudC5tYXBTcGVlZFRvUHJvZ3Jlc3ModGhpcy5tUGxheWJhY2tSYXRlKX0lYFxuICAgIClcbiAgfVxuICBwcml2YXRlIHBhbmVsVHJhbnNsYXRpb25zID0ge1xuICAgIHNldHRpbmdzOiAwLFxuICAgIHNvdXJjZTogMCxcbiAgICBzdWJ0aXRsZXM6IDAsXG4gICAgbG9vcDogMCxcbiAgICBmdWxsc2NyZWVuOiAwXG4gIH1cbiAgZ2V0IHNldHRpbmdzUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuc2V0dGluZ3N9cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgZ2V0IHNvdXJjZVBhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLnNvdXJjZX1weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgc3VidGl0bGVzUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuc3VidGl0bGVzfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBsb29wUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMubG9vcH1weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgZnVsbFNjcmVlblBhbmVsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygkey10aGlzLnBhbmVsVHJhbnNsYXRpb25zLmZ1bGxzY3JlZW59cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgcHJpdmF0ZSBtQ29udGV4dE1lbnVQb3NpdGlvbiA9ICcnXG4gIGdldCBjb250ZXh0TWVudVBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbilcbiAgfVxuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uID0gJydcbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbiA9ICcnXG4gIHByaXZhdGUgbVByb2dyZXNzRGV0YWlsVGltZVBvc2l0aW9uID0gJydcbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgPSAwXG4gIGdldCBwcm9ncmVzc0RldGFpbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvbilcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMubVByb2dyZXNzRGV0YWlsQ29udGFpbmVyUG9zaXRpb24pXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsVGltZVBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tUHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24pXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsSW1nU3R5bGUgKCk6IFNhZmVTdHlsZSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvSGVpZ2h0ICogMTYwIC8gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvV2lkdGhcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYGhlaWdodDogJHtoZWlnaHR9cHg7XG4gICAgICAgbGluZS1oZWlnaHQ6ICR7aGVpZ2h0fXB4O1xuICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7dGhpcy50aHVtYm5haWxzfVwiKTtcbiAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtJHsoTWF0aC5jZWlsKHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb25SYXRlICogMTAwKSAtIDEpICogMTYwfXB4IDA7YFxuICAgIClcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxUaW1lICgpOiBzdHJpbmcge1xuICAgIHJldHVybiBVc2hpb0NvbXBvbmVudC5mb3JtYXREdXJhdGlvbih0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSAqIHRoaXMuZHVyYXRpb24pXG4gIH1cblxuICBsYW5ndWFnZXMgPSB0aGlzLnNlcnZpY2UuaTE4bi5sYW5ndWFnZXNcbiAgY29udGV4dE1lbnVTdGF0ZSA9ICdyb290J1xuICBnZXQgdmVyc2lvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS52ZXJzaW9uXG4gIH1cbiAgZ2V0IGRldGFpbGVkVmVyc2lvbiAoKSB7XG4gICAgcmV0dXJuIGB2JHt0aGlzLnNlcnZpY2UudmVyc2lvbn0gKCR7dGhpcy5zZXJ2aWNlLmJ1aWxkfSlgXG4gIH1cbiAgZ2V0IHZpZGVvUmVzb2x1dGlvbiAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52aWRlb1dpZHRofSB4ICR7dGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvSGVpZ2h0fWBcbiAgfVxuICBnZXQgdmlkZW9EdXJhdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5kdXJhdGlvbi50b0ZpeGVkKDYpXG4gIH1cbiAgZ2V0IHZpZGVvQ3VycmVudFRpbWUgKCkge1xuICAgIHJldHVybiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUudG9GaXhlZCg2KVxuICB9XG5cbiAgcHJpdmF0ZSB0aW1lVXBkYXRlOiBTdWJzY3JpcHRpb25cbiAgcHJpdmF0ZSBjb250cm9sSG92ZXJlZENoYW5nZTogU3Vic2NyaXB0aW9uXG4gIHByaXZhdGUgYW5pbWF0aW9uRnJhbWU6IFN1YnNjcmlwdGlvblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW11cbiAgcHJpdmF0ZSBtb3VzZVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW11cbiAgcHJpdmF0ZSBrZXlTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdXG4gIHByaXZhdGUgbW91c2VNb3ZlJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpXG4gIHByaXZhdGUgbW91c2VVcCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJylcbiAgcHJpdmF0ZSB0b3VjaE1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2htb3ZlJylcbiAgcHJpdmF0ZSB0b3VjaFN0YXJ0JCA9IGZyb21FdmVudChkb2N1bWVudCwgJ3RvdWNoc3RhcnQnKVxuICBwcml2YXRlIHRvdWNoRW5kJCA9IG1lcmdlKFxuICAgIGZyb21FdmVudChkb2N1bWVudCwgJ3RvdWNoZW5kJyksXG4gICAgZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hjYW5jZWwnKVxuICApXG4gIHByaXZhdGUgbW91c2VUb3VjaFVwJCA9IG1lcmdlKHRoaXMubW91c2VVcCQsIHRoaXMudG91Y2hFbmQkKVxuXG4gIHQgPSB0aGlzLnNlcnZpY2UuaTE4bi50XG5cbiAgc3RhdGljIG1hcFNwZWVkVG9Qcm9ncmVzcyAoc3BlZWQpIHtcbiAgICBpZiAoc3BlZWQgPCAuNSkgcmV0dXJuIDBcbiAgICBlbHNlIGlmIChzcGVlZCA8IDEuNSkgcmV0dXJuIChzcGVlZCAtIC41KSAqIDgwXG4gICAgZWxzZSBpZiAoc3BlZWQgPCAyLjApIHJldHVybiA4MCArIChzcGVlZCAtIDEuNSkgKiA0MFxuICAgIGVsc2UgcmV0dXJuIDEwMFxuICB9XG4gIHN0YXRpYyBtYXBQcm9ncmVzc1RvU3BlZWQgKHByb2dyZXNzKSB7XG4gICAgaWYgKHByb2dyZXNzIDwgLjEpIHJldHVybiAuNVxuICAgIGVsc2UgaWYgKHByb2dyZXNzIDwgLjkpIHJldHVybiAuNzUgKyAuMjUgKiBNYXRoLmZsb29yKChwcm9ncmVzcyAtIDAuMSkgKiA1KVxuICAgIGVsc2UgcmV0dXJuIDJcbiAgfVxuXG4gIHN0YXRpYyBmb3JtYXREdXJhdGlvbiAoZHVyYXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IGggPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gMzYwMClcbiAgICBjb25zdCBtID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDM2MDAgLyA2MClcbiAgICBjb25zdCBzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDYwKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChoICYmIGggPCAxMCkgeyBzdHIgKz0gYDAke2h9OmAgfSBlbHNlIGlmIChoKSB7IHN0ciArPSBgJHtofTpgIH1cbiAgICBpZiAobSA8IDEwKSB7IHN0ciArPSBgMCR7bX06YCB9IGVsc2UgeyBzdHIgKz0gYCR7bX06YCB9XG4gICAgaWYgKHMgPCAxMCkgeyBzdHIgKz0gYDAke3N9YCB9IGVsc2UgeyBzdHIgKz0gYCR7c31gIH1cbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgc2FuaXRpemF0aW9uOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBVc2hpb1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zaG93TGFuZ01lbnUgPSB0aGlzLnNob3dMYW5nTWVudS5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkNvbXBvbmVudENsaWNrZWQgPSB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbkRvY3VtZW50Q2xpY2tlZCA9IHRoaXMub25Eb2N1bWVudENsaWNrZWQuYmluZCh0aGlzKVxuICB9XG5cbiAgbmdPbkluaXQgKCkge1xuICAgIHRoaXMubVBhdXNlZCA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZWRcbiAgICB0aGlzLm1Wb2x1bWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lXG4gICAgdGhpcy5tUGxheWJhY2tSYXRlID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0ICgpIHtcbiAgICBjb25zdCBtYXBQcm9wc1RvT2JqZWN0ID0gKHByb3BzOiBzdHJpbmdbXSwgZm4pID0+IChzb3VyY2VPYmo6IGFueSkgPT4gKFxuICAgICAgcHJvcHMucmVkdWNlKChhZ2csIGN1cikgPT4gKHsgLi4uYWdnLCBbY3VyXTogZm4oc291cmNlT2JqLCBjdXIpIH0pLCB7fSlcbiAgICApXG4gICAgY29uc3Qgb25Db250ZW50Q2hpbGRyZW5PclNsb3RDaGFuZ2VkJCA9IChcbiAgICAgIGF0dHIsIGNvbnRlbnRDaGlsZHJlbjpcbiAgICAgIFF1ZXJ5TGlzdDxhbnk+LFxuICAgICAgc2xvdENoYW5nZSQ6IE9ic2VydmFibGU8SFRNTEVsZW1lbnRbXT5cbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnRDaGlsZHJlbk1hcCA9IG1hcFByb3BzVG9PYmplY3QoYXR0ciwgKG9iaiwgY3VyKSA9PiAob2JqW2N1cl0pKVxuICAgICAgY29uc3Qgc2xvdE1hcCA9IG1hcFByb3BzVG9PYmplY3QoYXR0ciwgKG9iaiwgY3VyKSA9PiAob2JqLmdldEF0dHJpYnV0ZShjdXIpKSlcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgb2YoY29udGVudENoaWxkcmVuLnRvQXJyYXkoKS5tYXAoY29udGVudENoaWxkcmVuTWFwKSksXG4gICAgICAgIGNvbnRlbnRDaGlsZHJlbi5jaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgbWFwKChjb250ZW50czogUXVlcnlMaXN0PGFueT4pID0+IChjb250ZW50cy50b0FycmF5KCkubWFwKGNvbnRlbnRDaGlsZHJlbk1hcCkpKVxuICAgICAgICApLFxuICAgICAgICBzbG90Q2hhbmdlJC5waXBlKFxuICAgICAgICAgIG1hcCgoY29udGVudHM6IEhUTUxFbGVtZW50W10pID0+IChcbiAgICAgICAgICAgIGNvbnRlbnRzLm1hcChzbG90TWFwKVxuICAgICAgICAgICkpXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgY29uc3Qgc3VidGl0bGVzQXR0ciA9IFsndmFsdWUnLCAndHlwZScsICdzcmMnLCAnbmFtZScsICdjbGFzcycsICdkZWZhdWx0JywgJ3NyY2xhbmcnXVxuICAgIGNvbnN0IHN1YnRpdGxlc0NoYW5nZSQgPSBvbkNvbnRlbnRDaGlsZHJlbk9yU2xvdENoYW5nZWQkKFxuICAgICAgc3VidGl0bGVzQXR0ciwgdGhpcy5zdWJ0aXRsZXNDb250ZW50Q2hpbGRyZW4sIHRoaXMuc3VidGl0bGVzU2xvdENoYW5nZSQpXG4gICAgY29uc3Qgc291cmNlc0F0dHIgPSBbJ3NyYycsICd0eXBlJywgJ25hbWUnLCAnc2hvcnRuYW1lJywgJ2RlZmF1bHQnXVxuICAgIGNvbnN0IHNvdXJjZXNDaGFuZ2UkID0gb25Db250ZW50Q2hpbGRyZW5PclNsb3RDaGFuZ2VkJChcbiAgICAgIHNvdXJjZXNBdHRyLCB0aGlzLnNvdXJjZUNvbnRlbnRDaGlsZHJlbiwgdGhpcy5zb3VyY2VzU2xvdENoYW5nZSQpXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnRpdGxlc0NoYW5nZSQuc3Vic2NyaWJlKGFzeW5jIChzdWJ0aXRsZXMpID0+IHtcbiAgICAgICAgdGhpcy5tU3VidGl0bGVzID0gc3VidGl0bGVzXG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlU3VidGl0bGVzKClcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc291cmNlc0NoYW5nZSQuc3Vic2NyaWJlKChzb3VyY2VzKSA9PiB7XG4gICAgICAgIHRoaXMubVNvdXJjZXMgPSBzb3VyY2VzXG4gICAgICAgIHRoaXMudXBkYXRlU291cmNlcygpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICB9XG5cbiAgb25VbmZvY3VzZWQgKCkge1xuICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSlcbiAgICB0aGlzLmtleVN1YnNjcmlwdGlvbnMgPSBbXVxuICB9XG5cbiAgb25Gb2N1c2VkICgpIHtcbiAgICBjb25zdCBvbktleURvd24kID0gY29kZSA9PiBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXlkb3duJykucGlwZShcbiAgICAgIGZpbHRlcigoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5mb2N1cyAmJiBlLmNvZGUgPT09IGNvZGUpLFxuICAgICAgdGFwKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgfSlcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ1NwYWNlJykuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICB0aGlzLnRvZ2dsZVBsYXkoKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLmtleVN1YnNjcmlwdGlvbnMucHVzaChvbktleURvd24kKCdBcnJvd1JpZ2h0Jykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZSArIDUgPCB0aGlzLmR1cmF0aW9uID8gdGhpcy5tQ3VycmVudFRpbWUgKyA1IDogdGhpcy5kdXJhdGlvblxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLmtleVN1YnNjcmlwdGlvbnMucHVzaChvbktleURvd24kKCdBcnJvd0xlZnQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1DdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lIC0gNSA+IDAgPyB0aGlzLm1DdXJyZW50VGltZSAtIDUgOiAwXG4gICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93VXAnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1Wb2x1bWUgPSB0aGlzLm1Wb2x1bWUgKyAwLjEgPCAwLjk5OTk5NiA/IHRoaXMubVZvbHVtZSArIDAuMSA6IDFcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLmtleVN1YnNjcmlwdGlvbnMucHVzaChvbktleURvd24kKCdBcnJvd0Rvd24nKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1Wb2x1bWUgPSB0aGlzLm1Wb2x1bWUgLSAwLjEgPiAwLjAwMDAwNCA/IHRoaXMubVZvbHVtZSAtIDAuMSA6IDBcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgfSlcbiAgICBjb25zdCBzaG93Vm9sdW1lSGludCQgPSBtZXJnZShvbktleURvd24kKCdBcnJvd1VwJyksIG9uS2V5RG93biQoJ0Fycm93RG93bicpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICAoKSA9PiBtZXJnZShvZih0cnVlKSwgdGltZXIoMTAwMCkucGlwZShtYXBUbyhmYWxzZSkpKVxuICAgICAgICApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5wdXNoKHNob3dWb2x1bWVIaW50JC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1ZvbHVtZUhpbnQgPSBlXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgICB9KVxuICB9XG5cbiAgb25Db250cm9sRGlzbWlzcyAoKSB7XG4gICAgdGhpcy5tb3VzZVN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpXG4gICAgdGhpcy5tb3VzZVN1YnNjcmlwdGlvbnMgPSBbXVxuICAgIGlmICh0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICAgIHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgb25Db250cm9sU2hvd24gKCkge1xuICAgIGNvbnN0IGlmTW91c2VJbkFyZWEgPSAoZTogTW91c2VFdmVudCwgYnRuRWxlbWVudCwgcG9wVXBFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCByZWN0MSA9IHBvcFVwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgY29uc3QgcmVjdDIgPSBidG5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICByZXR1cm4gKGUuY2xpZW50WCA+IHJlY3QxLmxlZnQgJiZcbiAgICAgICAgZS5jbGllbnRYIDwgcmVjdDEucmlnaHQgJiZcbiAgICAgICAgZS5jbGllbnRZID4gcmVjdDEudG9wICYmXG4gICAgICAgIGUuY2xpZW50WSA8IHJlY3QxLmJvdHRvbSkgfHwgKGUuY2xpZW50WCA+IHJlY3QyLmxlZnQgJiZcbiAgICAgICAgZS5jbGllbnRYIDwgcmVjdDIucmlnaHQgJiZcbiAgICAgICAgZS5jbGllbnRZID4gcmVjdDIudG9wICYmXG4gICAgICAgIGUuY2xpZW50WSA8IHJlY3QyLmJvdHRvbSlcbiAgICB9XG4gICAgY29uc3Qgb25Db250cm9sQnRuSG92ZXJTdGF0ZUNoYW5nZWQkID0gKGJ0bnMpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1vdXNlTW92ZSQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBidG4gb2YgYnRucykge1xuICAgICAgICAgICAgaWYgKGlmTW91c2VJbkFyZWEoZSwgYnRuLmJ0bkVsZW1lbnQsIGJ0bi5wb3BVcEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvZihgIGJ0bi0ke2J0bi5idG5OYW1lfS1ob3ZlcmApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aW1lcigxNTApLnBpcGUoXG4gICAgICAgICAgICBtYXBUbygnJylcbiAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IG1vdXNlSG92ZXJQcm9ncmVzc1N0YXRlJCA9IHRoaXMubW91c2VNb3ZlJC5waXBlKFxuICAgICAgZmlsdGVyKCgpID0+ICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSksXG4gICAgICBtYXAoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgeUNlbnRlciA9IChyZWN0LnRvcCArIHJlY3QuYm90dG9tKSAvIDJcbiAgICAgICAgaWYgKE1hdGguYWJzKGUuY2xpZW50WSAtIHlDZW50ZXIpIDwgOCAmJiBlLmNsaWVudFggPiByZWN0LmxlZnQgJiYgZS5jbGllbnRYIDwgcmVjdC5yaWdodCkge1xuICAgICAgICAgIGNvbnN0IGxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnRcbiAgICAgICAgICBjb25zdCBjb250YWluZXJMZWZ0ID0gbGVmdCA8IDgwID8gOTAgLSBsZWZ0IDogbGVmdCA+IHJlY3Qud2lkdGggLSA4MCA/IHJlY3Qud2lkdGggLSBsZWZ0IC0gNzAgOiAxMFxuICAgICAgICAgIGNvbnN0IHRpbWVMZWZ0ID0gbGVmdCA8IDIwID8gMzAgLSBsZWZ0IDogbGVmdCA+IHJlY3Qud2lkdGggLSAyMCA/IHJlY3Qud2lkdGggLSBsZWZ0IC0gMTAgOiAxMFxuICAgICAgICAgIHJldHVybiB7IGxlZnQsIGNvbnRhaW5lckxlZnQsIHRpbWVMZWZ0LCB3aWR0aDogcmVjdC53aWR0aCB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBhICE9PSB0eXBlb2YgYikge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gYS5sZWZ0ID09PSBiLmxlZnQgJiYgYS5jb250YWluZXJMZWZ0ID09PSBiLmNvbnRhaW5lckxlZnRcbiAgICAgICAgICAgICYmIGEudGltZUxlZnQgPT09IGIudGltZUxlZnQgJiYgYS53aWR0aCA9PT0gYi53aWR0aFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhID09PSBiXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdXNlSG92ZXJQcm9ncmVzc1N0YXRlJC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB0aGlzLnNob3dQcm9ncmVzc0RldGFpbCA9IHN0YXRlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NEZXRhaWwgPSB0cnVlXG4gICAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvbiA9IGBsZWZ0OiAke3N0YXRlLmxlZnR9cHhgXG4gICAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbiA9IGBsZWZ0OiAke3N0YXRlLmNvbnRhaW5lckxlZnR9cHhgXG4gICAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24gPSBgbGVmdDogJHtzdGF0ZS50aW1lTGVmdH1weGBcbiAgICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSA9IHN0YXRlLmxlZnQgLyBzdGF0ZS53aWR0aFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGNvbnN0IG1hcFRvUmF0ZSA9IChlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpID0+IG1hcChcbiAgICAgIChtb3ZlRXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50Q29vcmRpbmF0ZSA9IG1vdmVFdmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnRcbiAgICAgICAgICA/IG1vdmVFdmVudC5jaGFuZ2VkVG91Y2hlc1swXVxuICAgICAgICAgIDogbW92ZUV2ZW50XG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBwID0gcHJvZ3Jlc3MoZXZlbnRDb29yZGluYXRlLCByZWN0KVxuICAgICAgICBjb25zdCB0ID0gdG90YWwocmVjdClcbiAgICAgICAgaWYgKHAgPCAwKSBwID0gMFxuICAgICAgICBlbHNlIGlmIChwID4gdCkgcCA9IHRcbiAgICAgICAgcmV0dXJuIHAgLyB0XG4gICAgICB9XG4gICAgKVxuICAgIGNvbnN0IG9uTW91c2VUb3VjaERvd24kID0gKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCkgPT4ge1xuICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ21vdXNlZG93bicpLFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCBvbk1vdXNlVG91Y2hEcmFnJCA9IChlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpID0+IHtcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKS5waXBlKFxuICAgICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpLFxuICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3VzZU1vdmUkLnBpcGUoXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm1vdXNlVXAkKSxcbiAgICAgICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnKS5waXBlKFxuICAgICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpLFxuICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3VjaE1vdmUkLnBpcGUoXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLnRvdWNoRW5kJCksXG4gICAgICAgICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCB0aHVtYk1vdXNlVG91Y2hEb3duJCA9IG9uTW91c2VUb3VjaERvd24kKFxuICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIGNvbnN0IHRodW1iVG91Y2hEcmFnJCA9IG9uTW91c2VUb3VjaERyYWckKFxuICAgICAgdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHRodW1iTW91c2VUb3VjaERvd24kLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy50aHVtYk1vdXNlRG93biA9IHRydWVcbiAgICAgICAgdGhpcy50aW1lVXBkYXRlLnVuc3Vic2NyaWJlKClcbiAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSBlICogdGhpcy5kdXJhdGlvblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHRodW1iVG91Y2hEcmFnJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgIHRoaXMubUN1cnJlbnRUaW1lID0gZSAqIHRoaXMuZHVyYXRpb25cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5tb3VzZVN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLm1vdXNlVG91Y2hVcCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudGh1bWJNb3VzZURvd24pIHtcbiAgICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVGltZVVwZGF0ZSgpXG4gICAgICAgICAgdGhpcy50aHVtYk1vdXNlRG93biA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5zaG93Q29udHJvbFByb2JhYmx5Q2hhbmdlZCQubmV4dCgwKVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3QgY29udHJvbEhvdmVyU3RhdGVDaGFuZ2UkID0gb25Db250cm9sQnRuSG92ZXJTdGF0ZUNoYW5nZWQkKFt7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnZvbHVtZUJ0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnZvbHVtZVBhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAndm9sdW1lJ1xuICAgIH0sIHtcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMuc2V0dGluZ3NCdG4ubmF0aXZlRWxlbWVudCxcbiAgICAgIHBvcFVwRWxlbWVudDogdGhpcy5zZXR0aW5nc1BhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc2V0dGluZ3MnXG4gICAgfSwge1xuICAgICAgYnRuRWxlbWVudDogdGhpcy5zb3VyY2VCdG4ubmF0aXZlRWxlbWVudCxcbiAgICAgIHBvcFVwRWxlbWVudDogdGhpcy5zb3VyY2VQYW5lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgYnRuTmFtZTogJ3NvdXJjZSdcbiAgICB9LCB7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnN1YnRpdGxlc0J0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnN1YnRpdGxlc1BhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc3VidGl0bGVzJ1xuICAgIH1dKVxuICAgIGNvbnN0IHN1YnNjcmliZUNvbnRyb2xIb3ZlcmVkQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZSA9IGNvbnRyb2xIb3ZlclN0YXRlQ2hhbmdlJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENsYXNzID0gZVxuICAgICAgICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgIGNvbnN0IHZvbHVtZU1vdXNlVG91Y2hEb3duJCA9IG9uTW91c2VUb3VjaERvd24kKFxuICAgICAgdGhpcy52b2x1bWVCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChyZWN0LmJvdHRvbSAtIG1vdmVFdmVudC5jbGllbnRZKSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC5oZWlnaHQpXG4gICAgKVxuICAgIGNvbnN0IHZvbHVtZVRvdWNoRHJhZyQgPSBvbk1vdXNlVG91Y2hEcmFnJChcbiAgICAgIHRoaXMudm9sdW1lQmFyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAocmVjdC5ib3R0b20gLSBtb3ZlRXZlbnQuY2xpZW50WSksXG4gICAgICAocmVjdCkgPT4gKHJlY3QuaGVpZ2h0KVxuICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN1YnNjcmlwdGlvbnMucHVzaCh2b2x1bWVNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHZvbHVtZVRvdWNoRHJhZyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubW91c2VUb3VjaFVwJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sTW91c2VEb3duKSB7XG4gICAgICAgICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5zaG93Q29udHJvbFByb2JhYmx5Q2hhbmdlZCQubmV4dCgwKVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3Qgc3BlZWRNb3VzZVRvdWNoRG93biQgPSBvbk1vdXNlVG91Y2hEb3duJChcbiAgICAgIHRoaXMuc3BlZWRCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIGNvbnN0IHNwZWVkVG91Y2hEcmFnJCA9IG9uTW91c2VUb3VjaERyYWckKFxuICAgICAgdGhpcy5zcGVlZEJhci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2goc3BlZWRNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gVXNoaW9Db21wb25lbnQubWFwUHJvZ3Jlc3NUb1NwZWVkKGUpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2goc3BlZWRUb3VjaERyYWckLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZSA9IFVzaGlvQ29tcG9uZW50Lm1hcFByb2dyZXNzVG9TcGVlZChlKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMudGltZVVwZGF0ZSA9IGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd0aW1ldXBkYXRlJylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWVcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lQ2hhbmdlLmVtaXQodGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgICAgdGhpcy51cGRhdGVGbHlpbmdTdWJ0aXRsZXModGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0ICgpIHtcbiAgICB0aGlzLnRvdWNoU3RhcnQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmludGVyYWN0TW9kZSA9ICdtb2JpbGUnXG4gICAgfSlcbiAgICBjb25zdCBkZXNrdG9wU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSB0aGlzLm1vdXNlTW92ZSQucGlwZShcbiAgICAgIGZpbHRlcigoKSA9PiAodGhpcy5pbnRlcmFjdE1vZGUgPT09ICdkZXNrdG9wJykpLFxuICAgICAgbWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzaG93Q29udHJvbDogZS5jbGllbnRYID4gcmVjdC5sZWZ0ICYmXG4gICAgICAgICAgICBlLmNsaWVudFggPCByZWN0LnJpZ2h0ICYmXG4gICAgICAgICAgICBlLmNsaWVudFkgPiByZWN0LnRvcCAmJlxuICAgICAgICAgICAgZS5jbGllbnRZIDwgcmVjdC5ib3R0b20sXG4gICAgICAgICAgZGVsYXlTd2l0Y2g6IGUuY2xpZW50WSA8IHJlY3QuYm90dG9tIC0gNDZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgY29uc3Qgc2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBtZXJnZShcbiAgICAgIGRlc2t0b3BTaG93Q29udHJvbFN0YXRlQ2hhbmdlJCxcbiAgICAgIHRoaXMubW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSRcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoZSA9PiB7XG4gICAgICAgIHJldHVybiBlLnNob3dDb250cm9sXG4gICAgICAgICAgPyBtZXJnZShcbiAgICAgICAgICAgIG9mKHtcbiAgICAgICAgICAgICAgc2hvd0NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICAgIG5vQ3Vyc29yOiBmYWxzZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlLmRlbGF5U3dpdGNoID8gdGltZXIoXG4gICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcgPyA3NTAgOiA1MDAwXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIG1hcFRvKHtcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9DdXJzb3I6IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkgOiBORVZFUlxuICAgICAgICAgIClcbiAgICAgICAgICA6IG9mKHtcbiAgICAgICAgICAgIHNob3dDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIG5vQ3Vyc29yOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICB9KSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiAoXG4gICAgICAgIGEuc2hvd0NvbnRyb2wgPT09IGIuc2hvd0NvbnRyb2wgJiYgYS5ub0N1cnNvciA9PT0gYi5ub0N1cnNvclxuICAgICAgKSlcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNob3dDb250cm9sU3RhdGVDaGFuZ2UkLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMubVNob3dDb250cm9sID0gc3RhdGUuc2hvd0NvbnRyb2xcbiAgICAgICAgdGhpcy5zaG93Q29udHJvbFByb2JhYmx5Q2hhbmdlZCQubmV4dCgwKVxuICAgICAgICB0aGlzLm1Ob0N1cnNvciA9IHN0YXRlLm5vQ3Vyc29yXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGlmICh0aGlzLm1QYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3BhdXNlJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1QYXVzZWQgPSB0cnVlXG4gICAgICAgIHRoaXMucGF1c2VkQ2hhbmdlLmVtaXQodHJ1ZSlcbiAgICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICdwbGF5JylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1QYXVzZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhdXNlZENoYW5nZS5lbWl0KGZhbHNlKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpYmVUaW1lVXBkYXRlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAnd2FpdGluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gdHJ1ZVxuICAgICAgICB0aGlzLndhaXRpbmdDaGFuZ2UuZW1pdCh0aGlzLndhaXRpbmcpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncGxheWluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gZmFsc2VcbiAgICAgICAgdGhpcy53YWl0aW5nQ2hhbmdlLmVtaXQodGhpcy53YWl0aW5nKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3Byb2dyZXNzJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlcmVkVGltZSA9ICgodGltZVJhbmdlcywgY3VycmVudFRpbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aW1lUmFuZ2VzLmxlbmd0aFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aW1lUmFuZ2VzLmVuZChpKSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVSYW5nZXMuc3RhcnQoaSkgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRpbWVSYW5nZXMuZW5kKGkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRpbWVcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lXG4gICAgICAgIH0pKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5idWZmZXJlZCwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ2xvYWRlZG1ldGFkYXRhJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmR1cmF0aW9uXG4gICAgICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmR1cmF0aW9uKVxuICAgICAgfSkpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd2b2x1bWVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWVcbiAgICAgICAgdGhpcy52b2x1bWVDaGFuZ2UuZW1pdCh0aGlzLm1Wb2x1bWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gdGhpcy5tUGxheWJhY2tSYXRlXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3JhdGVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVBsYXliYWNrUmF0ZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGVcbiAgICAgICAgdGhpcy5wbGF5YmFja1JhdGVDaGFuZ2UuZW1pdCh0aGlzLm1QbGF5YmFja1JhdGUpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjb250ZXh0bWVudScpXG4gICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBvdXRlciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250ZXh0TWVudS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGlmIChlLmNsaWVudFggKyBwYW5lbC53aWR0aCArIDIwID4gb3V0ZXIucmlnaHQpIHtcbiAgICAgICAgICBpZiAoZS5jbGllbnRZICsgcGFuZWwuaGVpZ2h0ICsgMjAgPiBvdXRlci5ib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgcmlnaHQ6ICR7b3V0ZXIucmlnaHQgLSBlLmNsaWVudFh9cHg7IGJvdHRvbTogJHtvdXRlci5ib3R0b20gLSBlLmNsaWVudFl9cHhgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgcmlnaHQ6ICR7b3V0ZXIucmlnaHQgLSBlLmNsaWVudFh9cHg7IHRvcDogJHtlLmNsaWVudFkgLSBvdXRlci50b3B9cHhgXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlLmNsaWVudFkgKyBwYW5lbC5oZWlnaHQgKyAyMCA+IG91dGVyLmJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbiA9IGBsZWZ0OiAke2UuY2xpZW50WCAtIG91dGVyLmxlZnR9cHg7IGJvdHRvbTogJHtvdXRlci5ib3R0b20gLSBlLmNsaWVudFl9cHhgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgbGVmdDogJHtlLmNsaWVudFggLSBvdXRlci5sZWZ0fXB4OyB0b3A6ICR7ZS5jbGllbnRZIC0gb3V0ZXIudG9wfXB4YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRleHRNZW51U3RhdGUgPSAncm9vdCdcbiAgICAgICAgdGhpcy5zaG93Q29udGV4dE1lbnUgPSB0cnVlXG4gICAgICB9KSlcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5sYW5nQ29udGV4dE1lbnVPcHRpb24ubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd0xhbmdNZW51LCB0cnVlKVxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICB9KVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNob3dDb250cm9sQ2hhbmdlJC5zdWJzY3JpYmUoc2hvd0NvbnRyb2wgPT4ge1xuICAgICAgICBpZiAoc2hvd0NvbnRyb2wpIHRoaXMub25Db250cm9sU2hvd24oKVxuICAgICAgICBlbHNlIHRoaXMub25Db250cm9sRGlzbWlzcygpXG4gICAgICAgIHRoaXMuc2hvd0NvbnRyb2xDaGFuZ2UuZW1pdChzaG93Q29udHJvbClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIG5nT25EZXN0cm95ICgpIHtcbiAgICB0aGlzLm9uVW5mb2N1c2VkKClcbiAgICB0aGlzLm9uQ29udHJvbERpc21pc3MoKVxuICAgIGlmICh0aGlzLnRpbWVVcGRhdGUpIHtcbiAgICAgIHRoaXMudGltZVVwZGF0ZS51bnN1YnNjcmliZSgpXG4gICAgICB0aGlzLnRpbWVVcGRhdGUgPSBudWxsXG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXVxuICAgIHRoaXMubGFuZ0NvbnRleHRNZW51T3B0aW9uLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dMYW5nTWVudSwgdHJ1ZSlcbiAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Db21wb25lbnRDbGlja2VkLCB0cnVlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU291cmNlcyAoKSB7XG4gICAgaWYgKHRoaXMubVNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNvdXJjZXMgPSBbe1xuICAgICAgICBzaG9ydE5hbWU6ICdEZWZhdWx0JyxcbiAgICAgICAgbmFtZTogJ0RlZmF1bHQnLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBzb3VyY2VzOiBbeyBzcmM6IHRoaXMubVNyYywgdHlwZTogdW5kZWZpbmVkIH1dXG4gICAgICB9XVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbSA9IHt9XG4gICAgICB0aGlzLm1Tb3VyY2VzLmZvckVhY2goc291cmNlID0+IHtcbiAgICAgICAgaWYgKCFzb3VyY2Uuc2hvcnRuYW1lKSB7XG4gICAgICAgICAgc291cmNlLnNob3J0bmFtZSA9ICdVbnRpdGxlZCdcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNtW3NvdXJjZS5zaG9ydG5hbWVdKSB7XG4gICAgICAgICAgc21bc291cmNlLnNob3J0bmFtZV0gPSB7XG4gICAgICAgICAgICBzaG9ydE5hbWU6IHNvdXJjZS5zaG9ydG5hbWUsXG4gICAgICAgICAgICBuYW1lOiBzb3VyY2UubmFtZSB8fCAnVW50aXRsZWQnLFxuICAgICAgICAgICAgc291cmNlczogW11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc21bc291cmNlLnNob3J0bmFtZV0uc291cmNlcy5wdXNoKHNvdXJjZSlcbiAgICAgICAgaWYgKHNvdXJjZS5kZWZhdWx0ICE9PSB1bmRlZmluZWQgJiYgc291cmNlLmRlZmF1bHQgIT09IG51bGwpIHtcbiAgICAgICAgICBzbVtzb3VyY2Uuc2hvcnRuYW1lXS5kZWZhdWx0ID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5zb3VyY2VzID0gT2JqZWN0LnZhbHVlcyhzbSlcbiAgICB9XG4gICAgY29uc3QgaW5kZXhPZkRlZmF1bHQgPSB0aGlzLnNvdXJjZXMuZmluZEluZGV4KHMgPT4gcy5kZWZhdWx0KVxuICAgIHRoaXMucGxheWluZ1NvdXJjZSA9IGluZGV4T2ZEZWZhdWx0ID49IDAgPyBpbmRleE9mRGVmYXVsdCA6IDBcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXBkYXRlU3VidGl0bGVzICgpIHtcbiAgICBjb25zdCBwYXJzZWRTdWJ0aXRsZXMgPSBbXVxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMubVN1YnRpdGxlcykge1xuICAgICAgbGV0IHRleHQgPSAnJ1xuICAgICAgaWYgKHN1Yi52YWx1ZSkgdGV4dCA9IHN1Yi52YWx1ZVxuICAgICAgZWxzZSBpZiAoc3ViLnNyYykge1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goc3ViLnNyYylcbiAgICAgICAgdGV4dCA9IGF3YWl0IHJlc3AudGV4dCgpXG4gICAgICB9XG4gICAgICBjb25zdCBwYXJzZWQgPSB7XG4gICAgICAgIG5hbWU6IHN1Yi5uYW1lIHx8ICdVbnRpdGxlZCcsXG4gICAgICAgIGNsYXNzOiBzdWIuY2xhc3MgfHwgJycsXG4gICAgICAgIHBhcnNlZFN1YnRpdGxlczogdW5kZWZpbmVkLFxuICAgICAgICBlbmFibGVkOiBzdWIuZGVmYXVsdCAhPT0gdW5kZWZpbmVkICYmIHN1Yi5kZWZhdWx0ICE9PSBudWxsXG4gICAgICAgICAgfHwgc3ViLnNyY2xhbmcgPT09IHRoaXMuc2VydmljZS5pMThuLmxhbmd1YWdlXG4gICAgICB9XG4gICAgICBzdWIudHlwZSA9IHN1Yi50eXBlIHx8ICcnXG4gICAgICBzdWIudHlwZSA9IHN1Yi50eXBlLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmIChzdWIudHlwZSAhPT0gJ3RleHQvdnR0JyAmJiBzdWIudHlwZSAhPT0gJ2FwcGxpY2F0aW9uL3gtc3VicmlwJykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Vua25vd24gTUlNRSB0eXBlIG9mIHN1YnRpdGxlcywgdHJ5aW5nIHRvIGluZmVyIHN1YnRpdGxlIGZvcm1hdC4gU3VwcG9ydGVkIHR5cGU6IHRleHQvdnR0LCBhcHBsaWNhdGlvbi94LXN1YnJpcC4nKVxuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgcGFyc2VkLnBhcnNlZFN1YnRpdGxlcyA9IHRoaXMuc2VydmljZS5wYXJzZVN1YnRpdGxlcyh0ZXh0KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICB9XG4gICAgICBwYXJzZWRTdWJ0aXRsZXMucHVzaChwYXJzZWQpXG4gICAgfVxuICAgIHRoaXMuc3VidGl0bGVzID0gcGFyc2VkU3VidGl0bGVzXG4gICAgdGhpcy51cGRhdGVGbHlpbmdTdWJ0aXRsZXMoKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGbHlpbmdTdWJ0aXRsZXMgKGN1cnJlbnRUaW1lPykge1xuICAgIGlmIChjdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50VGltZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZVxuICAgIH1cbiAgICBjdXJyZW50VGltZSAqPSAxMDAwXG4gICAgY29uc3QgZmx5aW5nU3VidGl0bGVzID0gW11cbiAgICB0aGlzLmVuYWJsZWRTdWJ0aXRsZXMuZm9yRWFjaChzdWJ0aXRsZXMgPT4ge1xuICAgICAgaWYgKCFzdWJ0aXRsZXMucGFyc2VkU3VidGl0bGVzKSByZXR1cm5cbiAgICAgIGNvbnN0IGZseWluZ1N1YnRpdGxlc1RyYWNrID0gW11cbiAgICAgIHN1YnRpdGxlcy5wYXJzZWRTdWJ0aXRsZXMuZm9yRWFjaChzdWJ0aXRsZSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50VGltZSA+IHN1YnRpdGxlLnN0YXJ0VGltZSAmJiBjdXJyZW50VGltZSA8IHN1YnRpdGxlLmVuZFRpbWUpIHtcbiAgICAgICAgICBmbHlpbmdTdWJ0aXRsZXNUcmFjay5wdXNoKHtcbiAgICAgICAgICAgIC4uLnN1YnRpdGxlLFxuICAgICAgICAgICAgdGV4dHM6IHN1YnRpdGxlLnRleHRzLm1hcCh0ZXh0ID0+IHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRleHQpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAoZmx5aW5nU3VidGl0bGVzVHJhY2subGVuZ3RoKSB7XG4gICAgICAgIGZseWluZ1N1YnRpdGxlcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBzdWJ0aXRsZXMubmFtZSxcbiAgICAgICAgICBjbGFzczogc3VidGl0bGVzLmNsYXNzLFxuICAgICAgICAgIHBhcnNlZFN1YnRpdGxlczogZmx5aW5nU3VidGl0bGVzVHJhY2tcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuZmx5aW5nU3VidGl0bGVzID0gZmx5aW5nU3VidGl0bGVzXG4gIH1cblxuICBwcml2YXRlIHNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBbe1xuICAgICAgICBidG46IHRoaXMuc2V0dGluZ3NCdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLnNldHRpbmdzUGFuZWwsXG4gICAgICAgIG5hbWU6ICdzZXR0aW5ncydcbiAgICAgIH0sIHtcbiAgICAgICAgYnRuOiB0aGlzLnNvdXJjZUJ0bixcbiAgICAgICAgcGFuZWw6IHRoaXMuc291cmNlUGFuZWwsXG4gICAgICAgIG5hbWU6ICdzb3VyY2UnXG4gICAgICB9LCB7XG4gICAgICAgIGJ0bjogdGhpcy5zdWJ0aXRsZXNCdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLnN1YnRpdGxlc1BhbmVsLFxuICAgICAgICBuYW1lOiAnc3VidGl0bGVzJ1xuICAgICAgfSwge1xuICAgICAgICBidG46IHRoaXMubG9vcEJ0bixcbiAgICAgICAgcGFuZWw6IHRoaXMubG9vcFBhbmVsLFxuICAgICAgICBuYW1lOiAnbG9vcCdcbiAgICAgIH0sIHtcbiAgICAgICAgYnRuOiB0aGlzLmZ1bGxTY3JlZW5CdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLmZ1bGxTY3JlZW5QYW5lbCxcbiAgICAgICAgbmFtZTogJ2Z1bGxzY3JlZW4nXG4gICAgICB9XS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5zZXRQYW5lbFBvc2l0aW9uKGl0ZW0uYnRuLCBpdGVtLnBhbmVsLCBpdGVtLm5hbWUpKVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICB9LCAwKVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYW5lbFBvc2l0aW9uIChidG4sIHBhbmVsLCBuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQgfHwgIXBhbmVsIHx8ICFidG4pIHJldHVyblxuICAgIGNvbnN0IG91dGVyUmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IGJ0blJlY3QgPSBidG4ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGlmIChwYW5lbFJlY3Qud2lkdGggLyAyIC0gb3V0ZXJSZWN0LnJpZ2h0ICsgYnRuUmVjdC5yaWdodCA+IDApIHtcbiAgICAgIHRoaXMucGFuZWxUcmFuc2xhdGlvbnNbbmFtZV0gPSBwYW5lbFJlY3Qud2lkdGggLyAyIC0gb3V0ZXJSZWN0LnJpZ2h0ICsgYnRuUmVjdC5yaWdodFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVsVHJhbnNsYXRpb25zW25hbWVdID0gMFxuICAgIH1cbiAgfVxuXG4gIG9uU2xvdENoYW5nZSAoZSkge1xuICAgIHRoaXMuc3VidGl0bGVzU2xvdFVwZGF0ZSQubmV4dChcbiAgICAgIGUudGFyZ2V0LmFzc2lnbmVkTm9kZXMoKS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnVVNISU8tU1VCVElUTEVTJylcbiAgICApXG4gICAgdGhpcy5zb3VyY2VzU2xvdFVwZGF0ZSQubmV4dChcbiAgICAgIGUudGFyZ2V0LmFzc2lnbmVkTm9kZXMoKS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnVVNISU8tU09VUkNFJylcbiAgICApXG4gICAgdGhpcy5tSW5qZWN0ZWRTdHlsZXMgPSBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKClcbiAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnKS5tYXAobm9kZSA9PiBub2RlLmlubmVySFRNTClcbiAgfVxuXG4gIG9uVmlkZW9NYXNrQ2xpY2tlZCAoKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpIHtcbiAgICAgIHRoaXMudG9nZ2xlUGxheSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQubmV4dCh7XG4gICAgICAgIHNob3dDb250cm9sOiAhdGhpcy5tU2hvd0NvbnRyb2wsXG4gICAgICAgIGRlbGF5U3dpdGNoOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0U291cmNlIChpKSB7XG4gICAgaWYgKGkgPT09IHRoaXMucGxheWluZ1NvdXJjZSkgcmV0dXJuXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgIGNvbnN0IHBhdXNlZCA9IHRoaXMubVBhdXNlZFxuICAgIHRoaXMucGxheWluZ1NvdXJjZSA9IGlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9hZCgpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVcbiAgICBpZiAoIXBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICB9XG5cbiAgb25DaGVja1N1YnRpdGxlcyAoaSkge1xuICAgIHRoaXMuc3VidGl0bGVzW2ldLmVuYWJsZWQgPSAhdGhpcy5zdWJ0aXRsZXNbaV0uZW5hYmxlZFxuICAgIHRoaXMudXBkYXRlRmx5aW5nU3VidGl0bGVzKClcbiAgfVxuXG4gIHRvZ2dsZVBsYXkgKCkge1xuICAgIGlmICh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2VkKSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2UoKVxuICB9XG5cbiAgdG9nZ2xlTXV0ZSAoKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpIHtcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCA9ICEodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkIHx8IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPT09IDApXG4gICAgICB0aGlzLm11dGVkQ2hhbmdlLmVtaXQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkKVxuICAgIH0gZWxzZSBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkKSB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZVxuICAgICAgdGhpcy5tdXRlZENoYW5nZS5lbWl0KGZhbHNlKVxuICAgIH1cbiAgICBpZiAoIXRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCAmJiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID09PSAwKSB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gTWF0aC5yYW5kb20oKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUxvb3AgKCkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wID0gIXRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wXG4gICAgdGhpcy5sb29wQ2hhbmdlLmVtaXQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3ApXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cblxuICBzaG93TGFuZ01lbnUgKCkge1xuICAgIHRoaXMuY29udGV4dE1lbnVTdGF0ZSA9ICdsYW5nJ1xuICAgIHRoaXMuc2hvd0NvbnRleHRNZW51ID0gdHJ1ZVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gIH1cblxuICBvbkNvbXBvbmVudENsaWNrZWQgKCkge1xuICAgIHRoaXMuZm9jdXMgPSB0cnVlXG4gICAgaWYgKHRoaXMua2V5U3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMub25Gb2N1c2VkKClcbiAgICB9XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2tlZCAoKSB7XG4gICAgdGhpcy5mb2N1cyA9IGZhbHNlXG4gICAgaWYgKHRoaXMuc2hvd0NvbnRleHRNZW51KSB7XG4gICAgICB0aGlzLnNob3dDb250ZXh0TWVudSA9IGZhbHNlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgIH1cbiAgfVxuXG4gIHNldExhbmd1YWdlIChjb2RlKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmkxOG4uc2V0TGFuZ3VhZ2UoY29kZSlcbiAgfVxuXG4gIHRvZ2dsZVNob3dTdGF0aXN0aWNJbmZvUGFuZWwgKCkge1xuICAgIHRoaXMuc2hvd1N0YXRpc3RpY0luZm9QYW5lbCA9ICF0aGlzLnNob3dTdGF0aXN0aWNJbmZvUGFuZWxcbiAgICBpZiAodGhpcy5zaG93U3RhdGlzdGljSW5mb1BhbmVsKSB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBjb25zdCBhbmltYXRpb25GcmFtZSQgPSBvZihudWxsLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikucGlwZShyZXBlYXQoKSlcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IGFuaW1hdGlvbkZyYW1lJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5mcHNTdGFydCkgdGhpcy5mcHNTdGFydCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgICAgdGhpcy5mcHNJbmRleCsrXG4gICAgICAgICAgY29uc3QgZnBzQ3VycmVudCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgICAgaWYgKGZwc0N1cnJlbnQgLSB0aGlzLmZwc1N0YXJ0ID4gMTAwMCkge1xuICAgICAgICAgICAgdGhpcy5mcHMgPSAoKHRoaXMuZnBzSW5kZXggLyAoZnBzQ3VycmVudCAtIHRoaXMuZnBzU3RhcnQpKSAqIDEwMDApLnRvRml4ZWQoMilcbiAgICAgICAgICAgIHRoaXMuZnBzU3RhcnQgPSArbmV3IERhdGUoKVxuICAgICAgICAgICAgdGhpcy5mcHNJbmRleCA9IDBcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbmltYXRpb25GcmFtZS51bnN1YnNjcmliZSgpXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==