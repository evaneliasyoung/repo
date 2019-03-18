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

Device.prototype.getBetween = function (content, start, end) {
  let r = content.split(start)
  if (1 in r) {
    let z = r[1].split(end)
    return z[0]
  }
  return ''
}

Device.prototype.getVersion = function () {
  let ver = this.getBetween(navigator.userAgent, ' OS ', ' like').replace('_', '.')

  return ver !== undefined || ver !== null || ver !== '' ? ver : 'Unknown'
}

Device.prototype.getName = function () {
  let canvas = document.createElement('canvas')
  let hwRatio = window.screen.height / window.screen.width
  if (canvas) {
    let context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (context) {
      let info = context.getExtension('WEBGL_debug_renderer_info')
      if (info) {
        var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL)
      }
    }
  }

  if (navigator.userAgent.includes('iPad')) {
    if (hwRatio === 1366 / 1024 && window.devicePixelRatio === 2) {
      switch (renderer) {
        case 'Apple A12 GPU':
          // iPad Pro 12.9 (2018)
          return 'iPad8,5'
        case 'Apple A11 GPU':
          // iPad Pro 12.9 (2017)
          return 'iPad7,1'
        case 'Apple A10 GPU':
          // iPad Pro 12.9 (2015)
          return 'iPad6,3'
        default:
          return 'iPad Pro 12.9'
      }
    } else if (hwRatio === 1194 / 834 && window.devicePixelRatio === 2) {
      // iPad Pro 11
      return 'iPad8,1'
    } else if (window.screen.height === 1112 && window.screen.width === 834 && window.devicePixelRatio === 2) {
      // iPad Pro 10.5 (2017)
      return 'iPad7,3'
    } else if (hwRatio === 1024 / 768 && window.devicePixelRatio === 2) {
      switch (renderer) {
        case 'Apple A10 GPU':
          // iPad 9.7 (2018)
          return 'iPad7,5'
        case 'Apple A9 GPU':
          // iPad 9.7 (2017)
          return 'iPad6,11'
        case 'Apple A8 GPU':
          // iPad Air 2
          return 'iPad5,3'
        case 'Apple A7 GPU':
          // iPad Air
          return 'iPad4,2'
        case 'PowerVR SGX554MP4':
          // iPad 4
          return 'iPad 3,4'
        case 'PowerVR SGX543MP4':
          // iPad 3
          return 'iPad 3,1'
        default:
          // iPad 3, 4, Air, or Air 2
          return 'iPad 3, 4, Air, Air 2, or 9.7'
      }
    } else if (hwRatio === 1024 / 768 && window.devicePixelRatio === 1) {
      switch (renderer) {
        case 'PowerVR SGX543MP2':
          // iPad 2
          return 'iPad2,2'
        case 'PowerVR SGX535':
          // iPad 1
          return 'iPad1,1'
        default:
          // iPad 1 or 2
          return 'iPad 1 or 2'
      }
    } else {
      return 'Unknown iPad'
    }
  }

  if (navigator.userAgent.includes('iPhone')) {
    if (hwRatio === 896 / 414 && window.devicePixelRatio === 3) {
      // iPhone XS Max
      return 'iPhone11,4'
    } else if (hwRatio === 896 / 414 && window.devicePixelRatio === 2) {
      // iPhone XR
      return 'iPhone11,8'
    } else if (hwRatio === 812 / 375 && window.devicePixelRatio === 3) {
      // iPhone X/XS
      switch (renderer) {
        case 'Apple A12 GPU':
          // iPhone XS
          return 'iPhone11,2'
        case 'Apple A11 GPU':
          // iPhone X
          return 'iPhone10,3'
        default:
          return 'iPhone X/XS'
      }
    } else if (hwRatio === 736 / 414 && window.devicePixelRatio === 3) {
      // iPhone 6+/6s+/7+ and 8+
      switch (renderer) {
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
        default:
          return 'iPhone 6 Plus, 6s Plus, 7 Plus, or 8 Plus'
      }
    } else if (hwRatio === 667 / 375 && window.devicePixelRatio === 3) {
      // iPhone 6+/6s+/7+ and 8+ in zoom mode
      switch (renderer) {
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
        default:
          return 'iPhone 6 Plus, 6s Plus, 7 Plus, or 8 Plus (Display Zoom)'
      }
    } else if (hwRatio === 667 / 375 && window.devicePixelRatio === 2) {
      // iPhone 6/6s/7 and 8
      switch (renderer) {
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
        default:
          return 'iPhone 6, 6s, 7, or 8'
      }
    } else if (hwRatio === 1.775 && window.devicePixelRatio === 2) {
      // iPhone 5/5C/5s/SE, or 6/6s/7 and 8 in zoom mode
      switch (renderer) {
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
        default:
          return 'iPhone 5, 5C, 5S, SE, or 6, 6s, 7 and 8 (display zoom)'
      }
    } else if (hwRatio === 1.5 && window.devicePixelRatio === 2) {
      // iPhone 4/4s
      switch (renderer) {
        case 'PowerVR SGX 535':
          return 'iPhone3,3'
        case 'PowerVR SGX 543':
          return 'iPhone4,1'
        default:
          return 'iPhone 4, or 4s'
      }
    } else if (hwRatio === 1.5 && window.devicePixelRatio === 1) {
      // iPhone 1/3G/3GS
      switch (renderer) {
        case 'ALP0298C05':
          return 'iPhone2,1'
        case 'S5L8900':
          return 'iPhone1,2'
        default:
          return 'iPhone 1, 3G, or 3GS'
      }
    } else {
      return 'Unknown iPhone'
    }
  }
  return 'Unknown'
}
