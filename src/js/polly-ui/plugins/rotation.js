export default screen => {
  const { canvas } = screen
  const { TOP, LEFT, EMPTY_ARRAY } = screen
  screen.plugins.render.push(view => {
    const margin = view.margin || EMPTY_ARRAY
    const parentMargin = view.parent.margin || EMPTY_ARRAY
    const x = view.bounds.x + margin[LEFT] - parentMargin[LEFT]
    const y = view.bounds.y + margin[TOP] - parentMargin[TOP]
    canvas.translate(x - view.parent.bounds.x, y - view.parent.bounds.y)
    canvas.translate(view.bounds.width / 2, view.bounds.height / 2)
    canvas.rotate(view.rotation)
    canvas.translate(-view.bounds.width / 2, -view.bounds.height / 2)
  })
}
