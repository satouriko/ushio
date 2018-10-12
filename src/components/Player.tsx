import { observer } from 'mobx-react';
import * as React from 'react';
import { Component, CSSProperties, RefObject } from 'react';

import * as pauseIcon from '../icons/pause.svg';
import * as playIcon from '../icons/play.svg';
import { PlayerInstanceModel } from '../models/PlayerInstanceModel';
import { PlayerModel } from '../models/PlayerModel';
import '../stylesheets/player.styl';
import '../stylesheets/theme.styl';

import { Subtitle, SubtitleProps, SubtitlePropsInternal } from './Subtitle';

export interface PlayerStyle {
  progressColor?: string;
}

export interface PlayerPropsInternal {
  playerInstanceStore: PlayerInstanceModel;
  playerStore: PlayerModel;
}

interface PlayerStates {
  hover: boolean;
  noCursor: boolean;
}

@observer
export class Player extends Component<PlayerPropsInternal, PlayerStates> {

  private video: RefObject<HTMLVideoElement>;
  private videoControl: RefObject<HTMLDivElement>;
  private hoverTimer: number = 0;

  constructor(props: PlayerPropsInternal) {
    super(props);
    this.video = React.createRef();
    this.videoControl = React.createRef();
    this.state = {
      hover: false,
      noCursor: false,
    };
  }

  get bufferProgress(): number {
    return this.props.playerInstanceStore.bufferedTime / this.props.playerInstanceStore.duration;
  }

  get playProgress(): number {
    return this.props.playerInstanceStore.currentTime / this.props.playerInstanceStore.duration;
  }

  get currentTime(): string {
    return this.formatDuration(this.props.playerInstanceStore.currentTime);
  }

  get duration(): string {
    return this.formatDuration(this.props.playerInstanceStore.duration);
  }

  get videoPlayingState(): string {
    return this.props.playerInstanceStore.paused ? 'video-state-pause' : 'video-state-play';
  }

  get mouseHover(): string {
    return this.state.hover ? 'mouse-hover' : '';
  }

  get noCursor(): string {
    return this.state.noCursor ? 'no-cursor' : '';
  }

  public componentDidMount() {
    onmousemove = this.onMouseMove;
  }

  public componentWillUnmount() {
    clearTimeout(this.hoverTimer);
    onmousemove = null;
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
    this.props.playerInstanceStore.currentTime = this.video.current.currentTime;
    this.props.playerInstanceStore.bufferedTime = this.getBufferedTime(this.video.current);
    this.props.playerInstanceStore.duration = this.video.current.duration;
    this.props.playerInstanceStore.paused = this.video.current.paused;
  }

  private getBufferedTime = (target: HTMLVideoElement): number => {
    if (target.readyState !== 4) return 0;
    const cur = target.currentTime;
    for (let i = 0; i < target.buffered.length; i++) {
      if (this.video.current.buffered.end(i) > cur) return this.video.current.buffered.end(i);
    }
    return cur;
  }

  private onMouseMove = (e: MouseEvent) => {
    if (!this.video.current || !this.videoControl.current) return;
    const left = Player.getElementLeft(this.video.current);
    const top = Player.getElementTop(this.video.current);
    if (e.clientX > left &&
      e.clientX < left + this.video.current.offsetWidth &&
      e.clientY > top &&
      e.clientY < top + this.video.current.offsetHeight
    ) {
      this.setState({ hover: true, noCursor: false }, () => {
        clearTimeout(this.hoverTimer);
        if (e.clientY < Player.getElementTop(this.videoControl.current)) {
          this.hoverTimer = window.setTimeout(() => {
            this.setState({ hover: false, noCursor: true });
          }, 3000);
        }
      });
    } else {
      this.setState({ hover: false });
    }
  }

  private changeVideoPlayingState = () => {
    if (this.props.playerInstanceStore.paused) this.video.current.play(); else this.video.current.pause();
  }
  private changeCurrentTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentTime = (e.clientX - Player.getElementLeft(e.currentTarget)) / e.currentTarget.clientWidth * this.props.playerInstanceStore.duration;
    this.video.current.currentTime = currentTime;
    this.props.playerInstanceStore.currentTime = currentTime;
  }

  private static getElementLeft = (element: HTMLElement) => {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    while (current !== null) {
      actualLeft += (current as HTMLElement).offsetLeft;
      current = (current as HTMLElement).offsetParent;
    }
    return actualLeft;
  }

  private static getElementTop = (element: HTMLElement) => {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
      actualTop += (current as HTMLElement).offsetTop;
      current = (current as HTMLElement).offsetParent;
    }
    return actualTop;
  }

  public render() {
    return (
      <div className={`ushio-player ${this.mouseHover} ${this.props.playerStore.className || ''}`} style={{...this.props.playerStore.style}}>
        <div className={`ushio-player-video-mask ${this.noCursor}`} onClick={this.changeVideoPlayingState} />
        <div className="ushio-player-video">
          <video
            ref={this.video}
            playsInline={true}
            src={this.props.playerInstanceStore.src}
            poster={this.props.playerInstanceStore.poster}
            preload="metadata"
            autoPlay={this.props.playerInstanceStore.autoPlay}
            onTimeUpdate={this.updateVideoState}
            onLoadedMetadata={this.updateVideoState}
            onProgress={this.updateVideoState}
            onPause={this.updateVideoState}
            onPlay={this.updateVideoState}
          >
            Your browser is too old which doesn't support HTML5 video.
          </video>
        </div>
        <div className="ushio-player-custom-mask" dangerouslySetInnerHTML={{ __html: this.props.playerStore.innerHTML }} />
        {
          this.props.playerInstanceStore.subtitles.map((subtitle, index) => (
            React.cloneElement(<Subtitle key={index} {...subtitle} />, {
              currentTime: this.props.playerInstanceStore.currentTime,
            })
          ))
        }
        {
          React.Children.map(this.props.children, (child: React.ReactElement<SubtitlePropsInternal>) => {
            if (child.props._isUshioSubtitleElement) {
              return React.cloneElement(child, {
                currentTime: this.props.playerInstanceStore.currentTime,
              });
            } else return child;
          })
        }

        <div className="ushio-player-video-control-mask" />
        <div className="ushio-player-video-control-wrap" ref={this.videoControl}>
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
                             background: this.props.playerStore.playerStyle.progressColor,
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