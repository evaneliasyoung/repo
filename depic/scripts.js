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

function verifyVersion () {
  document.querySelector('ul').innerHTML += `<li><strong>Compatible</strong><span class="fright">${window.depic.compatStr}</span></li>`
}

function getFooter () {
  let txt = [`Hosting ${window.pkgs} Packages`, ``, 'Copyright Evan Elias Young 2017-2019']

  txt[1] = window.d.name !== 'Unknown' ? window.d.name : 'Device Unknown'
  txt[1] += window.d.version !== '' ? ` iOS ${window.d.version}` : ''

  document.querySelector('footer').innerHTML = txt.join('<br>')
}

function updateMainDepiction () {
  document.querySelector('[href="changelog.html"]').href = `changelog.html${window.location.search}`

  verifyVersion()
  document.querySelectorAll('[data-depic]').forEach(e => {
    e.innerHTML = e.innerHTML + window.depic[e.dataset.depic]
  })
  if (window.depic.screenshots.length > 0) {
    spawnScreenshots()
  }
}

function updateChangeDepiction () {
  window.depic.changelog.forEach(e => {
    document.querySelector('#list').innerHTML += `<li>
      <p><strong>Changes in Version ${e.version}</strong><span class="fright">${e.date}</span></p>
      <p></p>
      <ul><li>${e.changes.join('</li><li>')}</li></ul>
    </li>`
  })
}

function updateScreenDepiction () {
  for (let e of window.depic.screenshots) {
    document.querySelector('#list').innerHTML += `<li><img src="${e}" class="screenshot-image"></li>`
  }
}

function updateDepiction () {
  spawnBackButton()
  if (window.body.dataset.purpose === 'main') {
    updateMainDepiction()
  } else if (window.body.dataset.purpose === 'changelog') {
    updateChangeDepiction()
  } else if (window.body.dataset.purpose === 'screenshots') {
    updateScreenDepiction()
  }
}

function spawnBackButton () {
  document.querySelector('header > div > a').innerHTML = window.body.dataset.purpose === 'main' ? 'Repo' : window.depic.title
  document.querySelector('header > div > a').href = window.body.dataset.purpose === 'main' ? '..' : `./${window.location.search}`
}

function spawnScreenshots () {
  document.querySelector('main > ul').innerHTML += `<li><a href='screenshots.html${window.location.search}' role='button' class='cydia_blank'>View Screenshots</a></li>`
}

function mainLoad () {
  window.d = new window.Device()
  window.d.name = window.d.getName()
  window.d.version = window.d.getVersion()
  window.body = document.querySelector('body')
  window.params = parseSearch()
  window.pkgs = 16

  getFooter()
}

function rootLoad () {
  mainLoad()
}

function load () {
  mainLoad()

  if (!window.params.repo) {
    window.location.href = '..'
  } else {
    window
      .fetch(`${window.params.repo}.json`)
      .then(r => r.json())
      .then(r => {
        window.depic = r
        window.depic.version = window.depic.changelog[0].version
        window.depic.date = window.depic.changelog[0].date
        window.depic.change = `<li>${window.depic.changelog[0].changes.join('</li><li>')}</li>`
        window.depic.compatStr = window.d.version === '' ? 'Unknown' : window.d.VersionMatch(...window.depic.compat.split('-')) ? 'Yes' : 'No'
      })
      .then(updateDepiction)
  }

  checkCydia()
  correctCydia()
}
