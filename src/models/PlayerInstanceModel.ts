import { action, observable } from 'mobx';

import { SubtitleProps } from '../components/Subtitle';

export interface PlayerInstanceProps {
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  subtitles?: SubtitleProps[];
}

export class PlayerInstanceModel {

  // video attributes
  @observable public src: string;
  @observable public poster: string;
  @observable public autoPlay: boolean;

  // video state
  @observable public currentTime: number = 0;
  @observable public bufferedTime: number = 0;
  @observable public duration: number = 0;
  @observable public paused: boolean = false;

  // attachments
  @observable public subtitles?: SubtitleProps[];

  @action
  public reload(props: PlayerInstanceProps) {
    if (props.src) this.src = props.src;
    if (props.poster) this.poster = props.poster;
    if (props.autoPlay) this.autoPlay = props.autoPlay;
    if (props.subtitles) this.subtitles = props.subtitles;
  }

}
