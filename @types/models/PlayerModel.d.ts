import { CSSProperties } from 'react';
import { PlayerStyle } from '../components/Player';
export interface PlayerProps {
    playerStyle?: PlayerStyle;
    style?: CSSProperties;
    className?: string;
    innerHTML?: string;
}
export declare class PlayerModel {
    playerStyle: PlayerStyle;
    style: CSSProperties;
    className: string;
    innerHTML: string;
    reload(props: PlayerProps): void;
}
