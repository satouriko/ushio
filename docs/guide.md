# Quick Guide

## Install

1. Add the script tag to your document body.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Untitled</title>
</head>
<body>
  <script src="./dist/ushio/bundles/ushio.min.js"></script>
</body>
</html>
```

2. Use tag `ushio-player` to add a video.

```html
<ushio-player src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"></ushio-player>
```

3. The element will renders as follows.

<div class="video-wrap">
<ushio-player src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"></ushio-player>
</div>

## Attributes

Most common attributes of HTML `video` tag are also available in `ushio-player`.

### `src`

The URL of the video to embed.

### `poster`

A URL for an image to be shown while the video is downloading. If this attribute isn't specified, nothing is displayed until the first frame is available, then the first frame is shown as the poster frame.

### `crossorigin`

This enumerated attribute indicates whether to use CORS to fetch the related image. CORS-enabled resourcescan be reused in the `<canvas>` element without being tainted. The allowed values are:

  `anonymous`
  Sends a cross-origin request without a credential. In other words, it sends the Origin: HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin: HTTP header), the image will be tainted, and its usage restricted.
  
  `use-credentials`
  Sends a cross-origin request with a credential. In other words, it sends the Origin: HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials: HTTP header), the image will be tainted and its usage restricted.

When not present, the resource is fetched without a CORS request (i.e. without sending the Origin: HTTP header), preventing its non-tainted used in `<canvas>` elements. If invalid, it is handled as if the enumerated keyword anonymous was used. See CORS settings attributes for additional information.

### `autoplay`

A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.

### `preload`

This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience with regards to what content is loaded before the video is played. It may have one of the following values:

`none`: Indicates that the video should not be preloaded.  
`metadata`: Indicates that only video metadata (e.g. length) is fetched.  
`auto`: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.  
`empty string`: Synonym of the `auto` value.

The default value is `metadata`.

### `lang`

This attribute is a language code indicating the displayed language for the player UI, which follows the Unicode LDML convention that uses stable identifiers (Unicode locale identifiers) based on the norm [BCP47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt).

The default value is the first supported language in `navigator.languages`.
 
### `loop`

A Boolean attribute; if specified, the player will automatically seek back to the start upon reaching the end of the video. 
 
### `muted`

A Boolean attribute that indicates the default setting of the audio contained in the video. If set, the audio will be initially silenced. Its default value is `false`, meaning that the audio will be played when the video is played.
