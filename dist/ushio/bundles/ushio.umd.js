(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ushio', ['exports', '@angular/core', '@angular/platform-browser', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = global || self, factory(global.ushio = {}, global.ng.core, global.ng.platformBrowser, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, core, platformBrowser, rxjs, operators, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ushio.service.ts
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
    var UshioI18nProvider = /** @class */ (function () {
        function UshioI18nProvider() {
            var e_1, _a;
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
            try {
                for (var _b = __values(navigator.languages), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var langCode = _c.value;
                    if (this.setLanguage(langCode))
                        break;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.t = this.t.bind(this);
        }
        Object.defineProperty(UshioI18nProvider.prototype, "languages", {
            get: /**
             * @return {?}
             */
            function () {
                return Object.entries(this.i18nSource).map((/**
                 * @param {?} entry
                 * @return {?}
                 */
                function (entry) { return [entry[0], entry[1].lang]; }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UshioI18nProvider.prototype, "language", {
            get: /**
             * @return {?}
             */
            function () {
                return this.lang;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} langCode
         * @return {?}
         */
        UshioI18nProvider.prototype.setLanguage = /**
         * @param {?} langCode
         * @return {?}
         */
        function (langCode) {
            if (this.i18nSource[langCode]) {
                this.lang = langCode;
                return true;
            }
            return false;
        };
        /**
         * @param {?} key
         * @return {?}
         */
        UshioI18nProvider.prototype.t = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.i18nSource[this.lang][key];
        };
        return UshioI18nProvider;
    }());
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
    var UshioService = /** @class */ (function () {
        function UshioService() {
            // tslint:disable-next-line:max-line-length
            this.timeStampRegex = /^(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})( --> )(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})/;
            this.i18n = new UshioI18nProvider();
        }
        Object.defineProperty(UshioService.prototype, "version", {
            get: /**
             * @return {?}
             */
            function () {
                return UshioService.version;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UshioService.prototype, "build", {
            get: /**
             * @return {?}
             */
            function () {
                return UshioService.build;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} input
         * @return {?}
         */
        UshioService.prototype.parseSubtitles = /**
         * @param {?} input
         * @return {?}
         */
        function (input) {
            var _this = this;
            /** @type {?} */
            var trim = (/**
             * @param {?} str
             * @return {?}
             */
            function (str) { return str.trim()
                .replace(/^[^\S\n]+/gm, '')
                .replace(/\u0000/g, '\uFFFD')
                .replace(/\r\n/g, '\n')
                .replace(/\r/g, '\n')
                .replace(/\n{3,}/g, '\n\n'); });
            /** @type {?} */
            var origin = trim(input)
                .split('\n');
            /** @type {?} */
            var splitSubtitles = [];
            /** @type {?} */
            var cachedSubtitle = null;
            /** @type {?} */
            var state = 'root';
            /** @type {?} */
            var processLine = (/**
             * @param {?} line
             * @return {?}
             */
            function (line) {
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
                        var match = _this.timeStampRegex.exec(line);
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
                            throw new Error("unexpected timeline token: " + line);
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
            function (line) { return processLine(line); }));
            if (cachedSubtitle)
                splitSubtitles.push(cachedSubtitle);
            return splitSubtitles;
        };
        UshioService.version = '4.1.3';
        UshioService.build = 'NG Build';
        UshioService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        UshioService.ctorParameters = function () { return []; };
        /** @nocollapse */ UshioService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function UshioService_Factory() { return new UshioService(); }, token: UshioService, providedIn: "root" });
        return UshioService;
    }());
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
     * Generated from: lib/ushio.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UshioSource = /** @class */ (function () {
        function UshioSource() {
        }
        UshioSource.decorators = [
            { type: core.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'ushio-source'
                    },] }
        ];
        UshioSource.propDecorators = {
            src: [{ type: core.Input }],
            type: [{ type: core.Input }],
            shortname: [{ type: core.Input }],
            name: [{ type: core.Input }],
            default: [{ type: core.Input }]
        };
        return UshioSource;
    }());
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
            { type: core.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'ushio-subtitles'
                    },] }
        ];
        UshioSubtitles.propDecorators = {
            value: [{ type: core.Input }],
            src: [{ type: core.Input }],
            type: [{ type: core.Input }],
            name: [{ type: core.Input }],
            class: [{ type: core.Input }],
            srclang: [{ type: core.Input }],
            default: [{ type: core.Input }]
        };
        return UshioSubtitles;
    }());
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
            this.viewInit = false;
            this.preload = 'metadata';
            this.mSources = [];
            this.sources = [];
            this.playingSource = 0;
            this.mSubtitles = [];
            this.subtitles = [];
            this.flyingSubtitles = [];
            this.mVolume = 1;
            this.volumeChange = new core.EventEmitter();
            this.mPlaybackRate = 1;
            this.playbackRateChange = new core.EventEmitter();
            this.mVolumeControl = true;
            this.mSourceControl = true;
            this.mSubtitlesControl = true;
            this.mSettingsControl = true;
            this.mLoopControl = true;
            this.mFullscreenControl = true;
            this.subtitlesSlotUpdate$ = new rxjs.Subject();
            this.sourcesSlotUpdate$ = new rxjs.Subject();
            this.subtitlesSlotChange$ = this.subtitlesSlotUpdate$.asObservable().pipe(operators.distinctUntilChanged());
            this.sourcesSlotChange$ = this.sourcesSlotUpdate$.asObservable().pipe(operators.distinctUntilChanged());
            this.mobileShowControlStateChange$ = new rxjs.Subject();
            this.showControlProbablyChanged$ = new rxjs.Subject();
            this.showControlChange$ = this.showControlProbablyChanged$.asObservable().pipe(operators.map((/**
             * @return {?}
             */
            function () { return _this.showControl; })), operators.distinctUntilChanged());
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
            this.showControlChange = new core.EventEmitter();
            this.mPaused = true;
            this.pausedChange = new core.EventEmitter();
            this.mCurrentTime = 0;
            this.currentTimeChange = new core.EventEmitter();
            this.duration = 0;
            this.durationChange = new core.EventEmitter();
            this.bufferedTime = 0;
            this.waiting = false;
            this.waitingChange = new core.EventEmitter();
            this.loopChange = new core.EventEmitter();
            this.mutedChange = new core.EventEmitter();
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
            this.mouseMove$ = rxjs.fromEvent(document, 'mousemove');
            this.mouseUp$ = rxjs.fromEvent(document, 'mouseup');
            this.touchMove$ = rxjs.fromEvent(document, 'touchmove');
            this.touchStart$ = rxjs.fromEvent(document, 'touchstart');
            this.touchEnd$ = rxjs.merge(rxjs.fromEvent(document, 'touchend'), rxjs.fromEvent(document, 'touchcancel'));
            this.mouseTouchUp$ = rxjs.merge(this.mouseUp$, this.touchEnd$);
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
                return (__assign({}, agg, (_a = {}, _a[cur] = fn(sourceObj, cur), _a)));
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
                return rxjs.merge(rxjs.of(contentChildren.toArray().map(contentChildrenMap)), contentChildren.changes.pipe(operators.map((/**
                 * @param {?} contents
                 * @return {?}
                 */
                function (contents) { return (contents.toArray().map(contentChildrenMap)); }))), slotChange$.pipe(operators.map((/**
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
                function (subtitles) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
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
            function (code) { return rxjs.fromEvent(document, 'keydown').pipe(operators.filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.focus && e.code === code; })), operators.tap((/**
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
            var showVolumeHint$ = rxjs.merge(onKeyDown$('ArrowUp'), onKeyDown$('ArrowDown'))
                .pipe(operators.switchMap((/**
             * @return {?}
             */
            function () { return rxjs.merge(rxjs.of(true), rxjs.timer(1000).pipe(operators.mapTo(false))); })), operators.distinctUntilChanged());
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
                return _this.mouseMove$.pipe(operators.switchMap((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    var e_1, _a;
                    try {
                        for (var btns_1 = __values(btns), btns_1_1 = btns_1.next(); !btns_1_1.done; btns_1_1 = btns_1.next()) {
                            var btn = btns_1_1.value;
                            if (ifMouseInArea(e, btn.btnElement, btn.popUpElement)) {
                                return rxjs.of(" btn-" + btn.btnName + "-hover");
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
                    return rxjs.timer(150).pipe(operators.mapTo(''));
                })), operators.distinctUntilChanged());
            });
            /** @type {?} */
            var mouseHoverProgressState$ = this.mouseMove$.pipe(operators.filter((/**
             * @return {?}
             */
            function () { return (_this.interactMode === 'desktop'); })), operators.map((/**
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
            })), operators.distinctUntilChanged((/**
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
            function (element, progress, total) { return operators.map((/**
             * @param {?} moveEvent
             * @return {?}
             */
            function (moveEvent) {
                /** @type {?} */
                var eventCoordinate = (typeof TouchEvent !== 'undefined' && moveEvent instanceof TouchEvent)
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
                return rxjs.merge(rxjs.fromEvent(element, 'mousedown'), rxjs.fromEvent(element, 'touchstart')).pipe(mapToRate(element, progress, total));
            });
            /** @type {?} */
            var onMouseTouchDrag$ = (/**
             * @param {?} element
             * @param {?} progress
             * @param {?} total
             * @return {?}
             */
            function (element, progress, total) {
                return rxjs.merge(rxjs.fromEvent(element, 'mousedown').pipe(mapToRate(element, progress, total), operators.concatMap((/**
                 * @return {?}
                 */
                function () {
                    return _this.mouseMove$.pipe(operators.takeUntil(_this.mouseUp$), mapToRate(element, progress, total));
                }))), rxjs.fromEvent(element, 'touchstart').pipe(mapToRate(element, progress, total), operators.concatMap((/**
                 * @return {?}
                 */
                function () {
                    return _this.touchMove$.pipe(operators.takeUntil(_this.touchEnd$), mapToRate(element, progress, total));
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
                _this.timeUpdate = rxjs.fromEvent(_this.video.nativeElement, 'timeupdate')
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
            this.viewInit = true;
            this.touchStart$.subscribe((/**
             * @return {?}
             */
            function () {
                _this.interactMode = 'mobile';
            }));
            /** @type {?} */
            var desktopShowControlStateChange$ = this.mouseMove$.pipe(operators.filter((/**
             * @return {?}
             */
            function () { return (_this.interactMode === 'desktop'); })), operators.map((/**
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
            var showControlStateChange$ = rxjs.merge(desktopShowControlStateChange$, this.mobileShowControlStateChange$).pipe(operators.switchMap((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                return e.showControl
                    ? rxjs.merge(rxjs.of({
                        showControl: true,
                        noCursor: false
                    }), e.delaySwitch ? rxjs.timer(_this.interactMode === 'desktop' ? 750 : 5000).pipe(operators.mapTo({
                        showControl: false,
                        noCursor: true
                    })) : rxjs.NEVER)
                    : rxjs.of({
                        showControl: false,
                        noCursor: false
                    });
            })), operators.distinctUntilChanged((/**
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
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'pause')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.mPaused = true;
                _this.pausedChange.emit(true);
            })));
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'play')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.mPaused = false;
                _this.pausedChange.emit(false);
            })));
            this.subscribeTimeUpdate();
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'waiting')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.waiting = true;
                _this.waitingChange.emit(_this.waiting);
            })));
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'playing')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.waiting = false;
                _this.waitingChange.emit(_this.waiting);
            })));
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'progress')
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
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'loadedmetadata')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.duration = _this.video.nativeElement.duration;
                _this.durationChange.emit(_this.duration);
            })));
            this.video.nativeElement.volume = this.mVolume;
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'volumechange')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.mVolume = _this.video.nativeElement.volume;
                _this.volumeChange.emit(_this.mVolume);
            })));
            this.video.nativeElement.playbackRate = this.mPlaybackRate;
            this.subscriptions.push(rxjs.fromEvent(this.video.nativeElement, 'ratechange')
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.mPlaybackRate = _this.video.nativeElement.playbackRate;
                _this.playbackRateChange.emit(_this.mPlaybackRate);
            })));
            this.subscriptions.push(rxjs.fromEvent(this.element.nativeElement, 'contextmenu')
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
        // https://github.com/angular/angular/issues/17404
        // https://github.com/angular/angular/issues/17404
        /**
         * @return {?}
         */
        UshioComponent.prototype.ngOnDestroy = 
        // https://github.com/angular/angular/issues/17404
        /**
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
            if (this.viewInit)
                this.video.nativeElement.load();
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
            return __awaiter(this, void 0, void 0, function () {
                var parsedSubtitles, _a, _b, sub, text, resp, parsed, e_2_1;
                var e_2, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            parsedSubtitles = [];
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 9, 10, 11]);
                            _a = __values(this.mSubtitles), _b = _a.next();
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
                        flyingSubtitlesTrack.push(__assign({}, subtitle, { texts: subtitle.texts.map((/**
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
                    var animationFrame$ = rxjs.of(null, rxjs.animationFrameScheduler).pipe(operators.repeat());
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
            { type: core.Component, args: [{
                        selector: 'ushio-player',
                        template: "<div [className]=\"'ushio-player ' + interactMode + (showControl ? ' mouse-hover' : '') + pausedClass + waitingClass\">\n  <div [className]=\"'ushio-player-video-mask' + (noCursor ? ' no-cursor' : '')\" (click)=\"onVideoMaskClicked()\">\n    <div [className]=\"'video-state-buff-wrap' + waitingClass\">\n      <img class=\"video-state-buff\" src=\"data:image/gif;base64,R0lGODlhIAAgALMIADc3N5eXl3l5eVdXV9PT0+3t7bS0tCcnJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0ZCQUZCNUYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0ZCQUZCNkYyQjQxMUUzOTM2QUNDMkEwQjMwNkZENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDRkJBRkIzRjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDRkJBRkI0RjJCNDExRTM5MzZBQ0MyQTBCMzA2RkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqThrevr+X3eBpOWVGZCJWgECMMZiRf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlRKuWMlgy4VivwSueOAFa8fVtHrN3ggEJIPB+X5/5PJSHQ7Czz97GQEYfoB2GAGJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWupOGta+v5fd4Gk5ZXZkYkaAR4wxmJE/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVGq5YCWDLhWK/Bq4Y4AVrx9W0es3eDAakQMD5fn/k8lIdDsLPP3sZAhh+gHYYAomEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJK6k4a0r6/l93gaTllVmRiZoBFjDGYkb9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUGrljJYcuFYr8BrvjgBWvH1bR6zd4AACSBwPl+f+TyUh0Ows8/exkDGH6AdhgDiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUmrqThravr+X3eBpOWVGZGJWgASMMZiQf3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlQquWElhy4VivwKuuOAFa8fVtHrN3hwOpMHA+X5/5PJSHQ7Czz97GQAYfoB2GACJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSWuoOGsa+v5fd4Gk5ZWZkYmaABowxmJC/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVDq5YCWHLhWK/A66Y4AVrx9W0es3eFAokAMD5fn/k8lIdDsLPP3sZBxh+gHYYB4mEeYAaiYOEVI9tEpOUlm2YmU4RACH5BAUIAAgALAAAAAAgACAAAAR3EMlJq6g4ayr6/l93gaTllVmQidoABjDGYkP9wTF3UrV94xZar4RTbXouVO7jQzmf0Kh0SpUCrliJYcuFYr8ArtjgBWvH1bR6zd4QCKTDwfl+f+TyUh0Ows8/exkFGH6AdhgFiYR5gBqJg4RUj20Sk5SWbZiZThEAIfkEBQgACAAsAAAAACAAIAAABHcQyUnrqDhrOvr+X3eBpOWVmZCJGgAKMMZiQP3BMXdStX3jFlqvhFNtei5U7uNDOZ/QqHRKlR6uWElgy4VivweuOOAFa8fVtHrN3hgMpELB+X5/5PJSHQ7Czz97GQQYfoB2GASJhHmAGomDhFSPbRKTlJZtmJlOEQAh+QQFCAAIACwAAAAAIAAgAAAEdxDJSSuoOGsK+v5fd4Gk5ZXZkInaAQ4wxmJH/cExd1K1feMWWq+EU216LlTu40M5n9CodEqVFq5YiWDLhWK/Ba5Y4AVrx9W0es3eBAIkAsH5fn/k8lIdDsLPP3sZBhh+gHYYBomEeYAaiYOEVI9tEpOUlm2YmU4RADs=\" alt=\"buffering\">\n    </div>\n  </div>\n  <div class=\"ushio-player-video\">\n    <video #video\n      [attr.crossOrigin]=\"crossorigin\"\n      [attr.poster]=\"poster\"\n      [attr.autoplay]=\"autoplay\"\n      [attr.preload]=\"preload\"\n    >\n      Your browser is too old which doesn't support HTML5 video.\n      <source *ngFor=\"let source of sources[playingSource].sources\"\n              [src]=\"source.src\" [attr.type]=\"source.type\"\n      />\n    </video>\n  </div>\n  <div class=\"ushio-player-custom-mask\">\n    <slot (slotchange)=\"onSlotChange($event)\"></slot>\n  </div>\n  <div class=\"ushio-player-subtitle-container\">\n    <div *ngFor=\"let subtitles of flyingSubtitles\"\n         [className]=\"'ushio-player-subtitle-wrap ' + subtitles.class\">\n      <div *ngFor=\"let subtitle of subtitles.parsedSubtitles\" class=\"ushio-player-subtitle\">\n        <div *ngFor=\"let line of subtitle.texts\" class=\"subtitle-line\">\n          <span [innerHTML]=\"line\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"ushio-player-video-control-mask\"></div>\n  <div class=\"ushio-player-video-control-wrap\">\n    <div class=\"ushio-player-video-control\">\n      <div class=\"video-control-top\">\n        <div [className]=\"'video-progress' + thumbMouseDownClass\">\n          <div class=\"video-progress-slider\" #slider>\n            <div class=\"slider-track\">\n              <div class=\"slider-track-bar-wrap\">\n                <div class=\"bar-buffer\" [style]=\"bufferedProgress\"></div>\n                <div class=\"bar-normal\" [style]=\"playedProgress\"></div>\n              </div>\n              <div class=\"slider-track-thumb\" [style]=\"thumbPosition\">\n                <div class=\"thumb-dot\"></div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'video-progress-detail' + progressDetailClass\" [style]=\"progressDetailPosition\">\n            <div *ngIf=\"thumbnails\"\n                 class=\"video-progress-detail-container\" [style]=\"progressDetailContainerPosition\">\n              <div class=\"detail-img\" [style]=\"progressDetailImgStyle\"></div>\n            </div>\n            <div class=\"video-progress-detail-sign\">\n              <div class=\"sign-down\"></div>\n              <div class=\"sign-up\"></div>\n            </div>\n            <div class=\"video-progress-detail-time\" [style]=\"progressDetailTimePosition\">\n              {{progressDetailTime}}\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"video-control-bottom\">\n        <div class=\"video-control-bottom-left\">\n          <div [className]=\"'ushio-player-btn btn-start' + pausedClass\" (click)=\"togglePlay()\">\n            <span class=\"ushio-player-icon icon-play\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-play\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-pause\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-pause\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n          </div>\n          <div class=\"video-time-wrap\">\n            <span class=\"video-time-now\">{{currentTimeStr}}</span>\n            <span class=\"video-time-divider\">/</span>\n            <span class=\"video-time-total\">{{durationStr}}</span>\n          </div>\n        </div>\n        <div class=\"video-control-bottom-center\"></div>\n        <div [className]=\"'video-control-bottom-right' + controlHoveredClass\">\n          <div [className]=\"'ushio-player-btn btn-volume' + mutedClass + (volumeControl ? '' : ' hide')\"\n               #volumeBtn\n          >\n            <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"control-panel btn-volume-panel\" #volumePanel>\n              <div class=\"volume-num\">{{volume100}}</div>\n              <div class=\"volume-bar\" #volumeBar>\n                <div class=\"volume-bar-track\">\n                  <div class=\"volume-bar-track-wrap\">\n                    <div class=\"bar-normal\" [style]=\"volumeRate\"></div>\n                  </div>\n                  <div class=\"volume-bar-track-thumb\" [style]=\"volumeThumbPosition\">\n                    <div class=\"thumb-dot\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-source' + (sourceControl && sources.length > 1 ? '' : ' hide')\"\n               #sourceBtn\n          >\n            {{ sources[playingSource].shortName }}\n            <div class=\"btn-source-panel control-panel\" #sourcePanel [style]=\"sourcePanelPosition\">\n              <ul>\n                <li *ngFor=\"let source of sources; index as i\"\n                    (click)=\"onSelectSource(i)\"\n                    [className]=\"playingSource === i ? 'selected' : ''\"\n                >\n                  {{ source.name }}\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-subtitles' + subtitleEnabledClass + (subtitlesControl && subtitles.length > 0 ? '' : ' hide')\"\n               #subtitlesBtn\n          >\n            <span class=\"ushio-player-icon icon-subtitles-off\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-subtitles-on\">\n              <svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" xmlns=\"http://www.w3.org/2000/svg\">\n                <use xlink:href=\"#ushio-subtitles-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-subtitles-panel control-panel\" #subtitlesPanel [style]=\"subtitlesPanelPosition\">\n              <ul>\n                <li *ngFor=\"let subtitleTrack of subtitles; index as i\"\n                    (click)=\"onCheckSubtitles(i)\"\n                    [className]=\"subtitleTrack.enabled ? 'checked' : ''\"\n                >\n                  <span *ngIf=\"!subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-default\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-default\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span *ngIf=\"subtitleTrack.enabled\" class=\"checkbox-icon checkbox-icon-selected\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                      <use xlink:href=\"#ushio-checkbox-selected\" x=\"0\" y=\"0\" />\n                    </svg>\n                  </span>\n                  <span>{{ subtitleTrack.name }}</span>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-settings' + (settingsControl ? '' : ' hide')\"\n               #settingsBtn\n          >\n            <span class=\"ushio-player-icon icon-settings\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-settings\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-settings-panel control-panel\" #settingsPanel [style]=\"settingsPanelPosition\">\n              <div class=\"panel-box settings-panel-speed\">\n                <div class=\"panel-box-title\">\n                  {{t('speed')}}\n                </div>\n                <div class=\"panel-box-content panel-speed-content speed-bar\" #speedBar>\n                  <div class=\"speed-track\">\n                    <div class=\"speed-track-wrap\"></div>\n                    <div class=\"speed-track-steps\">\n                      <div class=\"speed-track-steps-item step-item-0\" style=\"left: 0\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 20%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">0.75</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 40%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">{{t('normal')}}</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 60%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.25</div>\n                      </div>\n                      <div class=\"speed-track-steps-item\" style=\"left: 80%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">1.5</div>\n                      </div>\n                      <div class=\"speed-track-steps-item step-item-100\" style=\"left: 100%\">\n                        <div class=\"step-dot\"></div>\n                        <div class=\"step-text\">2.0</div>\n                      </div>\n                    </div>\n                    <div class=\"speed-track-thumb\" [style]=\"speedThumbPosition\">\n                      <div class=\"thumb-dot\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-loop' + loopClass + (loopControl ? '' : ' hide')\"\n               (click)=\"toggleLoop()\"\n               #loopBtn\n          >\n            <span class=\"ushio-player-icon icon-loop-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-loop-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-loop-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title btn-title-loop\" #loopPanel [style]=\"loopPanelPosition\">\n              {{ t('noLoop') }}\n            </div>\n            <div class=\"btn-title btn-title-noloop\" [style]=\"loopPanelPosition\">\n              {{ t('loop') }}\n            </div>\n          </div>\n          <div [className]=\"'ushio-player-btn btn-fullscreen' + fullscreenClass  + (fullscreenControl ? '' : ' hide')\"\n               (click)=\"toggleFullscreen()\"\n               #fullScreenBtn\n          >\n            <span class=\"ushio-player-icon icon-fullscreen-off\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-off\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <span class=\"ushio-player-icon icon-fullscreen-on\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n                <use xlink:href=\"#ushio-fullscreen-on\" x=\"0\" y=\"0\" />\n              </svg>\n            </span>\n            <div class=\"btn-title\" #fullScreenPanel [style]=\"fullScreenPanelPosition\">\n              {{ fullscreenClass === ' video-state-fullscreen' ? t('exitFullscreen') : t('fullscreen') }}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div [className]=\"'ushio-context-menu control-panel ' + contextMenuClass\"\n       #contextMenu\n       [style]=\"contextMenuPosition\"\n  >\n    <div class=\"ushio-context-menu-root\">\n      <ul>\n        <li (click)=\"toggleShowStatisticInfoPanel()\">{{t('statistic')}}</li>\n        <li #langContextMenuOption>{{t('language')}}</li>\n        <li>\n          <a target=\"_blank\" referrerpolicy=\"no-referrer\" href=\"https://github.com/rikakomoe/ushio\">\n            Ushio Player v{{version}}\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"ushio-context-menu-lang\">\n      <ul>\n        <li *ngFor=\"let lang of languages\" (click)=\"setLanguage(lang[0])\">{{lang[1]}}</li>\n      </ul>\n    </div>\n  </div>\n  <div [className]=\"'ushio-statistic-info control-panel' + statisticInfoPanelClass\">\n    <a class=\"dismiss\" (click)=\"toggleShowStatisticInfoPanel()\">[x]</a>\n    <table>\n      <tr><td>Player version</td><td>{{detailedVersion}}</td></tr>\n      <tr><td>Player FPS</td><td>{{fps}}</td></tr>\n      <tr><td>Video resolution</td><td>{{videoResolution}}</td></tr>\n      <tr><td>Video duration</td><td>{{videoDuration}}</td></tr>\n      <tr><td>Current time</td><td>{{videoCurrentTime}}</td></tr>\n    </table>\n  </div>\n  <div [className]=\"'ushio-volume-hint' + volumeHintClass\">\n    <span [className]=\"mutedClass\">\n      <span class=\"ushio-player-icon icon-volume-max\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-max\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n      <span class=\"ushio-player-icon icon-volume-min\" (click)=\"toggleMute()\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\">\n          <use xlink:href=\"#ushio-volume-min\" x=\"0\" y=\"0\" />\n        </svg>\n      </span>\n    </span>\n    <span *ngIf=\"volume100\">{{volume100}}%</span>\n    <span *ngIf=\"!volume100\">{{t('mute')}}</span>\n  </div>\n  <div class=\"ushio-res\">\n    <div *ngFor=\"let style of injectedStyles\" [innerHTML]=\"style\"></div>\n    <svg xmlns=\"http://www.w3.org/2000/svg\">\n      <symbol id=\"ushio-play\">\n        <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n      </symbol>\n      <symbol id=\"ushio-pause\">\n        <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-max\">\n        <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n      </symbol>\n      <symbol id=\"ushio-volume-min\">\n        <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n        <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-off\">\n        <path d=\"M15.172 18H4a2 2 0 0 1-2-2V6c0-.34.084-.658.233-.938l-.425-.426a1 1 0 1 1 1.414-1.414l15.556 15.556a1 1 0 0 1-1.414 1.414L15.172 18zM4.962 7.79C4.385 8.141 4 8.776 4 9.5v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .713-.958L4.962 7.79zM6.828 4H18a2 2 0 0 1 2 2v10c0 .34-.084.658-.233.938l-2.48-2.48A1 1 0 0 0 17 12.5h-1.672L14 11.172V10.5a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2h-3a2 2 0 0 0-1.977 1.695L6.828 4z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-subtitles-on\">\n        <path d=\"M4 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm5 5.5a1 1 0 1 0 0-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2zm8 0a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2h-2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2z\" fill=\"#fff\" fill-rule=\"evenodd\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-default\">\n        <path d=\"M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8zm0-2h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-checkbox-selected\">\n        <path d=\"M13 18.25l-1.8-1.8c-.6-.6-1.65-.6-2.25 0s-.6 1.5 0 2.25l2.85 2.85c.318.318.762.468 1.2.448.438.02.882-.13 1.2-.448l8.85-8.85c.6-.6.6-1.65 0-2.25s-1.65-.6-2.25 0l-7.8 7.8zM8 4h16c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4z\"></path>\n      </symbol>\n      <symbol id=\"ushio-settings\">\n        <circle cx=\"11\" cy=\"11\" r=\"2\"></circle>\n        <path d=\"M19.164 8.861L17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-on\">\n        <path d=\"M17 16H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .353.853H4v2a2 2 0 0 0 2 2h11a1 1 0 0 0 0-2zM19.793 8H18V6a2 2 0 0 0-2-2H5a1 1 0 0 0 0 2h11v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793A.5.5 0 0 0 19.793 8z\"></path>\n      </symbol>\n      <symbol id=\"ushio-loop-off\">\n        <path d=\"M3.222 3.222a.999.999 0 1 0-1.414 1.414l11.435 11.435H6v-2h1.793a.5.5 0 0 0 .354-.853l-2.793-2.793a.5.5 0 0 0-.707 0l-2.793 2.793a.5.5 0 0 0 .354.854H4v2a2 2 0 0 0 2 2h9.243l2.121 2.121a.999.999 0 1 0 1.414-1.414L3.222 3.222zM19.793 8.071H18v-2a2 2 0 0 0-2-2H6.899l2 2H16v2h-1.793a.5.5 0 0 0-.354.853l2.793 2.793a.5.5 0 0 0 .707 0l2.793-2.793a.5.5 0 0 0-.353-.853z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-off\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 .5.5v1zm0-8a.5.5 0 0 1-.5.5H6v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm10 8a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H16v-1.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3z\"></path>\n      </symbol>\n      <symbol id=\"ushio-fullscreen-on\">\n        <path d=\"M18 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H4.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H6V6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3zm10 4a.5.5 0 0 1-.5.5H16v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1zm0-4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 .5.5v1z\"></path>\n      </symbol>\n    </svg>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.ShadowDom,
                        styles: [".ushio-player.mouse-hover .ushio-player-video-control-mask,.ushio-player.mouse-hover .ushio-player-video-control-wrap{opacity:1;visibility:visible}.ushio-player.mobile .ushio-player-video-mask,.ushio-player.mobile .ushio-player-video-mask.no-cursor{cursor:default}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:4px}.ushio-player.mobile .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player svg{width:100%;height:100%}.ushio-player .btn-title{z-index:86}.ushio-player .ushio-player-btn:hover .btn-title{bottom:41px;opacity:1;visibility:visible}.ushio-player .ushio-player-btn .btn-title,.ushio-player .ushio-player-btn .btn-title:hover{cursor:default;color:#fff;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;left:50%;transform:translateX(-50%);padding:.75em;text-align:left;font-size:12px;line-height:14px;transition:.3s;white-space:nowrap;bottom:31px;opacity:0;visibility:hidden}.ushio-player .control-panel{cursor:default;color:#fff;box-sizing:border-box;background:rgba(21,21,21,.9);border-radius:2px;position:absolute;padding:12px 20px;text-align:left;font-size:12px;transition:50ms;z-index:85}.ushio-player .control-panel ul{padding:0;list-style-type:none;margin:0;overflow:hidden;text-align:left;border-radius:2px}.ushio-player .control-panel ul li{margin:0;border:0;padding:0 20px;height:36px;line-height:36px;white-space:nowrap;cursor:pointer}.ushio-player .control-panel ul li:hover{background:rgba(255,255,255,.1)}.ushio-player .control-panel ul li .checkbox-icon{display:inline-block;width:16px;height:16px;margin-right:4px;line-height:16px;vertical-align:middle}.ushio-player .control-panel ul li a{display:block;width:100%;height:100%;text-decoration:none;color:inherit}.ushio-player .panel-box{width:100%}.ushio-player .panel-box .panel-box-title{height:16px;line-height:16px;margin-bottom:4px;color:#fff}.ushio-player .panel-box .panel-box-content{width:100%}.ushio-player .ushio-player-subtitle-container{position:absolute;width:100%;z-index:40;top:10%;bottom:10%;display:flex;flex-direction:column-reverse;justify-content:flex-start}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap{z-index:40;display:flex;flex-direction:column;width:100%}.ushio-player .ushio-player-subtitle-container .ushio-player-subtitle-wrap .ushio-player-subtitle{display:block;text-align:center;color:#fff;word-wrap:break-word;font-size:1.25em;font-weight:500;text-shadow:.5px .5px .5px rgba(0,0,0,.5)}.ushio-player{position:relative;display:flex;height:100%;z-index:66;overflow:visible;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:none}.ushio-player .hide{display:none!important}.ushio-player .thumb-dot{transform:translateZ(0);width:12px;height:12px;border-radius:50%;display:flex;vertical-align:middle;align-items:center;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-normal{position:absolute;top:0;bottom:0;left:0;right:0;background-color:var(--theme-color,#00a1d6)}.ushio-player .bar-buffer{background:rgba(255,255,255,.3);position:absolute;top:0;bottom:0;left:0;right:0}.ushio-player .ushio-player-video-mask{position:absolute;width:100%;height:100%;cursor:pointer;z-index:45}.ushio-player .ushio-player-video-mask .video-state-buff-wrap{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;background:rgba(21,21,21,.8);width:48px;height:48px;border-radius:5px}.ushio-player .ushio-player-video-mask .video-state-buff-wrap.video-state-waiting{visibility:visible}.ushio-player .ushio-player-video-mask.no-cursor{cursor:none}.ushio-player .ushio-player-custom-mask{position:absolute;width:100%;height:100%;z-index:40;top:0}.ushio-player .ushio-player-video{position:relative;display:flex;justify-content:center;z-index:10;background:#000;width:100%;height:100%}.ushio-player .ushio-player-video video{width:100%;max-height:100%}.ushio-player .ushio-player-video-control-mask{pointer-events:none;width:100%;height:100px;position:absolute;bottom:0;left:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) bottom repeat-x;transition:.2s ease-in-out;z-index:50;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap{z-index:70;padding:0 12px;position:absolute;bottom:0;left:0;width:100%;box-sizing:border-box;opacity:0;visibility:hidden;transition:.2s ease-in-out}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control{display:flex;position:relative;z-index:71;height:36px;line-height:36px;zoom:1}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top{width:100%;position:absolute;bottom:32px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider{height:14px;cursor:pointer;display:flex;vertical-align:middle;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track{height:2px;position:relative;width:100%;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap{background:rgba(255,255,255,.2);position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-buffer{transform:scaleX(0);transition:transform .2s;transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-bar-wrap .bar-normal{transform:scaleX(0);transform-origin:0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{transition:.2s;opacity:0;transform:scale(0)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail.active{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail{display:none;position:absolute;bottom:7px;overflow:visible;width:20px;height:36px;margin-left:-10px;text-align:center;z-index:72;pointer-events:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container{margin-left:-80px;width:160px;position:absolute;bottom:18px;left:10px;background-color:transparent;border-radius:2px;overflow:hidden;z-index:72}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-container .detail-img{width:160px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign{cursor:pointer;width:8px;height:16px;margin:0 auto;position:absolute;overflow:hidden;top:28px;left:6px;visibility:visible}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-down{width:0;height:0;border-color:var(--theme-color,#00a1d6) transparent transparent;border-style:solid;border-width:4px 4px 0;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-sign .sign-up{margin-top:8px;width:0;height:0;border-color:transparent transparent var(--theme-color,#00a1d6);border-style:solid;border-width:0 4px 4px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress .video-progress-detail .video-progress-detail-time{z-index:73;position:absolute;bottom:18px;left:10px;width:40px;text-align:center;margin-left:-20px;line-height:18px;height:18px;font-size:12px;background:rgba(21,21,21,.9);border-radius:2px;color:#fff;vertical-align:bottom;display:inline-block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track{height:4px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-slider .slider-track .slider-track-thumb .thumb-dot,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress:hover .video-progress-slider .slider-track .slider-track-thumb .thumb-dot{opacity:1;transform:scale(1)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-top .video-progress.thumb-mouse-down .video-progress-detail .video-progress-detail-sign{visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom{width:100%;display:flex;justify-content:space-between;height:29px;line-height:22px;margin:7px 0 0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .control-panel{bottom:41px;left:50%;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-left>div{float:left}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-control-bottom-right{display:flex;justify-content:flex-end}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn{height:22px;line-height:22px;width:36px;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn:hover{fill:#fff}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .ushio-player-btn .ushio-player-icon{height:22px;width:100%;transition:fill .3s;vertical-align:middle;display:inline-block;font-size:0;margin:0;padding:0;border:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-pause{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-pause .icon-play,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-pause{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-start.video-state-play .icon-play{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source{font-size:1em;padding:0 10.75px;width:auto;position:relative}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-muted .icon-volume-min,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume.video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume-hover .btn-volume .btn-volume-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel{display:none;padding:0;width:32px;height:106px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-num{color:#e5e9ef;width:100%;text-align:center;font-size:12px;height:26px;line-height:28px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar{width:30px;margin:6px auto;height:60px;display:flex;vertical-align:middle;align-items:center;justify-content:center;cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track{height:100%;width:2px;align-items:flex-end;position:relative;display:flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:1.5px;overflow:hidden;background:#e7e7e7}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-wrap .bar-normal{position:absolute;transform-origin:0 100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-volume .btn-volume-panel .volume-bar .volume-bar-track .volume-bar-track-thumb{bottom:0;top:auto;position:relative;left:-5px;transform:translateY(50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source-hover .btn-source .btn-source-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-source .btn-source-panel ul li.selected{cursor:default;color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles-hover .btn-subtitles .btn-subtitles-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel{display:none;padding:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked{color:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles .btn-subtitles-panel ul li.checked svg{fill:var(--theme-color,#00a1d6)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings-hover .btn-settings .btn-settings-panel{display:block}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel{display:none;width:266px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .speed-bar{cursor:pointer}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content{margin:20px 6px 0;width:calc(100% - 12px);height:12px;display:flex;align-items:center;justify-content:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track{position:relative;width:100%;height:2px;display:flex;align-items:center}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-wrap{background:#505050;position:absolute;top:0;bottom:0;border-radius:1.5px;overflow:hidden;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps{position:relative;width:100%}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item{position:absolute;width:0}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-0 .step-text{text-align:left;transform:translate(-6px,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item.step-item-100 .step-text{transform:translate(-94px,-50%);text-align:right}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-dot{background:#505050;height:4px;width:2px;border-radius:1px;transform:translate(-50%,-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-steps .speed-track-steps-item .step-text{cursor:default;color:rgba(255,255,255,.8);position:absolute;bottom:6px;left:50%;width:100px;text-align:center;font-size:12px;transform:translate(-50%,-50%);line-height:12px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-settings .btn-settings-panel .panel-speed-content.panel-box-content .speed-track .speed-track-thumb{cursor:pointer;position:absolute;transform:translateX(-50%)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-subtitles .icon-subtitles-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-off,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-subtitles.video-state-nosubtitles .icon-subtitles-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .icon-loop-on{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-loop .btn-title.btn-title-noloop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .icon-loop-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-loop.video-state-noloop .btn-title.btn-title-loop{bottom:31px;opacity:0;visibility:hidden}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-off{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-fullscreen .icon-fullscreen-on,.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-off{display:inline-flex}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .btn-fullscreen.video-state-nofullscreen .icon-fullscreen-on{display:none}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap{width:84px;line-height:22px;height:22px;font-size:12px;position:relative;text-align:center;white-space:nowrap;color:rgba(255,255,255,.9)}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .video-control-bottom .video-time-wrap .video-time-divider{margin:0 2px}.ushio-player .ushio-player-video-control-wrap .ushio-player-video-control .ushio-player-btn{cursor:pointer;text-align:center;width:36px;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9);font-size:0}.ushio-player .ushio-context-menu.active{visibility:visible}.ushio-player .ushio-context-menu{transition:none;visibility:hidden;padding:0;z-index:99999;color:rgba(255,255,255,.8);fill:rgba(255,255,255,.9)}.ushio-player .ushio-context-menu li{padding:4px 20px}.ushio-player .ushio-context-menu li+li{border-top:1px solid rgba(255,255,255,.12)}.ushio-player .ushio-context-menu.root .ushio-context-menu-root{display:block}.ushio-player .ushio-context-menu.lang .ushio-context-menu-root,.ushio-player .ushio-context-menu.root .ushio-context-menu-lang{display:none}.ushio-player .ushio-context-menu.lang .ushio-context-menu-lang,.ushio-player .ushio-statistic-info.active{display:block}.ushio-player .ushio-statistic-info{display:none;left:10px;top:10px;z-index:80;padding:12px 30px 12px 20px}.ushio-player .ushio-statistic-info .dismiss{cursor:pointer;position:absolute;right:10px;top:10px}.ushio-player .ushio-statistic-info tr td{padding:0 5px}.ushio-player .ushio-statistic-info tr td:first-child{text-align:right}.ushio-player .ushio-volume-hint.active{visibility:visible;opacity:1}.ushio-player .ushio-volume-hint{position:absolute;top:50%;left:50%;z-index:30;width:82px;height:32px;line-height:32px;padding:9px 11px 9px 7px;font-size:20px;margin-left:-50px;margin-top:-25px;border-radius:4px;background:rgba(255,255,255,.8);color:#000;text-align:center;display:flex;visibility:hidden;opacity:0;transition:.2s ease-in-out}.ushio-player .ushio-volume-hint .ushio-player-icon{width:35px;height:35px;margin-right:5px}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-max{display:none}.ushio-player .ushio-volume-hint .video-state-muted .icon-volume-min,.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-max{display:inline-flex}.ushio-player .ushio-volume-hint .video-state-volume .icon-volume-min{display:none}.ushio-player .ushio-res{position:absolute;display:none}"]
                    }] }
        ];
        /** @nocollapse */
        UshioComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: platformBrowser.DomSanitizer },
            { type: UshioService }
        ]; };
        UshioComponent.propDecorators = {
            src: [{ type: core.Input }],
            poster: [{ type: core.Input }],
            crossorigin: [{ type: core.Input }],
            autoplay: [{ type: core.Input }],
            preload: [{ type: core.Input }],
            lang: [{ type: core.Input }],
            thumbnails: [{ type: core.Input }],
            volume: [{ type: core.Input }],
            volumeChange: [{ type: core.Output }],
            playbackRate: [{ type: core.Input }],
            playbackRateChange: [{ type: core.Output }],
            volumeControl: [{ type: core.Input }],
            sourceControl: [{ type: core.Input }],
            subtitlesControl: [{ type: core.Input }],
            settingsControl: [{ type: core.Input }],
            loopControl: [{ type: core.Input }],
            fullscreenControl: [{ type: core.Input }],
            video: [{ type: core.ViewChild, args: ['video', { static: true },] }],
            slider: [{ type: core.ViewChild, args: ['slider', { static: true },] }],
            volumeBar: [{ type: core.ViewChild, args: ['volumeBar', { static: true },] }],
            volumePanel: [{ type: core.ViewChild, args: ['volumePanel', { static: true },] }],
            volumeBtn: [{ type: core.ViewChild, args: ['volumeBtn', { static: true },] }],
            settingsPanel: [{ type: core.ViewChild, args: ['settingsPanel', { static: true },] }],
            settingsBtn: [{ type: core.ViewChild, args: ['settingsBtn', { static: true },] }],
            speedBar: [{ type: core.ViewChild, args: ['speedBar', { static: true },] }],
            sourcePanel: [{ type: core.ViewChild, args: ['sourcePanel', { static: true },] }],
            sourceBtn: [{ type: core.ViewChild, args: ['sourceBtn', { static: true },] }],
            subtitlesPanel: [{ type: core.ViewChild, args: ['subtitlesPanel', { static: true },] }],
            subtitlesBtn: [{ type: core.ViewChild, args: ['subtitlesBtn', { static: true },] }],
            loopBtn: [{ type: core.ViewChild, args: ['loopBtn', { static: true },] }],
            loopPanel: [{ type: core.ViewChild, args: ['loopPanel', { static: true },] }],
            fullScreenBtn: [{ type: core.ViewChild, args: ['fullScreenBtn', { static: true },] }],
            fullScreenPanel: [{ type: core.ViewChild, args: ['fullScreenPanel', { static: true },] }],
            contextMenu: [{ type: core.ViewChild, args: ['contextMenu', { static: true },] }],
            langContextMenuOption: [{ type: core.ViewChild, args: ['langContextMenuOption', { static: true },] }],
            sourceContentChildren: [{ type: core.ContentChildren, args: [UshioSource,] }],
            subtitlesContentChildren: [{ type: core.ContentChildren, args: [UshioSubtitles,] }],
            showControlChange: [{ type: core.Output }],
            paused: [{ type: core.Input }],
            pausedChange: [{ type: core.Output }],
            currentTime: [{ type: core.Input }],
            currentTimeChange: [{ type: core.Output }],
            durationChange: [{ type: core.Output }],
            waitingChange: [{ type: core.Output }],
            loop: [{ type: core.Input }],
            loopChange: [{ type: core.Output }],
            muted: [{ type: core.Input }],
            mutedChange: [{ type: core.Output }]
        };
        return UshioComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        UshioComponent.prototype.mInjectedStyles;
        /**
         * @type {?}
         * @private
         */
        UshioComponent.prototype.viewInit;
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
     * Generated from: lib/ushio.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var UshioModule = /** @class */ (function () {
        function UshioModule() {
        }
        UshioModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            UshioComponent,
                            UshioSource,
                            UshioSubtitles
                        ],
                        imports: [
                            common.CommonModule
                        ],
                        exports: [
                            UshioComponent,
                            UshioSource,
                            UshioSubtitles
                        ]
                    },] }
        ];
        return UshioModule;
    }());

    exports.UshioComponent = UshioComponent;
    exports.UshioModule = UshioModule;
    exports.UshioService = UshioService;
    exports.UshioSource = UshioSource;
    exports.UshioSubtitles = UshioSubtitles;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ushio.umd.js.map
