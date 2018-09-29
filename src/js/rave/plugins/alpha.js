export default screen => {
  screen.plugins.render.push(view => {
    const alpha = (typeof view.alpha === 'undefined') ? 1 : view.alpha
    screen.canvas.alpha(screen.canvas.alpha() * alpha)
  })
}
