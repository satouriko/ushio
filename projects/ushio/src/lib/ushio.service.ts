import { Injectable } from '@angular/core'

export interface ISubtitle {
  startTime: number
  endTime: number
  texts: string[]
}

class UshioI18nProvider {
  private lang = 'en'
  private readonly i18nSource = {
    en: {
      lang: 'English',
      speed: 'Speed',
      normal: 'Normal',
      loop: 'Loop',
      noLoop: 'No Loop',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit fullscreen',
      statistic: 'Video statistic',
      language: 'Language',
      mute: 'Mute'
    },
    'zh-Hans': {
      lang: '简体中文',
      speed: '播放速度',
      normal: '正常',
      loop: '循环播放',
      noLoop: '关闭循环',
      fullscreen: '全屏播放',
      exitFullscreen: '退出全屏',
      statistic: '视频统计信息',
      language: '语言',
      mute: '静音'
    }
  }
  get languages () {
    return Object.entries(this.i18nSource).map(entry => [entry[0], entry[1].lang])
  }
  get language () {
    return this.lang
  }

  constructor () {
    for (const langCode of navigator.languages) {
      if (this.setLanguage(langCode)) break
    }
    this.t = this.t.bind(this)
  }

  setLanguage (langCode): boolean {
    if (this.i18nSource[langCode]) {
      this.lang = langCode
      return true
    }
    return false
  }

  t (key: string): string {
    return this.i18nSource[this.lang][key]
  }
}

@Injectable({
  providedIn: 'root'
})
export class UshioService {

  static version = '4.1.1'
  static build = 'NG Build'

  // tslint:disable-next-line:max-line-length
  private readonly timeStampRegex = /^(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})( --> )(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})/
  i18n = new UshioI18nProvider()
  get version () {
    return UshioService.version
  }
  get build () {
    return UshioService.build
  }

  constructor () { }

  parseSubtitles (input: string): ISubtitle[] {
    const trim = (str: string) => str.trim()
      .replace(/^[^\S\n]+/gm, '')
      .replace(/\u0000/g, '\uFFFD')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
    const origin = trim(input)
      .split('\n')
    const splitSubtitles: ISubtitle[] = []
    let cachedSubtitle: ISubtitle | null = null
    let state = 'root'
    const processLine = (line: string) => {
      switch (state) {
        case 'note':
        /* falls through */
        case 'title':
          if (line === '') {
            state = 'root'
          }
          return
        case 'root':
          if (line.match(/^WEBVTT/)) {
            state = 'title'
            return
          } else if (line.match(/^NOTE/)) {
            state = 'note'
            return
          } else if (line === '') return [line]
          else if (!line.match(/-->/)) {
            state = 'timeline'
            return
          }
        /* falls through */
        case 'timeline':
          const match = this.timeStampRegex.exec(line)
          if (match) {
            cachedSubtitle = {
              startTime: 1000 * (60 * (60 * +match[1] + +match[3]) + +match[5]) + +match[7] || 0,
              endTime: 1000 * (60 * (60 * +match[9] + +match[11]) + +match[13]) + +match[15] || 0,
              texts: []
            }
            state = 'text'
            return
          } else {
            throw new Error(`unexpected timeline token: ${line}`)
          }
        case 'text':
          if (line === '') {
            state = 'root'
            if (cachedSubtitle) {
              splitSubtitles.push(cachedSubtitle)
              cachedSubtitle = null
            }
          } else if (cachedSubtitle) {
            cachedSubtitle.texts.push(line)
          }
      }
    }
    origin.forEach(line => processLine(line))
    if (cachedSubtitle) splitSubtitles.push(cachedSubtitle)
    return splitSubtitles
  }

}
