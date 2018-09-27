export default function (screen) {
  return function (view) {
    const alpha = (typeof view.alpha === 'undefined') ? 1 : view.alpha
    screen.canvas.alpha(screen.canvas.alpha() * alpha)
  }
}
