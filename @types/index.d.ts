import * as React from 'react';
import { Player, PlayerStyle } from './components/Player';
import { PlayerInstanceModel, PlayerInstanceProps } from './models/PlayerInstanceModel';
import { PlayerModel, PlayerProps } from './models/PlayerModel';
export { PlayerInstanceProps as UshioProps, PlayerProps as UshioPlayerProps, PlayerStyle as UshioPlayerStyle };
export { Player as UshioPlayerComponent, PlayerInstanceModel as UshioPlayerInstanceStore, PlayerModel as UshioPlayerStore };
export { Subtitle as UshioSubtitleComponent, SubtitleProps as UshioSubtitle } from './components/Subtitle';
export declare class UshioPlayer {
    component: React.ReactElement<Player>;
    ref: Element;
    id: string;
    private store;
    constructor(init: any);
    reload(props: PlayerProps): void;
    destroy(): void;
}
export declare class Ushio {
    private readonly store;
    constructor(props?: PlayerInstanceProps);
    render: (props?: PlayerProps, node?: Element) => UshioPlayer;
    reload(props: PlayerInstanceProps): void;
}
export default Ushio;
