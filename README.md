# Ushio Player

[![npm](https://img.shields.io/npm/v/ushio.svg)](https://www.npmjs.com/package/ushio)
[![npm](https://img.shields.io/npm/dt/ushio.svg)](https://www.npmjs.com/package/ushio)
[![GitHub issues](https://img.shields.io/github/issues/rikakomoe/ushio.svg)](https://github.com/rikakomoe/ushio/issues)

Ushio is a lovely HTML5 video player with multi-track SRT/VTT subtitle support.

## Install

### Use via CDN

```html
<script src="https://unpkg.com/ushio/dist/ushio.js"></script>
```

### Install via NPM

Ushio is available on npm. You can install it by either npm or yarn.

```shell
$ yarn add --dev ushio # using yarn
$ npm install --save-dev ushio # using npm
```

```javascript
import Ushio from 'ushio'
```

## Demo

Have a look at [here](https://ushio.netlify.com).

## Usage

```javascript
const ushio = new Ushio({
  src: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪ .mp4',
  subtitles: [
    {
      src: 'https://tokimekiwakuwaku.rikako.moe/ときめきポポロン♪  - subtitle.srt',
      type: 'srt',
    }
  ]
});
ushio.render({
  style: {
    width: '850px',
    height: '478px',
  },
}, document.getElementById('player'))
```

Checkout [this](https://github.com/rikakomoe/ushio/blob/master/demo/src/index.tsx) example for using Ushio with React.
