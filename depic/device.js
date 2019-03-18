var Device = function () {}

Device.prototype.VersionMatch = function (min, max) {
  let minAr = min.split('.').map(e => parseInt(e))
  let maxAr = max.split('.').map(e => parseInt(e))
  let verAr = this.ver.split('.').map(e => parseInt(e))

  minAr.push(0)
  minAr.push(0)
  maxAr.push(0)
  maxAr.push(0)

  if (verAr[0] > maxAr[0]) {
    return false
  }
  if (verAr[0] === maxAr[0]) {
    if (verAr[1] > maxAr[1]) {
      return false
    }
    if (verAr[1] === maxAr[1]) {
      if (verAr[2] > maxAr[2]) {
        return false
      }
    }
  }
  if (verAr[0] < minAr[0]) {
    return false
  }
  if (verAr[0] === minAr[0]) {
    if (verAr[1] < minAr[1]) {
      return false
    }
    if (verAr[1] === minAr[1]) {
      if (verAr[2] < minAr[2]) {
        return false
      }
    }
  }

  return true
}

Device.prototype.GetBetween = function (content, start, end) {
  let r = content.split(start)
  if (1 in r) {
    let z = r[1].split(end)
    return z[0]
  }
  return ''
}

Device.prototype.str_replace = function (search, replace, subject) {
  let temp = ''
  let repl = ''
  let f = [].concat(search)
  let r = [].concat(replace)
  let s = subject
  s = [].concat(s)

  for (let i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue
    }
    for (let j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + ''
      repl = r[0]
      s[i] = temp.split(f[j]).join(repl)
      if (typeof window.countObj !== 'undefined') {
        window.countObj.value += temp.split(f[j]).length - 1
      }
    }
  }
  return s[0]
}

Device.prototype.partOfArray = function (arr, obj) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === obj) return true
  }
}

Device.prototype.version = function () {
  let UA = navigator.userAgent

  if (this.GetBetween(UA, 'iPhone OS ', ' like') !== undefined || this.GetBetween(UA, 'iPhone OS ', ' like') !== null || this.GetBetween(UA, 'iPhone OS ', ' like') !== '') {
    return this.str_replace('_', '.', this.GetBetween(UA, 'iPhone OS ', ' like'))
  } else {
    return 'Unknown'
  }
}

Device.prototype.product_name = function () {
  let canvas = document.createElement('canvas')
  if (canvas) {
    let context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (context) {
      let info = context.getExtension('WEBGL_debug_renderer_info')
      if (info) {
        var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL)
      }
    }
  }

  // iPhone XS Max
  if (window.screen.height / window.screen.width === 896 / 414 && window.devicePixelRatio === 3) {
    return 'iPhone11,4'
    // iPhone XR
  } else if (window.screen.height / window.screen.width === 896 / 414 && window.devicePixelRatio === 2) {
    return 'iPhone11,8'
    // iPhone X/XS
  } else if (window.screen.height / window.screen.width === 812 / 375 && window.devicePixelRatio === 3) {
    switch (renderer) {
      default:
        return 'iPhone X/XS'
      case 'Apple A12 GPU':
        // iPhone XS
        return 'iPhone11,2'
      case 'Apple A11 GPU':
        // iPhone X
        return 'iPhone10,3'
    }
    // iPhone 6+/6s+/7+ and 8+
  } else if (window.screen.height / window.screen.width === 736 / 414 && window.devicePixelRatio === 3) {
    switch (renderer) {
      default:
        return 'iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus'
      case 'Apple A8 GPU':
        // iPhone 6+
        return 'iPhone7,1'
      case 'Apple A9 GPU':
        // iPhone 6S+
        return 'iPhone8,2'
      case 'Apple A10 GPU':
        // iPhone 7+
        return 'iPhone9,4'
      case 'Apple A11 GPU':
        // iPhone 8+
        return 'iPhone10,2'
    }
    // iPhone 6+/6s+/7+ and 8+ in zoom mode
  } else if (window.screen.height / window.screen.width === 667 / 375 && window.devicePixelRatio === 3) {
    switch (renderer) {
      default:
        return 'iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus (Display Zoom)'
      case 'Apple A8 GPU':
        // iPhone 6+
        return 'iPhone7,1'
      case 'Apple A9 GPU':
        // iPhone 6S+
        return 'iPhone8,2'
      case 'Apple A10 GPU':
        // iPhone 7+
        return 'iPhone9,4'
      case 'Apple A11 GPU':
        // iPhone 8+
        return 'iPhone10,2'
    }
    // iPhone 6/6s/7 and 8
  } else if (window.screen.height / window.screen.width === 667 / 375 && window.devicePixelRatio === 2) {
    switch (renderer) {
      default:
        return 'iPhone 6, 6s, 7 or 8'
      case 'Apple A8 GPU':
        // iPhone 6
        return 'iPhone7,2'
      case 'Apple A9 GPU':
        // iPhone 6S
        return 'iPhone8,1'
      case 'Apple A10 GPU':
        // iPhone 7
        return 'iPhone9,1'
      case 'Apple A11 GPU':
        // iPhone 8
        return 'iPhone10,1'
    }
    // iPhone 5/5C/5s/SE or 6/6s/7 and 8 in zoom mode
  } else if (window.screen.height / window.screen.width === 1.775 && window.devicePixelRatio === 2) {
    switch (renderer) {
      default:
        return 'iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 (display zoom)'
      case 'PowerVR SGX 543':
        return 'iPhone5,4'
      case 'Apple A7 GPU':
        return 'iPhone6,2'
      case 'Apple A8 GPU':
        return 'iPhone7,2'
      case 'Apple A9 GPU':
        return 'iPhone8,4'
      case 'Apple A10 GPU':
        return 'iPhone9,1'
      case 'Apple A11 GPU':
        return 'iPhone10,1'
    }
    // iPhone 4/4s
  } else if (window.screen.height / window.screen.width === 1.5 && window.devicePixelRatio === 2) {
    switch (renderer) {
      default:
        return 'iPhone 4 or 4s'
      case 'PowerVR SGX 535':
        return 'iPhone3,3'
      case 'PowerVR SGX 543':
        return 'iPhone4,1'
    }
    // iPhone 1/3G/3GS
  } else if (window.screen.height / window.screen.width === 1.5 && window.devicePixelRatio === 1) {
    switch (renderer) {
      default:
        return 'iPhone 1, 3G or 3GS'
      case 'ALP0298C05':
        return 'iPhone2,1'
      case 'S5L8900':
        return 'iPhone1,2'
    }
  } else {
    return 'Unknown'
  }
}
