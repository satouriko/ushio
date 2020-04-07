/**
 * @fileoverview added by tsickle
 * Generated from: lib/ushio.service.ts
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
UshioService.version = '4.1.3';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNoaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VzaGlvLyIsInNvdXJjZXMiOlsibGliL3VzaGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBOzs7OztBQUUxQywrQkFJQzs7O0lBSEMsOEJBQWlCOztJQUNqQiw0QkFBZTs7SUFDZiwwQkFBZTs7QUFHakIsTUFBTSxpQkFBaUI7SUFtQ3JCO1FBbENRLFNBQUksR0FBRyxJQUFJLENBQUE7UUFDRixlQUFVLEdBQUc7WUFDNUIsRUFBRSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxPQUFPO2dCQUNkLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLGNBQWMsRUFBRSxpQkFBaUI7Z0JBQ2pDLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixjQUFjLEVBQUUsTUFBTTtnQkFDdEIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUFBO1FBU0MsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsTUFBSztTQUN0QztRQUNELElBQUksQ0FBQyxDQUFDLEdB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QyxDQUFBO1FBQ0QsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFBO1FBQ3pDLElBQUksY0FBYztZQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdkQsT0FBTyxjQUFjLENBQUE7SUFDdkIsQ0FBQzs7QUE3RU0sb0JBQU8sR0FBRyxPQUFPLENBQUE7QUFDakIsa0JBQUssR0FBRyxVQUFVLENBQUE7O1lBTjFCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7OztJQUdDLHFCQUF3Qjs7SUFDeEIsbUJBQXlCOzs7OztJQUd6QixzQ0FBNEo7O0lBQzVKLDRCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdWJ0aXRsZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIGVuZFRpbWU6IG51bWJlclxuICB0ZXh0czogc3RyaW5nW11cbn1cblxuY2xhc3MgVXNoaW9JMThuUHJvdmlkZXIge1xuICBwcml2YXRlIGxhbmcgPSAnZW4nXG4gIHByaXZhdGUgcmVhZG9ubHkgaTE4blNvdXJjZSA9IHtcbiAgICBlbjoge1xuICAgICAgbGFuZzogJ0VuZ2xpc2gnLFxuICAgICAgc3BlZWQ6ICdTcGVlZCcsXG4gICAgICBub3JtYWw6ICdOb3JtYWwnLFxuICAgICAgbG9vcDogJ0xvb3AnLFxuICAgICAgbm9Mb29wOiAnTm8gTG9vcCcsXG4gICAgICBmdWxsc2NyZWVuOiAnRnVsbHNjcmVlbicsXG4gICAgICBleGl0RnVsbHNjcmVlbjogJ0V4aXQgZnVsbHNjcmVlbicsXG4gICAgICBzdGF0aXN0aWM6ICdWaWRlbyBzdGF0aXN0aWMnLFxuICAgICAgbGFuZ3VhZ2U6ICdMYW5ndWFnZScsXG4gICAgICBtdXRlOiAnTXV0ZSdcbiAgICB9LFxuICAgICd6aC1IYW5zJzoge1xuICAgICAgbGFuZzogJ+eugOS9k+S4reaWhycsXG4gICAgICBzcGVlZDogJ+aSreaUvumAn+W6picsXG4gICAgICBub3JtYWw6ICfmraPluLgnLFxuICAgICAgbG9vcDogJ+W+queOr+aSreaUvicsXG4gICAgICBub0xvb3A6ICflhbPpl63lvqrnjq8nLFxuICAgICAgZnVsbHNjcmVlbjogJ+WFqOWxj+aSreaUvicsXG4gICAgICBleGl0RnVsbHNjcmVlbjogJ+mAgOWHuuWFqOWxjycsXG4gICAgICBzdGF0aXN0aWM6ICfop4bpopHnu5/orqHkv6Hmga8nLFxuICAgICAgbGFuZ3VhZ2U6ICfor63oqIAnLFxuICAgICAgbXV0ZTogJ+mdmemfsydcbiAgICB9XG4gIH1cbiAgZ2V0IGxhbmd1YWdlcyAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuaTE4blNvdXJjZSkubWFwKGVudHJ5ID0+IFtlbnRyeVswXSwgZW50cnlbMV0ubGFuZ10pXG4gIH1cbiAgZ2V0IGxhbmd1YWdlICgpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5nXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgZm9yIChjb25zdCBsYW5nQ29kZSBvZiBuYXZpZ2F0b3IubGFuZ3VhZ2VzKSB7XG4gICAgICBpZiAodGhpcy5zZXRMYW5ndWFnZShsYW5nQ29kZSkpIGJyZWFrXG4gICAgfVxuICAgIHRoaXMudCA9IHRoaXMudC5iaW5kKHRoaXMpXG4gIH1cblxuICBzZXRMYW5ndWFnZSAobGFuZ0NvZGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pMThuU291cmNlW2xhbmdDb2RlXSkge1xuICAgICAgdGhpcy5sYW5nID0gbGFuZ0NvZGVcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdCAoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmkxOG5Tb3VyY2VbdGhpcy5sYW5nXVtrZXldXG4gIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNoaW9TZXJ2aWNlIHtcblxuICBzdGF0aWMgdmVyc2lvbiA9ICc0LjEuMydcbiAgc3RhdGljIGJ1aWxkID0gJ05HIEJ1aWxkJ1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgcHJpdmF0ZSByZWFkb25seSB0aW1lU3RhbXBSZWdleCA9IC9eKD86KFxcZHsyLH0pKDopKT8oWzAtNV1bMC05XSkoOikoWzAtNV1bMC05XSkoWywuXSkoXFxkezN9KSggLS0+ICkoPzooXFxkezIsfSkoOikpPyhbMC01XVswLTldKSg6KShbMC01XVswLTldKShbLC5dKShcXGR7M30pL1xuICBpMThuID0gbmV3IFVzaGlvSTE4blByb3ZpZGVyKClcbiAgZ2V0IHZlcnNpb24gKCkge1xuICAgIHJldHVybiBVc2hpb1NlcnZpY2UudmVyc2lvblxuICB9XG4gIGdldCBidWlsZCAoKSB7XG4gICAgcmV0dXJuIFVzaGlvU2VydmljZS5idWlsZFxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkgeyB9XG5cbiAgcGFyc2VTdWJ0aXRsZXMgKGlucHV0OiBzdHJpbmcpOiBJU3VidGl0bGVbXSB7XG4gICAgY29uc3QgdHJpbSA9IChzdHI6IHN0cmluZykgPT4gc3RyLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL15bXlxcU1xcbl0rL2dtLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXHUwMDAwL2csICdcXHVGRkZEJylcbiAgICAgIC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpXG4gICAgICAucmVwbGFjZSgvXFxyL2csICdcXG4nKVxuICAgICAgLnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpXG4gICAgY29uc3Qgb3JpZ2luID0gdHJpbShpbnB1dClcbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICBjb25zdCBzcGxpdFN1YnRpdGxlczogSVN1YnRpdGxlW10gPSBbXVxuICAgIGxldCBjYWNoZWRTdWJ0aXRsZTogSVN1YnRpdGxlIHwgbnVsbCA9IG51bGxcbiAgICBsZXQgc3RhdGUgPSAncm9vdCdcbiAgICBjb25zdCBwcm9jZXNzTGluZSA9IChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSAnbm90ZSc6XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgIGlmIChsaW5lID09PSAnJykge1xuICAgICAgICAgICAgc3RhdGUgPSAncm9vdCdcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhc2UgJ3Jvb3QnOlxuICAgICAgICAgIGlmIChsaW5lLm1hdGNoKC9eV0VCVlRULykpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJ3RpdGxlJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5lLm1hdGNoKC9eTk9URS8pKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICdub3RlJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5lID09PSAnJykgcmV0dXJuIFtsaW5lXVxuICAgICAgICAgIGVsc2UgaWYgKCFsaW5lLm1hdGNoKC8tLT4vKSkge1xuICAgICAgICAgICAgc3RhdGUgPSAndGltZWxpbmUnXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAndGltZWxpbmUnOlxuICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy50aW1lU3RhbXBSZWdleC5leGVjKGxpbmUpXG4gICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjYWNoZWRTdWJ0aXRsZSA9IHtcbiAgICAgICAgICAgICAgc3RhcnRUaW1lOiAxMDAwICogKDYwICogKDYwICogK21hdGNoWzFdICsgK21hdGNoWzNdKSArICttYXRjaFs1XSkgKyArbWF0Y2hbN10gfHwgMCxcbiAgICAgICAgICAgICAgZW5kVGltZTogMTAwMCAqICg2MCAqICg2MCAqICttYXRjaFs5XSArICttYXRjaFsxMV0pICsgK21hdGNoWzEzXSkgKyArbWF0Y2hbMTVdIHx8IDAsXG4gICAgICAgICAgICAgIHRleHRzOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUgPSAndGV4dCdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuZXhwZWN0ZWQgdGltZWxpbmUgdG9rZW46ICR7bGluZX1gKVxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgaWYgKGxpbmUgPT09ICcnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICdyb290J1xuICAgICAgICAgICAgaWYgKGNhY2hlZFN1YnRpdGxlKSB7XG4gICAgICAgICAgICAgIHNwbGl0U3VidGl0bGVzLnB1c2goY2FjaGVkU3VidGl0bGUpXG4gICAgICAgICAgICAgIGNhY2hlZFN1YnRpdGxlID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY2FjaGVkU3VidGl0bGUpIHtcbiAgICAgICAgICAgIGNhY2hlZFN1YnRpdGxlLnRleHRzLnB1c2gobGluZSlcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9yaWdpbi5mb3JFYWNoKGxpbmUgPT4gcHJvY2Vzc0xpbmUobGluZSkpXG4gICAgaWYgKGNhY2hlZFN1YnRpdGxlKSBzcGxpdFN1YnRpdGxlcy5wdXNoKGNhY2hlZFN1YnRpdGxlKVxuICAgIHJldHVybiBzcGxpdFN1YnRpdGxlc1xuICB9XG5cbn1cbiJdfQ==