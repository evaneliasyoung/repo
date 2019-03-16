function parseSearch () {
  let query = window.location.search.substring(window.location.search.indexOf('?') + 1).split('&')
  let params = {}
  let pair

  for (let i = query.length - 1; i >= 0; i--) {
    pair = query[i].split('=')
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }

  return params
}

function getFooter () {
  let ctt = new Date()
  let dct = new Date(ctt.getTime() + ctt.getTimezoneOffset() * 60 * 1000 - 5 * 60 * 60 * 1000)
  let hr = dct.getHours()
  let min = dct.getMinutes() < 10 ? '0' + dct.getMinutes() : dct.getMinutes()
  let sec = dct.getSeconds() < 10 ? '0' + dct.getSeconds() : dct.getSeconds()
  let timeSt = `${hr}:${min}:${sec}`
  document.querySelector('footer').innerHTML = `Hosting ${window.pkgs} Packages<br>Currently: ${timeSt}<br>Copyright Evan Elias Young 2017-${ctt.getUTCFullYear()}`
}

function checkCydia () {
  if (navigator.userAgent.indexOf('Cydia') !== -1) {
    if (document.title.indexOf(' \u00b7 ') !== -1) {
      document.title = document.title.split(' \u00b7 ')[0]
    }
    document.documentElement.classList.add('cydia')
  } else {
    document.documentElement.classList.remove('cydia', 'depiction')
  }
}

function correctCydia () {
  if (document.documentElement.classList.contains('cydia')) {
    let base = document.createElement('base')
    let cydiaBlankLinks = document.getElementsByClassName('cydia_blank')

    base.target = '_open'
    document.head.appendChild(base)
    for (let i = 0; i < cydiaBlankLinks.length; i++) {
      cydiaBlankLinks[i].target = '_blank'
    }
  }
}

function updateMainDepiction () {
  document.querySelector('[href="changelog.html"]').href = `changelog.html${window.location.search}`

  document.querySelectorAll('[data-depic]').forEach(e => {
    e.innerHTML = e.innerHTML + window.depic[e.dataset.depic]
  })
  if (window.depic.screenshots.length > 0) {
    spawnScreenshots()
  }
}

function updateChangeDepiction () {
  for (let v in window.depic.changelog) {
    document.querySelector('#list').innerHTML += `<li><p><strong>Changes in Version ${v}</strong></p><p></p><ul>${window.depic.changelog[v]}</ul></li>`
  }
}

function updateScreenDepiction () {
  for (let e of window.depic.screenshots) {
    document.querySelector('#list').innerHTML += `<li><img src="${e}" class="screenshot-image"></li>`
  }
}

function updateDepiction () {
  if (window.body.dataset.purpose === 'main') {
    updateMainDepiction()
    spawnBackButton()
  } else if (window.body.dataset.purpose === 'changelog') {
    updateChangeDepiction()
    spawnBackButton()
  } else if (window.body.dataset.purpose === 'screenshots') {
    updateScreenDepiction()
    spawnBackButton()
  }
}

function spawnBackButton () {
  document.querySelector('header > div > a').innerHTML = window.body.dataset.purpose === 'main' ? "Evan's Repo" : window.depic.title
  document.querySelector('header > div > a').href = window.body.dataset.purpose === 'main' ? '..' : `./${window.location.search}`
}

function spawnScreenshots () {
  document.querySelector('main > ul').innerHTML += `<li><a href='screenshots.html${window.location.search}' role='button' class='cydia_blank'>View Screenshots</a></li>`
}

function load () {
  window.body = document.querySelector('body')
  window.params = parseSearch()
  window.pkgs = 16

  if (!window.params.repo) {
    window.location.href = '..'
  } else {
    window
      .fetch(`${window.params.repo}.json`)
      .then(r => r.json())
      .then(r => {
        window.depic = r
        window.depic.version = Object.keys(window.depic.changelog)[0]
        window.depic.change = window.depic.changelog[window.depic.version]
      })
      .then(updateDepiction)
  }

  getFooter()
  setInterval(getFooter, 1000)

  checkCydia()
  correctCydia()
}
