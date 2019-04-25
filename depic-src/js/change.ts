class Change {
  version: string
  changes: string[]
  date: Date

  constructor(version: string, changes: string[], date: string) {
    this.version = version
    this.changes = changes
    this.date = new Date(date)
  }
}
