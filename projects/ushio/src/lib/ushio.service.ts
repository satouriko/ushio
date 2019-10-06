import { Injectable } from '@angular/core'

export interface ISubtitle {
  startTime: number
  endTime: number
  texts: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UshioService {

  constructor () { }

  // tslint:disable-next-line:max-line-length
  private readonly timeStampRegex = /^(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})( --> )(?:(\d{2,})(:))?([0-5][0-9])(:)([0-5][0-9])([,.])(\d{3})/

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
