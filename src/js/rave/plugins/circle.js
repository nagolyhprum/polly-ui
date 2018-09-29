export default screen => {
  const {TOP, LEFT, EMPTY_ARRAY} = screen
  function renderCircle (isRender) {
    const margin = this.margin || EMPTY_ARRAY
    const wp = this.bounds.width - screen.getLeftRight(margin)
    const hp = this.bounds.height - screen.getTopBottom(margin)
    const radius = Math.min(wp, hp) / 2
    const x = this.bounds.x + radius + margin[LEFT]
    const y = this.bounds.y + radius + margin[TOP]
    const bg = isRender && screen.getValue(this, 'background')
    screen.canvas.beginPath()
    const cc = true
    screen.canvas.arc(x, y, radius, 0, 2 * Math.PI, cc)
    if (bg) {
      screen.canvas.fillStyle(bg)
      screen.canvas.fill()
    }
  }
  screen.extend({
    circle (view) {
      view.render = renderCircle
    }
  })
}
