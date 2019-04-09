"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* global Device */
function setCookie(cname, cvalue) {
  var exdays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 365;
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie = "".concat(cname, "=").concat(cvalue, ";expires=").concat(d.toUTCString(), ";path=/\"");
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; ++i) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

function parseSearch() {
  var query = window.location.search.substring(window.location.search.indexOf('?') + 1).split('&');
  var params = {};
  var pair;

  for (var i = query.length - 1; i >= 0; i--) {
    pair = query[i].split('=');
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return params;
}

function checkCydia() {
  if (navigator.userAgent.indexOf('Cydia') !== -1) {
    if (document.title.indexOf(" \xB7 ") !== -1) {
      document.title = document.title.split(" \xB7 ")[0];
    }

    document.documentElement.classList.add('cydia');
  } else {
    document.documentElement.classList.remove('cydia', 'depiction');
  }
}

function correctCydia() {
  if (document.documentElement.classList.contains('cydia')) {
    var base = document.createElement('base');
    var cydiaBlankLinks = document.getElementsByClassName('cydia_blank');
    base.target = '_open';
    document.head.appendChild(base);

    for (var i = 0; i < cydiaBlankLinks.length; i++) {
      cydiaBlankLinks[i].target = '_blank';
    }
  }
}

function verifyVersion() {
  document.querySelector('ul').innerHTML += "<li><strong>Compatible</strong><span class=\"fright\">".concat(window.depic.compatStr, "</span></li>");
}

function getFooter() {
  var txt = ["Hosting ".concat(window.pkgs, " Packages"), "", 'Copyright Evan Elias Young 2017-2019'];
  txt[1] = window.d.name !== 'Unknown' ? window.d.name : 'Device Unknown';
  txt[1] += window.d.version !== '' ? " iOS ".concat(window.d.version) : '';
  document.querySelector('footer').innerHTML = txt.join('<br>');
}

function updateMainDepiction() {
  document.querySelector('[href="changelog.html"]').href = "changelog.html".concat(window.location.search);
  verifyVersion();
  document.querySelectorAll('[data-depic]').forEach(function (e) {
    e.innerHTML = e.innerHTML + window.depic[e.dataset.depic];
  });

  if (window.depic.screenshots.length > 0) {
    spawnScreenshots();
  }
}

function updateChangeDepiction() {
  window.depic.changelog.forEach(function (e) {
    document.querySelector('#list').innerHTML += "<li>\n      <p><strong>Changes in Version ".concat(e.version, "</strong><span class=\"fright\">").concat(e.date, "</span></p>\n      <p></p>\n      <ul><li>").concat(e.changes.join('</li><li>'), "</li></ul>\n    </li>");
  });
}

function updateScreenDepiction() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = window.depic.screenshots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var e = _step.value;
      document.querySelector('#list').innerHTML += "<li><img src=\"".concat(e, "\" class=\"screenshot-image\"></li>");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function updateDepiction() {
  spawnBackButton();

  if (window.body.dataset.purpose === 'main') {
    updateMainDepiction();
  } else if (window.body.dataset.purpose === 'changelog') {
    updateChangeDepiction();
  } else if (window.body.dataset.purpose === 'screenshots') {
    updateScreenDepiction();
  }
}

function spawnBackButton() {
  document.querySelector('header > div > a').innerHTML = window.body.dataset.purpose === 'main' ? 'Repo' : window.depic.title;
  document.querySelector('header > div > a').href = window.body.dataset.purpose === 'main' ? '..' : "./".concat(window.location.search);
}

function spawnScreenshots() {
  document.querySelector('main > ul').innerHTML += "<li><a href='screenshots.html".concat(window.location.search, "' role='button' class='cydia_blank'>View Screenshots</a></li>");
}

function mainLoad() {
  window.d = new Device();
  window.d.name = window.d.getName();
  window.d.version = window.d.getVersion();
  window.body = document.querySelector('body');
  window.params = parseSearch();
  window.pkgs = 16;

  if (getCookie('theme') === '') {
    setCookie('theme', 'classic');
  }

  getFooter();
}

function rootLoad() {
  mainLoad();
}

function load() {
  mainLoad();

  if (!window.params.repo) {
    window.location.href = '..';
  } else {
    window.fetch("".concat(window.params.repo, ".json")).then(function (r) {
      return r.json();
    }).then(function (r) {
      var _window$d;

      window.depic = r;
      window.depic.version = window.depic.changelog[0].version;
      window.depic.date = window.depic.changelog[0].date;
      window.depic.change = "<li>".concat(window.depic.changelog[0].changes.join('</li><li>'), "</li>");
      window.depic.compatStr = window.d.version === '' ? 'Unknown' : (_window$d = window.d).matchVersion.apply(_window$d, _toConsumableArray(window.depic.compat.split('-'))) ? 'Yes' : 'No';
    }).then(updateDepiction);
  }

  checkCydia();
  correctCydia();
}
