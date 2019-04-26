function setCookie(name: string, val: string, exdays: number = 365): void {
  let d: Date = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${val};expires=${d.toUTCString()};path=/"`
}

function getCookie(name: string): string {
  let ca: string[] = document.cookie.split(';')
  let c: string
  name += '='

  for (let i = 0; i < ca.length; ++i) {
    c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function defaultCookie(name: string, val: string): void {
  if (getCookie(name) === '') {
    setCookie(name, val)
  }
}

function parseSearch(): { [index: string]: string } {
  let query: string[] = window.location.search.substring(window.location.search.indexOf('?') + 1).split('&')
  let params: { [index: string]: string } = {}
  let pair: string[]

  for (let i = query.length - 1; i >= 0; i--) {
    pair = query[i].split('=')
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }

  return params
}
