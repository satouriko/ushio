import * as React from 'react';
import { render } from 'react-dom';
import UshioPlayer from '../../';

const App = () => (
  <UshioPlayer
    src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪ .mp4"
  />
);
render(<App />, document.getElementById("root"));