import * as React from 'react';
import { Component, CSSProperties } from 'react';
import SubtitleUtils, { ISubtitle } from 'subtitle-utils';

import '../stylesheets/subtitle.styl';

export interface SubtitleProps {
  src?: string;
  value?: string;
  type?: string;
  style?: CSSProperties;
  className?: string;
  _isUshioSubtitleElement?: true;
}

export interface SubtitlePropsInternal extends SubtitleProps {
  currentTime?: number;
}

interface SubtitleStates {
  src: string;
  value: string;
  subtitle: SubtitleUtils;
  flyingSubtitles: ISubtitle[];
}

export class Subtitle extends Component<SubtitleProps, SubtitleStates> {

  public static defaultProps: SubtitleProps = {
    _isUshioSubtitleElement: true,
  };

  constructor(props: SubtitlePropsInternal) {
    super(props);
    this.state = {
      src: props.src,
      value: props.value,
      subtitle: null,
      flyingSubtitles: [],
    };
  }

  public async componentDidMount() {
    const subtitle = await Subtitle.initSubtitle(this.props);
    this.setState({ subtitle });
  }

  public async componentDidUpdate(prevProps: SubtitlePropsInternal, prevState: SubtitleStates) {
    if (this.state.subtitle === undefined) {
      const subtitle = await Subtitle.initSubtitle(this.props);
      this.setState({ subtitle });
    }
  }

  private static async initSubtitle(props: SubtitlePropsInternal): Promise<SubtitleUtils> {
    let text = '';
    if (props.src) {
      const resp = await fetch(props.src);
      text = await resp.text();
    } else {
      text = props.value;
    }
    try {
      switch (props.type.toLowerCase()) {
        case 'srt':
          return await SubtitleUtils.fromSRT(text);
        default:
          return await SubtitleUtils.fromVTT(text);
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public static getDerivedStateFromProps(nextProps: SubtitlePropsInternal, prevState: SubtitleStates) {
    if (nextProps.src !== prevState.src || nextProps.value !== prevState.value) {
      return { src: nextProps.src, value: nextProps.value, subtitle: undefined as SubtitleUtils };
    }
    if (!prevState.subtitle) return {flyingSubtitles: []};
    const flyingSubtitles: ISubtitle[] = [];
    prevState.subtitle.subtitles.forEach(subtitle => {
      const currentTime = nextProps.currentTime * 1000;
      if (currentTime > subtitle.startTime && currentTime < subtitle.endTime) {
        flyingSubtitles.push(subtitle);
      }
    });
    return {flyingSubtitles};
  }

  public render() {
    return (
      <div className={`ushio-player-subtitle-wrap ${this.props.className || ''}`} style={this.props.style}>
        {
          this.state.flyingSubtitles.map(
            subtitle => subtitle.texts.map(
              (text, index) => (
                <div className="ushio-player-subtitle" key={index}>
                  <span dangerouslySetInnerHTML={{__html: text}} />
                </div>
              )
            )
          )
        }
      </div>
    );
  }

}
