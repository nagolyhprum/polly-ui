import { TOP, LEFT, EMPTY_ARRAY } from 'rave/screen'
function roundRect (canvas, x, y, width, height, radius, fill, stroke) {
  radius = { tl: radius, tr: radius, br: radius, bl: radius }
  canvas.beginPath()
  canvas.moveTo(x + radius.tl, y)
  canvas.lineTo(x + width - radius.tr, y)
  canvas.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  canvas.lineTo(x + width, y + height - radius.br)
  canvas.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  )
  canvas.lineTo(x + radius.bl, y + height)
  canvas.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  canvas.lineTo(x, y + radius.tl)
  canvas.quadraticCurveTo(x, y, x + radius.tl, y)
  canvas.closePath()
  if (fill) {
    canvas.fillStyle(fill)
    canvas.fill()
  }
  if (stroke) {
    canvas.strokeStyle(stroke)
    canvas.stroke()
  }
}
export default function (screen) {
  function renderRoundRect (isRender) {
    const margin = this.margin || EMPTY_ARRAY
    const x = this.bounds.x + margin[LEFT]
    const y = this.bounds.y + margin[TOP]
    const wp = this.bounds.width - screen.getLeftRight(margin)
    const hp = this.bounds.height - screen.getTopBottom(margin)
    roundRect(
      screen.canvas,
      x,
      y,
      wp,
      hp,
      screen.getValue(this, 'round'),
      isRender && screen.getValue(this, 'background')
    )
  }
  screen.extend({
    round (view, round) {
      view.round = round
      view.render = renderRoundRect
    }
  })
}
