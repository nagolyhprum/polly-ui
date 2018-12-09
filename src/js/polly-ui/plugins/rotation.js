export default screen => {
  const { canvas } = screen
  const { TOP, LEFT, EMPTY_ARRAY } = screen
  screen.plugins.render.push(view => {
    const margin = view.margin || EMPTY_ARRAY
    const x = view.bounds.x
    const y = view.bounds.y
    canvas.translate(x, y)
    canvas.translate(view.bounds.width / 2, view.bounds.height / 2)
    canvas.rotate(view.rotation)
    canvas.translate(-view.bounds.width / 2, -view.bounds.height / 2)
    canvas.translate(-x, -y)
  })
}
