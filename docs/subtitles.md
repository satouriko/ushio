# Subtitles

Use tag `ushio-subtitles` for subtitles.

```html
<ushio-player lang="zh-Hans" src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪ .mp4">
  <ushio-subtitles
   src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪  - subtitle.srt"
   name="字幕"
   type="application/x-subrip"
   default
  ></ushio-subtitles>
  <ushio-subtitles
    src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪  - caption.srt"
    name="歌手"
    type="application/x-subrip"
    default
  ></ushio-subtitles>
</ushio-player>
```

The above code renders as follows.

<div class="video-wrap">
<ushio-player lang="zh-Hans" src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪ .mp4">
  <ushio-subtitles
   src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪  - subtitle.srt"
   name="字幕"
   type="application/x-subrip"
   default
  ></ushio-subtitles>
  <ushio-subtitles
     src="https://tokimekiwakuwaku.netlify.com/ときめきポポロン♪  - caption.srt"
     name="歌手"
     type="application/x-subrip"
     default
  ></ushio-subtitles>
</ushio-player>
</div>

You need to specify the `type` attribute, it could be one of `application/x-subrip`, `text/vtt`.
If you don't provide the `type` attribute, the player will try to infer the format of the subtitles.

Add a `default` attribute to show the subtitles by default.

You can optionally add a `srclang` attribute, which makes it default only when the player's
display language matches the `srclang` attribute. This will be overridden by the `default` attribute.

Instead of using `src` for a remote subtitles resource, you can use `value` and put the subtitle text directly into it.
