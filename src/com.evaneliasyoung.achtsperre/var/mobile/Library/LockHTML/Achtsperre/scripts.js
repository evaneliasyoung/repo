window['clockOpacity'] = window['clockOpacity'] || 0.8
window['clockLang'] = window['clockLang'] || 'en'
window['clockHour'] = window['clockHour'] || false
window['clockShadow'] = window['clockShadow'] || false

var enList = {
  day: ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
  month: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
}
var esList = {
  day: ['dom', 'lun', 'mar', 'mier', 'jue', 'vie', 'sab'],
  month: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
var deList = {
  day: ['son', 'mon', 'die', 'mit', 'don', 'fre', 'som'],
  month: ['januar', 'febraur', 'märz', 'april', 'kann', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember']
}

function updateConfig () {
  document.getElementById('clock').opacity = window['clockOpacity']
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
  if (window['clockShadow']) {
    document.getElementById('clock').style['text-shadow'] = '0 5px 10px rgba(0,0,0,0.2)'
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

  document.getElementById('hour').innerHTML = currentHours
  document.getElementById('min').innerHTML = currentMinutes
  document.getElementById('day').innerHTML = window['langList'].day[currentTime.getDay()].toUpperCase()
  document.getElementById('date').innerHTML = `${window['langList'].month[currentTime.getMonth()].toUpperCase()} ${currentTime.getDate()}`
}

function init () {
  updateConfig()
  updateClock()
  setInterval(updateClock, 1000)
}
