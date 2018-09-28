export default function (screen) {
  screen.shadow = function (shadow = true) {
    this.active.shadow = shadow
  }
  screen.plugins.render.push(function (view) {
    screen.canvas.shadow(view.shadow)
  })
}
