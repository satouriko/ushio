export interface ISubtitle {
    startTime: number;
    endTime: number;
    texts: string[];
}
declare class UshioI18nProvider {
    private lang;
    private readonly i18nSource;
    readonly languages: string[][];
    readonly language: string;
    constructor();
    setLanguage(langCode: any): boolean;
    t(key: string): string;
}
export declare class UshioService {
    static version: string;
    static build: string;
    private readonly timeStampRegex;
    i18n: UshioI18nProvider;
    readonly version: string;
    readonly build: string;
    constructor();
    parseSubtitles(input: string): ISubtitle[];
}
export {};
