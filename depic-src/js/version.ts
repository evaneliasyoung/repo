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
      this.minor = li[1]
    }
    if (li.length > 2) {
      this.patch = li[2]
    }

    this.list = [this.major, this.minor, this.patch]
    this.str = this.list.join('.')
  }

  compare(ver: Version): -1 | 0 | 1 {
    if (this.str === ver.str) {
      return 0
    }

    for (let i = 2; i > 0; --i) {
      if (this.list[i] > ver.list[i]) {
        return 1
      }
      if (this.list[i] < ver.list[i]) {
        return -1
      }
    }

    return 0
  }

  gt(ver: Version): boolean { return this.compare(ver) > 0 }
  gte(ver: Version): boolean { return this.compare(ver) >= 0 }
  lt(ver: Version): boolean { return this.compare(ver) < 0 }
  lte(ver: Version): boolean { return this.compare(ver) <= 0 }
  eq(ver: Version): boolean { return this.compare(ver) === 0 }
  neq(ver: Version): boolean { return this.compare(ver) !== 0 }
}
