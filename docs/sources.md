# Sources

## Switch Quality

Instead of passing the `src` attribute, you can use the `ushio-source` tag in `ushio-player` tag to specify
sources, just like you use `source` in a `video` tag.

In an `ushio-source` tag, you'll have to set the `name` and `shortname` attribute.

If you add a `default` attribute, that source will be used at the player's initialization.
User can select and change source via a menu.

```html
<ushio-player>
  <ushio-source
    src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4&r=720"
    name="高清 720P"
    shortname="720P"
  ></ushio-source>
  <ushio-source
    src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4&r=480"
    name="清晰 480P"
    shortname="480P"
    default
  ></ushio-source>
</ushio-player>
```

The above code renders as follows.

<div class="video-wrap">
<ushio-player>
  <ushio-source
    src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4&r=720"
    name="高清 720P"
    shortname="720P"
  ></ushio-source>
  <ushio-source
    src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4&r=480"
    name="清晰 480P"
    shortname="480P"
    default
  ></ushio-source>
</ushio-player>
</div>

## Add different type of sources

The web specification allows multiple `source` tags in `video` since supported video types vary from different browsers.
You can keep using this feature, just keep in mind to make the same video have the same `name` and `shortname`.

```html
<ushio-player>
  <ushio-source
    src="https://api.dogecloud.com/player/get.webm?vcode=5ac682e6f8231991&userId=17&ext=.webm"
    name="高清 720P"
    shortname="720P"
    type="video/webm"
  ></ushio-source>
  <ushio-source
    src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
    name="高清 720P"
    shortname="720P"
    type="video/mp4"
  ></ushio-source>
</ushio-player>
```

The above code renders as follows.

<div class="video-wrap">
<ushio-player>
  <ushio-source
    src="https://api.dogecloud.com/player/get.webm?vcode=5ac682e6f8231991&userId=17&ext=.webm"
    name="高清 720P"
    shortname="720P"
    type="video/webm"
  ></ushio-source>
  <ushio-source
    src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
    name="高清 720P"
    shortname="720P"
    type="video/mp4"
  ></ushio-source>
</ushio-player>
</div>
