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
            return !!(this.mShowControl || this.controlHoveredClass || this.mouseDown);
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
                    _this.showControlProbablyChanged$.next(0);
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
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.setAllControlPanelsPositionTimeout = setTimeout((/**
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
        }));
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
        this.changeDetectorRef.detectChanges();
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
                    styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:visible;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXNoaW8vIiwic291cmNlcyI6WyJsaWIvdXNoaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVVLGlCQUFpQixFQUNoQyxTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQUUsWUFBWSxFQUN4QixLQUFLLEVBQUUsTUFBTSxFQUVMLE1BQU0sRUFDZCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQTtBQUN0QixPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sMkJBQTJCLENBQUE7QUFDbkUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQ3ZDLE9BQU8sRUFBZ0IsS0FBSyxFQUM3QixNQUFNLE1BQU0sQ0FBQTtBQUNiLE9BQU8sRUFDTCxTQUFTLEVBQUUsb0JBQW9CLEVBQy9CLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFDdEQsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFekQ7SUFBQTtJQVVBLENBQUM7O2dCQVZBLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7c0JBRUUsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLOztJQUNSLGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBTlksV0FBVzs7O0lBQ3RCLDBCQUFxQjs7SUFDckIsMkJBQXFCOztJQUNyQixnQ0FBMEI7O0lBQzFCLDJCQUFxQjs7SUFDckIsOEJBQXlCOztBQUczQjtJQUFBO0lBWUEsQ0FBQzs7Z0JBWkEsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsaUJB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QUErQzs7Ozs7SUFDL0MsMENBQTZDOzs7OztJQUM3Qyw0REFBa0Q7Ozs7O0lBQ2xELG9DQUFxRDs7Ozs7SUFDckQsa0NBQWlEOzs7OztJQUNqRCxvQ0FBcUQ7Ozs7O0lBQ3JELHFDQUF1RDs7Ozs7SUFDdkQsbUNBR0M7Ozs7O0lBQ0QsdUNBQTREOztJQUU1RCwyQkFBdUI7Ozs7O0lBMEJyQixpQ0FBMkI7Ozs7O0lBQzNCLDhCQUFvQjs7Ozs7SUFDcEIsMkNBQTRDOzs7OztJQUM1QyxzQ0FBa0M7Ozs7O0lBQ2xDLGlDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LCBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHtcbiAgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsXG4gIGZyb21FdmVudCwgbWVyZ2UsIE5FVkVSLCBPYnNlcnZhYmxlLCBvZixcbiAgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCB0aW1lclxufSBmcm9tICdyeGpzJ1xuaW1wb3J0IHtcbiAgY29uY2F0TWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLCBtYXAsIG1hcFRvLCByZXBlYXQsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0YXBcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmltcG9ydCB7IElTdWJ0aXRsZSwgVXNoaW9TZXJ2aWNlIH0gZnJvbSAnLi91c2hpby5zZXJ2aWNlJ1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3VzaGlvLXNvdXJjZSdcbn0pXG5leHBvcnQgY2xhc3MgVXNoaW9Tb3VyY2Uge1xuICBASW5wdXQoKSBzcmMhOiBzdHJpbmdcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIHNob3J0bmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndXNoaW8tc3VidGl0bGVzJ1xufSlcbmV4cG9ydCBjbGFzcyBVc2hpb1N1YnRpdGxlcyB7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmdcbiAgQElucHV0KCkgc3JjOiBzdHJpbmdcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZ1xuICBASW5wdXQoKSBjbGFzczogc3RyaW5nXG4gIEBJbnB1dCgpIHNyY2xhbmc6IHN0cmluZ1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBTb3VyY2Uge1xuICBzaG9ydE5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc291cmNlczoge1xuICAgIHNyYzogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgfVtdXG4gIGRlZmF1bHQ/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBTdWJ0aXRsZXMge1xuICBuYW1lOiBzdHJpbmdcbiAgY2xhc3M6IHN0cmluZ1xuICBwYXJzZWRTdWJ0aXRsZXM6IElTdWJ0aXRsZVtdXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXNoaW8tcGxheWVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzaGlvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNoaW8uY29tcG9uZW50LnN0eWwnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tXG59KVxuZXhwb3J0IGNsYXNzIFVzaGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgbUluamVjdGVkU3R5bGVzID0gW11cbiAgZ2V0IGluamVjdGVkU3R5bGVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5tSW5qZWN0ZWRTdHlsZXMubWFwKFxuICAgICAgc3R5bGUgPT4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoYFxuICAgICAgPHN0eWxlPlxuICAgICAgICR7c3R5bGV9XG4gICAgICA8L3N0eWxlPlxuICAgIGApKVxuICB9XG5cbiAgQElucHV0KCkgc2V0IHNyYyAoc3JjKSB7XG4gICAgdGhpcy5tU3JjID0gc3JjXG4gICAgdGhpcy51cGRhdGVTb3VyY2VzKClcbiAgfVxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU3JjXG4gIH1cbiAgQElucHV0KCkgcG9zdGVyXG4gIEBJbnB1dCgpIGNyb3Nzb3JpZ2luXG4gIEBJbnB1dCgpIGF1dG9wbGF5XG4gIEBJbnB1dCgpIHByZWxvYWQgPSAnbWV0YWRhdGEnXG4gIEBJbnB1dCgpIHNldCBsYW5nIChsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlcnZpY2UuaTE4bi5zZXRMYW5ndWFnZShsYW5nKVxuICB9XG4gIEBJbnB1dCgpIHRodW1ibmFpbHNcblxuICBwcml2YXRlIG1TcmNcbiAgcHJpdmF0ZSBtU291cmNlcyA9IFtdXG4gIHNvdXJjZXM6IFNvdXJjZVtdID0gW11cbiAgcGxheWluZ1NvdXJjZSA9IDBcblxuICBwcml2YXRlIG1TdWJ0aXRsZXMgPSBbXVxuICBzdWJ0aXRsZXM6IFN1YnRpdGxlc1tdID0gW11cbiAgZ2V0IGVuYWJsZWRTdWJ0aXRsZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN1YnRpdGxlcy5maWx0ZXIocyA9PiBzLmVuYWJsZWQpXG4gIH1cbiAgZmx5aW5nU3VidGl0bGVzOiBTdWJ0aXRsZXNbXSA9IFtdXG5cbiAgcHJpdmF0ZSBtVm9sdW1lID0gMVxuICBASW5wdXQoKSBzZXQgdm9sdW1lICh2b2x1bWUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdm9sdW1lXG4gIH1cbiAgZ2V0IHZvbHVtZTEwMCAoKSB7XG4gICAgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCkgcmV0dXJuIDBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLm1Wb2x1bWUgKiAxMDApXG4gIH1cbiAgQE91dHB1dCgpIHZvbHVtZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG5cbiAgcHJpdmF0ZSBtUGxheWJhY2tSYXRlID0gMVxuICBASW5wdXQoKSBzZXQgcGxheWJhY2tSYXRlIChwbGF5YmFja1JhdGUpIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlXG4gIH1cbiAgQE91dHB1dCgpIHBsYXliYWNrUmF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG5cbiAgcHJpdmF0ZSBtVm9sdW1lQ29udHJvbCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHZvbHVtZUNvbnRyb2wgKHZvbHVtZUNvbnRyb2wpIHtcbiAgICB0aGlzLm1Wb2x1bWVDb250cm9sID0gdm9sdW1lQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgdm9sdW1lQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVZvbHVtZUNvbnRyb2xcbiAgfVxuICBwcml2YXRlIG1Tb3VyY2VDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgc291cmNlQ29udHJvbCAoc291cmNlQ29udHJvbCkge1xuICAgIHRoaXMubVNvdXJjZUNvbnRyb2wgPSBzb3VyY2VDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBzb3VyY2VDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU291cmNlQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbVN1YnRpdGxlc0NvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzdWJ0aXRsZXNDb250cm9sIChzdWJ0aXRsZXNDb250cm9sKSB7XG4gICAgdGhpcy5tU3VidGl0bGVzQ29udHJvbCA9IHN1YnRpdGxlc0NvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHN1YnRpdGxlc0NvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1TdWJ0aXRsZXNDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtU2V0dGluZ3NDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgc2V0dGluZ3NDb250cm9sIChzZXR0aW5nc0NvbnRyb2wpIHtcbiAgICB0aGlzLm1TZXR0aW5nc0NvbnRyb2wgPSBzZXR0aW5nc0NvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHNldHRpbmdzQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVNldHRpbmdzQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbUxvb3BDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgbG9vcENvbnRyb2wgKGxvb3BDb250cm9sKSB7XG4gICAgdGhpcy5tTG9vcENvbnRyb2wgPSBsb29wQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgbG9vcENvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1Mb29wQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbUZ1bGxzY3JlZW5Db250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgZnVsbHNjcmVlbkNvbnRyb2wgKGZ1bGxzY3JlZW5Db250cm9sKSB7XG4gICAgdGhpcy5tRnVsbHNjcmVlbkNvbnRyb2wgPSBmdWxsc2NyZWVuQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgZnVsbHNjcmVlbkNvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1GdWxsc2NyZWVuQ29udHJvbFxuICB9XG5cbiAgQFZpZXdDaGlsZCgndmlkZW8nLCB7IHN0YXRpYzogdHJ1ZSB9KSB2aWRlb1xuICBAVmlld0NoaWxkKCdzbGlkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzbGlkZXJcbiAgQFZpZXdDaGlsZCgndm9sdW1lQmFyJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lQmFyXG4gIEBWaWV3Q2hpbGQoJ3ZvbHVtZVBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lUGFuZWxcbiAgQFZpZXdDaGlsZCgndm9sdW1lQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgdm9sdW1lQnRuXG4gIEBWaWV3Q2hpbGQoJ3NldHRpbmdzUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXR0aW5nc1BhbmVsXG4gIEBWaWV3Q2hpbGQoJ3NldHRpbmdzQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0dGluZ3NCdG5cbiAgQFZpZXdDaGlsZCgnc3BlZWRCYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBzcGVlZEJhclxuICBAVmlld0NoaWxkKCdzb3VyY2VQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHNvdXJjZVBhbmVsXG4gIEBWaWV3Q2hpbGQoJ3NvdXJjZUJ0bicsIHsgc3RhdGljOiB0cnVlIH0pIHNvdXJjZUJ0blxuICBAVmlld0NoaWxkKCdzdWJ0aXRsZXNQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHN1YnRpdGxlc1BhbmVsXG4gIEBWaWV3Q2hpbGQoJ3N1YnRpdGxlc0J0bicsIHsgc3RhdGljOiB0cnVlIH0pIHN1YnRpdGxlc0J0blxuICBAVmlld0NoaWxkKCdsb29wQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgbG9vcEJ0blxuICBAVmlld0NoaWxkKCdsb29wUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBsb29wUGFuZWxcbiAgQFZpZXdDaGlsZCgnZnVsbFNjcmVlbkJ0bicsIHsgc3RhdGljOiB0cnVlIH0pIGZ1bGxTY3JlZW5CdG5cbiAgQFZpZXdDaGlsZCgnZnVsbFNjcmVlblBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgZnVsbFNjcmVlblBhbmVsXG4gIEBWaWV3Q2hpbGQoJ2NvbnRleHRNZW51JywgeyBzdGF0aWM6IHRydWUgfSkgY29udGV4dE1lbnVcbiAgQFZpZXdDaGlsZCgnbGFuZ0NvbnRleHRNZW51T3B0aW9uJywgeyBzdGF0aWM6IHRydWUgfSkgbGFuZ0NvbnRleHRNZW51T3B0aW9uXG5cbiAgQENvbnRlbnRDaGlsZHJlbihVc2hpb1NvdXJjZSkgc291cmNlQ29udGVudENoaWxkcmVuITogUXVlcnlMaXN0PFVzaGlvU291cmNlPlxuICBAQ29udGVudENoaWxkcmVuKFVzaGlvU3VidGl0bGVzKSBzdWJ0aXRsZXNDb250ZW50Q2hpbGRyZW4hOiBRdWVyeUxpc3Q8VXNoaW9TdWJ0aXRsZXM+XG4gIHByaXZhdGUgc3VidGl0bGVzU2xvdFVwZGF0ZSQgPSBuZXcgU3ViamVjdDxIVE1MRWxlbWVudFtdPigpXG4gIHByaXZhdGUgc291cmNlc1Nsb3RVcGRhdGUkID0gbmV3IFN1YmplY3Q8SFRNTEVsZW1lbnRbXT4oKVxuICBwcml2YXRlIHN1YnRpdGxlc1Nsb3RDaGFuZ2UkID0gdGhpcy5zdWJ0aXRsZXNTbG90VXBkYXRlJC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gIHByaXZhdGUgc291cmNlc1Nsb3RDaGFuZ2UkID0gdGhpcy5zb3VyY2VzU2xvdFVwZGF0ZSQuYXNPYnNlcnZhYmxlKCkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICBwcml2YXRlIG1vYmlsZVNob3dDb250cm9sU3RhdGVDaGFuZ2UkID0gbmV3IFN1YmplY3Q8eyBzaG93Q29udHJvbDogYm9vbGVhbiwgZGVsYXlTd2l0Y2g6IGJvb2xlYW4gfT4oKVxuICBwcml2YXRlIHNob3dDb250cm9sUHJvYmFibHlDaGFuZ2VkJCA9IG5ldyBTdWJqZWN0KClcbiAgcHJpdmF0ZSBzaG93Q29udHJvbENoYW5nZSQgPSB0aGlzLnNob3dDb250cm9sUHJvYmFibHlDaGFuZ2VkJC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgIG1hcCgoKSA9PiB0aGlzLnNob3dDb250cm9sKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gIClcblxuICBpbnRlcmFjdE1vZGU6ICdkZXNrdG9wJyB8ICdtb2JpbGUnID0gJ2Rlc2t0b3AnXG4gIHByaXZhdGUgZm9jdXMgPSBmYWxzZVxuICBwcml2YXRlIG1TaG93Q29udHJvbCA9IGZhbHNlXG4gIHByaXZhdGUgbU5vQ3Vyc29yID0gZmFsc2VcbiAgcHJpdmF0ZSB0aHVtYk1vdXNlRG93biA9IGZhbHNlXG4gIHByaXZhdGUgY29udHJvbE1vdXNlRG93biA9IGZhbHNlXG4gIGNvbnRyb2xIb3ZlcmVkQ2xhc3MgPSAnJ1xuICBwcml2YXRlIHNob3dDb250ZXh0TWVudSA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1N0YXRpc3RpY0luZm9QYW5lbCA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1ZvbHVtZUhpbnQgPSBmYWxzZVxuICBwcml2YXRlIHNob3dQcm9ncmVzc0RldGFpbCA9IGZhbHNlXG4gIGdldCBpc0Z1bGxTY3JlZW4gKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbFxuICB9XG4gIGdldCBtb3VzZURvd24gKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRodW1iTW91c2VEb3duIHx8IHRoaXMuY29udHJvbE1vdXNlRG93blxuICB9XG4gIGdldCBzaG93Q29udHJvbCAoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMubVNob3dDb250cm9sIHx8IHRoaXMuY29udHJvbEhvdmVyZWRDbGFzcyB8fCB0aGlzLm1vdXNlRG93bilcbiAgfVxuICBnZXQgbm9DdXJzb3IgKCkge1xuICAgIHJldHVybiAhdGhpcy5zaG93Q29udHJvbCAmJiB0aGlzLm1Ob0N1cnNvclxuICB9XG4gIEBPdXRwdXQoKSBzaG93Q29udHJvbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBnZXQgdGh1bWJNb3VzZURvd25DbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50aHVtYk1vdXNlRG93biA/ICcgdGh1bWItbW91c2UtZG93bicgOiAnJ1xuICB9XG4gIGdldCBwYXVzZWRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tUGF1c2VkID8gJyB2aWRlby1zdGF0ZS1wYXVzZScgOiAnIHZpZGVvLXN0YXRlLXBsYXknXG4gIH1cbiAgZ2V0IHdhaXRpbmdDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy53YWl0aW5nICYmICF0aGlzLm1QYXVzZWQgPyAnIHZpZGVvLXN0YXRlLXdhaXRpbmcnIDogJydcbiAgfVxuICBnZXQgbXV0ZWRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCB8fCB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID09PSAwKVxuICAgICAgPyAnIHZpZGVvLXN0YXRlLW11dGVkJyA6ICcgdmlkZW8tc3RhdGUtdm9sdW1lJ1xuICB9XG4gIGdldCBsb29wQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wID8gJyB2aWRlby1zdGF0ZS1sb29wJyA6ICcgdmlkZW8tc3RhdGUtbm9sb29wJ1xuICB9XG4gIGdldCBzdWJ0aXRsZUVuYWJsZWRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkU3VidGl0bGVzLmxlbmd0aCA+IDAgPyAnIHZpZGVvLXN0YXRlLXN1YnRpdGxlcycgOiAnIHZpZGVvLXN0YXRlLW5vc3VidGl0bGVzJ1xuICB9XG4gIGdldCBmdWxsc2NyZWVuQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNGdWxsU2NyZWVuID8gJyB2aWRlby1zdGF0ZS1mdWxsc2NyZWVuJyA6ICcgdmlkZW8tc3RhdGUtbm9mdWxsc2NyZWVuJ1xuICB9XG4gIGdldCBjb250ZXh0TWVudUNsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRNZW51U3RhdGUgKyAodGhpcy5zaG93Q29udGV4dE1lbnUgPyAnIGFjdGl2ZScgOiAnJylcbiAgfVxuICBnZXQgc3RhdGlzdGljSW5mb1BhbmVsQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1N0YXRpc3RpY0luZm9QYW5lbCA/ICcgYWN0aXZlJyA6ICcnXG4gIH1cbiAgZ2V0IHZvbHVtZUhpbnRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaG93Vm9sdW1lSGludCA/ICcgYWN0aXZlJyA6ICcnXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1Byb2dyZXNzRGV0YWlsID8gJyBhY3RpdmUnIDogJydcbiAgfVxuXG4gIHByaXZhdGUgbVBhdXNlZCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHBhdXNlZCAocGF1c2VkKSB7XG4gICAgaWYgKHBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlKClcbiAgICBlbHNlIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5KClcbiAgfVxuICBAT3V0cHV0KCkgcGF1c2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIHByaXZhdGUgbUN1cnJlbnRUaW1lID0gMFxuICBASW5wdXQoKSBzZXQgY3VycmVudFRpbWUgKGN1cnJlbnRUaW1lKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVcbiAgfVxuICBAT3V0cHV0KCkgY3VycmVudFRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBwcml2YXRlIGR1cmF0aW9uID0gMFxuICBAT3V0cHV0KCkgZHVyYXRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBwcml2YXRlIGJ1ZmZlcmVkVGltZSA9IDBcbiAgcHJpdmF0ZSB3YWl0aW5nID0gZmFsc2VcbiAgQE91dHB1dCgpIHdhaXRpbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgc2V0IGxvb3AgKGxvb3ApIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcCA9IGxvb3BcbiAgfVxuICBAT3V0cHV0KCkgbG9vcENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBASW5wdXQoKSBzZXQgbXV0ZWQgKG11dGVkKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gbXV0ZWRcbiAgfVxuICBAT3V0cHV0KCkgbXV0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcblxuICBmcHMgPSAnMC4wMCdcbiAgcHJpdmF0ZSBmcHNTdGFydCA9IDBcbiAgcHJpdmF0ZSBmcHNJbmRleCA9IDBcblxuICBnZXQgY3VycmVudFRpbWVTdHIgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFVzaGlvQ29tcG9uZW50LmZvcm1hdER1cmF0aW9uKHRoaXMubUN1cnJlbnRUaW1lKVxuICB9XG4gIGdldCBkdXJhdGlvblN0ciAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVXNoaW9Db21wb25lbnQuZm9ybWF0RHVyYXRpb24odGhpcy5kdXJhdGlvbilcbiAgfVxuICBnZXQgYnVmZmVyZWRQcm9ncmVzcyAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogc2NhbGVYKCR7dGhpcy5idWZmZXJlZFRpbWUgLyB0aGlzLmR1cmF0aW9ufSlgXG4gICAgKVxuICB9XG4gIGdldCBwbGF5ZWRQcm9ncmVzcyAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogc2NhbGVYKCR7dGhpcy5tQ3VycmVudFRpbWUgLyB0aGlzLmR1cmF0aW9ufSlgXG4gICAgKVxuICB9XG4gIGdldCB0aHVtYlBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgbGVmdDogJHt0aGlzLm1DdXJyZW50VGltZSAvIHRoaXMuZHVyYXRpb24gKiAxMDB9JWBcbiAgICApXG4gIH1cbiAgZ2V0IHZvbHVtZVJhdGUgKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHNjYWxlWSgke3RoaXMudm9sdW1lMTAwIC8gMTAwfSlgXG4gICAgKVxuICB9XG4gIGdldCB2b2x1bWVUaHVtYlBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgYm90dG9tOiAke3RoaXMudm9sdW1lMTAwfSVgXG4gICAgKVxuICB9XG4gIGdldCBzcGVlZFRodW1iUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGBsZWZ0OiAke1VzaGlvQ29tcG9uZW50Lm1hcFNwZWVkVG9Qcm9ncmVzcyh0aGlzLm1QbGF5YmFja1JhdGUpfSVgXG4gICAgKVxuICB9XG4gIHByaXZhdGUgcGFuZWxUcmFuc2xhdGlvbnMgPSB7XG4gICAgc2V0dGluZ3M6IDAsXG4gICAgc291cmNlOiAwLFxuICAgIHN1YnRpdGxlczogMCxcbiAgICBsb29wOiAwLFxuICAgIGZ1bGxzY3JlZW46IDBcbiAgfVxuICBnZXQgc2V0dGluZ3NQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5zZXR0aW5nc31weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgc291cmNlUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuc291cmNlfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBzdWJ0aXRsZXNQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5zdWJ0aXRsZXN9cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgZ2V0IGxvb3BQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5sb29wfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBmdWxsU2NyZWVuUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuZnVsbHNjcmVlbn1weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBwcml2YXRlIG1Db250ZXh0TWVudVBvc2l0aW9uID0gJydcbiAgZ2V0IGNvbnRleHRNZW51UG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uKVxuICB9XG4gIHByaXZhdGUgbVByb2dyZXNzRGV0YWlsUG9zaXRpb24gPSAnJ1xuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uID0gJydcbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24gPSAnJ1xuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSA9IDBcbiAgZ2V0IHByb2dyZXNzRGV0YWlsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uKVxuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tUHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbilcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Qcm9ncmVzc0RldGFpbFRpbWVQb3NpdGlvbilcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxJbWdTdHlsZSAoKTogU2FmZVN0eWxlIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9IZWlnaHQgKiAxNjAgLyB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9XaWR0aFxuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgaGVpZ2h0OiAke2hlaWdodH1weDtcbiAgICAgICBsaW5lLWhlaWdodDogJHtoZWlnaHR9cHg7XG4gICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiJHt0aGlzLnRodW1ibmFpbHN9XCIpO1xuICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0keyhNYXRoLmNlaWwodGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgKiAxMDApIC0gMSkgKiAxNjB9cHggMDtgXG4gICAgKVxuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbFRpbWUgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFVzaGlvQ29tcG9uZW50LmZvcm1hdER1cmF0aW9uKHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb25SYXRlICogdGhpcy5kdXJhdGlvbilcbiAgfVxuXG4gIGxhbmd1YWdlcyA9IHRoaXMuc2VydmljZS5pMThuLmxhbmd1YWdlc1xuICBjb250ZXh0TWVudVN0YXRlID0gJ3Jvb3QnXG4gIGdldCB2ZXJzaW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnZlcnNpb25cbiAgfVxuICBnZXQgZGV0YWlsZWRWZXJzaW9uICgpIHtcbiAgICByZXR1cm4gYHYke3RoaXMuc2VydmljZS52ZXJzaW9ufSAoJHt0aGlzLnNlcnZpY2UuYnVpbGR9KWBcbiAgfVxuICBnZXQgdmlkZW9SZXNvbHV0aW9uICgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvV2lkdGh9IHggJHt0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9IZWlnaHR9YFxuICB9XG4gIGdldCB2aWRlb0R1cmF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmR1cmF0aW9uLnRvRml4ZWQoNilcbiAgfVxuICBnZXQgdmlkZW9DdXJyZW50VGltZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZS50b0ZpeGVkKDYpXG4gIH1cblxuICBwcml2YXRlIHRpbWVVcGRhdGU6IFN1YnNjcmlwdGlvblxuICBwcml2YXRlIGNvbnRyb2xIb3ZlcmVkQ2hhbmdlOiBTdWJzY3JpcHRpb25cbiAgcHJpdmF0ZSBhbmltYXRpb25GcmFtZTogU3Vic2NyaXB0aW9uXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXVxuICBwcml2YXRlIG1vdXNlU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXVxuICBwcml2YXRlIGtleVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW11cbiAgcHJpdmF0ZSBzZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb25UaW1lb3V0OiBudW1iZXJcbiAgcHJpdmF0ZSBtb3VzZU1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJylcbiAgcHJpdmF0ZSBtb3VzZVVwJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKVxuICBwcml2YXRlIHRvdWNoTW92ZSQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICd0b3VjaG1vdmUnKVxuICBwcml2YXRlIHRvdWNoU3RhcnQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hzdGFydCcpXG4gIHByaXZhdGUgdG91Y2hFbmQkID0gbWVyZ2UoXG4gICAgZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hlbmQnKSxcbiAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICd0b3VjaGNhbmNlbCcpXG4gIClcbiAgcHJpdmF0ZSBtb3VzZVRvdWNoVXAkID0gbWVyZ2UodGhpcy5tb3VzZVVwJCwgdGhpcy50b3VjaEVuZCQpXG5cbiAgdCA9IHRoaXMuc2VydmljZS5pMThuLnRcblxuICBzdGF0aWMgbWFwU3BlZWRUb1Byb2dyZXNzIChzcGVlZCkge1xuICAgIGlmIChzcGVlZCA8IC41KSByZXR1cm4gMFxuICAgIGVsc2UgaWYgKHNwZWVkIDwgMS41KSByZXR1cm4gKHNwZWVkIC0gLjUpICogODBcbiAgICBlbHNlIGlmIChzcGVlZCA8IDIuMCkgcmV0dXJuIDgwICsgKHNwZWVkIC0gMS41KSAqIDQwXG4gICAgZWxzZSByZXR1cm4gMTAwXG4gIH1cbiAgc3RhdGljIG1hcFByb2dyZXNzVG9TcGVlZCAocHJvZ3Jlc3MpIHtcbiAgICBpZiAocHJvZ3Jlc3MgPCAuMSkgcmV0dXJuIC41XG4gICAgZWxzZSBpZiAocHJvZ3Jlc3MgPCAuOSkgcmV0dXJuIC43NSArIC4yNSAqIE1hdGguZmxvb3IoKHByb2dyZXNzIC0gMC4xKSAqIDUpXG4gICAgZWxzZSByZXR1cm4gMlxuICB9XG5cbiAgc3RhdGljIGZvcm1hdER1cmF0aW9uIChkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgY29uc3QgaCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyAzNjAwKVxuICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgMzYwMCAvIDYwKVxuICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgNjApXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKGggJiYgaCA8IDEwKSB7IHN0ciArPSBgMCR7aH06YCB9IGVsc2UgaWYgKGgpIHsgc3RyICs9IGAke2h9OmAgfVxuICAgIGlmIChtIDwgMTApIHsgc3RyICs9IGAwJHttfTpgIH0gZWxzZSB7IHN0ciArPSBgJHttfTpgIH1cbiAgICBpZiAocyA8IDEwKSB7IHN0ciArPSBgMCR7c31gIH0gZWxzZSB7IHN0ciArPSBgJHtzfWAgfVxuICAgIHJldHVybiBzdHJcbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIHNlcnZpY2U6IFVzaGlvU2VydmljZVxuICApIHtcbiAgICB0aGlzLnNob3dMYW5nTWVudSA9IHRoaXMuc2hvd0xhbmdNZW51LmJpbmQodGhpcylcbiAgICB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZCA9IHRoaXMub25Db21wb25lbnRDbGlja2VkLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRG9jdW1lbnRDbGlja2VkID0gdGhpcy5vbkRvY3VtZW50Q2xpY2tlZC5iaW5kKHRoaXMpXG4gIH1cblxuICBuZ09uSW5pdCAoKSB7XG4gICAgdGhpcy5tUGF1c2VkID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlZFxuICAgIHRoaXMubVZvbHVtZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWVcbiAgICB0aGlzLm1QbGF5YmFja1JhdGUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlXG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQgKCkge1xuICAgIGNvbnN0IG1hcFByb3BzVG9PYmplY3QgPSAocHJvcHM6IHN0cmluZ1tdLCBmbikgPT4gKHNvdXJjZU9iajogYW55KSA9PiAoXG4gICAgICBwcm9wcy5yZWR1Y2UoKGFnZywgY3VyKSA9PiAoeyAuLi5hZ2csIFtjdXJdOiBmbihzb3VyY2VPYmosIGN1cikgfSksIHt9KVxuICAgIClcbiAgICBjb25zdCBvbkNvbnRlbnRDaGlsZHJlbk9yU2xvdENoYW5nZWQkID0gKFxuICAgICAgYXR0ciwgY29udGVudENoaWxkcmVuOlxuICAgICAgUXVlcnlMaXN0PGFueT4sXG4gICAgICBzbG90Q2hhbmdlJDogT2JzZXJ2YWJsZTxIVE1MRWxlbWVudFtdPlxuICAgICkgPT4ge1xuICAgICAgY29uc3QgY29udGVudENoaWxkcmVuTWFwID0gbWFwUHJvcHNUb09iamVjdChhdHRyLCAob2JqLCBjdXIpID0+IChvYmpbY3VyXSkpXG4gICAgICBjb25zdCBzbG90TWFwID0gbWFwUHJvcHNUb09iamVjdChhdHRyLCAob2JqLCBjdXIpID0+IChvYmouZ2V0QXR0cmlidXRlKGN1cikpKVxuICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICBvZihjb250ZW50Q2hpbGRyZW4udG9BcnJheSgpLm1hcChjb250ZW50Q2hpbGRyZW5NYXApKSxcbiAgICAgICAgY29udGVudENoaWxkcmVuLmNoYW5nZXMucGlwZShcbiAgICAgICAgICBtYXAoKGNvbnRlbnRzOiBRdWVyeUxpc3Q8YW55PikgPT4gKGNvbnRlbnRzLnRvQXJyYXkoKS5tYXAoY29udGVudENoaWxkcmVuTWFwKSkpXG4gICAgICAgICksXG4gICAgICAgIHNsb3RDaGFuZ2UkLnBpcGUoXG4gICAgICAgICAgbWFwKChjb250ZW50czogSFRNTEVsZW1lbnRbXSkgPT4gKFxuICAgICAgICAgICAgY29udGVudHMubWFwKHNsb3RNYXApXG4gICAgICAgICAgKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCBzdWJ0aXRsZXNBdHRyID0gWyd2YWx1ZScsICd0eXBlJywgJ3NyYycsICduYW1lJywgJ2NsYXNzJywgJ2RlZmF1bHQnLCAnc3JjbGFuZyddXG4gICAgY29uc3Qgc3VidGl0bGVzQ2hhbmdlJCA9IG9uQ29udGVudENoaWxkcmVuT3JTbG90Q2hhbmdlZCQoXG4gICAgICBzdWJ0aXRsZXNBdHRyLCB0aGlzLnN1YnRpdGxlc0NvbnRlbnRDaGlsZHJlbiwgdGhpcy5zdWJ0aXRsZXNTbG90Q2hhbmdlJClcbiAgICBjb25zdCBzb3VyY2VzQXR0ciA9IFsnc3JjJywgJ3R5cGUnLCAnbmFtZScsICdzaG9ydG5hbWUnLCAnZGVmYXVsdCddXG4gICAgY29uc3Qgc291cmNlc0NoYW5nZSQgPSBvbkNvbnRlbnRDaGlsZHJlbk9yU2xvdENoYW5nZWQkKFxuICAgICAgc291cmNlc0F0dHIsIHRoaXMuc291cmNlQ29udGVudENoaWxkcmVuLCB0aGlzLnNvdXJjZXNTbG90Q2hhbmdlJClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3VidGl0bGVzQ2hhbmdlJC5zdWJzY3JpYmUoYXN5bmMgKHN1YnRpdGxlcykgPT4ge1xuICAgICAgICB0aGlzLm1TdWJ0aXRsZXMgPSBzdWJ0aXRsZXNcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVTdWJ0aXRsZXMoKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzb3VyY2VzQ2hhbmdlJC5zdWJzY3JpYmUoKHNvdXJjZXMpID0+IHtcbiAgICAgICAgdGhpcy5tU291cmNlcyA9IHNvdXJjZXNcbiAgICAgICAgdGhpcy51cGRhdGVTb3VyY2VzKClcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgIH0pXG4gIH1cblxuICBvblVuZm9jdXNlZCAoKSB7XG4gICAgdGhpcy5rZXlTdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKVxuICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucyA9IFtdXG4gIH1cblxuICBvbkZvY3VzZWQgKCkge1xuICAgIGNvbnN0IG9uS2V5RG93biQgPSBjb2RlID0+IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5waXBlKFxuICAgICAgZmlsdGVyKChlOiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmZvY3VzICYmIGUuY29kZSA9PT0gY29kZSksXG4gICAgICB0YXAoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICB9KVxuICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5rZXlTdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnU3BhY2UnKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlUGxheSgpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93UmlnaHQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1DdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lICsgNSA8IHRoaXMuZHVyYXRpb24gPyB0aGlzLm1DdXJyZW50VGltZSArIDUgOiB0aGlzLmR1cmF0aW9uXG4gICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93TGVmdCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubUN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWUgLSA1ID4gMCA/IHRoaXMubUN1cnJlbnRUaW1lIC0gNSA6IDBcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5tQ3VycmVudFRpbWVcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5rZXlTdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnQXJyb3dVcCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMubVZvbHVtZSArIDAuMSA8IDAuOTk5OTk2ID8gdGhpcy5tVm9sdW1lICsgMC4xIDogMVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy5tVm9sdW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMua2V5U3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93RG93bicpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMubVZvbHVtZSAtIDAuMSA+IDAuMDAwMDA0ID8gdGhpcy5tVm9sdW1lIC0gMC4xIDogMFxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy5tVm9sdW1lXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGNvbnN0IHNob3dWb2x1bWVIaW50JCA9IG1lcmdlKG9uS2V5RG93biQoJ0Fycm93VXAnKSwgb25LZXlEb3duJCgnQXJyb3dEb3duJykpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAgICgpID0+IG1lcmdlKG9mKHRydWUpLCB0aW1lcigxMDAwKS5waXBlKG1hcFRvKGZhbHNlKSkpXG4gICAgICAgICksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5rZXlTdWJzY3JpcHRpb25zLnB1c2goc2hvd1ZvbHVtZUhpbnQkLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy5zaG93Vm9sdW1lSGludCA9IGVcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICAgIH0pXG4gIH1cblxuICBvbkNvbnRyb2xEaXNtaXNzICgpIHtcbiAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSlcbiAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucyA9IFtdXG4gICAgaWYgKHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UudW5zdWJzY3JpYmUoKVxuICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvbkNvbnRyb2xTaG93biAoKSB7XG4gICAgY29uc3QgaWZNb3VzZUluQXJlYSA9IChlOiBNb3VzZUV2ZW50LCBidG5FbGVtZW50LCBwb3BVcEVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QxID0gcG9wVXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBjb25zdCByZWN0MiA9IGJ0bkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIHJldHVybiAoZS5jbGllbnRYID4gcmVjdDEubGVmdCAmJlxuICAgICAgICBlLmNsaWVudFggPCByZWN0MS5yaWdodCAmJlxuICAgICAgICBlLmNsaWVudFkgPiByZWN0MS50b3AgJiZcbiAgICAgICAgZS5jbGllbnRZIDwgcmVjdDEuYm90dG9tKSB8fCAoZS5jbGllbnRYID4gcmVjdDIubGVmdCAmJlxuICAgICAgICBlLmNsaWVudFggPCByZWN0Mi5yaWdodCAmJlxuICAgICAgICBlLmNsaWVudFkgPiByZWN0Mi50b3AgJiZcbiAgICAgICAgZS5jbGllbnRZIDwgcmVjdDIuYm90dG9tKVxuICAgIH1cbiAgICBjb25zdCBvbkNvbnRyb2xCdG5Ib3ZlclN0YXRlQ2hhbmdlZCQgPSAoYnRucykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubW91c2VNb3ZlJC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGJ0biBvZiBidG5zKSB7XG4gICAgICAgICAgICBpZiAoaWZNb3VzZUluQXJlYShlLCBidG4uYnRuRWxlbWVudCwgYnRuLnBvcFVwRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKGAgYnRuLSR7YnRuLmJ0bk5hbWV9LWhvdmVyYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRpbWVyKDE1MCkucGlwZShcbiAgICAgICAgICAgIG1hcFRvKCcnKVxuICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgIClcbiAgICB9XG4gICAgY29uc3QgbW91c2VIb3ZlclByb2dyZXNzU3RhdGUkID0gdGhpcy5tb3VzZU1vdmUkLnBpcGUoXG4gICAgICBmaWx0ZXIoKCkgPT4gKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpKSxcbiAgICAgIG1hcCgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCB5Q2VudGVyID0gKHJlY3QudG9wICsgcmVjdC5ib3R0b20pIC8gMlxuICAgICAgICBpZiAoTWF0aC5hYnMoZS5jbGllbnRZIC0geUNlbnRlcikgPCA4ICYmIGUuY2xpZW50WCA+IHJlY3QubGVmdCAmJiBlLmNsaWVudFggPCByZWN0LnJpZ2h0KSB7XG4gICAgICAgICAgY29uc3QgbGVmdCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdFxuICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckxlZnQgPSBsZWZ0IDwgODAgPyA5MCAtIGxlZnQgOiBsZWZ0ID4gcmVjdC53aWR0aCAtIDgwID8gcmVjdC53aWR0aCAtIGxlZnQgLSA3MCA6IDEwXG4gICAgICAgICAgY29uc3QgdGltZUxlZnQgPSBsZWZ0IDwgMjAgPyAzMCAtIGxlZnQgOiBsZWZ0ID4gcmVjdC53aWR0aCAtIDIwID8gcmVjdC53aWR0aCAtIGxlZnQgLSAxMCA6IDEwXG4gICAgICAgICAgcmV0dXJuIHsgbGVmdCwgY29udGFpbmVyTGVmdCwgdGltZUxlZnQsIHdpZHRoOiByZWN0LndpZHRoIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGEgIT09IHR5cGVvZiBiKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJldHVybiBhLmxlZnQgPT09IGIubGVmdCAmJiBhLmNvbnRhaW5lckxlZnQgPT09IGIuY29udGFpbmVyTGVmdFxuICAgICAgICAgICAgJiYgYS50aW1lTGVmdCA9PT0gYi50aW1lTGVmdCAmJiBhLndpZHRoID09PSBiLndpZHRoXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IGJcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2gobW91c2VIb3ZlclByb2dyZXNzU3RhdGUkLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzRGV0YWlsID0gc3RhdGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3dQcm9ncmVzc0RldGFpbCA9IHRydWVcbiAgICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uID0gYGxlZnQ6ICR7c3RhdGUubGVmdH1weGBcbiAgICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uID0gYGxlZnQ6ICR7c3RhdGUuY29udGFpbmVyTGVmdH1weGBcbiAgICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbFRpbWVQb3NpdGlvbiA9IGBsZWZ0OiAke3N0YXRlLnRpbWVMZWZ0fXB4YFxuICAgICAgICAgIHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb25SYXRlID0gc3RhdGUubGVmdCAvIHN0YXRlLndpZHRoXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3QgbWFwVG9SYXRlID0gKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCkgPT4gbWFwKFxuICAgICAgKG1vdmVFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnRDb29yZGluYXRlID0gbW92ZUV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudFxuICAgICAgICAgID8gbW92ZUV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXG4gICAgICAgICAgOiBtb3ZlRXZlbnRcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IHAgPSBwcm9ncmVzcyhldmVudENvb3JkaW5hdGUsIHJlY3QpXG4gICAgICAgIGNvbnN0IHQgPSB0b3RhbChyZWN0KVxuICAgICAgICBpZiAocCA8IDApIHAgPSAwXG4gICAgICAgIGVsc2UgaWYgKHAgPiB0KSBwID0gdFxuICAgICAgICByZXR1cm4gcCAvIHRcbiAgICAgIH1cbiAgICApXG4gICAgY29uc3Qgb25Nb3VzZVRvdWNoRG93biQgPSAoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKSA9PiB7XG4gICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vkb3duJyksXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAndG91Y2hzdGFydCcpXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IG9uTW91c2VUb3VjaERyYWckID0gKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCkgPT4ge1xuICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ21vdXNlZG93bicpLnBpcGUoXG4gICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCksXG4gICAgICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdXNlTW92ZSQucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMubW91c2VVcCQpLFxuICAgICAgICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAndG91Y2hzdGFydCcpLnBpcGUoXG4gICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCksXG4gICAgICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdWNoTW92ZSQucGlwZShcbiAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMudG91Y2hFbmQkKSxcbiAgICAgICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IHRodW1iTW91c2VUb3VjaERvd24kID0gb25Nb3VzZVRvdWNoRG93biQoXG4gICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgY29uc3QgdGh1bWJUb3VjaERyYWckID0gb25Nb3VzZVRvdWNoRHJhZyQoXG4gICAgICB0aGlzLnNsaWRlci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2godGh1bWJNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICB0aGlzLnRodW1iTW91c2VEb3duID0gdHJ1ZVxuICAgICAgICB0aGlzLnRpbWVVcGRhdGUudW5zdWJzY3JpYmUoKVxuICAgICAgICB0aGlzLm1DdXJyZW50VGltZSA9IGUgKiB0aGlzLmR1cmF0aW9uXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2godGh1bWJUb3VjaERyYWckLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSBlICogdGhpcy5kdXJhdGlvblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubW91c2VUb3VjaFVwJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50aHVtYk1vdXNlRG93bikge1xuICAgICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVUaW1lVXBkYXRlKClcbiAgICAgICAgICB0aGlzLnRodW1iTW91c2VEb3duID0gZmFsc2VcbiAgICAgICAgICB0aGlzLnNob3dDb250cm9sUHJvYmFibHlDaGFuZ2VkJC5uZXh0KDApXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgICAgfVxuICAgICAgfSkpXG4gICAgfSlcbiAgICBjb25zdCBjb250cm9sSG92ZXJTdGF0ZUNoYW5nZSQgPSBvbkNvbnRyb2xCdG5Ib3ZlclN0YXRlQ2hhbmdlZCQoW3tcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMudm9sdW1lQnRuLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBwb3BVcEVsZW1lbnQ6IHRoaXMudm9sdW1lUGFuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGJ0bk5hbWU6ICd2b2x1bWUnXG4gICAgfSwge1xuICAgICAgYnRuRWxlbWVudDogdGhpcy5zZXR0aW5nc0J0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnNldHRpbmdzUGFuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGJ0bk5hbWU6ICdzZXR0aW5ncydcbiAgICB9LCB7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnNvdXJjZUJ0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnNvdXJjZVBhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc291cmNlJ1xuICAgIH0sIHtcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMuc3VidGl0bGVzQnRuLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBwb3BVcEVsZW1lbnQ6IHRoaXMuc3VidGl0bGVzUGFuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGJ0bk5hbWU6ICdzdWJ0aXRsZXMnXG4gICAgfV0pXG4gICAgY29uc3Qgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlID0gY29udHJvbEhvdmVyU3RhdGVDaGFuZ2UkLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2xhc3MgPSBlXG4gICAgICAgICAgdGhpcy5zaG93Q29udHJvbFByb2JhYmx5Q2hhbmdlZCQubmV4dCgwKVxuICAgICAgICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgIGNvbnN0IHZvbHVtZU1vdXNlVG91Y2hEb3duJCA9IG9uTW91c2VUb3VjaERvd24kKFxuICAgICAgdGhpcy52b2x1bWVCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChyZWN0LmJvdHRvbSAtIG1vdmVFdmVudC5jbGllbnRZKSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC5oZWlnaHQpXG4gICAgKVxuICAgIGNvbnN0IHZvbHVtZVRvdWNoRHJhZyQgPSBvbk1vdXNlVG91Y2hEcmFnJChcbiAgICAgIHRoaXMudm9sdW1lQmFyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAocmVjdC5ib3R0b20gLSBtb3ZlRXZlbnQuY2xpZW50WSksXG4gICAgICAocmVjdCkgPT4gKHJlY3QuaGVpZ2h0KVxuICAgIClcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN1YnNjcmlwdGlvbnMucHVzaCh2b2x1bWVNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHZvbHVtZVRvdWNoRHJhZyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gZVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgICB0aGlzLm1vdXNlU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMubW91c2VUb3VjaFVwJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sTW91c2VEb3duKSB7XG4gICAgICAgICAgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UoKVxuICAgICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5zaG93Q29udHJvbFByb2JhYmx5Q2hhbmdlZCQubmV4dCgwKVxuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gICAgY29uc3Qgc3BlZWRNb3VzZVRvdWNoRG93biQgPSBvbk1vdXNlVG91Y2hEb3duJChcbiAgICAgIHRoaXMuc3BlZWRCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIGNvbnN0IHNwZWVkVG91Y2hEcmFnJCA9IG9uTW91c2VUb3VjaERyYWckKFxuICAgICAgdGhpcy5zcGVlZEJhci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2goc3BlZWRNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gVXNoaW9Db21wb25lbnQubWFwUHJvZ3Jlc3NUb1NwZWVkKGUpXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICAgIHRoaXMubW91c2VTdWJzY3JpcHRpb25zLnB1c2goc3BlZWRUb3VjaERyYWckLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZSA9IFVzaGlvQ29tcG9uZW50Lm1hcFByb2dyZXNzVG9TcGVlZChlKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSkpXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMudGltZVVwZGF0ZSA9IGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd0aW1ldXBkYXRlJylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWVcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lQ2hhbmdlLmVtaXQodGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgICAgdGhpcy51cGRhdGVGbHlpbmdTdWJ0aXRsZXModGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0ICgpIHtcbiAgICB0aGlzLnRvdWNoU3RhcnQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmludGVyYWN0TW9kZSA9ICdtb2JpbGUnXG4gICAgfSlcbiAgICBjb25zdCBkZXNrdG9wU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSB0aGlzLm1vdXNlTW92ZSQucGlwZShcbiAgICAgIGZpbHRlcigoKSA9PiAodGhpcy5pbnRlcmFjdE1vZGUgPT09ICdkZXNrdG9wJykpLFxuICAgICAgbWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzaG93Q29udHJvbDogZS5jbGllbnRYID4gcmVjdC5sZWZ0ICYmXG4gICAgICAgICAgICBlLmNsaWVudFggPCByZWN0LnJpZ2h0ICYmXG4gICAgICAgICAgICBlLmNsaWVudFkgPiByZWN0LnRvcCAmJlxuICAgICAgICAgICAgZS5jbGllbnRZIDwgcmVjdC5ib3R0b20sXG4gICAgICAgICAgZGVsYXlTd2l0Y2g6IGUuY2xpZW50WSA8IHJlY3QuYm90dG9tIC0gNDZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgY29uc3Qgc2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBtZXJnZShcbiAgICAgIGRlc2t0b3BTaG93Q29udHJvbFN0YXRlQ2hhbmdlJCxcbiAgICAgIHRoaXMubW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSRcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoZSA9PiB7XG4gICAgICAgIHJldHVybiBlLnNob3dDb250cm9sXG4gICAgICAgICAgPyBtZXJnZShcbiAgICAgICAgICAgIG9mKHtcbiAgICAgICAgICAgICAgc2hvd0NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICAgIG5vQ3Vyc29yOiBmYWxzZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlLmRlbGF5U3dpdGNoID8gdGltZXIoXG4gICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcgPyA3NTAgOiA1MDAwXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIG1hcFRvKHtcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9DdXJzb3I6IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkgOiBORVZFUlxuICAgICAgICAgIClcbiAgICAgICAgICA6IG9mKHtcbiAgICAgICAgICAgIHNob3dDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIG5vQ3Vyc29yOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICB9KSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiAoXG4gICAgICAgIGEuc2hvd0NvbnRyb2wgPT09IGIuc2hvd0NvbnRyb2wgJiYgYS5ub0N1cnNvciA9PT0gYi5ub0N1cnNvclxuICAgICAgKSlcbiAgICApXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNob3dDb250cm9sU3RhdGVDaGFuZ2UkLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgIHRoaXMubVNob3dDb250cm9sID0gc3RhdGUuc2hvd0NvbnRyb2xcbiAgICAgICAgdGhpcy5zaG93Q29udHJvbFByb2JhYmx5Q2hhbmdlZCQubmV4dCgwKVxuICAgICAgICB0aGlzLm1Ob0N1cnNvciA9IHN0YXRlLm5vQ3Vyc29yXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICB9KSlcbiAgICB9KVxuICAgIGlmICh0aGlzLm1QYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3BhdXNlJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1QYXVzZWQgPSB0cnVlXG4gICAgICAgIHRoaXMucGF1c2VkQ2hhbmdlLmVtaXQodHJ1ZSlcbiAgICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICdwbGF5JylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1QYXVzZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhdXNlZENoYW5nZS5lbWl0KGZhbHNlKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpYmVUaW1lVXBkYXRlKClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAnd2FpdGluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gdHJ1ZVxuICAgICAgICB0aGlzLndhaXRpbmdDaGFuZ2UuZW1pdCh0aGlzLndhaXRpbmcpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncGxheWluZycpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gZmFsc2VcbiAgICAgICAgdGhpcy53YWl0aW5nQ2hhbmdlLmVtaXQodGhpcy53YWl0aW5nKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3Byb2dyZXNzJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlcmVkVGltZSA9ICgodGltZVJhbmdlcywgY3VycmVudFRpbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aW1lUmFuZ2VzLmxlbmd0aFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aW1lUmFuZ2VzLmVuZChpKSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVSYW5nZXMuc3RhcnQoaSkgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRpbWVSYW5nZXMuZW5kKGkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRpbWVcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lXG4gICAgICAgIH0pKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5idWZmZXJlZCwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lKVxuICAgICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ2xvYWRlZG1ldGFkYXRhJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmR1cmF0aW9uXG4gICAgICAgIHRoaXMuZHVyYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmR1cmF0aW9uKVxuICAgICAgfSkpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd2b2x1bWVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWVcbiAgICAgICAgdGhpcy52b2x1bWVDaGFuZ2UuZW1pdCh0aGlzLm1Wb2x1bWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlID0gdGhpcy5tUGxheWJhY2tSYXRlXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3JhdGVjaGFuZ2UnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubVBsYXliYWNrUmF0ZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGVcbiAgICAgICAgdGhpcy5wbGF5YmFja1JhdGVDaGFuZ2UuZW1pdCh0aGlzLm1QbGF5YmFja1JhdGUpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjb250ZXh0bWVudScpXG4gICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBvdXRlciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250ZXh0TWVudS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGlmIChlLmNsaWVudFggKyBwYW5lbC53aWR0aCArIDIwID4gb3V0ZXIucmlnaHQpIHtcbiAgICAgICAgICBpZiAoZS5jbGllbnRZICsgcGFuZWwuaGVpZ2h0ICsgMjAgPiBvdXRlci5ib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgcmlnaHQ6ICR7b3V0ZXIucmlnaHQgLSBlLmNsaWVudFh9cHg7IGJvdHRvbTogJHtvdXRlci5ib3R0b20gLSBlLmNsaWVudFl9cHhgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgcmlnaHQ6ICR7b3V0ZXIucmlnaHQgLSBlLmNsaWVudFh9cHg7IHRvcDogJHtlLmNsaWVudFkgLSBvdXRlci50b3B9cHhgXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlLmNsaWVudFkgKyBwYW5lbC5oZWlnaHQgKyAyMCA+IG91dGVyLmJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy5tQ29udGV4dE1lbnVQb3NpdGlvbiA9IGBsZWZ0OiAke2UuY2xpZW50WCAtIG91dGVyLmxlZnR9cHg7IGJvdHRvbTogJHtvdXRlci5ib3R0b20gLSBlLmNsaWVudFl9cHhgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgbGVmdDogJHtlLmNsaWVudFggLSBvdXRlci5sZWZ0fXB4OyB0b3A6ICR7ZS5jbGllbnRZIC0gb3V0ZXIudG9wfXB4YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRleHRNZW51U3RhdGUgPSAncm9vdCdcbiAgICAgICAgdGhpcy5zaG93Q29udGV4dE1lbnUgPSB0cnVlXG4gICAgICB9KSlcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5sYW5nQ29udGV4dE1lbnVPcHRpb24ubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd0xhbmdNZW51LCB0cnVlKVxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICB9KVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNob3dDb250cm9sQ2hhbmdlJC5zdWJzY3JpYmUoc2hvd0NvbnRyb2wgPT4ge1xuICAgICAgICBpZiAoc2hvd0NvbnRyb2wpIHRoaXMub25Db250cm9sU2hvd24oKVxuICAgICAgICBlbHNlIHRoaXMub25Db250cm9sRGlzbWlzcygpXG4gICAgICAgIHRoaXMuc2hvd0NvbnRyb2xDaGFuZ2UuZW1pdChzaG93Q29udHJvbClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIG5nT25EZXN0cm95ICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb25UaW1lb3V0KVxuICAgIHRoaXMub25VbmZvY3VzZWQoKVxuICAgIHRoaXMub25Db250cm9sRGlzbWlzcygpXG4gICAgaWYgKHRoaXMudGltZVVwZGF0ZSkge1xuICAgICAgdGhpcy50aW1lVXBkYXRlLnVuc3Vic2NyaWJlKClcbiAgICAgIHRoaXMudGltZVVwZGF0ZSA9IG51bGxcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdXG4gICAgdGhpcy5sYW5nQ29udGV4dE1lbnVPcHRpb24ubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd0xhbmdNZW51LCB0cnVlKVxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbXBvbmVudENsaWNrZWQsIHRydWUpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGlja2VkLCB0cnVlKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTb3VyY2VzICgpIHtcbiAgICBpZiAodGhpcy5tU291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuc291cmNlcyA9IFt7XG4gICAgICAgIHNob3J0TmFtZTogJ0RlZmF1bHQnLFxuICAgICAgICBuYW1lOiAnRGVmYXVsdCcsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIHNvdXJjZXM6IFt7IHNyYzogdGhpcy5tU3JjLCB0eXBlOiB1bmRlZmluZWQgfV1cbiAgICAgIH1dXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNtID0ge31cbiAgICAgIHRoaXMubVNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuICAgICAgICBpZiAoIXNvdXJjZS5zaG9ydG5hbWUpIHtcbiAgICAgICAgICBzb3VyY2Uuc2hvcnRuYW1lID0gJ1VudGl0bGVkJ1xuICAgICAgICB9XG4gICAgICAgIGlmICghc21bc291cmNlLnNob3J0bmFtZV0pIHtcbiAgICAgICAgICBzbVtzb3VyY2Uuc2hvcnRuYW1lXSA9IHtcbiAgICAgICAgICAgIHNob3J0TmFtZTogc291cmNlLnNob3J0bmFtZSxcbiAgICAgICAgICAgIG5hbWU6IHNvdXJjZS5uYW1lIHx8ICdVbnRpdGxlZCcsXG4gICAgICAgICAgICBzb3VyY2VzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzbVtzb3VyY2Uuc2hvcnRuYW1lXS5zb3VyY2VzLnB1c2goc291cmNlKVxuICAgICAgICBpZiAoc291cmNlLmRlZmF1bHQgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UuZGVmYXVsdCAhPT0gbnVsbCkge1xuICAgICAgICAgIHNtW3NvdXJjZS5zaG9ydG5hbWVdLmRlZmF1bHQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNvdXJjZXMgPSBPYmplY3QudmFsdWVzKHNtKVxuICAgIH1cbiAgICBjb25zdCBpbmRleE9mRGVmYXVsdCA9IHRoaXMuc291cmNlcy5maW5kSW5kZXgocyA9PiBzLmRlZmF1bHQpXG4gICAgdGhpcy5wbGF5aW5nU291cmNlID0gaW5kZXhPZkRlZmF1bHQgPj0gMCA/IGluZGV4T2ZEZWZhdWx0IDogMFxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1cGRhdGVTdWJ0aXRsZXMgKCkge1xuICAgIGNvbnN0IHBhcnNlZFN1YnRpdGxlcyA9IFtdXG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5tU3VidGl0bGVzKSB7XG4gICAgICBsZXQgdGV4dCA9ICcnXG4gICAgICBpZiAoc3ViLnZhbHVlKSB0ZXh0ID0gc3ViLnZhbHVlXG4gICAgICBlbHNlIGlmIChzdWIuc3JjKSB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChzdWIuc3JjKVxuICAgICAgICB0ZXh0ID0gYXdhaXQgcmVzcC50ZXh0KClcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhcnNlZCA9IHtcbiAgICAgICAgbmFtZTogc3ViLm5hbWUgfHwgJ1VudGl0bGVkJyxcbiAgICAgICAgY2xhc3M6IHN1Yi5jbGFzcyB8fCAnJyxcbiAgICAgICAgcGFyc2VkU3VidGl0bGVzOiB1bmRlZmluZWQsXG4gICAgICAgIGVuYWJsZWQ6IHN1Yi5kZWZhdWx0ICE9PSB1bmRlZmluZWQgJiYgc3ViLmRlZmF1bHQgIT09IG51bGxcbiAgICAgICAgICB8fCBzdWIuc3JjbGFuZyA9PT0gdGhpcy5zZXJ2aWNlLmkxOG4ubGFuZ3VhZ2VcbiAgICAgIH1cbiAgICAgIHN1Yi50eXBlID0gc3ViLnR5cGUgfHwgJydcbiAgICAgIHN1Yi50eXBlID0gc3ViLnR5cGUudG9Mb3dlckNhc2UoKVxuICAgICAgaWYgKHN1Yi50eXBlICE9PSAndGV4dC92dHQnICYmIHN1Yi50eXBlICE9PSAnYXBwbGljYXRpb24veC1zdWJyaXAnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignVW5rbm93biBNSU1FIHR5cGUgb2Ygc3VidGl0bGVzLCB0cnlpbmcgdG8gaW5mZXIgc3VidGl0bGUgZm9ybWF0LiBTdXBwb3J0ZWQgdHlwZTogdGV4dC92dHQsIGFwcGxpY2F0aW9uL3gtc3VicmlwLicpXG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBwYXJzZWQucGFyc2VkU3VidGl0bGVzID0gdGhpcy5zZXJ2aWNlLnBhcnNlU3VidGl0bGVzKHRleHQpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIH1cbiAgICAgIHBhcnNlZFN1YnRpdGxlcy5wdXNoKHBhcnNlZClcbiAgICB9XG4gICAgdGhpcy5zdWJ0aXRsZXMgPSBwYXJzZWRTdWJ0aXRsZXNcbiAgICB0aGlzLnVwZGF0ZUZseWluZ1N1YnRpdGxlcygpXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZseWluZ1N1YnRpdGxlcyAoY3VycmVudFRpbWU/KSB7XG4gICAgaWYgKGN1cnJlbnRUaW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnRUaW1lID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lXG4gICAgfVxuICAgIGN1cnJlbnRUaW1lICo9IDEwMDBcbiAgICBjb25zdCBmbHlpbmdTdWJ0aXRsZXMgPSBbXVxuICAgIHRoaXMuZW5hYmxlZFN1YnRpdGxlcy5mb3JFYWNoKHN1YnRpdGxlcyA9PiB7XG4gICAgICBpZiAoIXN1YnRpdGxlcy5wYXJzZWRTdWJ0aXRsZXMpIHJldHVyblxuICAgICAgY29uc3QgZmx5aW5nU3VidGl0bGVzVHJhY2sgPSBbXVxuICAgICAgc3VidGl0bGVzLnBhcnNlZFN1YnRpdGxlcy5mb3JFYWNoKHN1YnRpdGxlID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lID4gc3VidGl0bGUuc3RhcnRUaW1lICYmIGN1cnJlbnRUaW1lIDwgc3VidGl0bGUuZW5kVGltZSkge1xuICAgICAgICAgIGZseWluZ1N1YnRpdGxlc1RyYWNrLnB1c2goe1xuICAgICAgICAgICAgLi4uc3VidGl0bGUsXG4gICAgICAgICAgICB0ZXh0czogc3VidGl0bGUudGV4dHMubWFwKHRleHQgPT4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGV4dCkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChmbHlpbmdTdWJ0aXRsZXNUcmFjay5sZW5ndGgpIHtcbiAgICAgICAgZmx5aW5nU3VidGl0bGVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHN1YnRpdGxlcy5uYW1lLFxuICAgICAgICAgIGNsYXNzOiBzdWJ0aXRsZXMuY2xhc3MsXG4gICAgICAgICAgcGFyc2VkU3VidGl0bGVzOiBmbHlpbmdTdWJ0aXRsZXNUcmFja1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5mbHlpbmdTdWJ0aXRsZXMgPSBmbHlpbmdTdWJ0aXRsZXNcbiAgfVxuXG4gIHByaXZhdGUgc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uICgpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb25UaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIFt7XG4gICAgICAgICAgYnRuOiB0aGlzLnNldHRpbmdzQnRuLFxuICAgICAgICAgIHBhbmVsOiB0aGlzLnNldHRpbmdzUGFuZWwsXG4gICAgICAgICAgbmFtZTogJ3NldHRpbmdzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgYnRuOiB0aGlzLnNvdXJjZUJ0bixcbiAgICAgICAgICBwYW5lbDogdGhpcy5zb3VyY2VQYW5lbCxcbiAgICAgICAgICBuYW1lOiAnc291cmNlJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgYnRuOiB0aGlzLnN1YnRpdGxlc0J0bixcbiAgICAgICAgICBwYW5lbDogdGhpcy5zdWJ0aXRsZXNQYW5lbCxcbiAgICAgICAgICBuYW1lOiAnc3VidGl0bGVzJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgYnRuOiB0aGlzLmxvb3BCdG4sXG4gICAgICAgICAgcGFuZWw6IHRoaXMubG9vcFBhbmVsLFxuICAgICAgICAgIG5hbWU6ICdsb29wJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgYnRuOiB0aGlzLmZ1bGxTY3JlZW5CdG4sXG4gICAgICAgICAgcGFuZWw6IHRoaXMuZnVsbFNjcmVlblBhbmVsLFxuICAgICAgICAgIG5hbWU6ICdmdWxsc2NyZWVuJ1xuICAgICAgICB9XS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5zZXRQYW5lbFBvc2l0aW9uKGl0ZW0uYnRuLCBpdGVtLnBhbmVsLCBpdGVtLm5hbWUpKVxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICAgICAgfSwgMClcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYW5lbFBvc2l0aW9uIChidG4sIHBhbmVsLCBuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQgfHwgIXBhbmVsIHx8ICFidG4pIHJldHVyblxuICAgIGNvbnN0IG91dGVyUmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IGJ0blJlY3QgPSBidG4ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGlmIChwYW5lbFJlY3Qud2lkdGggLyAyIC0gb3V0ZXJSZWN0LnJpZ2h0ICsgYnRuUmVjdC5yaWdodCA+IDApIHtcbiAgICAgIHRoaXMucGFuZWxUcmFuc2xhdGlvbnNbbmFtZV0gPSBwYW5lbFJlY3Qud2lkdGggLyAyIC0gb3V0ZXJSZWN0LnJpZ2h0ICsgYnRuUmVjdC5yaWdodFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVsVHJhbnNsYXRpb25zW25hbWVdID0gMFxuICAgIH1cbiAgfVxuXG4gIG9uU2xvdENoYW5nZSAoZSkge1xuICAgIHRoaXMuc3VidGl0bGVzU2xvdFVwZGF0ZSQubmV4dChcbiAgICAgIGUudGFyZ2V0LmFzc2lnbmVkTm9kZXMoKS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnVVNISU8tU1VCVElUTEVTJylcbiAgICApXG4gICAgdGhpcy5zb3VyY2VzU2xvdFVwZGF0ZSQubmV4dChcbiAgICAgIGUudGFyZ2V0LmFzc2lnbmVkTm9kZXMoKS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnVVNISU8tU09VUkNFJylcbiAgICApXG4gICAgdGhpcy5tSW5qZWN0ZWRTdHlsZXMgPSBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKClcbiAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnKS5tYXAobm9kZSA9PiBub2RlLmlubmVySFRNTClcbiAgfVxuXG4gIG9uVmlkZW9NYXNrQ2xpY2tlZCAoKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpIHtcbiAgICAgIHRoaXMudG9nZ2xlUGxheSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQubmV4dCh7XG4gICAgICAgIHNob3dDb250cm9sOiAhdGhpcy5tU2hvd0NvbnRyb2wsXG4gICAgICAgIGRlbGF5U3dpdGNoOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0U291cmNlIChpKSB7XG4gICAgaWYgKGkgPT09IHRoaXMucGxheWluZ1NvdXJjZSkgcmV0dXJuXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgIGNvbnN0IHBhdXNlZCA9IHRoaXMubVBhdXNlZFxuICAgIHRoaXMucGxheWluZ1NvdXJjZSA9IGlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9hZCgpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVcbiAgICBpZiAoIXBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICB9XG5cbiAgb25DaGVja1N1YnRpdGxlcyAoaSkge1xuICAgIHRoaXMuc3VidGl0bGVzW2ldLmVuYWJsZWQgPSAhdGhpcy5zdWJ0aXRsZXNbaV0uZW5hYmxlZFxuICAgIHRoaXMudXBkYXRlRmx5aW5nU3VidGl0bGVzKClcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKVxuICB9XG5cbiAgdG9nZ2xlUGxheSAoKSB7XG4gICAgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5KClcbiAgICBlbHNlIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpXG4gIH1cblxuICB0b2dnbGVNdXRlICgpIHtcbiAgICBpZiAodGhpcy5pbnRlcmFjdE1vZGUgPT09ICdkZXNrdG9wJykge1xuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gISh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgfHwgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9PT0gMClcbiAgICAgIHRoaXMubXV0ZWRDaGFuZ2UuZW1pdCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQpXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQpIHtcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCA9IGZhbHNlXG4gICAgICB0aGlzLm11dGVkQ2hhbmdlLmVtaXQoZmFsc2UpXG4gICAgfVxuICAgIGlmICghdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkICYmIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPT09IDApIHtcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSBNYXRoLnJhbmRvbSgpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlTG9vcCAoKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3AgPSAhdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3BcbiAgICB0aGlzLmxvb3BDaGFuZ2UuZW1pdCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcClcbiAgfVxuXG4gIHRvZ2dsZUZ1bGxzY3JlZW4gKCkge1xuICAgIGlmICghdGhpcy5pc0Z1bGxTY3JlZW4pIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuXG4gIHNob3dMYW5nTWVudSAoKSB7XG4gICAgdGhpcy5jb250ZXh0TWVudVN0YXRlID0gJ2xhbmcnXG4gICAgdGhpcy5zaG93Q29udGV4dE1lbnUgPSB0cnVlXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgfVxuXG4gIG9uQ29tcG9uZW50Q2xpY2tlZCAoKSB7XG4gICAgdGhpcy5mb2N1cyA9IHRydWVcbiAgICBpZiAodGhpcy5rZXlTdWJzY3JpcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5vbkZvY3VzZWQoKVxuICAgIH1cbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGlja2VkICgpIHtcbiAgICB0aGlzLmZvY3VzID0gZmFsc2VcbiAgICBpZiAodGhpcy5zaG93Q29udGV4dE1lbnUpIHtcbiAgICAgIHRoaXMuc2hvd0NvbnRleHRNZW51ID0gZmFsc2VcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpXG4gICAgfVxuICB9XG5cbiAgc2V0TGFuZ3VhZ2UgKGNvZGUpIHtcbiAgICB0aGlzLnNlcnZpY2UuaTE4bi5zZXRMYW5ndWFnZShjb2RlKVxuICB9XG5cbiAgdG9nZ2xlU2hvd1N0YXRpc3RpY0luZm9QYW5lbCAoKSB7XG4gICAgdGhpcy5zaG93U3RhdGlzdGljSW5mb1BhbmVsID0gIXRoaXMuc2hvd1N0YXRpc3RpY0luZm9QYW5lbFxuICAgIGlmICh0aGlzLnNob3dTdGF0aXN0aWNJbmZvUGFuZWwpIHtcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbkZyYW1lJCA9IG9mKG51bGwsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKS5waXBlKHJlcGVhdCgpKVxuICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lID0gYW5pbWF0aW9uRnJhbWUkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmZwc1N0YXJ0KSB0aGlzLmZwc1N0YXJ0ID0gK25ldyBEYXRlKClcbiAgICAgICAgICB0aGlzLmZwc0luZGV4KytcbiAgICAgICAgICBjb25zdCBmcHNDdXJyZW50ID0gK25ldyBEYXRlKClcbiAgICAgICAgICBpZiAoZnBzQ3VycmVudCAtIHRoaXMuZnBzU3RhcnQgPiAxMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmZwcyA9ICgodGhpcy5mcHNJbmRleCAvIChmcHNDdXJyZW50IC0gdGhpcy5mcHNTdGFydCkpICogMTAwMCkudG9GaXhlZCgyKVxuICAgICAgICAgICAgdGhpcy5mcHNTdGFydCA9ICtuZXcgRGF0ZSgpXG4gICAgICAgICAgICB0aGlzLmZwc0luZGV4ID0gMFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lLnVuc3Vic2NyaWJlKClcbiAgICB9XG4gIH1cblxufVxuIl19