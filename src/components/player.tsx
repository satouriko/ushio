import * as React from 'react';
import { Component, CSSProperties, MouseEvent, RefObject } from 'react';

import * as pauseIcon from '../icons/pause.svg';
import * as playIcon from '../icons/play.svg';
import '../stylesheets/player.styl';
import '../stylesheets/theme.styl';

import { SubtitlePropsInternal } from './subtitle';

export interface PlayerStyle {
  progressColor?: string;
}

const defaultStyle: PlayerStyle = {
  progressColor: '#00a1d6',
};

export interface PlayerProps {
  src?: string;
  poster?: string;
  playerStyle?: PlayerStyle;
  style?: CSSProperties;
  className?: string;
}

interface PlayerStates {
  currentTime: number;
  bufferedTime: number;
  duration: number;
  playerStyle: PlayerStyle;
  style: CSSProperties;
  paused: boolean;
}

export class Player extends Component<PlayerProps, PlayerStates> {

  public video: RefObject<HTMLVideoElement>;

  constructor(props: PlayerProps) {
    super(props);
    this.video = React.createRef();
    this.state = {
      currentTime: 0,
      bufferedTime: 0,
      duration: 0,
      playerStyle: Object.assign({}, defaultStyle, props.playerStyle),
      style: Object.assign({}, props.style),
      paused: true,
    };
  }

  get bufferProgress(): number {
    return this.state.bufferedTime / this.state.duration;
  }

  get playProgress(): number {
    return this.state.currentTime / this.state.duration;
  }

  get currentTime(): string {
    return this.formatDuration(this.state.currentTime);
  }

  get duration(): string {
    return this.formatDuration(this.state.duration);
  }

  get videoPlayingState(): string {
    return this.state.paused ? 'video-state-pause' : 'video-state-play';
  }

  private formatDuration = (duration: number): string => {
    const h = Math.floor(duration / 3600);
    const m = Math.floor(duration % 3600 / 60);
    const s = Math.floor(duration % 60);
    let str = '';
    if (h && h < 10) str += `0${h}:`; else if (h) str += `${h}:`;
    if (m < 10) str += `0${m}:`; else str += `${m}:`;
    if (s < 10) str += `0${s}`; else str += `${s}`;
    return str;
  }

  private updateVideoState = () => {
    this.setState({
      currentTime: this.video.current.currentTime,
      bufferedTime: this.getBufferedTime(this.video.current),
      duration: this.video.current.duration,
      paused: this.video.current.paused,
    });
  }

  private getBufferedTime = (target: HTMLVideoElement): number => {
    if (target.readyState !== 4) return 0;
    const cur = target.currentTime;
    for (let i = 0; i < target.buffered.length; i++) {
      if (this.video.current.buffered.end(i) > cur) return this.video.current.buffered.end(i);
    }
    return cur;
  }

  private changeVideoPlayingState = () => {
    if (this.state.paused) this.video.current.play(); else this.video.current.pause();
  }

  private changeCurrentTime = (e: MouseEvent<HTMLDivElement>) => {
    const currentTime = (e.clientX - this.getElementLeft(e.currentTarget)) / e.currentTarget.clientWidth * this.state.duration;
    this.video.current.currentTime = currentTime;
    this.setState({ currentTime });
  }

  private getElementLeft = (element: HTMLElement) => {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;

    while (current !== null) {
      actualLeft += (current as HTMLElement).offsetLeft;
      current = (current as HTMLElement).offsetParent;
    }

    return actualLeft;
  }

  public render() {
    return (
      <div className={`ushio-player mouse-hover ${this.props.className || ''}`} style={this.state.style}>
        <div className="ushio-player-video-mask" onClick={this.changeVideoPlayingState} />
        <div className="ushio-player-video">
          <video
            ref={this.video}
            playsInline={true}
            src={this.props.src}
            poster={this.props.poster}
            preload="metadata"
            onTimeUpdate={this.updateVideoState}
            onLoadedMetadata={this.updateVideoState}
            onProgress={this.updateVideoState}
            onPause={this.updateVideoState}
            onPlay={this.updateVideoState}
          >
            Your browser is too old which doesn't support HTML5 video.
          </video>
        </div>
        {
          React.Children.map(this.props.children, (child: React.ReactElement<SubtitlePropsInternal>) =>
            React.cloneElement(child, {
              currentTime: this.state.currentTime,
            }))
        }
        <div className="ushio-player-video-control-mask" />
        <div className="ushio-player-video-control-wrap">
          <div className="ushio-player-video-control">
            <div className="video-control-top">
              <div className="video-progress">
                <div className="video-progress-slider" onClick={this.changeCurrentTime}>
                  <div className="slider-track">
                    <div className="slider-track-bar-wrap">
                      <div className="bar-buffer"
                           style={{
                             transform: `scaleX(${this.bufferProgress})`,
                           }}
                      />
                      <div className="bar-normal ushio-theme"
                           style={{
                             background: this.state.playerStyle.progressColor,
                             transform: `scaleX(${this.playProgress})`,
                           }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-control-bottom">
              <div className="video-control-bottom-left">
                <div className={`ushio-player-btn btn-start ${this.videoPlayingState}`}
                     onClick={this.changeVideoPlayingState}
                >
                  <span className="ushio-player-icon icon-play"
                        dangerouslySetInnerHTML={{ __html: playIcon as string }} />
                  <span className="ushio-player-icon icon-pause"
                        dangerouslySetInnerHTML={{ __html: pauseIcon as string }} />
                </div>
                <div className="video-time-wrap">
                  <span className="video-time-now">{this.currentTime}</span>
                  <span className="video-time-divider">/</span>
                  <span className="video-time-total">{this.duration}</span>
                </div>
              </div>
              <div className="video-control-bottom-center" />
              <div className="video-control-bottom-right" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
