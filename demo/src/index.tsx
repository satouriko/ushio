import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

import Ushio, { UshioProps } from '../../src';

import './style.css';

interface Video {src: string; subtitle: string; caption: string; }

const videos: Video[] = [
  {
    src: 'https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪ .mp4',
    subtitle: 'https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪  - subtitle.srt',
    caption: 'https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪  - caption.srt',
  },
  {
    src: 'https://tokimekiwakuwaku.netlify.com/ひだまりデイズ-TV size ver.-.mp4',
    subtitle: 'https://tokimekiwakuwaku.netlify.com/ひだまりデイズ-TV size ver.- - subtitle.srt',
    caption: 'https://tokimekiwakuwaku.netlify.com/ひだまりデイズ-TV size ver.- - caption.srt',
  },
  {
    src: 'https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの.mp4',
    subtitle: 'https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの - subtitle.srt',
    caption: 'https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの - caption.srt',
  },
];

const getVideo = (id: number): UshioProps =>
  ({
    autoPlay: true,
    src: videos[id].src,
    subtitles: [{
      src: videos[id].subtitle,
      type: 'srt',
    }, {
      src: videos[id].caption,
      type: 'srt',
      className: 'caption',
    }],
  });

class App extends Component {

  public player = new Ushio(getVideo(0));
  public playerElem = this.player.render({
    style: {
      width: '850px',
      height: '478px',
    },
  });

  public render() {

    return (
      <div className="landing">
        <h1>Ushio Player</h1>
        <h3>🍭 <ruby>
          汐<rp>（</rp><rt>Ushio</rt><rp>）</rp>
        </ruby> is a lovely HTML5 video player with multi-track SRT/VTT subtitle support.</h3>
        {
          this.playerElem.component
        }
        <p>
          <button onClick={() => this.player.reload(getVideo(0))}>ときめきポポロン♪ </button>
          <button onClick={() => this.player.reload(getVideo(1))}>ひだまりデイズ</button>
          <button onClick={() => this.player.reload(getVideo(2))}>夜空はなんでも知ってるの?</button>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
