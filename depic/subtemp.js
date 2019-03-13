window.main = document.getElementById('main').innerHTML

let template = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  "<title>Evan's Repo</title>",
  '<meta name="author" content="Evan Elias YOung">',
  '<meta name="description" content="Where I host my Cydia tweaks">',
  '<meta name="keywords" content="jailbreak, Evan, code, cydia">',
  '<meta name="copyright" content="&copy; 2017-2019 Evan Elias Young">',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
  '<meta name="robots" content="index, nofollow">',
  '<meta name="html-valid" content="HTML5, ARIA, SVG1.1, MathML 2.0">',
  '<meta name="css-valid" content="CSSL 3">',
  '<meta name="lighthouse" content="281; A+">',
  '<link rel="stylesheet" type="text/css" href="../styles.css">',
  '</head>',
  '<body style="margin: 80px 0px 35px 0px;">',
  '<header>',
  `<h1>${window.title}</h1>`,
  '</header>',
  `<div id="content">${window.main}</div>`,
  '<footer role="footer"></footer>',
  '</body>',
  '</html>'
].join('')

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

document.documentElement.innerHTML = template
correctCydia()
