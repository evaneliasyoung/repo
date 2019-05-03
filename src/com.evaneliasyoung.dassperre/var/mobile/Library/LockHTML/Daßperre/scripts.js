window['clockFontSize'] = window['clockFontSize'] || 260
window['clockHour'] = window['clockHour'] || false
window['hourColor'] = window['hourColor'] || 'FFFFFF'
window['minColor'] = window['minColor'] || 'FFFFFF'
window['dateColor'] = window['dateColor'] || 'FFFFFF'
window['clockOpacity'] = window['clockOpacity'] || 0.8
window['clockLang'] = window['clockLang'] || 'en'
window['clockShadow'] = window['clockShadow'] || false

var enList = {
  day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
}
var esList = {
  day: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  month: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dic']
}
var deList = {
  day: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  month: ['Jan', 'Feb', 'März', 'Abr', 'Kan', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez']
}

function updateConfig () {
  document.getElementById('clock').style.opacity = window['clockOpacity']
  document.getElementById('clock').style.fontSize = `${window['clockFontSize']}px`
  document.getElementById('date').style.fontSize = `${window['clockFontSize'] / 9}px`
  document.getElementById('date').style.top = `${window['clockFontSize'] / -100}`
  document.getElementById('hour').style.color = `#${window['hourColor']}`
  document.getElementById('min').style.color = `#${window['minColor']}`
  document.getElementById('date').style.color = `#${window['dateColor']}`
  if (window['clockShadow']) {
    document.getElementById('clock').style['text-shadow'] = '0 5px 10px rgba(0,0,0,0.2)'
  }

  switch (window['clockLang']) {
    case 'en':
      window['langList'] = enList
      break
    case 'es':
      window['langList'] = esList
      break
    case 'de':
      window['langList'] = deList
      break
  }
}

function getNth (num) {
  if (num >= 10 && num <= 19) {
    return 'th'
  }
  num %= 10
  switch (num) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
function updateClock () {
  let currentTime = new Date()
  let currentHours = currentTime.getHours()
  let currentMinutes = currentTime
    .getMinutes()
    .toString()
    .padStart(2, '0')
  if (!window['clockHour']) {
    currentHours %= 12
    if (currentHours === 0) {
      currentHours = 12
    }
  }
  currentHours = currentHours.toString().padStart(2, '0')

  let currentDay = window['langList']['day'][currentTime.getDay()]
  let currentMonth = window['langList']['month'][currentTime.getMonth()]
  let currentDate = currentTime.getDate()
  let currentEnd = getNth(currentDate)

  document.getElementById('hour').innerHTML = currentHours
  document.getElementById('min').innerHTML = currentMinutes
  document.getElementById('day').innerHTML = (currentDay + ',').toUpperCase()
  document.getElementById('month').innerHTML = currentMonth.toUpperCase()
  document.getElementById('dateNum').innerHTML = `${currentDate}<sup><small>${currentEnd}</small></sup>`
}

function init () {
  updateConfig()
  updateClock()
  setInterval(updateClock, 1000)
}
