# Styling

## Inject CSS to Shadow DOM

You can use `<style>` tag to inject CSS into Shadow DOM.

For example, override subtitles layout.

```html
<ushio-player lang="zh-Hans" src="https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの.mp4">
  <style>
    .ushio-player-subtitle-container {
      justify-content: space-between !important;
    }
  </style>
  <ushio-subtitles
   src="https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの - subtitle.srt"
   name="字幕"
   type="application/x-subrip"
   default
  ></ushio-subtitles>
  <ushio-subtitles
    src="https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの - caption.srt"
    name="歌手"
    type="application/x-subrip"
    default
  ></ushio-subtitles>
</ushio-player>
```

<div class="video-wrap">
<ushio-player lang="zh-Hans" src="https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの.mp4">
  <style>
    .ushio-player-subtitle-container {
      justify-content: space-between !important;
    }
  </style>
  <ushio-subtitles
   src="https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの - subtitle.srt"
   name="字幕"
   type="application/x-subrip"
   default
  ></ushio-subtitles>
  <ushio-subtitles
    src="https://tokimekiwakuwaku.netlify.com/夜空はなんでも知ってるの - caption.srt"
    name="歌手"
    type="application/x-subrip"
    default
  ></ushio-subtitles>
</ushio-player>
</div>

## Change theme color

You can set the CSS variable `--theme-color` to override default theme color.

```html
<ushio-player src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4">
  <style>
    :host {
      --theme-color: #fadfa3;
    }
  </style>
</ushio-player>
```

<div class="video-wrap">
<ushio-player src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4">
  <style>
    :host {
      --theme-color: #fadfa3;
    }
  </style>
</ushio-player>
</div>
