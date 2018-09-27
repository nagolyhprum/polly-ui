export default function (screen) {
  screen.shadow = function (shadow = true) {
    this.active.shadow = shadow
  }
  return function (view) {
    screen.canvas.shadow(view.shadow)
  }
}
