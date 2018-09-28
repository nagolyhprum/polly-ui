export default function (screen) {
  screen.plugins.render.push(function (view) {
    const alpha = (typeof view.alpha === 'undefined') ? 1 : view.alpha
    screen.canvas.alpha(screen.canvas.alpha() * alpha)
  })
}
