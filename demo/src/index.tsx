import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

import { UshioPlayer, UshioSubtitle } from '../../';

import './style.css';

interface Video {src: string; subtitle: string; caption: string; }

const videos: Video[] = [
  {
    src: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪ .mp4',
    subtitle: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪  - subtitle.srt',
    caption: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪  - caption.srt',
  },
  {
    src: 'https://tokimekiwakuwaku.rikako.moe/ひだまりデイズ-TV size ver.-.mp4',
    subtitle: 'https://tokimekiwakuwaku.rikako.moe/ひだまりデイズ-TV size ver.- - subtitle.srt',
    caption: 'https://tokimekiwakuwaku.rikako.moe/ひだまりデイズ-TV size ver.- - caption.srt',
  },
  {
    src: 'https://tokimekiwakuwaku.rikako.moe/夜空はなんでも知ってるの.mp4',
    subtitle: 'https://tokimekiwakuwaku.rikako.moe/夜空はなんでも知ってるの - subtitle.srt',
    caption: 'https://tokimekiwakuwaku.rikako.moe/夜空はなんでも知ってるの - caption.srt',
  },
];

class App extends Component<{}, Video> {

  constructor(props: {}) {
    super(props);
    this.state = videos[0];
  }

  public render() {
    return (
      <div className="landing">
        <h1>Ushio Player</h1>
        <h3>🍭 <ruby>
          汐<rp>（</rp><rt>Ushio</rt><rp>）</rp>
        </ruby> is a lovely HTML5 video player with multi-track SRT/VTT subtitle support.</h3>
        <UshioPlayer autoPlay={true}
          src={this.state.src}
          style={{
            width: '850px',
            height: '478px',
          }}
        >
          <UshioSubtitle type="srt" src={this.state.subtitle} />
          <UshioSubtitle type="srt" src={this.state.caption} className="caption" />
        </UshioPlayer>
        <p>
          <button onClick={() => this.setState(videos[0])}>ときめきポポロン♪ </button>
          <button onClick={() => this.setState(videos[1])}>ひだまりデイズ</button>
          <button onClick={() => this.setState(videos[2])}>夜空はなんでも知ってるの?</button>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
