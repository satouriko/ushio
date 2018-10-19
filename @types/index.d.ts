import { IReactionDisposer, IReactionPublic } from 'mobx';
import * as React from 'react';
import { Player, PlayerStyle } from './components/Player';
import { PlayerInstanceModel, PlayerInstanceProps } from './models/PlayerInstanceModel';
import { PlayerModel, PlayerProps } from './models/PlayerModel';
export { PlayerInstanceProps as UshioProps, PlayerProps as UshioPlayerProps, PlayerStyle as UshioPlayerStyle };
export { Player as UshioPlayerComponent, PlayerInstanceModel as UshioPlayerInstanceStore, PlayerModel as UshioPlayerStore };
export { Subtitle as UshioSubtitleComponent, SubtitleProps as UshioSubtitle } from './components/Subtitle';
export declare class UshioPlayer {
    readonly component: React.ReactElement<Player>;
    ref: Element;
    readonly id: string;
    readonly store: PlayerModel;
    constructor(init: any);
    reload(props: PlayerProps): void;
    destroy(): void;
}
export declare class Ushio {
    readonly store: PlayerInstanceModel;
    constructor(props?: PlayerInstanceProps);
    private readonly events;
    render: (props?: PlayerProps, node?: Element) => UshioPlayer;
    reload(props: PlayerInstanceProps): void;
    play(): void;
    pause(): void;
    togglePlay(): void;
    on(event: string, func: (data?: any, reaction?: IReactionPublic) => void): IReactionDisposer;
}
export default Ushio;
