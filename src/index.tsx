import autobind from 'autobind-decorator';
import { reaction, IReactionDisposer, IReactionPublic } from 'mobx';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { Player, PlayerStyle } from './components/Player';
import { PlayerInstanceModel, PlayerInstanceProps } from './models/PlayerInstanceModel';
import { PlayerModel, PlayerProps } from './models/PlayerModel';

// export type
export { PlayerInstanceProps as UshioProps, PlayerProps as UshioPlayerProps, PlayerStyle as UshioPlayerStyle };

// export React Component
export {
  Player as UshioPlayerComponent,
  PlayerInstanceModel as UshioPlayerInstanceStore,
  PlayerModel as UshioPlayerStore
};
export { Subtitle as UshioSubtitleComponent, SubtitleProps as UshioSubtitle } from './components/Subtitle';

@autobind
export class UshioPlayer {
  public readonly component: React.ReactElement<Player>;
  public ref: Element;
  public readonly id: string;
  public readonly store: PlayerModel;

  constructor(init: any) {
    this.id = init.id;
    this.ref = init.ref;
    this.component = init.component;
    this.store = init.store;
  }

  public reload(props: PlayerProps) {
    this.store.reload(props);
  }

  public destroy() {
    const parent = document.getElementById(this.id).parentElement;
    if (parent) unmountComponentAtNode(parent);
  }

}

@autobind
export class Ushio {

  public readonly store = new PlayerInstanceModel();
  public reload = this.store.reload;
  public play = this.store.play;
  public pause = this.store.pause;
  public togglePlay = this.store.togglePlay;
  public setCurrentTime = this.store.setCurrentTime;

  constructor(props?: PlayerInstanceProps) {
    if (!props.preload) props.preload = 'metadata';
    this.reload(props);
  }

  private readonly events: { [key: string]: (effect: () => void) => IReactionDisposer } = {
    pause: (effect: (data?: any, reaction?: IReactionPublic) => void) =>
      reaction(() => this.store.paused, (d, r) => { if (d) effect(d, r); }),
    play: (effect: (data?: any, reaction?: IReactionPublic) => void) =>
      reaction(() => this.store.paused, (d, r) => { if (!d) effect(d, r); }),
    togglePlay: (effect: (data?: any, reaction?: IReactionPublic) => void) =>
      reaction(() => this.store.paused, effect),
    currentTimeChange: (effect: (data?: any, reaction?: IReactionPublic) => void) =>
      reaction(() => this.store.currentTime, effect),
    currentTimeSet: (effect: (data?: any, reaction?: IReactionPublic) => void) =>
      reaction(() => this.store.currentTimeSetter, effect),
  };

  public render(props?: PlayerProps, node?: Element): UshioPlayer {
    const playerID =
      'ushio-player-' +
      Date.parse(new Date() as any) +
      '-' +
      Math.ceil(Math.random() * 233);

    const defaultStyle: PlayerStyle = {
      progressColor: '#00a1d6',
    };

    const playerStore = new PlayerModel();
    playerStore.playerStyle = defaultStyle;
    playerStore.reload(props);

    const Component = <Player playerInstanceStore={this.store} playerStore={playerStore} id={playerID}/>;

    const player: UshioPlayer = new UshioPlayer({
      component: Component,
      id: playerID,
      store: playerStore,
    });

    if (node !== undefined) {
      render(Component, node);
      player.ref = document.getElementById(playerID);
    }

    return player;
  }

  public on(event: string, func: (data?: any, reaction?: IReactionPublic) => void): IReactionDisposer {
    const e = this.events[event];
    if (e !== undefined) return e(func);
    return undefined;
  }

}

(window as any).Ushio = Ushio;

export default Ushio;
