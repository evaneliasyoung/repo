class Change {
  version: string
  changes: string[]
  date: Date

  constructor(version: string, changes: string[], date: string) {
    this.version = version
    this.changes = changes
    this.date = new Date(date)
  }

  getList(): string {
    return `<ul><li>${this.changes.join('</li><li>')}</li></ul>`
  }

  getSection(): string {
    return `<li>
      <p><strong>Changes in Version ${this.version}</strong><span class="fright">${this.date.toLocaleDateString()}</span></p>
      <p></p>
      ${this.getList()}
    </li>`
  }
}
