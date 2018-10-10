import * as React from 'react';
import { Component, CSSProperties, HTMLAttributes, StyleHTMLAttributes, SyntheticEvent } from 'react';

import './styles.styl';
import './theme.styl';

interface UshioPlayerStyle {
  progressColor?: string;
}

const defaultStyle: UshioPlayerStyle = {
  progressColor: '#00a1d6',
};

interface UshioPlayerProps {
  src?: string;
  poster?: string;
  playerStyle?: UshioPlayerStyle;
  style?: CSSProperties;
}

interface UshioPlayerStates {
  currentTime: number;
  bufferedTime: number;
  duration: number;
  playerStyle: UshioPlayerStyle;
  style: CSSProperties;
}

class UshioPlayer extends Component<UshioPlayerProps, UshioPlayerStates> {

  constructor(props: UshioPlayerProps) {
    super(props);
    this.state = {
      currentTime: 0,
      bufferedTime: 0,
      duration: 0,
      playerStyle: Object.assign({}, defaultStyle, props.playerStyle),
      style: Object.assign({}, props.style),
    };
  }

  get bufferProgress(): number {
    return this.state.bufferedTime / this.state.duration;
  }

  get playProgress(): number {
    return this.state.currentTime / this.state.duration;
  }

  private updateVideoState = (target: HTMLVideoElement) => {
    this.setState({
      currentTime: target.currentTime,
      bufferedTime: target.readyState === 4 ? target.buffered.end(target.buffered.length - 1) : 0,
      duration: target.duration,
    });
  }

  public render() {
    return (
      <div className="ushio-player" style={this.state.style}>
        <div className="ushio-player-video">
          <video
            autoPlay={true}
            playsInline={true}
            src={this.props.src}
            poster={this.props.poster}
            preload="metadata"
            onTimeUpdate={(e: SyntheticEvent<HTMLVideoElement>) => this.updateVideoState(e.currentTarget)}
            onLoadedMetadata={(e: SyntheticEvent<HTMLVideoElement>) => this.updateVideoState(e.currentTarget)}
            onProgress={(e: SyntheticEvent<HTMLVideoElement>) => this.updateVideoState(e.currentTarget)}
              >
            Your browser is too old which doesn't support HTML5 video.
          </video>
        </div>
        <div className="ushio-player-video-control-wrap">
          <div className="ushio-player-video-control">
            <div className="video-control-top">
              <div className="video-progress">
                <div className="video-progress-slider">
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
          </div>
        </div>
      </div>
    );
  }
}

export default UshioPlayer;
