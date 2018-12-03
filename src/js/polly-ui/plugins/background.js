export default screen => {
  const { EMPTY_ARRAY } = screen
  function renderRect (isRender) {
    const margin = this.margin || EMPTY_ARRAY
    const wp = this.bounds.width - screen.getLeftRight(margin)
    const hp = this.bounds.height - screen.getTopBottom(margin)
    screen.canvas.beginPath()
    screen.canvas.rect(0, 0, wp, hp)
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
