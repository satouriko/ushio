import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

import UshioPlayer from '../../';

import './style.css';

class App extends Component<{}, {src: string}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      src: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪ .mp4',
    };
  }

  public render() {
    return (
      <div className="landing">
        <h1>Ushio Player</h1>
        <h3>🍭 Ushio is a lovely HTML5 video player with double-track SRT subtitle support.</h3>
        <UshioPlayer
          src={this.state.src}
          style={{
            width: '850px',
            height: '478px',
          }}
        />
        <p>
          <button onClick={() => this.setState({src: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪ .mp4'})}>ときめきポポロン♪ </button>
          <button onClick={() => this.setState({src: 'https://tokimekiwakuwaku.rikako.moe/ひだまりデイズ-TV size ver.-.mp4'})}>ひだまりデイズ</button>
          <button onClick={() => this.setState({src: 'https://tokimekiwakuwaku.rikako.moe/夜空はなんでも知ってるの.mp4'})}>夜空はなんでも知ってるの?</button>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
