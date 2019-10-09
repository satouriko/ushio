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
    function UshioComponent(element, sanitization, service) {
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
        this.subscriptions.push(subtitlesChange$.subscribe((/**
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
                        return [2 /*return*/];
                }
            });
        }); })));
        /** @type {?} */
        var sourcesAttr = ['src', 'type', 'name', 'shortname', 'default'];
        /** @type {?} */
        var sourcesChange$ = onContentChildrenOrSlotChanged$(sourcesAttr, this.sourceContentChildren, this.sourcesSlotChange$);
        this.subscriptions.push(sourcesChange$.subscribe((/**
         * @param {?} sources
         * @return {?}
         */
        function (sources) {
            _this.mSources = sources;
            _this.updateSources();
        })));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mouseMove$ = fromEvent(document, 'mousemove');
        /** @type {?} */
        var mouseUp$ = fromEvent(document, 'mouseup');
        /** @type {?} */
        var touchMove$ = fromEvent(document, 'touchmove');
        /** @type {?} */
        var touchStart$ = fromEvent(document, 'touchstart');
        /** @type {?} */
        var touchEnd$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'touchcancel'));
        /** @type {?} */
        var mouseTouchUp$ = merge(mouseUp$, touchEnd$);
        touchStart$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.interactMode = 'mobile';
        }));
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
            return mouseMove$.pipe(switchMap((/**
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
        var desktopShowControlStateChange$ = mouseMove$.pipe(filter((/**
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
                ? merge(of(true), e.delaySwitch ? timer(_this.interactMode === 'desktop' ? 750 : 5000).pipe(mapTo(false)) : NEVER)
                : of(false);
        })), distinctUntilChanged());
        this.subscriptions.push(showControlStateChange$.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.mShowControl = state;
        })));
        /** @type {?} */
        var mouseHoverProgressState$ = mouseMove$.pipe(filter((/**
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
        })));
        this.subscriptions.push(mouseHoverProgressState$.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            if (!state) {
                _this.showProgressDetail = false;
            }
            else {
                _this.showProgressDetail = true;
                _this.mProgressDetailPosition = "left: " + state.left + "px";
                _this.mProgressDetailContainerPosition = "left: " + state.containerLeft + "px";
                _this.mProgressDetailTimePosition = "left: " + state.timeLeft + "px";
                _this.mProgressDetailPositionRate = state.left / state.width;
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
        /** @type {?} */
        var subscribeTimeUpdate = (/**
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
            }));
        });
        subscribeTimeUpdate();
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
                return mouseMove$.pipe(takeUntil(mouseUp$), mapToRate(element, progress, total));
            }))), fromEvent(element, 'touchstart').pipe(mapToRate(element, progress, total), concatMap((/**
             * @return {?}
             */
            function () {
                return touchMove$.pipe(takeUntil(touchEnd$), mapToRate(element, progress, total));
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
        this.subscriptions.push(thumbMouseTouchDown$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.thumbMouseDown = true;
            _this.timeUpdate.unsubscribe();
            _this.mCurrentTime = e * _this.duration;
        })));
        this.subscriptions.push(thumbTouchDrag$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.mCurrentTime = e * _this.duration;
        })));
        this.subscriptions.push(mouseTouchUp$.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.thumbMouseDown) {
                _this.video.nativeElement.currentTime = _this.mCurrentTime;
                subscribeTimeUpdate();
                _this.thumbMouseDown = false;
            }
        })));
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
            _this.controlHoveredChange = controlHoverStateChange$.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.controlHoveredClass = e;
                _this.setAllControlPanelsPosition();
            }));
        });
        subscribeControlHoveredChange();
        /** @type {?} */
        var hoverStateChange$ = merge(showControlStateChange$, controlHoverStateChange$).pipe(map((/**
         * @return {?}
         */
        function () { return _this.showControl; })), distinctUntilChanged());
        this.subscriptions.push(hoverStateChange$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.showControlChange.emit(e);
        })));
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
        this.subscriptions.push(volumeMouseTouchDown$.subscribe((/**
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
        })));
        this.subscriptions.push(volumeTouchDrag$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.video.nativeElement.volume = e;
        })));
        this.subscriptions.push(mouseTouchUp$.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.controlMouseDown) {
                subscribeControlHoveredChange();
                _this.controlMouseDown = false;
            }
        })));
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
        this.subscriptions.push(speedMouseTouchDown$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!_this.controlMouseDown) {
                _this.controlMouseDown = true;
                _this.controlHoveredChange.unsubscribe();
            }
            _this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
        })));
        this.subscriptions.push(speedTouchDrag$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.video.nativeElement.playbackRate = UshioComponent.mapProgressToSpeed(e);
        })));
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
        this.subscriptions.push(onKeyDown$('Space').subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.togglePlay();
        })));
        this.subscriptions.push(onKeyDown$('ArrowRight').subscribe((/**
         * @return {?}
         */
        function () {
            _this.mCurrentTime = _this.mCurrentTime + 5 < _this.duration ? _this.mCurrentTime + 5 : _this.duration;
            _this.video.nativeElement.currentTime = _this.mCurrentTime;
        })));
        this.subscriptions.push(onKeyDown$('ArrowLeft').subscribe((/**
         * @return {?}
         */
        function () {
            _this.mCurrentTime = _this.mCurrentTime - 5 > 0 ? _this.mCurrentTime - 5 : 0;
            _this.video.nativeElement.currentTime = _this.mCurrentTime;
        })));
        this.subscriptions.push(onKeyDown$('ArrowUp').subscribe((/**
         * @return {?}
         */
        function () {
            _this.mVolume = _this.mVolume + 0.1 < 0.999996 ? _this.mVolume + 0.1 : 1;
            _this.video.nativeElement.volume = _this.mVolume;
        })));
        this.subscriptions.push(onKeyDown$('ArrowDown').subscribe((/**
         * @return {?}
         */
        function () {
            _this.mVolume = _this.mVolume - 0.1 > 0.000004 ? _this.mVolume - 0.1 : 0;
            _this.video.nativeElement.volume = _this.mVolume;
        })));
        /** @type {?} */
        var showVolumeHint$ = merge(onKeyDown$('ArrowUp'), onKeyDown$('ArrowDown'));
        /** @type {?} */
        var dismissVolumeHint$ = showVolumeHint$.pipe(switchMap((/**
         * @return {?}
         */
        function () { return timer(1000); })));
        this.subscriptions.push(showVolumeHint$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.showVolumeHint = true;
        })));
        this.subscriptions.push(dismissVolumeHint$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.showVolumeHint = false;
        })));
        this.setAllControlPanelsPosition();
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
        this.langContextMenuOption.nativeElement.addEventListener('click', this.showLangMenu, true);
        this.element.nativeElement.addEventListener('click', this.onComponentClicked, true);
        document.addEventListener('click', this.onDocumentClicked, true);
        /** @type {?} */
        var animationFrame$ = of(null, animationFrameScheduler).pipe(repeat());
        this.subscriptions.push(animationFrame$.subscribe((/**
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
            }
        })));
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.timeUpdate)
            this.timeUpdate.unsubscribe();
        if (this.controlHoveredChange)
            this.controlHoveredChange.unsubscribe();
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
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
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onComponentClicked = /**
     * @return {?}
     */
    function () {
        this.focus = true;
        this.showContextMenu = false;
    };
    /**
     * @return {?}
     */
    UshioComponent.prototype.onDocumentClicked = /**
     * @return {?}
     */
    function () {
        this.focus = false;
        this.showContextMenu = false;
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
        this.showStatisticInfoPanel = !this.showStatisticInfoPanel;
    };
    UshioComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ushio-player',
                    template: "<div [className]=\"'ushio-player ' + interactMode + (showControl ? ' mouse-hover' : '') + pausedClass + waitingClass\">\n  <div [className]=\"'ushio-player-video-mask' + (showControl ? '' : ' no-cursor')\" (click)=\"onVideoMaskClicked()\">\n    <div [className]=\"'video-state-buff-wrap' + waitingClass\">\n      <img class=\"video-state-buff\" src=\"data:image/gif;base64,R0lGODlhIAAgALMIADc3N5eXl3l5eVdXV9PT0+3t7bS0tCcnJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0ZCQUZCNUYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0ZCQUZCNkYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRkJBRkIzRjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDRkJBRkI0RjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqThrevr+X3eBpOWVGZCJWgECMMZiRf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlRKuWMlgy4VivwSueOAFa8fVtHrN3ggEJIPB+X5/5PJSHQ7Czz97GQEYfoB2GAGJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWupOGta+v5fd4Gk5ZXZkYkaAR4wxmJE/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVGq5YCWDLhWK/Bq4Y4AVrx9W0es3eDAakQMD5fn/k8lIdDsLPP3sZAhh+gHYYAomEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJK6k4a0r6/l93gaTllVmRiZoBFjDGYkb9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUGrljJYcuFYr8BrvjgBWvH1bR6zd4AACSBwPl+f+TyUh0Ows8/exkDGH6AdhgDiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUmrqThravr+X3eBpOWVGZGJWgASMMZiQf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlQquWElhy4VivwKuuOAFa8fVtHrN3hwOpMHA+X5/5PJSHQ7Czz97GQAYfoB2GACJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWuoOGsa+v5fd4Gk5ZWZkYmaABowxmJC/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVDq5YCWHLhWK/A66Y4AVrx9W0es3eFAokAMD5fn/k8lIdDsLPP3sZBxh+gHYYB4mEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJq6g4ayr6/l93gaTllVmQidoABjDGYkP9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUCrliJYcuFYr8ArtjgBWvH1bR6zd4QCKTDwfl+f+TyUh0Ows8/exkFGH6AdhgFiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqDhrOvr+X3eBpOWVmZCJGgAKMMZiQP3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlR6uWElgy4VivweuOOAFa8fVtHrN3hgMpELB+X5/5PJSHQ7Czz97GQQYfoB2GASJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSSuoOGsK+v5fd4Gk5ZXZkInaAQ4wxmJH/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVFq5YiWDLhWK/Ba5Y4AVrx9W0es3eBAIkAsH5fn/k8lIdDsLPP3sZBhh+gHYYBomEeYAaiYOEVI9tEpOUlm2YmU4RADs=\" alt=\"buffering\">\n    </div>\n  </div>\n  <div class=\"ushio-player-video\">\n    <video #video\n      [attr.crossOrigin]=\"crossorigin\"\n      [attr.poster]=\"poster\"\n      [attr.autoplay]=\"autoplay\"\n      [attr.preload]=\"preload\"\n    >\n      Your browser is too old which doesn't support HTML5 video.\n      <source *ngFor=\"let source of sources[playingSource].sources\"\n              [src]=\"source.src\" [attr.type]=\"source.type\"\n      />\n    </video>\n  </div>\n  <div class=\"ushio-player-custom-mask\">\n    <slot (slotchange)=\"onSlotChange($event)\"></slot>\n  </div>\n  <div class=\"ushio-player-subtitle-container\">\n    <div *ngFor=\"let subtitles of flyingSubtitles\"\n         [className]=\"'ushio-player-subtitle-wrap ' + subtitles.class\">\n      <div *ngFor=\"let subtitle of subtitles.parsedSubtitles\" class=\"ushio-player-subtitle\">\n        <div *ngFor=\"let line of subtitle.texts\" class=\"subtitle-line\">\n          <span [innerHTML]=\"line\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"ushio-player-video-control-mask\"></div>\n  <div class=\"ushio-player-video-control-wrap\">\n    <div class=\"ushio-player-video-control\">\n      <div class=\"video-control-top\">\n        <div [className]=\"'video-progress' + thumbMouseDownClass\">\n          <div class=\"video-progress-slider\" #slider>\n            <div class=\"slider-track\">\n              <div class=\"slider-track-bar-wrap\">\n                <div class=\"bar-buffer\" [style]=\"bufferedProgress\"></div>\n                <div class=\"bar-normal\" [style]=\"playedProgress\"></div>\n              </div>\n              <div class=\"slider-track-thumb\" [style]=\"thumbPosition\">\n                <div class=\"thumb-dot\"></div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'video-progress-detail' + progressDetailClass\" [style]=\"progressDetailPosition\">\n            <div *ngIf=\"thumbnails\"\n                 class=\"video-progress-detail-container\" [style]=\"progressDetailContainerPosition\">\n              <div class=\"detail-img\" [style]=\"progressDetailImgStyle\"></div>\n            </div>\n            <div class=\"video-progress-detail-sign\">\n              <div class=\"sign-down\"></div>\n              <div class=\"sign-up\"></div>\n            </div>\n            <div class=\"video-progress-detail-time\" [style]=\"progressDetailTimePosition\">\n              {{progressDetailTime}}\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"video-control-bottom\">\n        <div class=\"video-control-bottom-left\">\n          <div [className]=\"'ushio-player-btn btn-start' + pausedClass\" (click)=\"togglePlay()\">\n            <span class=\"ushio-player-icon icon-play\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-play\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-pause\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-pause\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n          </div>\n          <div class=\"video-time-wrap\">\n            <span class=\"video-time-now\">{{currentTimeStr}}</span>\n            <span class=\"video-time-divider\">/</span>\n            <span class=\"video-time-total\">{{durationStr}}</span>\n          </div>\n        </div>\n        <div class=\"video-control-bottom-center\"></div>\n        <div [className]=\"'video-control-bottom-right' + controlHoveredClass\">\n          <div [className]=\"'ushio-player-btn btn-volume' + mutedClass + (volumeControl ? '' : ' hide')\"\n               #volumeBtn\n          >\n            <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"control-panel btn-volume-panel\" #volumePanel>\n              <div class=\"volume-num\">{{volume100}}</div>\n              <div class=\"volume-bar\" #volumeBar>\n                <div class=\"volume-bar-track\">\n                  <div class=\"volume-bar-track-wrap\">\n                    <div class=\"bar-normal\" [style]=\"volumeRate\"></div>\n                  </div>\n                  <div class=\"volume-bar-track-thumb\" [style]=\"volumeThumbPosition\">\n                    <div class=\"thumb-dot\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-source' + (sourceControl && sources.length > 1 ? '' : ' hide')\"\n               #sourceBtn\n          >\n            {{ sources[playingSource].shortName }}\n            <div class=\"btn-source-panel control-panel\" #sourcePanel [style]=\"sourcePanelPosition\">\n              <ul>\n                <li *ngFor=\"let source of sources; index as i\"\n                    (click)=\"onSelectSource(i)\"\n                    [className]=\"playingSource === i ? 'selected' : ''\"\n                >\n                  {{ source.name }}\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-subtitles' + subtitleEnabledClass + (subtitlesControl && subtitles.length > 0 ? '' : ' hide')\"\n               #subtitlesBtn\n          >\n            <span class=\"ushio-player-icon icon-subtitles-off\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-subtitles-on\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-subtitles-panel control-panel\" #subtitlesPanel [style]=\"subtitlesPanelPosition\">\n              <ul>\n                <li *ngFor=\"let subtitleTrack of subtitles; index as i\"\n                    (click)=\"onCheckSubtitles(i)\"\n                    [className]=\"subtitleTrack.enabled ? 'checked' : ''\"\n                >\n                  <span *ngIf=\"!subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-default\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-default\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span *ngIf=\"subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-selected\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-selected\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span>{{ subtitleTrack.name }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-settings' + (settingsControl ? '' : ' hide')\"\n               #settingsBtn\n          >\n            <span class=\"ushio-player-icon icon-settings\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-settings\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-settings-panel control-panel\" #settingsPanel [style]=\"settingsPanelPosition\">\n              <div class=\"panel-box settings-panel-speed\">\n                <div class=\"panel-box-title\">\n                  {{t('speed')}}\n                </div>\n                <div class=\"panel-box-content panel-speed-content speed-bar\" #speedBar>\n                  <div class=\"speed-track\">\n                    <div class=\"speed-track-wrap\"></div>\n                    <div class=\"speed-track-steps\">\n                      <div class=\"speed-track-steps-item step-item-0\" style=\"left: 0\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 20%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.75</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 40%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">{{t('normal')}}</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 60%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.25</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 80%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item step-item-100\" style=\"left: 100%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">2.0</div>\n                      </div>\n                    </div>\n                    <div class=\"speed-track-thumb\" [style]=\"speedThumbPosition\">\n                      <div class=\"thumb-dot\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-loop' + loopClass + (loopControl ? '' : ' hide')\"\n               (click)=\"toggleLoop()\"\n               #loopBtn\n          >\n            <span class=\"ushio-player-icon icon-loop-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-loop-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title btn-title-loop\" #loopPanel [style]=\"loopPanelPosition\">\n              {{ t('noLoop') }}\n            </div>\n            <div class=\"btn-title btn-title-noloop\" [style]=\"loopPanelPosition\">\n              {{ t('loop') }}\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-fullscreen' + fullscreenClass  + (fullscreenControl ? '' : ' hide')\"\n               (click)=\"toggleFullscreen()\"\n               #fullScreenBtn\n          >\n            <span class=\"ushio-player-icon icon-fullscreen-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-fullscreen-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title\" #fullScreenPanel [style]=\"fullScreenPanelPosition\">\n              {{ fullscreenClass === ' video-state-fullscreen' ? t('exitFullscreen') : t('fullscreen') }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [className]=\"'ushio-context-menu control-panel ' + contextMenuClass\"\n       #contextMenu\n       [style]=\"contextMenuPosition\"\n  >\n    <div class=\"ushio-context-menu-root\">\n      <ul>\n        <li (click)=\"toggleShowStatisticInfoPanel()\">{{t('statistic')}}</li>\n        <li #langContextMenuOption>{{t('language')}}</li>\n        <li>\n          <a target=\"_blank\" referrerpolicy=\"no-referrer\" href=\"https://github.com/rikakomoe/ushio\">\n            Ushio Player v{{version}}\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"ushio-context-menu-lang\">\n      <ul>\n        <li *ngFor=\"let lang of languages\" (click)=\"setLanguage(lang[0])\">{{lang[1]}}</li>\n      </ul>\n    </div>\n  </div>\n  <div [className]=\"'ushio-statistic-info control-panel' + statisticInfoPanelClass\">\n    <a class=\"dismiss\" (click)=\"toggleShowStatisticInfoPanel()\">[x]</a>\n    <table>\n      <tr><td>Player version</td><td>{{detailedVersion}}</td></tr>\n      <tr><td>Player FPS</td><td>{{fps}}</td></tr>\n      <tr><td>Video resolution</td><td>{{videoResolution}}</td></tr>\n      <tr><td>Video duration</td><td>{{videoDuration}}</td></tr>\n      <tr><td>Current time</td><td>{{videoCurrentTime}}</td></tr>\n    </table>\n  </div>\n  <div [className]=\"'ushio-volume-hint' + volumeHintClass\">\n    <span [className]=\"mutedClass\">\n      <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n      <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n    </span>\n    <span *ngIf=\"volume100\">{{volume100}}%</span>\n    <span *ngIf=\"!volume100\">{{t('mute')}}</span>\n  </div>\n  <div class=\"ushio-res\">\n    <div *ngFor=\"let style of injectedStyles\" [innerHTML]=\"style\"></div>\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <symbol id=\"ushio-play\">\n        <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n      </symbol>\n      <symbol id=\"ushio-pause\">\n        <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-max\">\n        <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-min\">\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n        <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-off\">\n        <path d=\"M15.172 18H4a2 2 0 0 1-2-2V6c0-.34.084-.658.233-.938l-.425-.426a1 1 0 1 1 1.414-1.414l15.556 15.556a1 1 0 0 1-1.414 1.414L15.172 18zM4.962 7.79C4.385 8.141 4 8.776 4 9.5v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .713-.958L4.962 7.79zM6.828 4H18a2 2 0 0 1 2 2v10c0 .34-.084.658-.233.938l-2.48-2.48A1 1 0 0 0 17 12.5h-1.672L14 11.172V10.5a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2h-3a2 2 0 0 0-1.977 1.695L6.828 4z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-on\">\n        <path d=\"M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 5.5a1 1 0 1 0 0-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2zm8 0a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2h-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-default\">\n        <path d=\"M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0-2h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-selected\">\n        <path d=\"M13 18.25l-1.8-1.8c-.6-.6-1.65-.6-2.25 0s-.6 1.5 0 2.25l2.85 2.85c.318.318.762.468 1.2.448.438.02.882-.13 1.2-.448l8.85-8.85c.6-.6.6-1.65 0-2.25s-1.65-.6-2.25 0l-7.8 7.8zM8 4h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-settings\">\n        <circle cx=\"11\" cy=\"11\" r=\"2\"></circle>\n        <path d=\"M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-on\">\n        <path d=\"M17 16H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .353.853H4v2a2 2 0 0 0 2 2h11a1 1 0 0 0 0-2zM19.793 8H18V6a2 2 0 0 0-2-2H5a1 1 0 0 0 0 2h11v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793A.5.5 0 0 0 19.793 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-off\">\n        <path d=\"M3.222 3.222a.999.999 0 1 0-1.414 1.414l11.435 11.435H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .354.854H4v2a2 2 0 0 0 2 2h9.243l2.121 2.121a.999.999 0 1 0 1.414-1.414L3.222 3.222zM19.793 8.071H18v-2a2 2 0 0 0-2-2H6.899l2 2H16v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793a.5.5 0 0 0-.353-.853z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-off\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 .5.5v1zm0-8a.5.5 0 0 1-.5.5H6v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm10 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H16v-1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-on\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm10 4a.5.5 0 0 1-.5.5H16v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 .5.5v1z\"></path>\n      </symbol>\n    </svg>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.ShadowDom,
                    styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:hidden;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
                }] }
    ];
    /** @nocollapse */
    UshioComponent.ctorParameters = function () { return [
        { type: ElementRef },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXNoaW8vIiwic291cmNlcyI6WyJsaWIvdXNoaW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFBRSxZQUFZLEVBQ3hCLEtBQUssRUFFRyxNQUFNLEVBQ2QsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUFFLFlBQVksRUFBYSxNQUFNLDJCQUEyQixDQUFBO0FBQ25FLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUN2QyxPQUFPLEVBQWdCLEtBQUssRUFDN0IsTUFBTSxNQUFNLENBQUE7QUFDYixPQUFPLEVBQ0wsU0FBUyxFQUFFLG9CQUFvQixFQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQ3RELE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXpEO0lBQUE7SUFVQSxDQUFDOztnQkFWQSxTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjs7O3NCQUVFLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7SUFDUixrQkFBQztDQUFBLEFBVkQsSUFVQztTQU5ZLFdBQVc7OztJQUN0QiwwQkFBcUI7O0lBQ3JCLDJCQUFxQjs7SUFDckIsZ0NBQTBCOztJQUMxQiwyQkFBcUI7O0lBQ3JCLDhCQUF5Qjs7QUFHM0I7SUFBQTtJQVlBLENBQUM7O2dCQVpBLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7Ozt3QkFFRSxLQUFL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MUMsdUNBQTBDOztJQUUxQywyQkFBdUI7Ozs7O0lBMEJyQixpQ0FBMkI7Ozs7O0lBQzNCLHNDQUFrQzs7Ozs7SUFDbEMsaUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInXG5pbXBvcnQge1xuICBhbmltYXRpb25GcmFtZVNjaGVkdWxlcixcbiAgZnJvbUV2ZW50LCBtZXJnZSwgTkVWRVIsIE9ic2VydmFibGUsIG9mLFxuICBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIHRpbWVyXG59IGZyb20gJ3J4anMnXG5pbXBvcnQge1xuICBjb25jYXRNYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsIG1hcCwgbWFwVG8sIHJlcGVhdCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRhcFxufSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuaW1wb3J0IHsgSVN1YnRpdGxlLCBVc2hpb1NlcnZpY2UgfSBmcm9tICcuL3VzaGlvLnNlcnZpY2UnXG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndXNoaW8tc291cmNlJ1xufSlcbmV4cG9ydCBjbGFzcyBVc2hpb1NvdXJjZSB7XG4gIEBJbnB1dCgpIHNyYyE6IHN0cmluZ1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmdcbiAgQElucHV0KCkgc2hvcnRuYW1lOiBzdHJpbmdcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIGRlZmF1bHQ6IGJvb2xlYW5cbn1cblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICd1c2hpby1zdWJ0aXRsZXMnXG59KVxuZXhwb3J0IGNsYXNzIFVzaGlvU3VidGl0bGVzIHtcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZ1xuICBASW5wdXQoKSBzcmM6IHN0cmluZ1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmdcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nXG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmdcbiAgQElucHV0KCkgc3JjbGFuZzogc3RyaW5nXG4gIEBJbnB1dCgpIGRlZmF1bHQ6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFNvdXJjZSB7XG4gIHNob3J0TmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzb3VyY2VzOiB7XG4gICAgc3JjOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICB9W11cbiAgZGVmYXVsdD86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFN1YnRpdGxlcyB7XG4gIG5hbWU6IHN0cmluZ1xuICBjbGFzczogc3RyaW5nXG4gIHBhcnNlZFN1YnRpdGxlczogSVN1YnRpdGxlW11cbiAgZW5hYmxlZDogYm9vbGVhblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1c2hpby1wbGF5ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdXNoaW8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi91c2hpby5jb21wb25lbnQuc3R5bCddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb21cbn0pXG5leHBvcnQgY2xhc3MgVXNoaW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBtSW5qZWN0ZWRTdHlsZXMgPSBbXVxuICBnZXQgaW5qZWN0ZWRTdHlsZXMgKCkge1xuICAgIHJldHVybiB0aGlzLm1JbmplY3RlZFN0eWxlcy5tYXAoXG4gICAgICBzdHlsZSA9PiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChgXG4gICAgICA8c3R5bGU+XG4gICAgICAgJHtzdHlsZX1cbiAgICAgIDwvc3R5bGU+XG4gICAgYCkpXG4gIH1cblxuICBASW5wdXQoKSBzZXQgc3JjIChzcmMpIHtcbiAgICB0aGlzLm1TcmMgPSBzcmNcbiAgICB0aGlzLnVwZGF0ZVNvdXJjZXMoKVxuICB9XG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLm1TcmNcbiAgfVxuICBASW5wdXQoKSBwb3N0ZXJcbiAgQElucHV0KCkgY3Jvc3NvcmlnaW5cbiAgQElucHV0KCkgYXV0b3BsYXlcbiAgQElucHV0KCkgcHJlbG9hZCA9ICdtZXRhZGF0YSdcbiAgQElucHV0KCkgc2V0IGxhbmcgKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuc2VydmljZS5pMThuLnNldExhbmd1YWdlKGxhbmcpXG4gIH1cbiAgQElucHV0KCkgdGh1bWJuYWlsc1xuXG4gIHByaXZhdGUgbVNyY1xuICBwcml2YXRlIG1Tb3VyY2VzID0gW11cbiAgc291cmNlczogU291cmNlW10gPSBbXVxuICBwbGF5aW5nU291cmNlID0gMFxuXG4gIHByaXZhdGUgbVN1YnRpdGxlcyA9IFtdXG4gIHN1YnRpdGxlczogU3VidGl0bGVzW10gPSBbXVxuICBnZXQgZW5hYmxlZFN1YnRpdGxlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidGl0bGVzLmZpbHRlcihzID0+IHMuZW5hYmxlZClcbiAgfVxuICBmbHlpbmdTdWJ0aXRsZXM6IFN1YnRpdGxlc1tdID0gW11cblxuICBwcml2YXRlIG1Wb2x1bWUgPSAxXG4gIEBJbnB1dCgpIHNldCB2b2x1bWUgKHZvbHVtZSkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSB2b2x1bWVcbiAgfVxuICBnZXQgdm9sdW1lMTAwICgpIHtcbiAgICBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkKSByZXR1cm4gMFxuICAgIHJldHVybiBNYXRoLnJvdW5kKHRoaXMubVZvbHVtZSAqIDEwMClcbiAgfVxuICBAT3V0cHV0KCkgdm9sdW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcblxuICBwcml2YXRlIG1QbGF5YmFja1JhdGUgPSAxXG4gIEBJbnB1dCgpIHNldCBwbGF5YmFja1JhdGUgKHBsYXliYWNrUmF0ZSkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGVcbiAgfVxuICBAT3V0cHV0KCkgcGxheWJhY2tSYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcblxuICBwcml2YXRlIG1Wb2x1bWVDb250cm9sID0gdHJ1ZVxuICBASW5wdXQoKSBzZXQgdm9sdW1lQ29udHJvbCAodm9sdW1lQ29udHJvbCkge1xuICAgIHRoaXMubVZvbHVtZUNvbnRyb2wgPSB2b2x1bWVDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCB2b2x1bWVDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tVm9sdW1lQ29udHJvbFxuICB9XG4gIHByaXZhdGUgbVNvdXJjZUNvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzb3VyY2VDb250cm9sIChzb3VyY2VDb250cm9sKSB7XG4gICAgdGhpcy5tU291cmNlQ29udHJvbCA9IHNvdXJjZUNvbnRyb2xcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gIH1cbiAgZ2V0IHNvdXJjZUNvbnRyb2wgKCkge1xuICAgIHJldHVybiB0aGlzLm1Tb3VyY2VDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtU3VidGl0bGVzQ29udHJvbCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHN1YnRpdGxlc0NvbnRyb2wgKHN1YnRpdGxlc0NvbnRyb2wpIHtcbiAgICB0aGlzLm1TdWJ0aXRsZXNDb250cm9sID0gc3VidGl0bGVzQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgc3VidGl0bGVzQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubVN1YnRpdGxlc0NvbnRyb2xcbiAgfVxuICBwcml2YXRlIG1TZXR0aW5nc0NvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBzZXR0aW5nc0NvbnRyb2wgKHNldHRpbmdzQ29udHJvbCkge1xuICAgIHRoaXMubVNldHRpbmdzQ29udHJvbCA9IHNldHRpbmdzQ29udHJvbFxuICAgIHRoaXMuc2V0QWxsQ29udHJvbFBhbmVsc1Bvc2l0aW9uKClcbiAgfVxuICBnZXQgc2V0dGluZ3NDb250cm9sICgpIHtcbiAgICByZXR1cm4gdGhpcy5tU2V0dGluZ3NDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtTG9vcENvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBsb29wQ29udHJvbCAobG9vcENvbnRyb2wpIHtcbiAgICB0aGlzLm1Mb29wQ29udHJvbCA9IGxvb3BDb250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBsb29wQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubUxvb3BDb250cm9sXG4gIH1cbiAgcHJpdmF0ZSBtRnVsbHNjcmVlbkNvbnRyb2wgPSB0cnVlXG4gIEBJbnB1dCgpIHNldCBmdWxsc2NyZWVuQ29udHJvbCAoZnVsbHNjcmVlbkNvbnRyb2wpIHtcbiAgICB0aGlzLm1GdWxsc2NyZWVuQ29udHJvbCA9IGZ1bGxzY3JlZW5Db250cm9sXG4gICAgdGhpcy5zZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24oKVxuICB9XG4gIGdldCBmdWxsc2NyZWVuQ29udHJvbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubUZ1bGxzY3JlZW5Db250cm9sXG4gIH1cblxuICBAVmlld0NoaWxkKCd2aWRlbycsIHsgc3RhdGljOiB0cnVlIH0pIHZpZGVvXG4gIEBWaWV3Q2hpbGQoJ3NsaWRlcicsIHsgc3RhdGljOiB0cnVlIH0pIHNsaWRlclxuICBAVmlld0NoaWxkKCd2b2x1bWVCYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSB2b2x1bWVCYXJcbiAgQFZpZXdDaGlsZCgndm9sdW1lUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSB2b2x1bWVQYW5lbFxuICBAVmlld0NoaWxkKCd2b2x1bWVCdG4nLCB7IHN0YXRpYzogdHJ1ZSB9KSB2b2x1bWVCdG5cbiAgQFZpZXdDaGlsZCgnc2V0dGluZ3NQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIHNldHRpbmdzUGFuZWxcbiAgQFZpZXdDaGlsZCgnc2V0dGluZ3NCdG4nLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZXR0aW5nc0J0blxuICBAVmlld0NoaWxkKCdzcGVlZEJhcicsIHsgc3RhdGljOiB0cnVlIH0pIHNwZWVkQmFyXG4gIEBWaWV3Q2hpbGQoJ3NvdXJjZVBhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgc291cmNlUGFuZWxcbiAgQFZpZXdDaGlsZCgnc291cmNlQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc291cmNlQnRuXG4gIEBWaWV3Q2hpbGQoJ3N1YnRpdGxlc1BhbmVsJywgeyBzdGF0aWM6IHRydWUgfSkgc3VidGl0bGVzUGFuZWxcbiAgQFZpZXdDaGlsZCgnc3VidGl0bGVzQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgc3VidGl0bGVzQnRuXG4gIEBWaWV3Q2hpbGQoJ2xvb3BCdG4nLCB7IHN0YXRpYzogdHJ1ZSB9KSBsb29wQnRuXG4gIEBWaWV3Q2hpbGQoJ2xvb3BQYW5lbCcsIHsgc3RhdGljOiB0cnVlIH0pIGxvb3BQYW5lbFxuICBAVmlld0NoaWxkKCdmdWxsU2NyZWVuQnRuJywgeyBzdGF0aWM6IHRydWUgfSkgZnVsbFNjcmVlbkJ0blxuICBAVmlld0NoaWxkKCdmdWxsU2NyZWVuUGFuZWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmdWxsU2NyZWVuUGFuZWxcbiAgQFZpZXdDaGlsZCgnY29udGV4dE1lbnUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZXh0TWVudVxuICBAVmlld0NoaWxkKCdsYW5nQ29udGV4dE1lbnVPcHRpb24nLCB7IHN0YXRpYzogdHJ1ZSB9KSBsYW5nQ29udGV4dE1lbnVPcHRpb25cblxuICBAQ29udGVudENoaWxkcmVuKFVzaGlvU291cmNlKSBzb3VyY2VDb250ZW50Q2hpbGRyZW4hOiBRdWVyeUxpc3Q8VXNoaW9Tb3VyY2U+XG4gIEBDb250ZW50Q2hpbGRyZW4oVXNoaW9TdWJ0aXRsZXMpIHN1YnRpdGxlc0NvbnRlbnRDaGlsZHJlbiE6IFF1ZXJ5TGlzdDxVc2hpb1N1YnRpdGxlcz5cbiAgcHJpdmF0ZSBzdWJ0aXRsZXNTbG90VXBkYXRlJCA9IG5ldyBTdWJqZWN0PEhUTUxFbGVtZW50W10+KClcbiAgcHJpdmF0ZSBzb3VyY2VzU2xvdFVwZGF0ZSQgPSBuZXcgU3ViamVjdDxIVE1MRWxlbWVudFtdPigpXG4gIHByaXZhdGUgc3VidGl0bGVzU2xvdENoYW5nZSQgPSB0aGlzLnN1YnRpdGxlc1Nsb3RVcGRhdGUkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgcHJpdmF0ZSBzb3VyY2VzU2xvdENoYW5nZSQgPSB0aGlzLnNvdXJjZXNTbG90VXBkYXRlJC5hc09ic2VydmFibGUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gIHByaXZhdGUgbW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBuZXcgU3ViamVjdDx7IHNob3dDb250cm9sOiBib29sZWFuLCBkZWxheVN3aXRjaDogYm9vbGVhbiB9PigpXG5cbiAgaW50ZXJhY3RNb2RlOiAnZGVza3RvcCcgfCAnbW9iaWxlJyA9ICdkZXNrdG9wJ1xuICBwcml2YXRlIGZvY3VzID0gZmFsc2VcbiAgcHJpdmF0ZSBtU2hvd0NvbnRyb2wgPSBmYWxzZVxuICBwcml2YXRlIHRodW1iTW91c2VEb3duID0gZmFsc2VcbiAgcHJpdmF0ZSBjb250cm9sTW91c2VEb3duID0gZmFsc2VcbiAgY29udHJvbEhvdmVyZWRDbGFzcyA9ICcnXG4gIHByaXZhdGUgc2hvd0NvbnRleHRNZW51ID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93U3RhdGlzdGljSW5mb1BhbmVsID0gZmFsc2VcbiAgcHJpdmF0ZSBzaG93Vm9sdW1lSGludCA9IGZhbHNlXG4gIHByaXZhdGUgc2hvd1Byb2dyZXNzRGV0YWlsID0gZmFsc2VcbiAgZ2V0IGlzRnVsbFNjcmVlbiAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ICE9PSBudWxsXG4gIH1cbiAgZ2V0IG1vdXNlRG93biAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJNb3VzZURvd24gfHwgdGhpcy5jb250cm9sTW91c2VEb3duXG4gIH1cbiAgZ2V0IHNob3dDb250cm9sICgpIHtcbiAgICByZXR1cm4gISEodGhpcy5tU2hvd0NvbnRyb2wgfHwgdGhpcy5jb250cm9sSG92ZXJlZENsYXNzIHx8IHRoaXMubW91c2VEb3duKVxuICB9XG4gIEBPdXRwdXQoKSBzaG93Q29udHJvbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBnZXQgdGh1bWJNb3VzZURvd25DbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50aHVtYk1vdXNlRG93biA/ICcgdGh1bWItbW91c2UtZG93bicgOiAnJ1xuICB9XG4gIGdldCBwYXVzZWRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tUGF1c2VkID8gJyB2aWRlby1zdGF0ZS1wYXVzZScgOiAnIHZpZGVvLXN0YXRlLXBsYXknXG4gIH1cbiAgZ2V0IHdhaXRpbmdDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy53YWl0aW5nICYmICF0aGlzLm1QYXVzZWQgPyAnIHZpZGVvLXN0YXRlLXdhaXRpbmcnIDogJydcbiAgfVxuICBnZXQgbXV0ZWRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCB8fCB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID09PSAwKVxuICAgICAgPyAnIHZpZGVvLXN0YXRlLW11dGVkJyA6ICcgdmlkZW8tc3RhdGUtdm9sdW1lJ1xuICB9XG4gIGdldCBsb29wQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wID8gJyB2aWRlby1zdGF0ZS1sb29wJyA6ICcgdmlkZW8tc3RhdGUtbm9sb29wJ1xuICB9XG4gIGdldCBzdWJ0aXRsZUVuYWJsZWRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkU3VidGl0bGVzLmxlbmd0aCA+IDAgPyAnIHZpZGVvLXN0YXRlLXN1YnRpdGxlcycgOiAnIHZpZGVvLXN0YXRlLW5vc3VidGl0bGVzJ1xuICB9XG4gIGdldCBmdWxsc2NyZWVuQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNGdWxsU2NyZWVuID8gJyB2aWRlby1zdGF0ZS1mdWxsc2NyZWVuJyA6ICcgdmlkZW8tc3RhdGUtbm9mdWxsc2NyZWVuJ1xuICB9XG4gIGdldCBjb250ZXh0TWVudUNsYXNzICgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRNZW51U3RhdGUgKyAodGhpcy5zaG93Q29udGV4dE1lbnUgPyAnIGFjdGl2ZScgOiAnJylcbiAgfVxuICBnZXQgc3RhdGlzdGljSW5mb1BhbmVsQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1N0YXRpc3RpY0luZm9QYW5lbCA/ICcgYWN0aXZlJyA6ICcnXG4gIH1cbiAgZ2V0IHZvbHVtZUhpbnRDbGFzcyAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaG93Vm9sdW1lSGludCA/ICcgYWN0aXZlJyA6ICcnXG4gIH1cbiAgZ2V0IHByb2dyZXNzRGV0YWlsQ2xhc3MgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1Byb2dyZXNzRGV0YWlsID8gJyBhY3RpdmUnIDogJydcbiAgfVxuXG4gIHByaXZhdGUgbVBhdXNlZCA9IHRydWVcbiAgQElucHV0KCkgc2V0IHBhdXNlZCAocGF1c2VkKSB7XG4gICAgaWYgKHBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlKClcbiAgICBlbHNlIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5KClcbiAgfVxuICBAT3V0cHV0KCkgcGF1c2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIHByaXZhdGUgbUN1cnJlbnRUaW1lID0gMFxuICBASW5wdXQoKSBzZXQgY3VycmVudFRpbWUgKGN1cnJlbnRUaW1lKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVcbiAgfVxuICBAT3V0cHV0KCkgY3VycmVudFRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBwcml2YXRlIGR1cmF0aW9uID0gMFxuICBAT3V0cHV0KCkgZHVyYXRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBwcml2YXRlIGJ1ZmZlcmVkVGltZSA9IDBcbiAgcHJpdmF0ZSB3YWl0aW5nID0gZmFsc2VcbiAgQE91dHB1dCgpIHdhaXRpbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgc2V0IGxvb3AgKGxvb3ApIHtcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9vcCA9IGxvb3BcbiAgfVxuICBAT3V0cHV0KCkgbG9vcENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBASW5wdXQoKSBzZXQgbXV0ZWQgKG11dGVkKSB7XG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkID0gbXV0ZWRcbiAgfVxuICBAT3V0cHV0KCkgbXV0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcblxuICBmcHMgPSAnMC4wMCdcbiAgcHJpdmF0ZSBmcHNTdGFydCA9IDBcbiAgcHJpdmF0ZSBmcHNJbmRleCA9IDBcblxuICBnZXQgY3VycmVudFRpbWVTdHIgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFVzaGlvQ29tcG9uZW50LmZvcm1hdER1cmF0aW9uKHRoaXMubUN1cnJlbnRUaW1lKVxuICB9XG4gIGdldCBkdXJhdGlvblN0ciAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVXNoaW9Db21wb25lbnQuZm9ybWF0RHVyYXRpb24odGhpcy5kdXJhdGlvbilcbiAgfVxuICBnZXQgYnVmZmVyZWRQcm9ncmVzcyAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogc2NhbGVYKCR7dGhpcy5idWZmZXJlZFRpbWUgLyB0aGlzLmR1cmF0aW9ufSlgXG4gICAgKVxuICB9XG4gIGdldCBwbGF5ZWRQcm9ncmVzcyAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogc2NhbGVYKCR7dGhpcy5tQ3VycmVudFRpbWUgLyB0aGlzLmR1cmF0aW9ufSlgXG4gICAgKVxuICB9XG4gIGdldCB0aHVtYlBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgbGVmdDogJHt0aGlzLm1DdXJyZW50VGltZSAvIHRoaXMuZHVyYXRpb24gKiAxMDB9JWBcbiAgICApXG4gIH1cbiAgZ2V0IHZvbHVtZVJhdGUgKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGB0cmFuc2Zvcm06IHNjYWxlWSgke3RoaXMudm9sdW1lMTAwIC8gMTAwfSlgXG4gICAgKVxuICB9XG4gIGdldCB2b2x1bWVUaHVtYlBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgYm90dG9tOiAke3RoaXMudm9sdW1lMTAwfSVgXG4gICAgKVxuICB9XG4gIGdldCBzcGVlZFRodW1iUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShcbiAgICAgIGBsZWZ0OiAke1VzaGlvQ29tcG9uZW50Lm1hcFNwZWVkVG9Qcm9ncmVzcyh0aGlzLm1QbGF5YmFja1JhdGUpfSVgXG4gICAgKVxuICB9XG4gIHByaXZhdGUgcGFuZWxUcmFuc2xhdGlvbnMgPSB7XG4gICAgc2V0dGluZ3M6IDAsXG4gICAgc291cmNlOiAwLFxuICAgIHN1YnRpdGxlczogMCxcbiAgICBsb29wOiAwLFxuICAgIGZ1bGxzY3JlZW46IDBcbiAgfVxuICBnZXQgc2V0dGluZ3NQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5zZXR0aW5nc31weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBnZXQgc291cmNlUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuc291cmNlfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBzdWJ0aXRsZXNQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5zdWJ0aXRsZXN9cHggLSA1MCUpKWBcbiAgICApXG4gIH1cbiAgZ2V0IGxvb3BQYW5lbFBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKGNhbGMoJHstdGhpcy5wYW5lbFRyYW5zbGF0aW9ucy5sb29wfXB4IC0gNTAlKSlgXG4gICAgKVxuICB9XG4gIGdldCBmdWxsU2NyZWVuUGFuZWxQb3NpdGlvbiAoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYHRyYW5zZm9ybTogdHJhbnNsYXRlWChjYWxjKCR7LXRoaXMucGFuZWxUcmFuc2xhdGlvbnMuZnVsbHNjcmVlbn1weCAtIDUwJSkpYFxuICAgIClcbiAgfVxuICBwcml2YXRlIG1Db250ZXh0TWVudVBvc2l0aW9uID0gJydcbiAgZ2V0IGNvbnRleHRNZW51UG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uKVxuICB9XG4gIHByaXZhdGUgbVByb2dyZXNzRGV0YWlsUG9zaXRpb24gPSAnJ1xuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uID0gJydcbiAgcHJpdmF0ZSBtUHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24gPSAnJ1xuICBwcml2YXRlIG1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSA9IDBcbiAgZ2V0IHByb2dyZXNzRGV0YWlsUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uKVxuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbENvbnRhaW5lclBvc2l0aW9uICgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5tUHJvZ3Jlc3NEZXRhaWxDb250YWluZXJQb3NpdGlvbilcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxUaW1lUG9zaXRpb24gKCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLm1Qcm9ncmVzc0RldGFpbFRpbWVQb3NpdGlvbilcbiAgfVxuICBnZXQgcHJvZ3Jlc3NEZXRhaWxJbWdTdHlsZSAoKTogU2FmZVN0eWxlIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9IZWlnaHQgKiAxNjAgLyB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9XaWR0aFxuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgaGVpZ2h0OiAke2hlaWdodH1weDtcbiAgICAgICBsaW5lLWhlaWdodDogJHtoZWlnaHR9cHg7XG4gICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiJHt0aGlzLnRodW1ibmFpbHN9XCIpO1xuICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0keyhNYXRoLmNlaWwodGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvblJhdGUgKiAxMDApIC0gMSkgKiAxNjB9cHggMDtgXG4gICAgKVxuICB9XG4gIGdldCBwcm9ncmVzc0RldGFpbFRpbWUgKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFVzaGlvQ29tcG9uZW50LmZvcm1hdER1cmF0aW9uKHRoaXMubVByb2dyZXNzRGV0YWlsUG9zaXRpb25SYXRlICogdGhpcy5kdXJhdGlvbilcbiAgfVxuXG4gIGxhbmd1YWdlcyA9IHRoaXMuc2VydmljZS5pMThuLmxhbmd1YWdlc1xuICBjb250ZXh0TWVudVN0YXRlID0gJ3Jvb3QnXG4gIGdldCB2ZXJzaW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnZlcnNpb25cbiAgfVxuICBnZXQgZGV0YWlsZWRWZXJzaW9uICgpIHtcbiAgICByZXR1cm4gYHYke3RoaXMuc2VydmljZS52ZXJzaW9ufSAoJHt0aGlzLnNlcnZpY2UuYnVpbGR9KWBcbiAgfVxuICBnZXQgdmlkZW9SZXNvbHV0aW9uICgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZpZGVvV2lkdGh9IHggJHt0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudmlkZW9IZWlnaHR9YFxuICB9XG4gIGdldCB2aWRlb0R1cmF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmR1cmF0aW9uLnRvRml4ZWQoNilcbiAgfVxuICBnZXQgdmlkZW9DdXJyZW50VGltZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZS50b0ZpeGVkKDYpXG4gIH1cblxuICBwcml2YXRlIHRpbWVVcGRhdGU6IFN1YnNjcmlwdGlvblxuICBwcml2YXRlIGNvbnRyb2xIb3ZlcmVkQ2hhbmdlOiBTdWJzY3JpcHRpb25cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdXG5cbiAgdCA9IHRoaXMuc2VydmljZS5pMThuLnRcblxuICBzdGF0aWMgbWFwU3BlZWRUb1Byb2dyZXNzIChzcGVlZCkge1xuICAgIGlmIChzcGVlZCA8IC41KSByZXR1cm4gMFxuICAgIGVsc2UgaWYgKHNwZWVkIDwgMS41KSByZXR1cm4gKHNwZWVkIC0gLjUpICogODBcbiAgICBlbHNlIGlmIChzcGVlZCA8IDIuMCkgcmV0dXJuIDgwICsgKHNwZWVkIC0gMS41KSAqIDQwXG4gICAgZWxzZSByZXR1cm4gMTAwXG4gIH1cbiAgc3RhdGljIG1hcFByb2dyZXNzVG9TcGVlZCAocHJvZ3Jlc3MpIHtcbiAgICBpZiAocHJvZ3Jlc3MgPCAuMSkgcmV0dXJuIC41XG4gICAgZWxzZSBpZiAocHJvZ3Jlc3MgPCAuOSkgcmV0dXJuIC43NSArIC4yNSAqIE1hdGguZmxvb3IoKHByb2dyZXNzIC0gMC4xKSAqIDUpXG4gICAgZWxzZSByZXR1cm4gMlxuICB9XG5cbiAgc3RhdGljIGZvcm1hdER1cmF0aW9uIChkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgY29uc3QgaCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyAzNjAwKVxuICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgMzYwMCAvIDYwKVxuICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgNjApXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKGggJiYgaCA8IDEwKSB7IHN0ciArPSBgMCR7aH06YCB9IGVsc2UgaWYgKGgpIHsgc3RyICs9IGAke2h9OmAgfVxuICAgIGlmIChtIDwgMTApIHsgc3RyICs9IGAwJHttfTpgIH0gZWxzZSB7IHN0ciArPSBgJHttfTpgIH1cbiAgICBpZiAocyA8IDEwKSB7IHN0ciArPSBgMCR7c31gIH0gZWxzZSB7IHN0ciArPSBgJHtzfWAgfVxuICAgIHJldHVybiBzdHJcbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIHNlcnZpY2U6IFVzaGlvU2VydmljZVxuICApIHtcbiAgICB0aGlzLnNob3dMYW5nTWVudSA9IHRoaXMuc2hvd0xhbmdNZW51LmJpbmQodGhpcylcbiAgICB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZCA9IHRoaXMub25Db21wb25lbnRDbGlja2VkLmJpbmQodGhpcylcbiAgICB0aGlzLm9uRG9jdW1lbnRDbGlja2VkID0gdGhpcy5vbkRvY3VtZW50Q2xpY2tlZC5iaW5kKHRoaXMpXG4gIH1cblxuICBuZ09uSW5pdCAoKSB7XG4gICAgdGhpcy5tUGF1c2VkID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBhdXNlZFxuICAgIHRoaXMubVZvbHVtZSA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWVcbiAgICB0aGlzLm1QbGF5YmFja1JhdGUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheWJhY2tSYXRlXG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQgKCkge1xuICAgIGNvbnN0IG1hcFByb3BzVG9PYmplY3QgPSAocHJvcHM6IHN0cmluZ1tdLCBmbikgPT4gKHNvdXJjZU9iajogYW55KSA9PiAoXG4gICAgICBwcm9wcy5yZWR1Y2UoKGFnZywgY3VyKSA9PiAoeyAuLi5hZ2csIFtjdXJdOiBmbihzb3VyY2VPYmosIGN1cikgfSksIHt9KVxuICAgIClcbiAgICBjb25zdCBvbkNvbnRlbnRDaGlsZHJlbk9yU2xvdENoYW5nZWQkID0gKFxuICAgICAgYXR0ciwgY29udGVudENoaWxkcmVuOlxuICAgICAgUXVlcnlMaXN0PGFueT4sXG4gICAgICBzbG90Q2hhbmdlJDogT2JzZXJ2YWJsZTxIVE1MRWxlbWVudFtdPlxuICAgICkgPT4ge1xuICAgICAgY29uc3QgY29udGVudENoaWxkcmVuTWFwID0gbWFwUHJvcHNUb09iamVjdChhdHRyLCAob2JqLCBjdXIpID0+IChvYmpbY3VyXSkpXG4gICAgICBjb25zdCBzbG90TWFwID0gbWFwUHJvcHNUb09iamVjdChhdHRyLCAob2JqLCBjdXIpID0+IChvYmouZ2V0QXR0cmlidXRlKGN1cikpKVxuICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICBvZihjb250ZW50Q2hpbGRyZW4udG9BcnJheSgpLm1hcChjb250ZW50Q2hpbGRyZW5NYXApKSxcbiAgICAgICAgY29udGVudENoaWxkcmVuLmNoYW5nZXMucGlwZShcbiAgICAgICAgICBtYXAoKGNvbnRlbnRzOiBRdWVyeUxpc3Q8YW55PikgPT4gKGNvbnRlbnRzLnRvQXJyYXkoKS5tYXAoY29udGVudENoaWxkcmVuTWFwKSkpXG4gICAgICAgICksXG4gICAgICAgIHNsb3RDaGFuZ2UkLnBpcGUoXG4gICAgICAgICAgbWFwKChjb250ZW50czogSFRNTEVsZW1lbnRbXSkgPT4gKFxuICAgICAgICAgICAgY29udGVudHMubWFwKHNsb3RNYXApXG4gICAgICAgICAgKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCBzdWJ0aXRsZXNBdHRyID0gWyd2YWx1ZScsICd0eXBlJywgJ3NyYycsICduYW1lJywgJ2NsYXNzJywgJ2RlZmF1bHQnLCAnc3JjbGFuZyddXG4gICAgY29uc3Qgc3VidGl0bGVzQ2hhbmdlJCA9IG9uQ29udGVudENoaWxkcmVuT3JTbG90Q2hhbmdlZCQoXG4gICAgICBzdWJ0aXRsZXNBdHRyLCB0aGlzLnN1YnRpdGxlc0NvbnRlbnRDaGlsZHJlbiwgdGhpcy5zdWJ0aXRsZXNTbG90Q2hhbmdlJClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJ0aXRsZXNDaGFuZ2UkLnN1YnNjcmliZShhc3luYyAoc3VidGl0bGVzKSA9PiB7XG4gICAgICB0aGlzLm1TdWJ0aXRsZXMgPSBzdWJ0aXRsZXNcbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlU3VidGl0bGVzKClcbiAgICB9KSlcbiAgICBjb25zdCBzb3VyY2VzQXR0ciA9IFsnc3JjJywgJ3R5cGUnLCAnbmFtZScsICdzaG9ydG5hbWUnLCAnZGVmYXVsdCddXG4gICAgY29uc3Qgc291cmNlc0NoYW5nZSQgPSBvbkNvbnRlbnRDaGlsZHJlbk9yU2xvdENoYW5nZWQkKFxuICAgICAgc291cmNlc0F0dHIsIHRoaXMuc291cmNlQ29udGVudENoaWxkcmVuLCB0aGlzLnNvdXJjZXNTbG90Q2hhbmdlJClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzb3VyY2VzQ2hhbmdlJC5zdWJzY3JpYmUoKHNvdXJjZXMpID0+IHtcbiAgICAgIHRoaXMubVNvdXJjZXMgPSBzb3VyY2VzXG4gICAgICB0aGlzLnVwZGF0ZVNvdXJjZXMoKVxuICAgIH0pKVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0ICgpIHtcbiAgICBjb25zdCBtb3VzZU1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJylcbiAgICBjb25zdCBtb3VzZVVwJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKVxuICAgIGNvbnN0IHRvdWNoTW92ZSQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICd0b3VjaG1vdmUnKVxuICAgIGNvbnN0IHRvdWNoU3RhcnQkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hzdGFydCcpXG4gICAgY29uc3QgdG91Y2hFbmQkID0gbWVyZ2UoXG4gICAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICd0b3VjaGVuZCcpLFxuICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAndG91Y2hjYW5jZWwnKVxuICAgIClcbiAgICBjb25zdCBtb3VzZVRvdWNoVXAkID0gbWVyZ2UobW91c2VVcCQsIHRvdWNoRW5kJClcbiAgICB0b3VjaFN0YXJ0JC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbnRlcmFjdE1vZGUgPSAnbW9iaWxlJ1xuICAgIH0pXG4gICAgY29uc3QgaWZNb3VzZUluQXJlYSA9IChlOiBNb3VzZUV2ZW50LCBidG5FbGVtZW50LCBwb3BVcEVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QxID0gcG9wVXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBjb25zdCByZWN0MiA9IGJ0bkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIHJldHVybiAoZS5jbGllbnRYID4gcmVjdDEubGVmdCAmJlxuICAgICAgICBlLmNsaWVudFggPCByZWN0MS5yaWdodCAmJlxuICAgICAgICBlLmNsaWVudFkgPiByZWN0MS50b3AgJiZcbiAgICAgICAgZS5jbGllbnRZIDwgcmVjdDEuYm90dG9tKSB8fCAoZS5jbGllbnRYID4gcmVjdDIubGVmdCAmJlxuICAgICAgICBlLmNsaWVudFggPCByZWN0Mi5yaWdodCAmJlxuICAgICAgICBlLmNsaWVudFkgPiByZWN0Mi50b3AgJiZcbiAgICAgICAgZS5jbGllbnRZIDwgcmVjdDIuYm90dG9tKVxuICAgIH1cbiAgICBjb25zdCBvbkNvbnRyb2xCdG5Ib3ZlclN0YXRlQ2hhbmdlZCQgPSAoYnRucykgPT4ge1xuICAgICAgcmV0dXJuIG1vdXNlTW92ZSQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBidG4gb2YgYnRucykge1xuICAgICAgICAgICAgaWYgKGlmTW91c2VJbkFyZWEoZSwgYnRuLmJ0bkVsZW1lbnQsIGJ0bi5wb3BVcEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvZihgIGJ0bi0ke2J0bi5idG5OYW1lfS1ob3ZlcmApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aW1lcigxNTApLnBpcGUoXG4gICAgICAgICAgICBtYXBUbygnJylcbiAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApXG4gICAgfVxuICAgIGNvbnN0IGRlc2t0b3BTaG93Q29udHJvbFN0YXRlQ2hhbmdlJCA9IG1vdXNlTW92ZSQucGlwZShcbiAgICAgIGZpbHRlcigoKSA9PiAodGhpcy5pbnRlcmFjdE1vZGUgPT09ICdkZXNrdG9wJykpLFxuICAgICAgbWFwKChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzaG93Q29udHJvbDogZS5jbGllbnRYID4gcmVjdC5sZWZ0ICYmXG4gICAgICAgICAgICBlLmNsaWVudFggPCByZWN0LnJpZ2h0ICYmXG4gICAgICAgICAgICBlLmNsaWVudFkgPiByZWN0LnRvcCAmJlxuICAgICAgICAgICAgZS5jbGllbnRZIDwgcmVjdC5ib3R0b20sXG4gICAgICAgICAgZGVsYXlTd2l0Y2g6IGUuY2xpZW50WSA8IHJlY3QuYm90dG9tIC0gNDZcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgY29uc3Qgc2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQgPSBtZXJnZShcbiAgICAgIGRlc2t0b3BTaG93Q29udHJvbFN0YXRlQ2hhbmdlJCxcbiAgICAgIHRoaXMubW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSRcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoZSA9PiB7XG4gICAgICAgIHJldHVybiBlLnNob3dDb250cm9sXG4gICAgICAgICAgPyBtZXJnZShcbiAgICAgICAgICAgIG9mKHRydWUpLFxuICAgICAgICAgICAgZS5kZWxheVN3aXRjaCA/IHRpbWVyKFxuICAgICAgICAgICAgICB0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnID8gNzUwIDogNTAwMFxuICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICBtYXBUbyhmYWxzZSlcbiAgICAgICAgICAgICkgOiBORVZFUlxuICAgICAgICAgIClcbiAgICAgICAgICA6IG9mKGZhbHNlKVxuICAgICAgfSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHNob3dDb250cm9sU3RhdGVDaGFuZ2UkLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICB0aGlzLm1TaG93Q29udHJvbCA9IHN0YXRlXG4gICAgfSkpXG4gICAgY29uc3QgbW91c2VIb3ZlclByb2dyZXNzU3RhdGUkID0gbW91c2VNb3ZlJC5waXBlKFxuICAgICAgZmlsdGVyKCgpID0+ICh0aGlzLmludGVyYWN0TW9kZSA9PT0gJ2Rlc2t0b3AnKSksXG4gICAgICBtYXAoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgeUNlbnRlciA9IChyZWN0LnRvcCArIHJlY3QuYm90dG9tKSAvIDJcbiAgICAgICAgaWYgKE1hdGguYWJzKGUuY2xpZW50WSAtIHlDZW50ZXIpIDwgOCAmJiBlLmNsaWVudFggPiByZWN0LmxlZnQgJiYgZS5jbGllbnRYIDwgcmVjdC5yaWdodCkge1xuICAgICAgICAgIGNvbnN0IGxlZnQgPSBlLmNsaWVudFggLSByZWN0LmxlZnRcbiAgICAgICAgICBjb25zdCBjb250YWluZXJMZWZ0ID0gbGVmdCA8IDgwID8gOTAgLSBsZWZ0IDogbGVmdCA+IHJlY3Qud2lkdGggLSA4MCA/IHJlY3Qud2lkdGggLSBsZWZ0IC0gNzAgOiAxMFxuICAgICAgICAgIGNvbnN0IHRpbWVMZWZ0ID0gbGVmdCA8IDIwID8gMzAgLSBsZWZ0IDogbGVmdCA+IHJlY3Qud2lkdGggLSAyMCA/IHJlY3Qud2lkdGggLSBsZWZ0IC0gMTAgOiAxMFxuICAgICAgICAgIHJldHVybiB7IGxlZnQsIGNvbnRhaW5lckxlZnQsIHRpbWVMZWZ0LCB3aWR0aDogcmVjdC53aWR0aCB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1vdXNlSG92ZXJQcm9ncmVzc1N0YXRlJC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICB0aGlzLnNob3dQcm9ncmVzc0RldGFpbCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dQcm9ncmVzc0RldGFpbCA9IHRydWVcbiAgICAgICAgdGhpcy5tUHJvZ3Jlc3NEZXRhaWxQb3NpdGlvbiA9IGBsZWZ0OiAke3N0YXRlLmxlZnR9cHhgXG4gICAgICAgIHRoaXMubVByb2dyZXNzRGV0YWlsQ29udGFpbmVyUG9zaXRpb24gPSBgbGVmdDogJHtzdGF0ZS5jb250YWluZXJMZWZ0fXB4YFxuICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbFRpbWVQb3NpdGlvbiA9IGBsZWZ0OiAke3N0YXRlLnRpbWVMZWZ0fXB4YFxuICAgICAgICB0aGlzLm1Qcm9ncmVzc0RldGFpbFBvc2l0aW9uUmF0ZSA9IHN0YXRlLmxlZnQgLyBzdGF0ZS53aWR0aFxuICAgICAgfVxuICAgIH0pKVxuICAgIGlmICh0aGlzLm1QYXVzZWQpIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wYXVzZSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3BhdXNlJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1QYXVzZWQgPSB0cnVlXG4gICAgICAgIHRoaXMucGF1c2VkQ2hhbmdlLmVtaXQodHJ1ZSlcbiAgICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICdwbGF5JylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1QYXVzZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLnBhdXNlZENoYW5nZS5lbWl0KGZhbHNlKVxuICAgICAgfSkpXG4gICAgY29uc3Qgc3Vic2NyaWJlVGltZVVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMudGltZVVwZGF0ZSA9IGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd0aW1ldXBkYXRlJylcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWVcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lQ2hhbmdlLmVtaXQodGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgICAgdGhpcy51cGRhdGVGbHlpbmdTdWJ0aXRsZXModGhpcy5tQ3VycmVudFRpbWUpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN1YnNjcmliZVRpbWVVcGRhdGUoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICd3YWl0aW5nJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLndhaXRpbmcgPSB0cnVlXG4gICAgICAgIHRoaXMud2FpdGluZ0NoYW5nZS5lbWl0KHRoaXMud2FpdGluZylcbiAgICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21FdmVudCh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQsICdwbGF5aW5nJylcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLndhaXRpbmcgPSBmYWxzZVxuICAgICAgICB0aGlzLndhaXRpbmdDaGFuZ2UuZW1pdCh0aGlzLndhaXRpbmcpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncHJvZ3Jlc3MnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYnVmZmVyZWRUaW1lID0gKCh0aW1lUmFuZ2VzLCBjdXJyZW50VGltZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRpbWVSYW5nZXMubGVuZ3RoXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRpbWVSYW5nZXMuZW5kKGkpIDw9IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGltZVJhbmdlcy5zdGFydChpKSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGltZVJhbmdlcy5lbmQoaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VGltZVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY3VycmVudFRpbWVcbiAgICAgICAgfSkodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmJ1ZmZlcmVkLCB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUpXG4gICAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAnbG9hZGVkbWV0YWRhdGEnKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuZHVyYXRpb25cbiAgICAgICAgdGhpcy5kdXJhdGlvbkNoYW5nZS5lbWl0KHRoaXMuZHVyYXRpb24pXG4gICAgICB9KSlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy5tVm9sdW1lXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCwgJ3ZvbHVtZWNoYW5nZScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tVm9sdW1lID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZVxuICAgICAgICB0aGlzLnZvbHVtZUNoYW5nZS5lbWl0KHRoaXMubVZvbHVtZSlcbiAgICAgIH0pKVxuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGUgPSB0aGlzLm1QbGF5YmFja1JhdGVcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChmcm9tRXZlbnQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50LCAncmF0ZWNoYW5nZScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tUGxheWJhY2tSYXRlID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZVxuICAgICAgICB0aGlzLnBsYXliYWNrUmF0ZUNoYW5nZS5lbWl0KHRoaXMubVBsYXliYWNrUmF0ZSlcbiAgICAgIH0pKVxuICAgIGNvbnN0IG1hcFRvUmF0ZSA9IChlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpID0+IG1hcChcbiAgICAgIChtb3ZlRXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50Q29vcmRpbmF0ZSA9IG1vdmVFdmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnRcbiAgICAgICAgICA/IG1vdmVFdmVudC5jaGFuZ2VkVG91Y2hlc1swXVxuICAgICAgICAgIDogbW92ZUV2ZW50XG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBwID0gcHJvZ3Jlc3MoZXZlbnRDb29yZGluYXRlLCByZWN0KVxuICAgICAgICBjb25zdCB0ID0gdG90YWwocmVjdClcbiAgICAgICAgaWYgKHAgPCAwKSBwID0gMFxuICAgICAgICBlbHNlIGlmIChwID4gdCkgcCA9IHRcbiAgICAgICAgcmV0dXJuIHAgLyB0XG4gICAgICB9XG4gICAgKVxuICAgIGNvbnN0IG9uTW91c2VUb3VjaERvd24kID0gKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCkgPT4ge1xuICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ21vdXNlZG93bicpLFxuICAgICAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKVxuICAgICAgKVxuICAgIH1cbiAgICBjb25zdCBvbk1vdXNlVG91Y2hEcmFnJCA9IChlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpID0+IHtcbiAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKS5waXBlKFxuICAgICAgICAgIG1hcFRvUmF0ZShlbGVtZW50LCBwcm9ncmVzcywgdG90YWwpLFxuICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbW91c2VNb3ZlJC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwobW91c2VVcCQpLFxuICAgICAgICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudChlbGVtZW50LCAndG91Y2hzdGFydCcpLnBpcGUoXG4gICAgICAgICAgbWFwVG9SYXRlKGVsZW1lbnQsIHByb2dyZXNzLCB0b3RhbCksXG4gICAgICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0b3VjaE1vdmUkLnBpcGUoXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0b3VjaEVuZCQpLFxuICAgICAgICAgICAgICBtYXBUb1JhdGUoZWxlbWVudCwgcHJvZ3Jlc3MsIHRvdGFsKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgY29uc3QgdGh1bWJNb3VzZVRvdWNoRG93biQgPSBvbk1vdXNlVG91Y2hEb3duJChcbiAgICAgIHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAobW92ZUV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQpLFxuICAgICAgKHJlY3QpID0+IChyZWN0LndpZHRoKVxuICAgIClcbiAgICBjb25zdCB0aHVtYlRvdWNoRHJhZyQgPSBvbk1vdXNlVG91Y2hEcmFnJChcbiAgICAgIHRoaXMuc2xpZGVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAobW92ZUV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQpLFxuICAgICAgKHJlY3QpID0+IChyZWN0LndpZHRoKVxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aHVtYk1vdXNlVG91Y2hEb3duJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLnRodW1iTW91c2VEb3duID0gdHJ1ZVxuICAgICAgdGhpcy50aW1lVXBkYXRlLnVuc3Vic2NyaWJlKClcbiAgICAgIHRoaXMubUN1cnJlbnRUaW1lID0gZSAqIHRoaXMuZHVyYXRpb25cbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aHVtYlRvdWNoRHJhZyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy5tQ3VycmVudFRpbWUgPSBlICogdGhpcy5kdXJhdGlvblxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1vdXNlVG91Y2hVcCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRodW1iTW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lXG4gICAgICAgIHN1YnNjcmliZVRpbWVVcGRhdGUoKVxuICAgICAgICB0aGlzLnRodW1iTW91c2VEb3duID0gZmFsc2VcbiAgICAgIH1cbiAgICB9KSlcbiAgICBjb25zdCBjb250cm9sSG92ZXJTdGF0ZUNoYW5nZSQgPSBvbkNvbnRyb2xCdG5Ib3ZlclN0YXRlQ2hhbmdlZCQoW3tcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMudm9sdW1lQnRuLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBwb3BVcEVsZW1lbnQ6IHRoaXMudm9sdW1lUGFuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGJ0bk5hbWU6ICd2b2x1bWUnXG4gICAgfSwge1xuICAgICAgYnRuRWxlbWVudDogdGhpcy5zZXR0aW5nc0J0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnNldHRpbmdzUGFuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGJ0bk5hbWU6ICdzZXR0aW5ncydcbiAgICB9LCB7XG4gICAgICBidG5FbGVtZW50OiB0aGlzLnNvdXJjZUJ0bi5uYXRpdmVFbGVtZW50LFxuICAgICAgcG9wVXBFbGVtZW50OiB0aGlzLnNvdXJjZVBhbmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBidG5OYW1lOiAnc291cmNlJ1xuICAgIH0sIHtcbiAgICAgIGJ0bkVsZW1lbnQ6IHRoaXMuc3VidGl0bGVzQnRuLm5hdGl2ZUVsZW1lbnQsXG4gICAgICBwb3BVcEVsZW1lbnQ6IHRoaXMuc3VidGl0bGVzUGFuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgIGJ0bk5hbWU6ICdzdWJ0aXRsZXMnXG4gICAgfV0pXG4gICAgY29uc3Qgc3Vic2NyaWJlQ29udHJvbEhvdmVyZWRDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlID0gY29udHJvbEhvdmVyU3RhdGVDaGFuZ2UkLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENsYXNzID0gZVxuICAgICAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gICAgICB9KVxuICAgIH1cbiAgICBzdWJzY3JpYmVDb250cm9sSG92ZXJlZENoYW5nZSgpXG4gICAgY29uc3QgaG92ZXJTdGF0ZUNoYW5nZSQgPSBtZXJnZShzaG93Q29udHJvbFN0YXRlQ2hhbmdlJCwgY29udHJvbEhvdmVyU3RhdGVDaGFuZ2UkKS5waXBlKFxuICAgICAgbWFwKCgpID0+IHRoaXMuc2hvd0NvbnRyb2wpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChob3ZlclN0YXRlQ2hhbmdlJC5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLnNob3dDb250cm9sQ2hhbmdlLmVtaXQoZSlcbiAgICB9KSlcbiAgICBjb25zdCB2b2x1bWVNb3VzZVRvdWNoRG93biQgPSBvbk1vdXNlVG91Y2hEb3duJChcbiAgICAgIHRoaXMudm9sdW1lQmFyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAobW92ZUV2ZW50LCByZWN0KSA9PiAocmVjdC5ib3R0b20gLSBtb3ZlRXZlbnQuY2xpZW50WSksXG4gICAgICAocmVjdCkgPT4gKHJlY3QuaGVpZ2h0KVxuICAgIClcbiAgICBjb25zdCB2b2x1bWVUb3VjaERyYWckID0gb25Nb3VzZVRvdWNoRHJhZyQoXG4gICAgICB0aGlzLnZvbHVtZUJhci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKHJlY3QuYm90dG9tIC0gbW92ZUV2ZW50LmNsaWVudFkpLFxuICAgICAgKHJlY3QpID0+IChyZWN0LmhlaWdodClcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godm9sdW1lTW91c2VUb3VjaERvd24kLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGlmICghdGhpcy5jb250cm9sTW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IHRydWVcbiAgICAgICAgdGhpcy5jb250cm9sSG92ZXJlZENoYW5nZS51bnN1YnNjcmliZSgpXG4gICAgICB9XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZVxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IGVcbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh2b2x1bWVUb3VjaERyYWckLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPSBlXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobW91c2VUb3VjaFVwJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29udHJvbE1vdXNlRG93bikge1xuICAgICAgICBzdWJzY3JpYmVDb250cm9sSG92ZXJlZENoYW5nZSgpXG4gICAgICAgIHRoaXMuY29udHJvbE1vdXNlRG93biA9IGZhbHNlXG4gICAgICB9XG4gICAgfSkpXG4gICAgY29uc3Qgc3BlZWRNb3VzZVRvdWNoRG93biQgPSBvbk1vdXNlVG91Y2hEb3duJChcbiAgICAgIHRoaXMuc3BlZWRCYXIubmF0aXZlRWxlbWVudCxcbiAgICAgIChtb3ZlRXZlbnQsIHJlY3QpID0+IChtb3ZlRXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCksXG4gICAgICAocmVjdCkgPT4gKHJlY3Qud2lkdGgpXG4gICAgKVxuICAgIGNvbnN0IHNwZWVkVG91Y2hEcmFnJCA9IG9uTW91c2VUb3VjaERyYWckKFxuICAgICAgdGhpcy5zcGVlZEJhci5uYXRpdmVFbGVtZW50LFxuICAgICAgKG1vdmVFdmVudCwgcmVjdCkgPT4gKG1vdmVFdmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSxcbiAgICAgIChyZWN0KSA9PiAocmVjdC53aWR0aClcbiAgICApXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3BlZWRNb3VzZVRvdWNoRG93biQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgaWYgKCF0aGlzLmNvbnRyb2xNb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5jb250cm9sTW91c2VEb3duID0gdHJ1ZVxuICAgICAgICB0aGlzLmNvbnRyb2xIb3ZlcmVkQ2hhbmdlLnVuc3Vic2NyaWJlKClcbiAgICAgIH1cbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5wbGF5YmFja1JhdGUgPSBVc2hpb0NvbXBvbmVudC5tYXBQcm9ncmVzc1RvU3BlZWQoZSlcbiAgICB9KSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzcGVlZFRvdWNoRHJhZyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXliYWNrUmF0ZSA9IFVzaGlvQ29tcG9uZW50Lm1hcFByb2dyZXNzVG9TcGVlZChlKVxuICAgIH0pKVxuICAgIGNvbnN0IG9uS2V5RG93biQgPSBjb2RlID0+IGZyb21FdmVudChkb2N1bWVudCwgJ2tleWRvd24nKS5waXBlKFxuICAgICAgZmlsdGVyKChlOiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmZvY3VzICYmIGUuY29kZSA9PT0gY29kZSksXG4gICAgICB0YXAoZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICB9KVxuICAgIClcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChvbktleURvd24kKCdTcGFjZScpLnN1YnNjcmliZShlID0+IHtcbiAgICAgIHRoaXMudG9nZ2xlUGxheSgpXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnQXJyb3dSaWdodCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1DdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lICsgNSA8IHRoaXMuZHVyYXRpb24gPyB0aGlzLm1DdXJyZW50VGltZSArIDUgOiB0aGlzLmR1cmF0aW9uXG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93TGVmdCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1DdXJyZW50VGltZSA9IHRoaXMubUN1cnJlbnRUaW1lIC0gNSA+IDAgPyB0aGlzLm1DdXJyZW50VGltZSAtIDUgOiAwXG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgIH0pKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG9uS2V5RG93biQoJ0Fycm93VXAnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tVm9sdW1lID0gdGhpcy5tVm9sdW1lICsgMC4xIDwgMC45OTk5OTYgPyB0aGlzLm1Wb2x1bWUgKyAwLjEgOiAxXG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gdGhpcy5tVm9sdW1lXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25LZXlEb3duJCgnQXJyb3dEb3duJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubVZvbHVtZSA9IHRoaXMubVZvbHVtZSAtIDAuMSA+IDAuMDAwMDA0ID8gdGhpcy5tVm9sdW1lIC0gMC4xIDogMFxuICAgICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnZvbHVtZSA9IHRoaXMubVZvbHVtZVxuICAgIH0pKVxuICAgIGNvbnN0IHNob3dWb2x1bWVIaW50JCA9IG1lcmdlKG9uS2V5RG93biQoJ0Fycm93VXAnKSwgb25LZXlEb3duJCgnQXJyb3dEb3duJykpXG4gICAgY29uc3QgZGlzbWlzc1ZvbHVtZUhpbnQkID0gc2hvd1ZvbHVtZUhpbnQkLnBpcGUoc3dpdGNoTWFwKCgpID0+IHRpbWVyKDEwMDApKSlcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzaG93Vm9sdW1lSGludCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd1ZvbHVtZUhpbnQgPSB0cnVlXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZGlzbWlzc1ZvbHVtZUhpbnQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNob3dWb2x1bWVIaW50ID0gZmFsc2VcbiAgICB9KSlcbiAgICB0aGlzLnNldEFsbENvbnRyb2xQYW5lbHNQb3NpdGlvbigpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY29udGV4dG1lbnUnKVxuICAgICAgLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc3Qgb3V0ZXIgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGV4dE1lbnUubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBpZiAoZS5jbGllbnRYICsgcGFuZWwud2lkdGggKyAyMCA+IG91dGVyLnJpZ2h0KSB7XG4gICAgICAgICAgaWYgKGUuY2xpZW50WSArIHBhbmVsLmhlaWdodCArIDIwID4gb3V0ZXIuYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYHJpZ2h0OiAke291dGVyLnJpZ2h0IC0gZS5jbGllbnRYfXB4OyBib3R0b206ICR7b3V0ZXIuYm90dG9tIC0gZS5jbGllbnRZfXB4YFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYHJpZ2h0OiAke291dGVyLnJpZ2h0IC0gZS5jbGllbnRYfXB4OyB0b3A6ICR7ZS5jbGllbnRZIC0gb3V0ZXIudG9wfXB4YFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZS5jbGllbnRZICsgcGFuZWwuaGVpZ2h0ICsgMjAgPiBvdXRlci5ib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMubUNvbnRleHRNZW51UG9zaXRpb24gPSBgbGVmdDogJHtlLmNsaWVudFggLSBvdXRlci5sZWZ0fXB4OyBib3R0b206ICR7b3V0ZXIuYm90dG9tIC0gZS5jbGllbnRZfXB4YFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1Db250ZXh0TWVudVBvc2l0aW9uID0gYGxlZnQ6ICR7ZS5jbGllbnRYIC0gb3V0ZXIubGVmdH1weDsgdG9wOiAke2UuY2xpZW50WSAtIG91dGVyLnRvcH1weGBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVN0YXRlID0gJ3Jvb3QnXG4gICAgICAgIHRoaXMuc2hvd0NvbnRleHRNZW51ID0gdHJ1ZVxuICAgICAgfSkpXG4gICAgdGhpcy5sYW5nQ29udGV4dE1lbnVPcHRpb24ubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd0xhbmdNZW51LCB0cnVlKVxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbXBvbmVudENsaWNrZWQsIHRydWUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uRG9jdW1lbnRDbGlja2VkLCB0cnVlKVxuICAgIGNvbnN0IGFuaW1hdGlvbkZyYW1lJCA9IG9mKG51bGwsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKS5waXBlKHJlcGVhdCgpKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGFuaW1hdGlvbkZyYW1lJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZwc1N0YXJ0KSB0aGlzLmZwc1N0YXJ0ID0gK25ldyBEYXRlKClcbiAgICAgIHRoaXMuZnBzSW5kZXgrK1xuICAgICAgY29uc3QgZnBzQ3VycmVudCA9ICtuZXcgRGF0ZSgpXG4gICAgICBpZiAoZnBzQ3VycmVudCAtIHRoaXMuZnBzU3RhcnQgPiAxMDAwKSB7XG4gICAgICAgIHRoaXMuZnBzID0gKCh0aGlzLmZwc0luZGV4IC8gKGZwc0N1cnJlbnQgLSB0aGlzLmZwc1N0YXJ0KSkgKiAxMDAwKS50b0ZpeGVkKDIpXG4gICAgICAgIHRoaXMuZnBzU3RhcnQgPSArbmV3IERhdGUoKVxuICAgICAgICB0aGlzLmZwc0luZGV4ID0gMFxuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgbmdPbkRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLnRpbWVVcGRhdGUpIHRoaXMudGltZVVwZGF0ZS51bnN1YnNjcmliZSgpXG4gICAgaWYgKHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UpIHRoaXMuY29udHJvbEhvdmVyZWRDaGFuZ2UudW5zdWJzY3JpYmUoKVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSlcbiAgICB0aGlzLmxhbmdDb250ZXh0TWVudU9wdGlvbi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93TGFuZ01lbnUsIHRydWUpXG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ29tcG9uZW50Q2xpY2tlZCwgdHJ1ZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrZWQsIHRydWUpXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNvdXJjZXMgKCkge1xuICAgIGlmICh0aGlzLm1Tb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zb3VyY2VzID0gW3tcbiAgICAgICAgc2hvcnROYW1lOiAnRGVmYXVsdCcsXG4gICAgICAgIG5hbWU6ICdEZWZhdWx0JyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgc291cmNlczogW3sgc3JjOiB0aGlzLm1TcmMsIHR5cGU6IHVuZGVmaW5lZCB9XVxuICAgICAgfV1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc20gPSB7fVxuICAgICAgdGhpcy5tU291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG4gICAgICAgIGlmICghc291cmNlLnNob3J0bmFtZSkge1xuICAgICAgICAgIHNvdXJjZS5zaG9ydG5hbWUgPSAnVW50aXRsZWQnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzbVtzb3VyY2Uuc2hvcnRuYW1lXSkge1xuICAgICAgICAgIHNtW3NvdXJjZS5zaG9ydG5hbWVdID0ge1xuICAgICAgICAgICAgc2hvcnROYW1lOiBzb3VyY2Uuc2hvcnRuYW1lLFxuICAgICAgICAgICAgbmFtZTogc291cmNlLm5hbWUgfHwgJ1VudGl0bGVkJyxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNtW3NvdXJjZS5zaG9ydG5hbWVdLnNvdXJjZXMucHVzaChzb3VyY2UpXG4gICAgICAgIGlmIChzb3VyY2UuZGVmYXVsdCAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZS5kZWZhdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgc21bc291cmNlLnNob3J0bmFtZV0uZGVmYXVsdCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuc291cmNlcyA9IE9iamVjdC52YWx1ZXMoc20pXG4gICAgfVxuICAgIGNvbnN0IGluZGV4T2ZEZWZhdWx0ID0gdGhpcy5zb3VyY2VzLmZpbmRJbmRleChzID0+IHMuZGVmYXVsdClcbiAgICB0aGlzLnBsYXlpbmdTb3VyY2UgPSBpbmRleE9mRGVmYXVsdCA+PSAwID8gaW5kZXhPZkRlZmF1bHQgOiAwXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVwZGF0ZVN1YnRpdGxlcyAoKSB7XG4gICAgY29uc3QgcGFyc2VkU3VidGl0bGVzID0gW11cbiAgICBmb3IgKGNvbnN0IHN1YiBvZiB0aGlzLm1TdWJ0aXRsZXMpIHtcbiAgICAgIGxldCB0ZXh0ID0gJydcbiAgICAgIGlmIChzdWIudmFsdWUpIHRleHQgPSBzdWIudmFsdWVcbiAgICAgIGVsc2UgaWYgKHN1Yi5zcmMpIHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHN1Yi5zcmMpXG4gICAgICAgIHRleHQgPSBhd2FpdCByZXNwLnRleHQoKVxuICAgICAgfVxuICAgICAgY29uc3QgcGFyc2VkID0ge1xuICAgICAgICBuYW1lOiBzdWIubmFtZSB8fCAnVW50aXRsZWQnLFxuICAgICAgICBjbGFzczogc3ViLmNsYXNzIHx8ICcnLFxuICAgICAgICBwYXJzZWRTdWJ0aXRsZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgZW5hYmxlZDogc3ViLmRlZmF1bHQgIT09IHVuZGVmaW5lZCAmJiBzdWIuZGVmYXVsdCAhPT0gbnVsbFxuICAgICAgICAgIHx8IHN1Yi5zcmNsYW5nID09PSB0aGlzLnNlcnZpY2UuaTE4bi5sYW5ndWFnZVxuICAgICAgfVxuICAgICAgc3ViLnR5cGUgPSBzdWIudHlwZSB8fCAnJ1xuICAgICAgc3ViLnR5cGUgPSBzdWIudHlwZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoc3ViLnR5cGUgIT09ICd0ZXh0L3Z0dCcgJiYgc3ViLnR5cGUgIT09ICdhcHBsaWNhdGlvbi94LXN1YnJpcCcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdVbmtub3duIE1JTUUgdHlwZSBvZiBzdWJ0aXRsZXMsIHRyeWluZyB0byBpbmZlciBzdWJ0aXRsZSBmb3JtYXQuIFN1cHBvcnRlZCB0eXBlOiB0ZXh0L3Z0dCwgYXBwbGljYXRpb24veC1zdWJyaXAuJylcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZC5wYXJzZWRTdWJ0aXRsZXMgPSB0aGlzLnNlcnZpY2UucGFyc2VTdWJ0aXRsZXModGV4dClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgfVxuICAgICAgcGFyc2VkU3VidGl0bGVzLnB1c2gocGFyc2VkKVxuICAgIH1cbiAgICB0aGlzLnN1YnRpdGxlcyA9IHBhcnNlZFN1YnRpdGxlc1xuICAgIHRoaXMudXBkYXRlRmx5aW5nU3VidGl0bGVzKClcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmx5aW5nU3VidGl0bGVzIChjdXJyZW50VGltZT8pIHtcbiAgICBpZiAoY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudFRpbWUgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWVcbiAgICB9XG4gICAgY3VycmVudFRpbWUgKj0gMTAwMFxuICAgIGNvbnN0IGZseWluZ1N1YnRpdGxlcyA9IFtdXG4gICAgdGhpcy5lbmFibGVkU3VidGl0bGVzLmZvckVhY2goc3VidGl0bGVzID0+IHtcbiAgICAgIGlmICghc3VidGl0bGVzLnBhcnNlZFN1YnRpdGxlcykgcmV0dXJuXG4gICAgICBjb25zdCBmbHlpbmdTdWJ0aXRsZXNUcmFjayA9IFtdXG4gICAgICBzdWJ0aXRsZXMucGFyc2VkU3VidGl0bGVzLmZvckVhY2goc3VidGl0bGUgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFRpbWUgPiBzdWJ0aXRsZS5zdGFydFRpbWUgJiYgY3VycmVudFRpbWUgPCBzdWJ0aXRsZS5lbmRUaW1lKSB7XG4gICAgICAgICAgZmx5aW5nU3VidGl0bGVzVHJhY2sucHVzaCh7XG4gICAgICAgICAgICAuLi5zdWJ0aXRsZSxcbiAgICAgICAgICAgIHRleHRzOiBzdWJ0aXRsZS50ZXh0cy5tYXAodGV4dCA9PiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0ZXh0KSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGZseWluZ1N1YnRpdGxlc1RyYWNrLmxlbmd0aCkge1xuICAgICAgICBmbHlpbmdTdWJ0aXRsZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogc3VidGl0bGVzLm5hbWUsXG4gICAgICAgICAgY2xhc3M6IHN1YnRpdGxlcy5jbGFzcyxcbiAgICAgICAgICBwYXJzZWRTdWJ0aXRsZXM6IGZseWluZ1N1YnRpdGxlc1RyYWNrXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmZseWluZ1N1YnRpdGxlcyA9IGZseWluZ1N1YnRpdGxlc1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBbGxDb250cm9sUGFuZWxzUG9zaXRpb24gKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgW3tcbiAgICAgICAgYnRuOiB0aGlzLnNldHRpbmdzQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5zZXR0aW5nc1BhbmVsLFxuICAgICAgICBuYW1lOiAnc2V0dGluZ3MnXG4gICAgICB9LCB7XG4gICAgICAgIGJ0bjogdGhpcy5zb3VyY2VCdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLnNvdXJjZVBhbmVsLFxuICAgICAgICBuYW1lOiAnc291cmNlJ1xuICAgICAgfSwge1xuICAgICAgICBidG46IHRoaXMuc3VidGl0bGVzQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5zdWJ0aXRsZXNQYW5lbCxcbiAgICAgICAgbmFtZTogJ3N1YnRpdGxlcydcbiAgICAgIH0sIHtcbiAgICAgICAgYnRuOiB0aGlzLmxvb3BCdG4sXG4gICAgICAgIHBhbmVsOiB0aGlzLmxvb3BQYW5lbCxcbiAgICAgICAgbmFtZTogJ2xvb3AnXG4gICAgICB9LCB7XG4gICAgICAgIGJ0bjogdGhpcy5mdWxsU2NyZWVuQnRuLFxuICAgICAgICBwYW5lbDogdGhpcy5mdWxsU2NyZWVuUGFuZWwsXG4gICAgICAgIG5hbWU6ICdmdWxsc2NyZWVuJ1xuICAgICAgfV0uZm9yRWFjaChpdGVtID0+IHRoaXMuc2V0UGFuZWxQb3NpdGlvbihpdGVtLmJ0biwgaXRlbS5wYW5lbCwgaXRlbS5uYW1lKSlcbiAgICB9LCAwKVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYW5lbFBvc2l0aW9uIChidG4sIHBhbmVsLCBuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQgfHwgIXBhbmVsIHx8ICFidG4pIHJldHVyblxuICAgIGNvbnN0IG91dGVyUmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IGJ0blJlY3QgPSBidG4ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGlmIChwYW5lbFJlY3Qud2lkdGggLyAyIC0gb3V0ZXJSZWN0LnJpZ2h0ICsgYnRuUmVjdC5yaWdodCA+IDApIHtcbiAgICAgIHRoaXMucGFuZWxUcmFuc2xhdGlvbnNbbmFtZV0gPSBwYW5lbFJlY3Qud2lkdGggLyAyIC0gb3V0ZXJSZWN0LnJpZ2h0ICsgYnRuUmVjdC5yaWdodFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVsVHJhbnNsYXRpb25zW25hbWVdID0gMFxuICAgIH1cbiAgfVxuXG4gIG9uU2xvdENoYW5nZSAoZSkge1xuICAgIHRoaXMuc3VidGl0bGVzU2xvdFVwZGF0ZSQubmV4dChcbiAgICAgIGUudGFyZ2V0LmFzc2lnbmVkTm9kZXMoKS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnVVNISU8tU1VCVElUTEVTJylcbiAgICApXG4gICAgdGhpcy5zb3VyY2VzU2xvdFVwZGF0ZSQubmV4dChcbiAgICAgIGUudGFyZ2V0LmFzc2lnbmVkTm9kZXMoKS5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnVVNISU8tU09VUkNFJylcbiAgICApXG4gICAgdGhpcy5tSW5qZWN0ZWRTdHlsZXMgPSBlLnRhcmdldC5hc3NpZ25lZE5vZGVzKClcbiAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnKS5tYXAobm9kZSA9PiBub2RlLmlubmVySFRNTClcbiAgfVxuXG4gIG9uVmlkZW9NYXNrQ2xpY2tlZCAoKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpIHtcbiAgICAgIHRoaXMudG9nZ2xlUGxheSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9iaWxlU2hvd0NvbnRyb2xTdGF0ZUNoYW5nZSQubmV4dCh7XG4gICAgICAgIHNob3dDb250cm9sOiAhdGhpcy5tU2hvd0NvbnRyb2wsXG4gICAgICAgIGRlbGF5U3dpdGNoOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0U291cmNlIChpKSB7XG4gICAgaWYgKGkgPT09IHRoaXMucGxheWluZ1NvdXJjZSkgcmV0dXJuXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLm1DdXJyZW50VGltZVxuICAgIGNvbnN0IHBhdXNlZCA9IHRoaXMubVBhdXNlZFxuICAgIHRoaXMucGxheWluZ1NvdXJjZSA9IGlcbiAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubG9hZCgpXG4gICAgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWVcbiAgICBpZiAoIXBhdXNlZCkgdGhpcy52aWRlby5uYXRpdmVFbGVtZW50LnBsYXkoKVxuICB9XG5cbiAgb25DaGVja1N1YnRpdGxlcyAoaSkge1xuICAgIHRoaXMuc3VidGl0bGVzW2ldLmVuYWJsZWQgPSAhdGhpcy5zdWJ0aXRsZXNbaV0uZW5hYmxlZFxuICAgIHRoaXMudXBkYXRlRmx5aW5nU3VidGl0bGVzKClcbiAgfVxuXG4gIHRvZ2dsZVBsYXkgKCkge1xuICAgIGlmICh0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2VkKSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGxheSgpXG4gICAgZWxzZSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQucGF1c2UoKVxuICB9XG5cbiAgdG9nZ2xlTXV0ZSAoKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJhY3RNb2RlID09PSAnZGVza3RvcCcpIHtcbiAgICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCA9ICEodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkIHx8IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC52b2x1bWUgPT09IDApXG4gICAgICB0aGlzLm11dGVkQ2hhbmdlLmVtaXQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkKVxuICAgIH0gZWxzZSBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lm11dGVkKSB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZVxuICAgICAgdGhpcy5tdXRlZENoYW5nZS5lbWl0KGZhbHNlKVxuICAgIH1cbiAgICBpZiAoIXRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5tdXRlZCAmJiB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID09PSAwKSB7XG4gICAgICB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQudm9sdW1lID0gTWF0aC5yYW5kb20oKVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUxvb3AgKCkge1xuICAgIHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wID0gIXRoaXMudmlkZW8ubmF0aXZlRWxlbWVudC5sb29wXG4gICAgdGhpcy5sb29wQ2hhbmdlLmVtaXQodGhpcy52aWRlby5uYXRpdmVFbGVtZW50Lmxvb3ApXG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cblxuICBzaG93TGFuZ01lbnUgKCkge1xuICAgIHRoaXMuY29udGV4dE1lbnVTdGF0ZSA9ICdsYW5nJ1xuICAgIHRoaXMuc2hvd0NvbnRleHRNZW51ID0gdHJ1ZVxuICB9XG5cbiAgb25Db21wb25lbnRDbGlja2VkICgpIHtcbiAgICB0aGlzLmZvY3VzID0gdHJ1ZVxuICAgIHRoaXMuc2hvd0NvbnRleHRNZW51ID0gZmFsc2VcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGlja2VkICgpIHtcbiAgICB0aGlzLmZvY3VzID0gZmFsc2VcbiAgICB0aGlzLnNob3dDb250ZXh0TWVudSA9IGZhbHNlXG4gIH1cblxuICBzZXRMYW5ndWFnZSAoY29kZSkge1xuICAgIHRoaXMuc2VydmljZS5pMThuLnNldExhbmd1YWdlKGNvZGUpXG4gIH1cblxuICB0b2dnbGVTaG93U3RhdGlzdGljSW5mb1BhbmVsICgpIHtcbiAgICB0aGlzLnNob3dTdGF0aXN0aWNJbmZvUGFuZWwgPSAhdGhpcy5zaG93U3RhdGlzdGljSW5mb1BhbmVsXG4gIH1cblxufVxuIl19