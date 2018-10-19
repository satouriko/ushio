import { action, observable } from 'mobx';
import { CSSProperties } from 'react';

import { PlayerStyle } from '../components/Player';

export interface PlayerProps {
  playerStyle?: PlayerStyle;
  style?: CSSProperties;
  className?: string;
  innerHTML?: string;
}

export class PlayerModel {

  // player attributes
  @observable public playerStyle: PlayerStyle;
  @observable public style: CSSProperties;
  @observable public className: string;
  @observable public innerHTML: string;

  @action
  public reload = (props: PlayerProps) => {
    if (props.playerStyle) this.playerStyle = props.playerStyle;
    if (props.style) this.style = props.style;
    if (props.className) this.className = props.className;
    if (props.innerHTML) this.innerHTML = props.innerHTML;
  }

}
