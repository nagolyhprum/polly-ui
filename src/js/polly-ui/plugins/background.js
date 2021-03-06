export default screen => {
  const { EMPTY_ARRAY, LEFT, TOP } = screen
  function renderRect (isRender) {
    const margin = this.margin || EMPTY_ARRAY
    const x = this.bounds.x + margin[LEFT]
    const y = this.bounds.y + margin[TOP]
    const wp = this.bounds.width - screen.getLeftRight(margin)
    const hp = this.bounds.height - screen.getTopBottom(margin)
    screen.canvas.beginPath()
    screen.canvas.rect(x, y, wp, hp)
    const bg = isRender && screen.getValue(this, 'background')
    if (bg) {
      screen.canvas.fillStyle(bg)
      screen.canvas.fill()
    }
  }
  screen.plugins.view.push(view => Object.assign(view, {
    render: renderRect
  }))
  screen.extend({
    background (view, background) {
      view.background = background
    }
  })
  screen.plugins.render.push(view => view.render(view.isDirty))
}
