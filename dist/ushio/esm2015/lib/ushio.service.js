/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class UshioService {
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
/** @nocollapse */ UshioService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function UshioService_Factory() { return new UshioService(); }, token: UshioService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VzaGlvLyIsInNvdXJjZXMiOlsibGliL3VzaGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7Ozs7O0FBRTFDLCtCQUlDOzs7SUFIQyw4QkFBaUI7O0lBQ2pCLDRCQUFlOztJQUNmLDBCQUFlOztBQUdqQixNQUFNLGlCQUFpQjtJQW1DckI7UUFsQ1EsU0FBSSxHQUFHLElBQUksQ0FBQTtRQUNGLGVBQVUsR0FBRztZQUM1QixFQUFFLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixVQUFVLEVBQUUsWUFBWTtnQkFDeEIsY0FBYyxFQUFFLGlCQUFpQjtnQkFDakMsU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLE1BQU07Z0JBQ2QsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLGNBQWMsRUFBRSxNQUFNO2dCQUN0QixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQUE7UUFTQyxLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztnQkFBRSxNQUFLO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QixDQUFDOzs7O0lBWkQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQTtJQUNoRixDQUFDOzs7O0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7Ozs7O0lBU0QsV0FBVyxDQUFFLFFBQVE7UUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFBO1lBQ3BCLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7Ozs7O0lBRUQsQ0FBQyxDQUFFLEdBQVc7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FDRjs7Ozs7O0lBcERDLGlDQUFtQjs7Ozs7SUFDbkIsdUNBeUJDOztBQStCSCxNQUFNLE9BQU8sWUFBWTtJQWV2Qjs7UUFUaUIsbUJBQWMsR0FBRywwSEFBMEgsQ0FBQTtRQUM1SixTQUFJLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFBO0lBUWIsQ0FBQzs7OztJQVBsQixJQUFJLE9BQU87UUFDVCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUE7SUFDN0IsQ0FBQzs7OztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQTtJQUMzQixDQUFDOzs7OztJQUlELGNBQWMsQ0FBRSxLQUFhOztjQUNyQixJQUFJOzs7O1FBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7YUFDckMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7YUFDMUIsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7YUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7YUFDdEIsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDcEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTs7Y0FDdkIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQzs7Y0FDUixjQUFjLEdBQWdCLEVBQUU7O1lBQ2xDLGNBQWMsR0FBcUIsSUFBSTs7WUFDdkMsS0FBSyxHQUFHLE1BQU07O2NBQ1osV0FBVzs7OztRQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDbkMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2IsS0FBSyxNQUFNLENBQUM7Z0JBQ1osbUJBQW1CO2dCQUNuQixLQUFLLE9BQU87b0JBQ1YsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO3dCQUNmLEtBQUssR0FBRyxNQUFNLENBQUE7cUJBQ2Y7b0JBQ0QsT0FBTTtnQkFDUixLQUFLLE1BQU07b0JBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUN6QixLQUFLLEdBQUcsT0FBTyxDQUFBO3dCQUNmLE9BQU07cUJBQ1A7eUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUM5QixLQUFLLEdBQUcsTUFBTSxDQUFBO3dCQUNkLE9BQU07cUJBQ1A7eUJBQU0sSUFBSSxJQUFJLEtBQUssRUFBRTt3QkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7eUJBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUMzQixLQUFLLEdBQUcsVUFBVSxDQUFBO3dCQUNsQixPQUFNO3FCQUNQO2dCQUNILG1CQUFtQjtnQkFDbkIsS0FBSyxVQUFVOzswQkFDUCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM1QyxJQUFJLEtBQUssRUFBRTt3QkFDVCxjQUFjLEdBQUc7NEJBQ2YsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDbEYsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDbkYsS0FBSyxFQUFFLEVBQUU7eUJBQ1YsQ0FBQTt3QkFDRCxLQUFLLEdBQUcsTUFBTSxDQUFBO3dCQUNkLE9BQU07cUJBQ1A7eUJBQU07d0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQTtxQkFDdEQ7Z0JBQ0gsS0FBSyxNQUFNO29CQUNULElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTt3QkFDZixLQUFLLEdBQUcsTUFBTSxDQUFBO3dCQUNkLElBQUksY0FBYyxFQUFFOzRCQUNsQixjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBOzRCQUNuQyxjQUFjLEdBQUcsSUFBSSxDQUFBO3lCQUN0QjtxQkFDRjt5QkFBTSxJQUFJLGNBQWMsRUFBRTt3QkFDekIsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBQ2hDO2FBQ0o7UUFDSCxDQUFDLENBQUE7UUFDRCxNQUFNLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUE7UUFDekMsSUFBSSxjQUFjO1lBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN2RCxPQUFPLGNBQWMsQ0FBQTtJQUN2QixDQUFDOztBQTdFTSxvQkFBTyxHQUFHLE9BQU8sQ0FBQTtBQUNqQixrQkFBSyxHQUFHLFVBQVUsQ0FBQTs7WUFOMUIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7O0lBR0MscUJBQXdCOztJQUN4QixtQkFBeUI7Ozs7O0lBR3pCLHNDQUE0Sjs7SUFDNUosNEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN1YnRpdGxlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgZW5kVGltZTogbnVtYmVyXG4gIHRleHRzOiBzdHJpbmdbXVxufVxuXG5jbGFzcyBVc2hpb0kxOG5Qcm92aWRlciB7XG4gIHByaXZhdGUgbGFuZyA9ICdlbidcbiAgcHJpdmF0ZSByZWFkb25seSBpMThuU291cmNlID0ge1xuICAgIGVuOiB7XG4gICAgICBsYW5nOiAnRW5nbGlzaCcsXG4gICAgICBzcGVlZDogJ1NwZWVkJyxcbiAgICAgIG5vcm1hbDogJ05vcm1hbCcsXG4gICAgICBsb29wOiAnTG9vcCcsXG4gICAgICBub0xvb3A6ICdObyBMb29wJyxcbiAgICAgIGZ1bGxzY3JlZW46ICdGdWxsc2NyZWVuJyxcbiAgICAgIGV4aXRGdWxsc2NyZWVuOiAnRXhpdCBmdWxsc2NyZWVuJyxcbiAgICAgIHN0YXRpc3RpYzogJ1ZpZGVvIHN0YXRpc3RpYycsXG4gICAgICBsYW5ndWFnZTogJ0xhbmd1YWdlJyxcbiAgICAgIG11dGU6ICdNdXRlJ1xuICAgIH0sXG4gICAgJ3poLUhhbnMnOiB7XG4gICAgICBsYW5nOiAn566A5L2T5Lit5paHJyxcbiAgICAgIHNwZWVkOiAn5pKt5pS+6YCf5bqmJyxcbiAgICAgIG5vcm1hbDogJ+ato+W4uCcsXG4gICAgICBsb29wOiAn5b6q546v5pKt5pS+JyxcbiAgICAgIG5vTG9vcDogJ+WFs+mXreW+queOrycsXG4gICAgICBmdWxsc2NyZWVuOiAn5YWo5bGP5pKt5pS+JyxcbiAgICAgIGV4aXRGdWxsc2NyZWVuOiAn6YCA5Ye65YWo5bGPJyxcbiAgICAgIHN0YXRpc3RpYzogJ+inhumikee7n+iuoeS/oeaBrycsXG4gICAgICBsYW5ndWFnZTogJ+ivreiogCcsXG4gICAgICBtdXRlOiAn6Z2Z6Z+zJ1xuICAgIH1cbiAgfVxuICBnZXQgbGFuZ3VhZ2VzICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5pMThuU291cmNlKS5tYXAoZW50cnkgPT4gW2VudHJ5WzBdLCBlbnRyeVsxXS5sYW5nXSlcbiAgfVxuICBnZXQgbGFuZ3VhZ2UgKCkge1xuICAgIHJldHVybiB0aGlzLmxhbmdcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBmb3IgKGNvbnN0IGxhbmdDb2RlIG9mIG5hdmlnYXRvci5sYW5ndWFnZXMpIHtcbiAgICAgIGlmICh0aGlzLnNldExhbmd1YWdlKGxhbmdDb2RlKSkgYnJlYWtcbiAgICB9XG4gICAgdGhpcy50ID0gdGhpcy50LmJpbmQodGhpcylcbiAgfVxuXG4gIHNldExhbmd1YWdlIChsYW5nQ29kZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmkxOG5Tb3VyY2VbbGFuZ0NvZGVdKSB7XG4gICAgICB0aGlzLmxhbmcgPSBsYW5nQ29kZVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB0IChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaTE4blNvdXJjZVt0aGlzLmxhbmddW2tleV1cbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2hpb1NlcnZpY2Uge1xuXG4gIHN0YXRpYyB2ZXJzaW9uID0gJzQuMS4xJ1xuICBzdGF0aWMgYnVpbGQgPSAnTkcgQnVpbGQnXG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICBwcml2YXRlIHJlYWRvbmx5IHRpbWVTdGFtcFJlZ2V4ID0gL14oPzooXFxkezIsfSkoOikpPyhbMC01XVswLTldKSg6KShbMC01XVswLTldKShbLC5dKShcXGR7M30pKCAtLT4gKSg/OihcXGR7Mix9KSg6KSk/KFswLTVdWzAtOV0pKDopKFswLTVdWzAtOV0pKFssLl0pKFxcZHszfSkvXG4gIGkxOG4gPSBuZXcgVXNoaW9JMThuUHJvdmlkZXIoKVxuICBnZXQgdmVyc2lvbiAoKSB7XG4gICAgcmV0dXJuIFVzaGlvU2VydmljZS52ZXJzaW9uXG4gIH1cbiAgZ2V0IGJ1aWxkICgpIHtcbiAgICByZXR1cm4gVXNoaW9TZXJ2aWNlLmJ1aWxkXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7IH1cblxuICBwYXJzZVN1YnRpdGxlcyAoaW5wdXQ6IHN0cmluZyk6IElTdWJ0aXRsZVtdIHtcbiAgICBjb25zdCB0cmltID0gKHN0cjogc3RyaW5nKSA9PiBzdHIudHJpbSgpXG4gICAgICAucmVwbGFjZSgvXlteXFxTXFxuXSsvZ20sICcnKVxuICAgICAgLnJlcGxhY2UoL1xcdTAwMDAvZywgJ1xcdUZGRkQnKVxuICAgICAgLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJylcbiAgICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcbicpXG4gICAgICAucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJylcbiAgICBjb25zdCBvcmlnaW4gPSB0cmltKGlucHV0KVxuICAgICAgLnNwbGl0KCdcXG4nKVxuICAgIGNvbnN0IHNwbGl0U3VidGl0bGVzOiBJU3VidGl0bGVbXSA9IFtdXG4gICAgbGV0IGNhY2hlZFN1YnRpdGxlOiBJU3VidGl0bGUgfCBudWxsID0gbnVsbFxuICAgIGxldCBzdGF0ZSA9ICdyb290J1xuICAgIGNvbnN0IHByb2Nlc3NMaW5lID0gKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICBjYXNlICdub3RlJzpcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgaWYgKGxpbmUgPT09ICcnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICdyb290J1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FzZSAncm9vdCc6XG4gICAgICAgICAgaWYgKGxpbmUubWF0Y2goL15XRUJWVFQvKSkge1xuICAgICAgICAgICAgc3RhdGUgPSAndGl0bGUnXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9IGVsc2UgaWYgKGxpbmUubWF0Y2goL15OT1RFLykpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJ25vdGUnXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9IGVsc2UgaWYgKGxpbmUgPT09ICcnKSByZXR1cm4gW2xpbmVdXG4gICAgICAgICAgZWxzZSBpZiAoIWxpbmUubWF0Y2goLy0tPi8pKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICd0aW1lbGluZSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICd0aW1lbGluZSc6XG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLnRpbWVTdGFtcFJlZ2V4LmV4ZWMobGluZSlcbiAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNhY2hlZFN1YnRpdGxlID0ge1xuICAgICAgICAgICAgICBzdGFydFRpbWU6IDEwMDAgKiAoNjAgKiAoNjAgKiArbWF0Y2hbMV0gKyArbWF0Y2hbM10pICsgK21hdGNoWzVdKSArICttYXRjaFs3XSB8fCAwLFxuICAgICAgICAgICAgICBlbmRUaW1lOiAxMDAwICogKDYwICogKDYwICogK21hdGNoWzldICsgK21hdGNoWzExXSkgKyArbWF0Y2hbMTNdKSArICttYXRjaFsxNV0gfHwgMCxcbiAgICAgICAgICAgICAgdGV4dHM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZSA9ICd0ZXh0J1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5leHBlY3RlZCB0aW1lbGluZSB0b2tlbjogJHtsaW5lfWApXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICBpZiAobGluZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJ3Jvb3QnXG4gICAgICAgICAgICBpZiAoY2FjaGVkU3VidGl0bGUpIHtcbiAgICAgICAgICAgICAgc3BsaXRTdWJ0aXRsZXMucHVzaChjYWNoZWRTdWJ0aXRsZSlcbiAgICAgICAgICAgICAgY2FjaGVkU3VidGl0bGUgPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjYWNoZWRTdWJ0aXRsZSkge1xuICAgICAgICAgICAgY2FjaGVkU3VidGl0bGUudGV4dHMucHVzaChsaW5lKVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb3JpZ2luLmZvckVhY2gobGluZSA9PiBwcm9jZXNzTGluZShsaW5lKSlcbiAgICBpZiAoY2FjaGVkU3VidGl0bGUpIHNwbGl0U3VidGl0bGVzLnB1c2goY2FjaGVkU3VidGl0bGUpXG4gICAgcmV0dXJuIHNwbGl0U3VidGl0bGVzXG4gIH1cblxufVxuIl19