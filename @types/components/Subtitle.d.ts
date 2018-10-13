import { Component, CSSProperties } from 'react';
import SubtitleUtils, { ISubtitle } from 'subtitle-utils';
import '../stylesheets/subtitle.styl';
export interface SubtitleProps {
    src?: string;
    value?: string;
    type?: string;
    style?: CSSProperties;
    className?: string;
    _isUshioSubtitleElement?: true;
}
export interface SubtitlePropsInternal extends SubtitleProps {
    currentTime?: number;
}
interface SubtitleStates {
    src: string;
    value: string;
    subtitle: SubtitleUtils;
    flyingSubtitles: ISubtitle[];
}
export declare class Subtitle extends Component<SubtitleProps, SubtitleStates> {
    static defaultProps: SubtitleProps;
    private loading;
    constructor(props: SubtitlePropsInternal);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: SubtitlePropsInternal, prevState: SubtitleStates): Promise<void>;
    private static initSubtitle;
    static getDerivedStateFromProps(nextProps: SubtitlePropsInternal, prevState: SubtitleStates): {
        src: string;
        value: string;
        subtitle: SubtitleUtils;
        flyingSubtitles?: undefined;
    } | {
        flyingSubtitles: SubtitleUtils.ISubtitle[];
        src?: undefined;
        value?: undefined;
        subtitle?: undefined;
    };
    render(): JSX.Element;
}
export {};
