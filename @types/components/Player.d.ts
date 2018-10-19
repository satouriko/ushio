import { Component } from 'react';
import { PlayerInstanceModel } from '../models/PlayerInstanceModel';
import { PlayerModel } from '../models/PlayerModel';
import '../stylesheets/player.styl';
import '../stylesheets/theme.styl';
export interface PlayerStyle {
    progressColor?: string;
}
export interface PlayerPropsInternal {
    playerInstanceStore: PlayerInstanceModel;
    playerStore: PlayerModel;
    id: string;
}
interface PlayerStates {
    hover: boolean;
    noCursor: boolean;
}
export declare class Player extends Component<PlayerPropsInternal, PlayerStates> {
    private video;
    private videoControl;
    private hoverTimer;
    private playReactionDisposer;
    private currentTimeReactionDisposer;
    constructor(props: PlayerPropsInternal);
    readonly bufferProgress: number;
    readonly playProgress: number;
    readonly currentTime: string;
    readonly duration: string;
    readonly videoPlayingState: string;
    readonly mouseHover: string;
    readonly noCursor: string;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private formatDuration;
    private updateVideoState;
    private getBufferedTime;
    private onMouseMove;
    private setCurrentTime;
    render(): JSX.Element;
}
export {};
