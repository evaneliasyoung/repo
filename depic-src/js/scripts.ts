interface Window {
  d: Device
  pkg: Package
  pkgs: number
  params: { [index: string]: string }
  cydia: boolean
  body: HTMLBodyElement
  root: HTMLElement
  theme: string
}

// #region Cydia
function correctCydia(): Promise<void> {
  return new Promise((resolve) => {
    if (window.cydia) {
      let base: HTMLElement = document.createElement('base')
      let cydiaBlankLinks: HTMLCollectionOf<Element> = document.getElementsByClassName('cydia_blank')

      window.root.classList.add('cydia')

      base.setAttribute('target', '_open')
      document.head.appendChild(base)
      for (let i = 0; i < cydiaBlankLinks.length; ++i) {
        cydiaBlankLinks[i].setAttribute('target', '_blank')
      }
    }
    resolve()
  })
}
// #endregion

function verifyVersion(): void {
  let ul: HTMLUListElement = document.querySelector('ul')
  if (ul) {
    ul.innerHTML += `<li><strong>Compatible</strong><span class="fright">${window.pkg.getCompatString()}</span></li>`
  }
}

function getFooter(): void {
  let txt: string[] = [`Hosting ${window.pkgs} Packages`, ``, 'Copyright Evan Elias Young 2017-2019']
  let footer: HTMLElement = document.querySelector('footer')

  txt[1] = window.d.name !== 'Unknown' ? window.d.name : 'Device Unknown'
  txt[1] += window.d.version.str !== '0.0.0' ? ` iOS ${window.d.version.str}` : ''

  if (footer) {
    footer.innerHTML = txt.join('<br>')
  }
}

function updateMainDepiction(): void {
  document.querySelector('[href="changelog.html"]').setAttribute('href', `changelog.html${window.location.search}`)

  verifyVersion()

  document.querySelectorAll('[data-depic="title"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.title}` })
  document.querySelectorAll('[data-depic="desc"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.desc}` })
  document.querySelectorAll('[data-depic="version"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.version}` })
  document.querySelectorAll('[data-depic="date"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.date.toLocaleDateString()}` })
  document.querySelectorAll('[data-depic="compat"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.minVer.str}-${window.pkg.maxVer.str}` })
  document.querySelectorAll('[data-depic="compatStr"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.getCompatString()}` })
  document.querySelectorAll('[data-depic="change"]').forEach(e => { e.innerHTML = `${e.innerHTML}${window.pkg.getChangeList()}` })

  if (window.pkg.screenshots.length > 0) {
    spawnScreenshots()
  }
}

function updateDepiction(): void {
  spawnBackButton()
  if (window.body.dataset.purpose === 'main') {
    updateMainDepiction()
  } else if (window.body.dataset.purpose === 'changelog') {
    document.querySelector('#list').innerHTML += window.pkg.getChangelog()
  } else if (window.body.dataset.purpose === 'screenshots') {
    document.querySelector('#list').innerHTML = window.pkg.getScreenshotList()
  }
}

function spawnBackButton(): void {
  document.querySelector('header > div > a').innerHTML = window.body.dataset.purpose === 'main' ? 'Repo' : window.pkg.title
  document.querySelector('header > div > a').setAttribute('href', window.body.dataset.purpose === 'main' ? '/' : `/depic.html${window.location.search}`)
}

function spawnScreenshots(): void {
  document.querySelector('main > ul').innerHTML += `<li><a href='screenshots.html${window.location.search}' role='button' class='cydia_blank'>View Screenshots</a></li>`
}

function getPackage(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!window.params.repo) {
      window.location.href = '/'
      reject()
    } else {
      fetch(`/assets/data/${window.params.repo}.json`)
        .then(r => r.json())
        .then(r => { window.pkg = new Package(r) })
        .then(r => resolve(window.pkg))
        .catch(r => reject(r))
    }
  })
}

function mainLoad(): void {
  window.cydia = navigator.userAgent.indexOf('Cydia') !== -1
  window.d = new Device()
  window.params = parseSearch()
  window.pkgs = 16
  window.body = document.querySelector('body')
  window.root = document.documentElement

  defaultCookie('theme', 'classic')
  window.theme = getCookie('theme') || 'classic'
  window.root.classList.add(window.theme)

  getFooter()
}

function rootLoad(): void {
  mainLoad()
}

function load(): void {
  mainLoad()
  getPackage().then(updateDepiction)
  correctCydia()
}
