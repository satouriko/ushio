# Control Buttons

You can exactly set whether each control button to be shown or not.

```html
<ushio-player
  id="player1"
  src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
></ushio-player>
```

```javascript
document.getElementById('player1').volumeControl = false
```

The above code hides the volume control button.

The table below shows all the properties for setting control buttons.

| Property Name | Description |
| --- | --- |
| volumeControl | Volume control button |
| sourceControl | Source switching button |
| subtitlesControl | Subtitles control button |
| settingsControl | Settings button |
| loopControl | Loop control button |
| fullscreenControl | Toggle fullscreen button |
