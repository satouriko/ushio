# Angular API

## Installation

To use this library, you can install it from npm:

```bash
npm install --save ushio
```

And then add it to your `AppModule`:

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { UshioModule } from 'ushio'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UshioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## API

The following table lists all Ushio Component APIs.

### [UshioSource] _[Directive]_

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[src]` | Source address | string | - |
| `[type]` | Type of video format | string | - |
| `[shortname]` | Short name of video source | string | 'Untitled' |
| `[name]` | Name of video source | string | 'Untitled' |
| `[default]` | Whether a source is the default source | boolean | false |

### [UshioSubtitles] _[Directive]_

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[value]` | Value of subtitles | string | - |
| `[src]` | Source address of subtitles | string | - |
| `[type]` | Type of subtitles format | string | - |
| `[name]` | Name of subtitles track | string | 'Untitled' |
| `[class]` | Custom class name of subtitles track | string | '' |
| `[srclang]` | Language code of subtitles | string | - |
| `[default]` | Whether a subtitles track is enabled by default | boolean | false |

### [UshioComponent] _[Component]_

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[src]` | Source address of video | string | - |
| `[poster]` | Poster URL of video | string | - |
| `[crossorigin]` | Cross origin settings of video | string | - |
| `[autoplay]` | Autoplay settings of video | boolean | - |
| `[preload]` | Preload settings of video | string | 'metadata' |
| `[lang]` | Language of video player UI | string | navigator.language |
| `[thumbnails]` | Thumbnails URL of video | string | - |
| `[(volume)]` | Volume of video | number | 1 |
| `[(playbackRate)]` | Video playback rate | number | 1 |
| `[volumeControl]` | Show volume control button | boolean | true |
| `[sourceControl]` | Show source control button | boolean | true |
| `[subtitlesControl]` | Show subtitles control button | boolean | true |
| `[settingsControl]` | Show settings control button | boolean | true |
| `[loopControl]` | Show loop control button | boolean | true |
| `[fullscreenControl]` | Show toggle fullscreen button | boolean | true |
| `(showControlChange)` | Whether control bar is toggled to display | boolean | - |
| `[(paused)]` | Video paused | boolean | true |
| `[(currentTime)]` | Video current playing offset | number | 0 |
| `(durationChange)` | Duration changed | number | - |
| `(waitingChange)` | Video is loading | boolean | - |
| `[(loop)]` | Loop | boolean | false |
| `[(muted)]` | Muted | boolean | false |
