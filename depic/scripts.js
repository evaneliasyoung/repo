function parseSearch () {
  let query = window.location.search
    .substring(window.location.search.indexOf('?') + 1)
    .split('&')
  let params = {}
  let pair

  for (var i = query.length - 1; i >= 0; i--) {
    pair = query[i].split('=')
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }

  return params
}

function getFooter () {
  var ctt = new Date()
  var dct = new Date(
    ctt.getTime() + ctt.getTimezoneOffset() * 60 * 1000 - 5 * 60 * 60 * 1000
  )
  let hr = dct.getHours()
  let min = dct.getMinutes() < 10 ? '0' + dct.getMinutes() : dct.getMinutes()
  let sec = dct.getSeconds() < 10 ? '0' + dct.getSeconds() : dct.getSeconds()
  let timeSt = `${hr}:${min}:${sec}`
  document.querySelector('footer').innerHTML = `Hosting ${
    window.pkgs
  } Packages<br>Currently: ${timeSt}<br>Copyright Evan ${ctt.getUTCFullYear()}`
}

function checkCydia () {
  var classList = document.documentElement.classList
  if (navigator.userAgent.indexOf('Cydia') !== -1) {
    if (document.title.indexOf(' \u00b7 ') !== -1) {
      document.title = document.title.split(' \u00b7 ')[0]
    }
    classList.add('cydia')
  } else {
    classList.remove('cydia', 'depiction')
  }
}

function correctCydia () {
  if (document.documentElement.classList.contains('cydia')) {
    var base = document.createElement('base')
    var cydiaBlankLinks = document.getElementsByClassName('cydia_blank')
    base.target = '_open'
    document.head.appendChild(base)
    for (var i = 0; i < cydiaBlankLinks.length; i++) {
      cydiaBlankLinks[i].target = '_blank'
    }
  }
}

function updateDepiction () {
  if (window.body.dataset.purpose === 'main') {
    for (let el of document.querySelectorAll('[data-depic]')) {
      el.innerHTML += window.depic[el.dataset.depic]
    }
    window.title = document.getElementById('title').innerHTML
  } else if (window.body.dataset.purpose === 'changelog') {
    for (let v in window.depic.changelog) {
      document.querySelector(
        '#list'
      ).innerHTML += `<li><p><strong>Changes in Version ${v}</strong></p><p></p><ul>${
        window.depic.changelog[v]
      }</ul></li>`
    }
  } else if (window.body.dataset.purpose === 'screenshots') {
    for (let e of window.depic.screenshots) {
      document.querySelector(
        '#list'
      ).innerHTML += `<li><img src="${e}" class="screenshot-image"></li>`
    }
  }
}

function spawnScreenshots () {
  document.querySelector(
    '#content > ul'
  ).innerHTML += `<li><a href='screenshots.html' role='button' class='cydia_blank'>View Screenshots</a></li>`
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
      })
      .then(updateDepiction)
  }

  getFooter()
  setInterval(getFooter, 1000)

  checkCydia()
  correctCydia()
}
