import * as React from 'react';
import { render } from 'react-dom';

import { Player, PlayerStyle } from './components/Player';
import { PlayerInstanceModel, PlayerInstanceProps } from './models/PlayerInstanceModel';
import { PlayerModel, PlayerProps } from './models/PlayerModel';

export { PlayerInstanceProps as UshioProps, PlayerProps as UshioPlayerProps, PlayerStyle as UshioPlayerStyle };

export class UshioPlayer {
  public component: React.ReactElement<Player>;
  public ref: Element;
  public id: string | number;
  private store: PlayerModel;

  constructor(init: any) {
    this.id = init.id;
    this.ref = init.ref;
    this.component = init.component;
    this.store = init.store;
  }

  public reload(props: PlayerProps) {
    this.store.reload(props);
  }
}

export class Ushio {

  private readonly store: PlayerInstanceModel;

  constructor(props?: PlayerInstanceProps) {
    this.store = new PlayerInstanceModel();
    this.reload(props);
  }

  public render = (props?: PlayerProps, node?: Element): UshioPlayer => {
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

    const Component = <Player playerInstanceStore={this.store} playerStore={playerStore} />;

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

  public reload(props: PlayerInstanceProps) {
    this.store.reload(props);
  }

}

(window as any).Ushio = Ushio;

export default Ushio;
