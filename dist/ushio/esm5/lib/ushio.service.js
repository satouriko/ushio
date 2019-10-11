/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function ISubtitle() { }
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
            for (var _b = tslib_1.__values(navigator.languages), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    UshioService.version = '4.1.1';
    UshioService.build = 'NG Build';
    UshioService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    UshioService.ctorParameters = function () { return []; };
    /** @nocollapse */ UshioService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function UshioService_Factory() { return new UshioService(); }, token: UshioService, providedIn: "root" });
    return UshioService;
}());
export { UshioService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VzaGlvLyIsInNvdXJjZXMiOlsibGliL3VzaGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBOzs7OztBQUUxQywrQkFJQzs7O0lBSEMsOEJBQWlCOztJQUNqQiw0QkFBZTs7SUFDZiwwQkFBZTs7QUFHakI7SUFtQ0U7O1FBbENRLFNBQUksR0FBRyxJQUFJLENBQUE7UUFDRixlQUFVLEdBQUc7WUFDNUIsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxPQUFPO2dCQUNkLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLGNBQWMsRUFBRSxpQkFBaUI7Z0JBQ2pDLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixjQUFjLEVBQUUsTUFBTTtnQkFDdEIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUFBOztZQVNDLEtBQXVCLElBQUEsS0FBQSxpQkFBQSxTQUFTLENBQUMsU0FBUyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF2QyxJQUFNLFFBQVEsV0FBQTtnQkFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztvQkFBRSxNQUFLO2FB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QWMsQ0FBQyxDQUFBOzRCQUNuQyxjQUFjLEdBQUcsSUFBSSxDQUFBO3lCQUN0QjtxQkFDRjt5QkFBTSxJQUFJLGNBQWMsRUFBRTt3QkFDekIsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBQ2hDO2FBQ0o7UUFDSCxDQUFDLENBQUE7UUFDRCxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQixFQUFDLENBQUE7UUFDekMsSUFBSSxjQUFjO1lBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN2RCxPQUFPLGNBQWMsQ0FBQTtJQUN2QixDQUFDO0lBN0VNLG9CQUFPLEdBQUcsT0FBTyxDQUFBO0lBQ2pCLGtCQUFLLEdBQUcsVUFBVSxDQUFBOztnQkFOMUIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7dUJBakVEO0NBbUpDLEFBcEZELElBb0ZDO1NBakZZLFlBQVk7OztJQUV2QixxQkFBd0I7O0lBQ3hCLG1CQUF5Qjs7Ozs7SUFHekIsc0NBQTRKOztJQUM1Siw0QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuZXhwb3J0IGludGVyZmFjZSBJU3VidGl0bGUge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBlbmRUaW1lOiBudW1iZXJcbiAgdGV4dHM6IHN0cmluZ1tdXG59XG5cbmNsYXNzIFVzaGlvSTE4blByb3ZpZGVyIHtcbiAgcHJpdmF0ZSBsYW5nID0gJ2VuJ1xuICBwcml2YXRlIHJlYWRvbmx5IGkxOG5Tb3VyY2UgPSB7XG4gICAgZW46IHtcbiAgICAgIGxhbmc6ICdFbmdsaXNoJyxcbiAgICAgIHNwZWVkOiAnU3BlZWQnLFxuICAgICAgbm9ybWFsOiAnTm9ybWFsJyxcbiAgICAgIGxvb3A6ICdMb29wJyxcbiAgICAgIG5vTG9vcDogJ05vIExvb3AnLFxuICAgICAgZnVsbHNjcmVlbjogJ0Z1bGxzY3JlZW4nLFxuICAgICAgZXhpdEZ1bGxzY3JlZW46ICdFeGl0IGZ1bGxzY3JlZW4nLFxuICAgICAgc3RhdGlzdGljOiAnVmlkZW8gc3RhdGlzdGljJyxcbiAgICAgIGxhbmd1YWdlOiAnTGFuZ3VhZ2UnLFxuICAgICAgbXV0ZTogJ011dGUnXG4gICAgfSxcbiAgICAnemgtSGFucyc6IHtcbiAgICAgIGxhbmc6ICfnroDkvZPkuK3mlocnLFxuICAgICAgc3BlZWQ6ICfmkq3mlL7pgJ/luqYnLFxuICAgICAgbm9ybWFsOiAn5q2j5bi4JyxcbiAgICAgIGxvb3A6ICflvqrnjq/mkq3mlL4nLFxuICAgICAgbm9Mb29wOiAn5YWz6Zet5b6q546vJyxcbiAgICAgIGZ1bGxzY3JlZW46ICflhajlsY/mkq3mlL4nLFxuICAgICAgZXhpdEZ1bGxzY3JlZW46ICfpgIDlh7rlhajlsY8nLFxuICAgICAgc3RhdGlzdGljOiAn6KeG6aKR57uf6K6h5L+h5oGvJyxcbiAgICAgIGxhbmd1YWdlOiAn6K+t6KiAJyxcbiAgICAgIG11dGU6ICfpnZnpn7MnXG4gICAgfVxuICB9XG4gIGdldCBsYW5ndWFnZXMgKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmkxOG5Tb3VyY2UpLm1hcChlbnRyeSA9PiBbZW50cnlbMF0sIGVudHJ5WzFdLmxhbmddKVxuICB9XG4gIGdldCBsYW5ndWFnZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ1xuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGZvciAoY29uc3QgbGFuZ0NvZGUgb2YgbmF2aWdhdG9yLmxhbmd1YWdlcykge1xuICAgICAgaWYgKHRoaXMuc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpKSBicmVha1xuICAgIH1cbiAgICB0aGlzLnQgPSB0aGlzLnQuYmluZCh0aGlzKVxuICB9XG5cbiAgc2V0TGFuZ3VhZ2UgKGxhbmdDb2RlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaTE4blNvdXJjZVtsYW5nQ29kZV0pIHtcbiAgICAgIHRoaXMubGFuZyA9IGxhbmdDb2RlXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHQgKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pMThuU291cmNlW3RoaXMubGFuZ11ba2V5XVxuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzaGlvU2VydmljZSB7XG5cbiAgc3RhdGljIHZlcnNpb24gPSAnNC4xLjEnXG4gIHN0YXRpYyBidWlsZCA9ICdORyBCdWlsZCdcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gIHByaXZhdGUgcmVhZG9ubHkgdGltZVN0YW1wUmVnZXggPSAvXig/OihcXGR7Mix9KSg6KSk/KFswLTVdWzAtOV0pKDopKFswLTVdWzAtOV0pKFssLl0pKFxcZHszfSkoIC0tPiApKD86KFxcZHsyLH0pKDopKT8oWzAtNV1bMC05XSkoOikoWzAtNV1bMC05XSkoWywuXSkoXFxkezN9KS9cbiAgaTE4biA9IG5ldyBVc2hpb0kxOG5Qcm92aWRlcigpXG4gIGdldCB2ZXJzaW9uICgpIHtcbiAgICByZXR1cm4gVXNoaW9TZXJ2aWNlLnZlcnNpb25cbiAgfVxuICBnZXQgYnVpbGQgKCkge1xuICAgIHJldHVybiBVc2hpb1NlcnZpY2UuYnVpbGRcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHsgfVxuXG4gIHBhcnNlU3VidGl0bGVzIChpbnB1dDogc3RyaW5nKTogSVN1YnRpdGxlW10ge1xuICAgIGNvbnN0IHRyaW0gPSAoc3RyOiBzdHJpbmcpID0+IHN0ci50cmltKClcbiAgICAgIC5yZXBsYWNlKC9eW15cXFNcXG5dKy9nbSwgJycpXG4gICAgICAucmVwbGFjZSgvXFx1MDAwMC9nLCAnXFx1RkZGRCcpXG4gICAgICAucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKVxuICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxuJylcbiAgICAgIC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKVxuICAgIGNvbnN0IG9yaWdpbiA9IHRyaW0oaW5wdXQpXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgY29uc3Qgc3BsaXRTdWJ0aXRsZXM6IElTdWJ0aXRsZVtdID0gW11cbiAgICBsZXQgY2FjaGVkU3VidGl0bGU6IElTdWJ0aXRsZSB8IG51bGwgPSBudWxsXG4gICAgbGV0IHN0YXRlID0gJ3Jvb3QnXG4gICAgY29uc3QgcHJvY2Vzc0xpbmUgPSAobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgJ25vdGUnOlxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgICAgICBpZiAobGluZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJ3Jvb3QnXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYXNlICdyb290JzpcbiAgICAgICAgICBpZiAobGluZS5tYXRjaCgvXldFQlZUVC8pKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICd0aXRsZSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSBpZiAobGluZS5tYXRjaCgvXk5PVEUvKSkge1xuICAgICAgICAgICAgc3RhdGUgPSAnbm90ZSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gJycpIHJldHVybiBbbGluZV1cbiAgICAgICAgICBlbHNlIGlmICghbGluZS5tYXRjaCgvLS0+LykpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJ3RpbWVsaW5lJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3RpbWVsaW5lJzpcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMudGltZVN0YW1wUmVnZXguZXhlYyhsaW5lKVxuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY2FjaGVkU3VidGl0bGUgPSB7XG4gICAgICAgICAgICAgIHN0YXJ0VGltZTogMTAwMCAqICg2MCAqICg2MCAqICttYXRjaFsxXSArICttYXRjaFszXSkgKyArbWF0Y2hbNV0pICsgK21hdGNoWzddIHx8IDAsXG4gICAgICAgICAgICAgIGVuZFRpbWU6IDEwMDAgKiAoNjAgKiAoNjAgKiArbWF0Y2hbOV0gKyArbWF0Y2hbMTFdKSArICttYXRjaFsxM10pICsgK21hdGNoWzE1XSB8fCAwLFxuICAgICAgICAgICAgICB0ZXh0czogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlID0gJ3RleHQnXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmV4cGVjdGVkIHRpbWVsaW5lIHRva2VuOiAke2xpbmV9YClcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIGlmIChsaW5lID09PSAnJykge1xuICAgICAgICAgICAgc3RhdGUgPSAncm9vdCdcbiAgICAgICAgICAgIGlmIChjYWNoZWRTdWJ0aXRsZSkge1xuICAgICAgICAgICAgICBzcGxpdFN1YnRpdGxlcy5wdXNoKGNhY2hlZFN1YnRpdGxlKVxuICAgICAgICAgICAgICBjYWNoZWRTdWJ0aXRsZSA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGNhY2hlZFN1YnRpdGxlKSB7XG4gICAgICAgICAgICBjYWNoZWRTdWJ0aXRsZS50ZXh0cy5wdXNoKGxpbmUpXG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvcmlnaW4uZm9yRWFjaChsaW5lID0+IHByb2Nlc3NMaW5lKGxpbmUpKVxuICAgIGlmIChjYWNoZWRTdWJ0aXRsZSkgc3BsaXRTdWJ0aXRsZXMucHVzaChjYWNoZWRTdWJ0aXRsZSlcbiAgICByZXR1cm4gc3BsaXRTdWJ0aXRsZXNcbiAgfVxuXG59XG4iXX0=