# 🍭 Ushio Player

[![npm](https://img.shields.io/npm/v/ushio.svg)](https://www.npmjs.com/package/ushio)
[![npm](https://img.shields.io/npm/dt/ushio.svg)](https://www.npmjs.com/package/ushio)
[![GitHub issues](https://img.shields.io/github/issues/rikakomoe/ushio.svg)](https://github.com/rikakomoe/ushio/issues)

Ushio is a lovely HTML5 video player with multi-track SRT/VTT subtitle support.

## 👷‍♀️ User Guide

Ushio v4 is created with Angular 8. 
You can use it either in an Angular project or as a stand alone web component.

### For Angular Projects

You can import this package as an external library to your angular project.
Go to the [README](https://www.npmjs.com/package/ushio) of this package for more information.

### For Non-Angular Projects

Add the following script to your HTML file.

```html
<script src="https://unpkg.com/ushio@4/bundles/ushio.min.js"></script>
```

The above link uses a ES2015 code base. If you need compatibility with older browsers, you can import it like this,

```html
<script src="https://unpkg.com/ushio@4/bundles/ushio-es5.min.js"></script>
```

Then you can use it as a custom element wherever in your code.

```html
<ushio-player></ushio-player>
```

## 👷‍♂️ Developer's Guide

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

### Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
This command will run the ushio demo site.

### Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/ushio` directory.

### Build demo website

Run `yarn build-demo` to build the demo website. The build artifacts will be stored in the `dist/ushio-demo` directory.

## 👻 Legacy version

Version 4 introduces completely breaking changes on both API and technique architecture:
v4 is based on Angular, RxJS and Web Component API, while v3 was based on React and MobX.

While v3 is actually a crude and less functional version, if you need references of the v3 version, please check out the [v3](https://github.com/rikakomoe/ushio/tree/v3) branch of this repository.
