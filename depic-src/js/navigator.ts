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

function isStandalone() {
  return (window.navigator as any).standalone === true
}
