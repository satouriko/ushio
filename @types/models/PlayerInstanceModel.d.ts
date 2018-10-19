import { SubtitleProps } from '../components/Subtitle';
export interface PlayerInstanceProps {
    src?: string;
    poster?: string;
    autoPlay?: boolean;
    preload?: string;
    subtitles?: SubtitleProps[];
}
export declare class PlayerInstanceModel {
    src: string;
    poster: string;
    autoPlay: boolean;
    preload: string;
    currentTime: number;
    bufferedTime: number;
    duration: number;
    paused: boolean;
    currentTimeSetter: number;
    subtitles?: SubtitleProps[];
    reload: (props: PlayerInstanceProps) => void;
    togglePlay: () => void;
    play: () => void;
    pause: () => void;
    setCurrentTime: (time: number) => void;
}
