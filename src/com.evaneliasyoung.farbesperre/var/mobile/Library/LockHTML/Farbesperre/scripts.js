window['clockRadius'] = parseInt(window['clockRadius']) || 640
window['showHours'] = window['showHours'] || true
window['showSecHand'] = window['showSecHand'] || true
window['clockColor'] = window['clockColor'] || 'FFCC00'
window['secColor'] = window['secColor'] || 'FF9900'
window['knotColor'] = window['knotColor'] || '000000'

function baseDrawCircle (ctx, color, radius, pos) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(pos[0], pos[1], radius, 0, 2 * Math.PI)
  ctx.fill()
}

function baseDrawFace (ctx, color, radius) {
  baseDrawCircle(ctx, color, radius * 0.04, [0, 0])
  ctx.strokeStyle = 'white'
}

function baseDrawCenter (ctx, color, radius) {
  baseDrawCircle(ctx, color, radius * 0.03, [0, 0])
  baseDrawCircle(ctx, '#' + window['knotColor'], radius * 0.01, [0, 0])
}

function baseDrawHands (ctx, color, radius) {
  let hour = window['now'].getHours()
  let minute = window['now'].getMinutes()
  let second = window['now'].getSeconds()

  hour = hour % 12
  hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60)
  ctx.strokeStyle = color[0]
  baseDrawHand(ctx, hour, radius * 0.5, radius * 0.075, false)

  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60)
  ctx.strokeStyle = color[1]
  baseDrawHand(ctx, minute, radius * 0.8, radius * 0.075, false)

  if (window['showSecHand']) {
    second = (second * Math.PI) / 30
    ctx.strokeStyle = color[2]
    baseDrawHand(ctx, second, radius * 0.95, radius * 0.01, true)
    baseDrawHand(ctx, second, radius * -0.1, radius * 0.01, true)
  }
}

function baseDrawHand (ctx, pos, length, width, second) {
  let y = 0
  if (!second) {
    y = -60
    ctx.beginPath()
    ctx.lineWidth = width / 3
    ctx.lineCap = 'square'
    ctx.moveTo(0, 0)
    ctx.rotate(pos)
    ctx.lineTo(0, -60)
    ctx.stroke()
    ctx.rotate(-pos)
  }
  ctx.beginPath()
  ctx.lineWidth = width / 1.3
  ctx.lineCap = 'round'
  ctx.rotate(pos)
  ctx.moveTo(0, y)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-pos)
}

function baseDrawLines (ctx, color, radius, length, width, cap) {
  let ang
  for (let angle = 0; angle < 60; angle++) {
    ang = (angle * Math.PI) / 30
    ctx.rotate(ang)
    ctx.translate(0, -radius * 0.95)
    if (angle % 5 === 0) {
      ctx.beginPath()
      ctx.moveTo(0, 5)
      ctx.lineTo(0, length[0] + 5)
      ctx.lineWidth = width[0]
    } else {
      ctx.beginPath()
      ctx.moveTo(0, 5)
      ctx.lineTo(0, length[1] + 5)
      ctx.lineWidth = width[1]
    }
    ctx.rotate(-ang)
    ctx.strokeStyle = color
    ctx.lineCap = cap
    ctx.stroke()
    ctx.rotate(ang)
    ctx.translate(0, radius * 0.95)
    ctx.rotate(-ang)
  }
}

function updateClock () {
  window['now'] = new Date()
  let radius = window['rad']
  window['ctx'].clearRect(-radius, -radius, radius * 2, radius * 2)
  baseDrawFace(window['ctx'], 'white', radius)
  // baseDrawHours(window['ctx'], "#"+clockColor, radius, radius*0.3);
  baseDrawLines(window['ctx'], '#' + window['clockColor'], radius, [radius / 3.7925925925925927, radius / (radius * 10)], [radius / 34.1, radius / 34.1], 'round')
  baseDrawHands(window['ctx'], ['white', 'white', '#' + window['secColor']], radius)
  baseDrawCenter(window['ctx'], '#' + window['secColor'], radius)
}

function init () {
  window['clockArea'] = document.getElementById('clock')
  window['ctx'] = window['clockArea'].getContext('2d')
  window['rad'] = window['clockArea'].height / 2
  window['ctx'].translate(window['rad'], window['rad'])

  window['clockArea'].style.height = window['clockRadius']
  window['clockArea'].style.width = window['clockRadius']
  updateClock()
  setInterval(updateClock, 1000)
}
