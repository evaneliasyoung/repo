class Package {
  title: string
  desc: string
  version: string
  compat: string
  minVer: Version
  maxVer: Version
  isCompatable: boolean
  date: Date
  screenshots: string[]
  changelog: Change[]

  constructor(data: any) {
    this.title = data.title
    this.desc = data.desc
    this.version = data.changelog[0].version
    this.date = new Date(data.changelog[0].date)
    this.minVer = new Version(data.minVer)
    this.maxVer = new Version(data.maxVer)
    this.isCompatable = window.d.version.gte(this.minVer) && window.d.version.lte(this.maxVer)
    this.screenshots = data.screenshots

    this.changelog = []
    data.changelog.forEach(e => {
      this.changelog.push(new Change(e.version, e.changes, e.date))
    })
  }

  getChangelog(): string {
    return this.changelog.map(e => e.getSection()).join('')
  }

  getChangeList(): string {
    return `<li>${this.changelog[0].changes.join('</li><li>')}</li>`
  }

  getScreenshotList(): string {
    let ret: string = ''

    this.screenshots.forEach(e => {
      ret += `<li><img src="/assets/tweaks/${e}" class="screenshot-image"></li>`
    })

    return ret
  }

  getCompatString(): string {
    return window.d.version.str === '0.0.0' ? 'Unknown' : this.isCompatable ? 'Yes' : 'No'
  }
}
