class Version {
  major: number
  minor: number
  patch: number
  list: number[]
  str: string

  constructor(ver: string) {
    let li: number[] = ver.split('.').map(e => parseInt(e))

    this.patch = 0
    this.minor = 0
    this.major = 0

    if (li.length > 0) {
      this.major = li[0]
    }
    if (li.length > 1) {
      this.major = li[1]
    }
    if (li.length > 2) {
      this.major = li[2]
    }

    this.list = [this.major, this.minor, this.patch]
    this.str = this.list.join('.')
  }
}
