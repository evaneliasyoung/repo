class Package {
  title: string
  desc: string
  version: string
  compat: string
  date: Date
  screenshots: string[]
  changelog: Change[]

  constructor(data: any) {
    this.title = data.title
    this.desc = data.desc
    this.version = data.changelog[0].version
    this.date = new Date(data.changelog[0].date)
    this.compat = data.compat
    this.screenshots = data.screenshots

    this.changelog = []
    data.changelog.forEach(e => {
      this.changelog.push(new Change(e.version, e.changes, e.date))
    })
  }

  getChangeString(): string {
    return `<li>${this.changelog[0].changes.join('</li><li>')}</li>`
  }

  getScreenshotList(): string {
    let ret: string = ''

    this.screenshots.forEach(e => {
      ret += `<li><img src="/tweaks/${e}" class="screenshot-image"></li>`
    })

    return ret
  }

  getCompatString(): string {
    return window.d.version.str === '0.0.0' ? 'Unknown' : window.d.matchVersion(this.compat.split('-')[0], this.compat.split('-')[1]) ? 'Yes' : 'No'
  }
}
