import * as React from 'react';
import { Component, SyntheticEvent } from 'react';

import './styles.styl';

interface UshioPlayerStyle {
  progressColor: string;
}

interface UshioPlayerProps {
  src?: string;
  poster?: string;
  style?: UshioPlayerStyle;
}

interface UshioPlayerStates {
  currentTime: number;
  duration: number;
}

class UshioPlayer extends Component<UshioPlayerProps, UshioPlayerStates> {

  constructor(props: UshioPlayerProps) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
    };
  }

  get progress(): number {
    return this.state.currentTime / this.state.duration;
  }

  public render() {
    return (
      <div className="ushio-player">
        <div className="ushio-player-video">
          <video
            autoPlay={true}
            playsInline={true}
            src={this.props.src}
            poster={this.props.poster}
            preload="metadata"
            onTimeUpdate={(e: SyntheticEvent<HTMLVideoElement>) => this.setState({ currentTime: e.currentTarget.currentTime })}
            onLoadedMetadata={(e: SyntheticEvent<HTMLVideoElement>) => this.setState({ duration: e.currentTarget.duration })}
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
                      <div className="bar-buffer" />
                      <div className="bar-normal"
                           style={{
                             transform: `scaleX(${this.progress})`,
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
