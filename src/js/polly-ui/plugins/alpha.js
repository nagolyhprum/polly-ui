export default screen => {
  screen.plugins.render.push(view => {
    const alpha = (typeof view.alpha === 'undefined' && view.isEnabled) ? 1 : (view.alpha || 0.3)
    screen.canvas.alpha(screen.canvas.alpha() * alpha)
  })
}
